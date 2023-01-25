const PatientHopital = require('../models/PatientH');
const Hopital = require('../models/Hopital')
const VerificationToken = require('../models/verificationTokenpatienthopital');
const { sendError, createRandomBytes } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');
const ResetToken = require('../models/resetToken');
const crypto = require('crypto');
const ObjectId = require('mongoose').Types.ObjectId;


exports.afficherpatientH = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        await PatientHopital.find({hopitalId:id}).sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

}


exports.createPatientHopital = async (req, res) => {
    console.log(req.body)

    const nom = req.body.nom;
    const prenom = req.body.prenom;

    const email = req.body.email;

    const datedenaissance = req.body.datedenaissance;

    const adresse = req.body.adresse;
    const genre = req.body.genre;
    const motdepasse = req.body.motdepasse;
    const telephone = req.body.telephone;
    const hopitalId = req.body.id;

    console.log(hopitalId)
    if (!isValidObjectId(hopitalId)) return sendError(res, 'Hopital id invalide!');

    const hopital = await Hopital.findById(hopitalId);
    if (!hopital) return sendError(res, 'hopital non trouvé!');
    const patienthopital = await PatientHopital.findOne({ email });
    if (patienthopital ) return sendError(res, "Cet Email existe déjà!");


    const newpatienthopital = new PatientHopital({
        nom,
        prenom,
        
        email,
        hopitalId:hopital._id,
        motdepasse,
        datedenaissance,
        adresse,

        telephone,genre
        ,type:2
    });


    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newpatienthopital._id,
        token: OTP
    })
    await verificationToken.save();
    await newpatienthopital.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: newpatienthopital.email,
        subject: "Verification de votre compte email",
        html: generateEmailTemplate(OTP)


    })

    res.json({
        success: true,
        patienth: { nom: newpatienthopital.nom, prenom: newpatienthopital.prenom, email: newpatienthopital.email, adresse: newpatienthopital.adresse, id: newpatienthopital._id,verified: newpatienthopital.verified},
    });


};
exports.InfoPatient = (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown :' + req.params.id)
        PatientHopital.findById(req.params.id).populate('hopitalId').select('-motdepasse') .then(result => {
            res.send(result)
        })
    

    


};

exports.signin = async (req, res) => {
    const { email, motdepasse } = req.body;
    if (!email.trim() || !motdepasse.trim()) return sendError(res, "Email ou mot de passe manquant!");

    const patienthopital = await PatientHopital.findOne({ email });
    if (!patienthopital) return sendError(res, 'medecin non trouvé!');

    const isMatched = await patienthopital.comparePassword(motdepasse);
    if (!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({ patienthopitalId: patienthopital._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        patienthopital: { nom: patienthopital.nom, prenom: patienthopital.prenom, email: patienthopital.email, id: patienthopital._id, token },
    });
};

exports.verifyEmail = async (req, res) => {
    const {patienthopitalId, otp} = req.body;
    if(!patienthopitalId || !otp.trim()) return sendError(res,'Demande invalide, paramètres manquants!');

    if(!isValidObjectId(patienthopitalId)) return sendError(res,'admin id invalide!');

    const patienthopital = await PatientHopital.findById(patienthopitalId);
    if(!patienthopital) return sendError(res,'patienthopital non trouvé!');

    if(patienthopital.verified) return sendError(res, 'Ce compte est déjà verifié! ');

    const token =  await VerificationToken.findOne({owner: patienthopital._id});
    if(!token)  return sendError(res, 'Token non trouvé!');

    const isMatched = await token.compareToken(otp);
    if(!isMatched) return sendError(res, 'Faire entrer un code valide!');

    patienthopital.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await patienthopital.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: patienthopital.email,
        subject: "Bienvenue à FYSALI app",
        html: planeEmailTemplate("Email Verified Successfully","Thanks for joinig us")


    });
    res.json({success: true, message:"your email is verified.", patienthopital: {nom: patienthopital.nom, prenom: patienthopital.prenom, email: patienthopital.email, id: patienthopital._id, token}})
}


exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "please provide a valid email !");
    const patienthopital = await PatientHopital.findOne({ email });
    if (!patienthopital
        ) return sendError(res, "patienthopital not found , invalid request !");

    const token = await ResetToken.findOne({ owner: patienthopital._id });
    if (token) return sendError(res, "Only after one hour you can request for another token !");
    const randomBytes = await createRandomBytes()
    // return console.log(randomBytes);
    const resetToken = new ResetToken({ owner: patienthopital._id, token: randomBytes })
    await resetToken.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: patienthopital.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:5000/api/patienthopital/reset-password?token=${randomBytes}&id=${patienthopital._id}`),


    });
    res.json({ success: true, message: "password reset link is sent to your email " })

} ; 
 exports.resetPassword = async (req, res) => {
    const {motdepasse} = req.body ;
    const patienthopital = await PatientHopital.findById(req.patienthopital._id)
if (!patienthopital)  return sendError(res,'patienthopital non trouvé !')
const isSamePassword = await patienthopital.comparePassword(motdepasse)
if ( isSamePassword) return sendError(res , 'Le nouveau mot de passe doit etre différent ! ')
if ( motdepasse.trim().length < 8 || motdepasse.trim().length>20) 
return  sendError(res , " le mot de passe doit etre entre 8 et 20 caractéres  !" )

patienthopital.motdepasse= motdepasse.trim() ;
await patienthopital.save() ;
await ResetToken.findOneAndDelete({owner:patienthopital._id})

mailTransport().sendMail({
    from: 'security@email.com',
    to: patienthopital.email,
    subject: "Password Reset Successfully",
    html: planeEmailTemplate("password Reset Successfuly" , 
    "Now you can login with new password ! "),


});

res.json({ success: true, message: "password reset Successfully " })


 } 