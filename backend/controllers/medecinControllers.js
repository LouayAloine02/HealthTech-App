const Medecin = require('../models/medecinModels');

const jwt = require('jsonwebtoken');
const VerificationTokenMedecin = require('../models/verificationTokenMedecin');
const ResetTokenMedecin = require('../models/resetTokenMedecin');

const { sendError, createRandomBytes } = require('../utils/helper');
const ObjectId = require('mongoose').Types.ObjectId;

const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');


exports.afficherMedecin = async (req, res) => {
    try {
        await Medecin.find({}).sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

};

exports.InfoMedecin = (req, res) => {
    console.log(req.params);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Id unknown :' + req.params.id)
    Medecin.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id unknown' + err);

    }

    ).select('-password')


};

exports.createMedecin = async (req, res) => {
    const { nomMed, prenomMed, date_naissance, email, password, passwordConfirmation, adresse, numTel, specialite, genre } = req.body;
    console.log(req.body)
    const newMedecin = await Medecin.findOne({ email })
    if (newMedecin) return res.json({ success: false, message: 'email est deja utilisé' });
    const medecin = new Medecin({
        nomMed,
        prenomMed,

        date_naissance: date_naissance,
        genre: genre,
        email,
        password,
        passwordConfirmation,
        adresse,
        numTel,
        specialite,

    });

    const OTP = generateOTP();
    const verificationTokenMedecin = new VerificationTokenMedecin({
        owner: medecin._id,
        token: OTP
    })
    await verificationTokenMedecin.save();
    await medecin.save();
    console.log('ok')

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: medecin.email,
        subject: "Verification de votre compte email",
        html: generateEmailTemplate(OTP)
    })




    //await medecin.save()
    //res.json(newMedecin)
    res.json({
        success: true,
        medecin: { nomMed: medecin.nomMed, prenomMed: medecin.prenomMed, age: medecin.age, email: medecin.email, password: medecin.password, passwordConfirmation: medecin.passwordConfirmation, adresse: medecin.adresse, numTel: medecin.numTel, specialite: medecin.specialite, id: medecin._id, verified: medecin.verified },
    });


};


exports.signIn = async (req, res) => {



    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    if (!email.trim() || !password)
        return sendError(res, 'email/mot de passe est vide !');

    const medecin = await Medecin.findOne({ email });
    if (!medecin) return res.json({ success: false, message: 'medecin est undefini' })

    //     if (!medecin) return sendError(res, ' Ce medecin est undéfini');

    const isMatched = await medecin.comparePassword(password);
    if (!isMatched) return sendError(res, 'Mot de passe incorrect');


    // const tokenMedecin = jwt.sign({ medecinId: medecin._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    const token = jwt.sign({ medecinId: medecin._id },
        process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    res.json({
        success: true,
        medecin: { nomMed: medecin.nomMed, prenomMed: medecin.prenomMed, email: medecin.email, id: medecin._id, token },
    });


};

exports.verifyEmail = async (req, res) => {
    const { medecinId, otp } = req.body;
    console.log(req.body)
    if (!medecinId || !otp.trim()) return sendError(res, 'Demande invalide, paramètres manquants!');

    if (!isValidObjectId(medecinId)) return sendError(res, 'Medecin id invalide!');

    const medecin = await Medecin.findById(medecinId);
    if (!medecin) return sendError(res, 'Medecin non trouvé!');

    if (medecin.verified) return sendError(res, 'Ce compte est déjà verifié! ');
    
    const tokenMedecin = await VerificationTokenMedecin.findOne({ owner: medecin._id });
    if (!tokenMedecin) return sendError(res, 'TokenMedecin non trouvé!');

    const isMatched = await tokenMedecin.compareToken(otp);
    if (!isMatched) return sendError(res, 'Faire entrer un code valide!');

    medecin.verified = true;
    await VerificationTokenMedecin.findByIdAndDelete(tokenMedecin._id);
    await medecin.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: medecin.email,
        subject: "Bienvenue à FYSALI app",
        html: planeEmailTemplate("Email Verified Successfully", "Thanks for joinig us")


    });
    res.json({ success: true, message: "your email is verified.", medecin: { nomMed: medecin.nomMed, prenomMed: medecin.prenomMed, email: medecin.email, id: medecin._id, tokenMedecin } })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "please provide a valid email !");
    const medecin = await Medecin.findOne({ email });
    if (!medecin) return sendError(res, "medecin not found , invalid request !");

    const tokenMedecin = await ResetTokenMedecin.findOne({ owner: medecin._id });
    if (tokenMedecin) return sendError(res, "Only after one hour you can request for another tokenMedecin !");
    const randomBytes = await createRandomBytes();
    // return console.log(randomBytes);
    const resetTokenMedecin = new ResetTokenMedecin({ owner: medecin._id, tokenMedecin: randomBytes })
    await resetTokenMedecin.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: medecin.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:5000/resetPassword?tokenMedecin=${randomBytes}&id=${medecin._id}`),


    });
    res.json({ success: true, message: "password reset link is sent to your email " })

};
exports.resetPassword = async (req, res) => {
    const { password } = req.body;
    const medecin = await Medecin.findById(req.medecin._id)
    if (!medecin) return sendError(res, 'medecin non trouvé !')
    const isSamePassword = await medecin.comparePassword(password)
    if (isSamePassword) return sendError(res, 'Le nouveau mot de passe doit etre différent ! ')
    if (password.trim().length < 8 || password.trim().length > 20)
        return sendError(res, " le mot de passe doit etre entre 8 et 20 caractéres  !")

    medecin.password = password.trim();
    await medecin.save();
    await ResetTokenMedecin.findOneAndDelete({ owner: medecin._id })

    mailTransport().sendMail({
        from: 'security@email.com',
        to: medecin.email,
        subject: "Password Reset Successfully",
        html: planeEmailTemplate("password Reset Successfuly",
            "Now you can login with new password ! "),


    });

    res.json({ success: true, message: "password reset Successfully " })


}
