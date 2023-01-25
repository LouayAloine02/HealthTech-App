const MedecinHopital = require('../models/MedecinH')
const MedecinPatient = require('../models/PatientMedecin')
const VerificationToken = require('../models/verificationTokenmedecinhopital');
const { sendError, createRandomBytes } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');
const ResetToken = require('../models/resetToken');
const crypto = require('crypto');
const Hopital = require('../models/Hopital');
const ObjectId = require('mongoose').Types.ObjectId;

exports.InfoMedecin = (req, res) => {
    console.log("me");

    console.log(req.params);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown :' + req.params.id)
        MedecinHopital.findById(req.params.id
    ).populate('hopitalId').select('-motdepasse') .then(result => {
        res.send(result)
    })


};


exports.affichermedecinH = async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        await MedecinHopital.find({hopitalId:id}).sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

}


exports.createMedecinHopital = async (req, res) => {
    console.log(req.body)

    const nom = req.body.nom;
    const prenom = req.body.prenom;

    const email = req.body.email;

    const datedenaissance = req.body.datedenaissance;

    const specialite = req.body.specialite;
    const genre = req.body.genre;
    const motdepasse = req.body.motdepasse;
    const telephone = req.body.telephone;
    const hopitalId = req.body.id;


    console.log(hopitalId)
    if (!isValidObjectId(hopitalId)) return sendError(res, 'Hopital id invalide!');

    const hopital = await Hopital.findById(hopitalId);
    if (!hopital) return sendError(res, 'hopital non trouvé!');
    const medecinhopital = await MedecinHopital.findOne({ email });
    if (medecinhopital) return sendError(res, "Cet Email existe déjà!");



    const newMedecinHopital = new MedecinHopital({
        nom,
        prenom,
        hopitalId: hopital._id,
        datedenaissance,
        genre,
        email,
        motdepasse,
        telephone,
        specialite
    });


    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newMedecinHopital._id,
        token: OTP
    })
    await verificationToken.save();
    await newMedecinHopital.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: newMedecinHopital.email,
        subject: "Verification de votre compte email",
        html: generateEmailTemplate(OTP)


    })

    res.json({
        success: true,
        Hopital: { nom: newMedecinHopital.nom, prenom: newMedecinHopital.prenom, email: newMedecinHopital.email, adresse: newMedecinHopital.adresse, id: newMedecinHopital._id, verified: newMedecinHopital.verified },
    });


};

exports.signin = async (req, res) => {
    const { email, motdepasse } = req.body;
    if (!email.trim() || !motdepasse.trim()) return sendError(res, "Email ou mot de passe manquant!");

    const medecinhopital = await MedecinHopital.findOne({ email });
    if (!medecinhopital) return sendError(res, 'medecin non trouvé!');

    const isMatched = await medecinhopital.comparePassword(motdepasse);
    if (!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({ medecinhopitalId: medecinhopital._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        medecinhopital: { nom: medecinhopital.nom, prenom: medecinhopital.prenom, email: medecinhopital.email, id: medecinhopital._id, token },
    });
};

exports.verifyEmail = async (req, res) => {
    const { medecinhopitalId, otp } = req.body;
    if (!medecinhopitalId || !otp.trim()) return sendError(res, 'Demande invalide, paramètres manquants!');

    if (!isValidObjectId(medecinhopitalId)) return sendError(res, 'admin id invalide!');

    const medecinhopital = await MedecinHopital.findById(medecinhopitalId);
    if (!medecinhopital) return sendError(res, 'medecinhopital non trouvé!');

    if (medecinhopital.verified) return sendError(res, 'Ce compte est déjà verifié! ');

    const token = await VerificationToken.findOne({ owner: medecinhopital._id });
    if (!token) return sendError(res, 'Token non trouvé!');

    const isMatched = await token.compareToken(otp);
    if (!isMatched) return sendError(res, 'Faire entrer un code valide!');

    medecinhopital.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await medecinhopital.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: medecinhopital.email,
        subject: "Bienvenue à FYSALI app",
        html: planeEmailTemplate("Email Verified Successfully", "Thanks for joinig us")


    });
    res.json({ success: true, message: "your email is verified.", medecinhopital: { nom: medecinhopital.nom, prenom: medecinhopital.prenom, email: medecinhopital.email, id: medecinhopital._id, token } })
}


exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "please provide a valid email !");
    const medecinhopital = await MedecinHopital.findOne({ email });
    if (!medecinhopital
    ) return sendError(res, "medecinhopital not found , invalid request !");

    const token = await ResetToken.findOne({ owner: medecinhopital._id });
    if (token) return sendError(res, "Only after one hour you can request for another token !");
    const randomBytes = await createRandomBytes()
    // return console.log(randomBytes);
    const resetToken = new ResetToken({ owner: medecinhopital._id, token: randomBytes })
    await resetToken.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: medecinhopital.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:5000/api/medecinhopital/reset-password?token=${randomBytes}&id=${medecinhopital._id}`),


    });
    res.json({ success: true, message: "password reset link is sent to your email " })

};
exports.resetPassword = async (req, res) => {
    const { motdepasse } = req.body;
    const medecinhopital = await MedecinHopital.findById(req.medecinhopital._id)
    if (!medecinhopital) return sendError(res, 'medecinhopital non trouvé !')
    const isSamePassword = await medecinhopital.comparePassword(motdepasse)
    if (isSamePassword) return sendError(res, 'Le nouveau mot de passe doit etre différent ! ')
    if (motdepasse.trim().length < 8 || motdepasse.trim().length > 20)
        return sendError(res, " le mot de passe doit etre entre 8 et 20 caractéres  !")

    medecinhopital.motdepasse = motdepasse.trim();
    await medecinhopital.save();
    await ResetToken.findOneAndDelete({ owner: medecinhopital._id })

    mailTransport().sendMail({
        from: 'security@email.com',
        to: medecinhopital.email,
        subject: "Password Reset Successfully",
        html: planeEmailTemplate("password Reset Successfuly",
            "Now you can login with new password ! "),


    });

    res.json({ success: true, message: "password reset Successfully " })


} 

exports.afficherpatient= async(req,res) => {
    const {id} = req.params
    console.log(id)
    
    try {
      const patient = await MedecinPatient.find({medecinId:id}).populate('patientId').then(result => {
        console.log(result)
        res.send(result)
    })
      console.log(patient)
      
    } catch (error) {
        console.log(error)
    }

}