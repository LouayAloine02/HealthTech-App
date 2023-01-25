
const Hopital = require('../models/Hopital');
const VerificationToken = require('../models/verificationTokenhopital');
const { sendError, createRandomBytes } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');
const ResetToken = require('../models/resetToken');
const crypto = require('crypto');
const Admin = require('../models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;


exports.afficherHopital = async (req, res) => {
    try {
        await Hopital.find({}).sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

}


exports.createHopital = async (req, res) => {
    const { nom,
       
        email,
        adresse,
        motdepasse,

        telephone } = req.body;

    const hopital = await Hopital.findOne({ email });
    const admin = await Admin.findOne({email}) ;
    if (hopital || admin) return sendError(res, "Cet Email existe déjà!");


    const newHopital = new Hopital({
        nom,
    
        email,
        adresse,
        motdepasse,

        telephone
    });


    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newHopital._id,
        token: OTP
    })
    await verificationToken.save();
    await newHopital.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: newHopital.email,
        subject: "Verification de votre compte email",
        html: generateEmailTemplate(OTP)


    })

    res.json({
        success: true,
        Hopital: { nom: newHopital.nom,  email: newHopital.email, adresse: newHopital.adresse, id: newHopital._id,verified: newHopital.verified},
    });


};

exports.signin = async (req, res) => {
    const { email, motdepasse } = req.body;
    if (!email.trim() || !motdepasse.trim()) return sendError(res, "Email ou mot de passe manquant!");

    const hopital = await Hopital.findOne({ email });
    if (!hopital) return sendError(res, 'Hopital non trouvé!');

    const isMatched = await hopital.comparePassword(motdepasse);
    if (!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({ HopitalId: hopital._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        Hopital: { nom: hopital.nom,  email: hopital.email, id: hopital._id, token },
    });
};
exports.InfoHopital = (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown :' + req.params.id)
    Hopital.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id unknown' + err);

    }

    ).select('-motdepasse')


};

exports.verifyEmail = async (req, res) => {
    const {hopitalId, otp} = req.body;
    if(!hopitalId || !otp.trim()) return sendError(res,'Demande invalide, paramètres manquants!');

    if(!isValidObjectId(hopitalId)) return sendError(res,'admin id invalide!');

    const hopital = await Hopital.findById(hopitalId);
    if(!hopital) return sendError(res,'hopital non trouvé!');

    if(hopital.verified) return sendError(res, 'Ce compte est déjà verifié! ');

    const token =  await VerificationToken.findOne({owner: hopital._id});
    if(!token)  return sendError(res, 'Token non trouvé!');

    const isMatched = await token.compareToken(otp);
    if(!isMatched) return sendError(res, 'Faire entrer un code valide!');

    hopital.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await hopital.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: hopital.email,
        subject: "Bienvenue à FYSALI app",
        html: planeEmailTemplate("Email Verified Successfully","Thanks for joinig us")


    });
    res.json({success: true, message:"your email is verified.", hopital: {nom: hopital.nom, prenom: hopital.prenom, email: hopital.email, id: hopital._id, token}})
}


exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "please provide a valid email !");
    const hopital = await Hopital.findOne({ email });
    if (!hopital) return sendError(res, "hopital not found , invalid request !");

    const token = await ResetToken.findOne({ owner: hopital._id });
    if (token) return sendError(res, "Only after one hour you can request for another token !");
    const randomBytes = await createRandomBytes()
    // return console.log(randomBytes);
    const resetToken = new ResetToken({ owner: hopital._id, token: randomBytes })
    await resetToken.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: hopital.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:5000/api/hopital/reset-password?token=${randomBytes}&id=${hopital._id}`),


    });
    res.json({ success: true, message: "password reset link is sent to your email " })

} ; 
 exports.resetPassword = async (req, res) => {
    const {motdepasse} = req.body ;
    const hopital = await Hopital.findById(req.hopital._id)
if (!hopital)  return sendError(res,'hopital non trouvé !')
const isSamePassword = await hopital.comparePassword(motdepasse)
if ( isSamePassword) return sendError(res , 'Le nouveau mot de passe doit etre différent ! ')
if ( motdepasse.trim().length < 8 || motdepasse.trim().length>20) 
return  sendError(res , " le mot de passe doit etre entre 8 et 20 caractéres  !" )

hopital.motdepasse= motdepasse.trim() ;
await hopital.save() ;
await ResetToken.findOneAndDelete({owner:hopital._id})

mailTransport().sendMail({
    from: 'security@email.com',
    to: hopital.email,
    subject: "Password Reset Successfully",
    html: planeEmailTemplate("password Reset Successfuly" , 
    "Now you can login with new password ! "),


});

res.json({ success: true, message: "password reset Successfully " })


 } 

 exports.updateHopital = async (req, res) => {

    let id = req.params.id


    const update = {
        nom: req.body.nom,
        email: req.body.email,
        telephone: req.body.telephone,
        adresse: req.body.adresse
    }
    Hopital.findByIdAndUpdate(id, { $set: update }, { new: true }, (error) => {
        if (error) {
            res.status(400).send('hopital non trouvé ' + req.params.id)
        }
        else {
            res.send('hopital updated')
        }
    }
    )






}

















