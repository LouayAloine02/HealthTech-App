
const Admin = require('../models/Admin');
const Hopital = require('../models/Hopital')
const VerificationToken = require('../models/verificationToken');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { sendError, createRandomBytes } = require('../utils/helper');
const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const ResetToken = require('../models/resetToken');
const crypto = require('crypto');

const { isValidObjectId } = require('mongoose');


exports.afficheradmin = async (req, res) => {
    try {
        await Admin.find({}).sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

}


exports.createAdmin = async (req, res) => {
    const { nom,
        prenom,
        genre,
        email,
        motdepasse,


        telephone } = req.body;

    const admin = await Admin.findOne({ email });
    if (admin) return sendError(res, "Cet Email existe déjà!");


    const newAdmin = new Admin({
        nom,
        prenom,
        genre,
        email,
        motdepasse,
        adresse: "France",
        telephone
    });


    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newAdmin._id,
        token: OTP
    })
    await verificationToken.save();
    await newAdmin.save();
    console.log('ok')

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: newAdmin.email,
        subject: "Verification de votre compte email",
        html: generateEmailTemplate(OTP)


    })

    
    res.json({
        success: true,
        Admin: { nom: newAdmin.nom, prenom: newAdmin.prenom, email: newAdmin.email, adresse: newAdmin.adresse, id: newAdmin._id,verified: newAdmin.verified},
    });



};

exports.signin = async (req, res) => {
    const { email, motdepasse } = req.body;
    if (!email.trim() || !motdepasse.trim()) return sendError(res, "Email ou mot de passe manquant!");

    const admin = await Admin.findOne({ email });
    if (!admin) return sendError(res, 'Admin non trouvé!');

    const isMatched = await admin.comparePassword(motdepasse);
    if (!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({ AdminId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        Admin: { nom: admin.nom, prenom: admin.prenom, email: admin.email, adresse: admin.adresse, id: admin._id, token },
    });
};

exports.verifyEmail = async (req, res) => {
    const {adminId, otp} = req.body;
    if(!adminId || !otp.trim()) return sendError(res,'Demande invalide, paramètres manquants!');

    if(!isValidObjectId(adminId)) return sendError(res,'admin id invalide!');

    const admin = await Admin.findById(adminId);
    if(!admin) return sendError(res,'admin non trouvé!');

    if(admin.verified) return sendError(res, 'Ce compte est déjà verifié! ');

    const token =  await VerificationToken.findOne({owner: admin._id});
    if(!token)  return sendError(res, 'Token non trouvé!');

    const isMatched = await token.compareToken(otp);
    if(!isMatched) return sendError(res, 'Faire entrer un code valide!');

    admin.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await admin.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: admin.email,
        subject: "Bienvenue à FYSALI app",
        html: planeEmailTemplate("Email Verified Successfully","Thanks for joinig us")


    });
    res.json({success: true, message:"your email is verified.", admin: {nom: admin.nom, prenom: admin.prenom, email: admin.email, id: admin._id, token}})
}

exports.InfoAdmin = (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown :' + req.params.id)
    Admin.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id unknown' + err);

    }

    ).select('-motdepasse')


};
exports.updateAdmin = async (req, res) => {

    let id = req.params.id


    const update = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        genre: req.body.genre,
        email: req.body.email,
        telephone: req.body.telephone,
        adresse: req.body.adresse
    }
    Admin.findByIdAndUpdate(id, { $set: update }, { new: true }, (error) => {
        if (error) {
            res.status(400).send('admin non trouvé ' + req.params.id)
        }
        else {
            res.send('admin updated')
        }
    }
    )






}



exports.deleteAdmin = async (req, res) => {
    Admin.findByIdAndRemove(req.params.id).then(admin => {
        if (admin) {
            return res.status(200).json({ success: true, message: 'Admin supprimé ' })
        }
        else {
            return res.status(404).json({ success: false, message: "admin non trouvé" })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })

}

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "please provide a valid email !");
    const admin = await Admin.findOne({ email });
    if (!admin) return sendError(res, "admin not found , invalid request !");

    const token = await ResetToken.findOne({ owner: admin._id });
    if (token) return sendError(res, "Only after one hour you can request for another token !");
    const randomBytes = await createRandomBytes()
    // return console.log(randomBytes);
    const resetToken = new ResetToken({ owner: admin._id, token: randomBytes })
    await resetToken.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: admin.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:3000/api/admin/reset-password?token=${randomBytes}&id=${admin._id}`),


    });
    res.json({ success: true, message: "password reset link is sent to your email " })

};
exports.resetPassword = async (req, res) => {
    const { motdepasse } = req.body;
    const admin = await Admin.findById(req.admin._id)
    if (!admin) return sendError(res, 'admin non trouvé !')
    const isSamePassword = await admin.comparePassword(motdepasse)
    if (isSamePassword) return sendError(res, 'Le nouveau mot de passe doit etre différent ! ')
    if (motdepasse.trim().length < 8 || motdepasse.trim().length > 20)
        return sendError(res, " le mot de passe doit etre entre 8 et 20 caractéres  !")

    admin.motdepasse = motdepasse.trim();
    await admin.save();
    await ResetToken.findOneAndDelete({ owner: admin._id })

    mailTransport().sendMail({
        from: 'security@email.com',
        to: admin.email,
        subject: "Password Reset Successfully",
        html: planeEmailTemplate("password Reset Successfuly",
            "Now you can login with new password ! "),


    });

    res.json({ success: true, message: "password reset Successfully " })


}
























