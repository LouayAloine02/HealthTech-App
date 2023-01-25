
const Patient = require('../model/patient');
const Reveil = require('../model/reveil');
const Coucher = require('../model/coucher');
const Calendrier = require('../model/calendrier');
const Boisson = require('../model/boisson');
const Toilette = require('../model/toilette');
const Protection = require('../model/protection');
const Quiz = require('../models/quiz')
const Questionnaire = require('../models/questionnaire')

const PatientH = require('../models/PatientH')
const Hopital = require('../models/Hopital')
const Admin = require('../models/Admin');
const Symptome = require('../model/symptome');
const VerificationToken = require('../model/verificationTokenPatient');
const ResetToken = require('../model/resetTokenPatient');
const { sendError, createRandomBytes } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate, generateEmail, generatePasswordResetTemplate, ajoutEmail } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');
const crypto = require('crypto');


exports.createPatient = async (req, res) => {
    const { nom, prenom, email, password, date_naissance, genre, adresse, phone, photo } = req.body;

    const patient = await Patient.findOne({ email });
    if (patient) return sendError(res, "Cet Email existe déjà!");

    const newPatient = new Patient({
        nom,
        prenom,
        email,
        password,
        date_naissance,
        adresse,
        genre,
        phone,
        photo,
        type: 1
    });


    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newPatient._id,
        token: OTP
    })
    await verificationToken.save();
    await newPatient.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: newPatient.email,
        subject: "Verification de votre compte email",
        html: generateEmailTemplate(OTP)


    })

    res.json({
        success: true,
        patient: { nom: newPatient.nom, prenom: newPatient.prenom, email: newPatient.email, id: newPatient._id, genre: newPatient.genre, verified: newPatient.verified }
    });



};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) return sendError(res, "Email ou mot de passe manquant!");

    const patient = await Patient.findOne({ email });
    if (!patient) return sendError(res, 'Patient non trouvé!');

    const isMatched = await patient.comparePassword(password);
    if (!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({ patientId: patient._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        patient: { nom: patient.nom, prenom: patient.prenom, adresse: patient.adresse, genre: patient.genre, phone: patient.phone, date: patient.date_naissance, email: patient.email, id: patient._id, token },
    });
};

exports.verifyEmail = async (req, res) => {
    const { patientId, otp } = req.body;
    if (!patientId || !otp.trim()) return sendError(res, 'Demande invalide, paramètres manquants!');

    if (!isValidObjectId(patientId)) return sendError(res, 'Patient id invalide!');

    const patient = await Patient.findById(patientId);
    if (!patient) return sendError(res, 'Patient non trouvé!');

    if (patient.verified) return sendError(res, 'Ce compte est déjà verifié! ');

    const token = await VerificationToken.findOne({ owner: patient._id });
    if (!token) return sendError(res, 'Token non trouvé!');

    const isMatched = await token.compareToken(otp);
    if (!isMatched) return sendError(res, 'Faire entrer un code valide!');

    patient.verified = true;

    await patient.save();

    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: patient.email,
        subject: "Bienvenue à FYSALI app",
        html: planeEmailTemplate("Email Verified Successfully", "Thanks for joinig us")


    });
    await VerificationToken.findByIdAndDelete(token._id);
    res.json({ success: true, message: "your email is verified.", patient: { nom: patient.nom, prenom: patient.prenom, email: patient.email, id: patient._id, token } })

}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return sendError(res, "L'email n'est pas valide!");

    const patient = await Patient.findOne({ email });

    if (!patient) return sendError(res, "Patient non trouvé!");

    const token = await ResetToken.findOne({ owner: patient._id });
    if (token) return sendError(res, "Vous ne pouvez faire une demande qu'après une heure!");

    const rbytes = await createRandomBytes();
    const resetToken = new ResetToken({ owner: patient._id, token: rbytes });
    await resetToken.save();


    mailTransport().sendMail({
        from: 'FYSALIsecurity@noreply.com',
        to: patient.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:3000/reset-password?token=${rbytes}&id=${patient._id}`),


    });
    res.json({ success: true, message: "Lien de modification de mot de passe est envoyé à votre email." })

};

exports.resetPassword = async (req, res) => {
    const { password } = req.body;

    const patient = await Patient.findById(req.patient._id);

    if (!patient) return sendError(res, "Patient non trouvé!");

    const isSamePassword = await patient.comparePassword(password);
    if (isSamePassword) return sendError(res, "Changez le mot de passe!");

    if (password.trim().length < 8 || password.trim().length > 20)
        return sendError(res, "Mot de passe doit avoir une longueur entre 8 et 20 caractères!");

    patient.password = password.trim();
    await patient.save();



    mailTransport().sendMail({
        from: 'FYSALIsecurity@noreply.com',
        to: patient.email,
        subject: "Password Reset Successfully",
        html: planeEmailTemplate("Password Reset Successfully", "Now you can login with new password")


    });
    res.json({ success: true, message: "Password Reset Successfully" })
    await ResetToken.findOneAndDelete({ owner: patient._id })
};

// envoyer les symptomes 

exports.envoyerSymptome = async (req, res) => {
    const { patientId, symptomes } = req.body;
    // if(!message.trim() ) return sendError(res, "Message ou symptomes manquant!");

    if (!isValidObjectId(patientId)) return sendError(res, 'Patient id invalide!');


    const patient = await PatientH.findById(patientId);
    if (!patient) return sendError(res, 'Patient non trouvé!');

    const newSymptomes = new Symptome({
        patientId,

        symptomes
    });



    await newSymptomes.save();


    res.json({
        success: true,
        patient: { nom: patient.nom, prenom: patient.prenom },
        AjoutSymp: { symptomes: newSymptomes.symptomes },
        message: "Vos symptomes sont enregistrés!"
    });
};


exports.voirSymp = async (req, res) => {



    const { id } = req.params


    try {
        const sym = await Symptome.find({ patientId: id }).sort({ createdAt: -1 })

        res.send(sym)



    } catch (error) {
        console.log(error)
    }

};


exports.VoirPatients = async (req, res) => {
    try {
        await Patient.find({})
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

}


exports.saveReveil = async (req, res) => {
    const { calendrierId, jour, mois, annee, heure, minute, mood } = req.body;


    if (!isValidObjectId(calendrierId)) return sendError(res, 'cal id invalide!');


    const cal = await Calendrier.findById(calendrierId);
    if (!cal) return sendError(res, 'cal non trouvé!');

    if (!jour.trim() || !mois.trim() || !annee.trim()) return sendError(res, "Date manquante!");
    if (!heure.trim() || !minute.trim()) return sendError(res, "Heure manquante!");


    const newReveil = new Reveil({
        calendrierId,
        jour,
        mois,
        annee,

        heure,
        minute,
        mood
    });



    await newReveil.save();
    const calendrier = await Calendrier.findById(calendrierId);
    const patient = await PatientH.findById(calendrier.patientId);

    res.json({
        success: true,
        patient: { prenom: patient.prenom, nom: patient.nom },
        reveil: { jour: newReveil.jour, mois: newReveil.mois, annee: newReveil.annee, heure: newReveil.heure, minute: newReveil.minute, mood: newReveil.mood },
        message: "Reveil est enregistré!"
    });
};
exports.saveCoucher = async (req, res) => {
    const { calendrierId, jour,
        mois,
        annee,

        heure,
        minute, mood } = req.body;


    if (!isValidObjectId(calendrierId)) return sendError(res, 'cal id invalide!');

    const cal = await Calendrier.findById(calendrierId);
    if (!cal) return sendError(res, 'cal non trouvé!');

    if (!jour.trim() || !mois.trim() || !annee.trim()) return sendError(res, "Date manquante!");
    if (!heure.trim() || !minute.trim()) return sendError(res, "Heure manquante!");



    const newCoucher = new Coucher({
        calendrierId,
        jour,
        mois,
        annee,

        heure,
        minute,
        mood
    });



    await newCoucher.save();

    const patient = await PatientH.findById(cal.patientId);

    res.json({
        success: true,
        patient: { prenom: patient.prenom, nom: patient.nom },
        Coucher: { jour: newCoucher.jour, mois: newCoucher.mois, annee: newCoucher.annee, heure: newCoucher.heure, minute: newCoucher.minute, mood: newCoucher.mood },
        message: "Coucher est enregistré!"
    });
};



exports.saveCalendrier = async (req, res) => {
    const { patientId, jourd, moisd, anneed } = req.body;


    if (!isValidObjectId(patientId)) return sendError(res, 'patient id invalide!');

    const patient = await PatientH.findById(patientId);
    if (!patient) return sendError(res, 'Patient non trouvé!');

    if (!jourd.trim() || !moisd.trim() || !anneed.trim()) return sendError(res, "Date manquante!");



    const newCalendrier = new Calendrier({
        patientId,
        jourd, moisd, anneed

    });



    await newCalendrier.save();


    res.json({
        success: true,
        patient: { prenom: patient.prenom, nom: patient.nom },
        calendrier: { _id: newCalendrier._id, jourd: newCalendrier.jourd, moisd: newCalendrier.moisd, anneed: newCalendrier.anneed, patientId: newCalendrier.patientId },
        message: "Calendrier ajoutée!"
    });
};

exports.saveBoisson = async (req, res) => {
    const { calendrierId, jour, mois, annee, heure, minute, volume, type } = req.body;


    if (!isValidObjectId(calendrierId)) return sendError(res, 'cal id invalide!');

    const cal = await Calendrier.findById(calendrierId);
    if (!cal) return sendError(res, 'cal non trouvé!');


    if (!jour.trim() || !mois.trim() || !annee.trim()) return sendError(res, "Date manquante!");
    if (!heure.trim() || !minute.trim()) return sendError(res, "Heure manquante!");
    if (!type.trim()) return sendError(res, "Type manquant!");


    const newBoisson = new Boisson({
        calendrierId,
        jour, mois, annee, heure, minute,
        volume,
        type
    });



    await newBoisson.save();

    const patient = await PatientH.findById(cal.patientId);

    res.json({
        success: true,
        patient: { prenom: patient.prenom, nom: patient.nom },
        Boisson: { date: newBoisson.date, heure: newBoisson.heure, volume: newBoisson.volume, type: newBoisson.type },
        message: "Boisson est enregistré!"
    });
};

exports.saveProtection = async (req, res) => {
    const { calendrierId, jour, mois, annee, heure, minute, poids } = req.body;

    if (!isValidObjectId(calendrierId)) return sendError(res, 'cal id invalide!');
    const cal = await Calendrier.findById(calendrierId);
    if (!cal) return sendError(res, 'cal non trouvé!');

    if (!jour.trim() || !mois.trim() || !annee.trim()) return sendError(res, "Date manquante!");
    if (!heure.trim() || !minute.trim()) return sendError(res, "Heure manquante!");
    if (!poids.trim()) return sendError(res, "Poids manquant!");

    const newProtection = new Protection({
        calendrierId,
        jour, mois, annee, heure, minute,
        poids

    });



    await newProtection.save();
    const patient = await PatientH.findById(cal.patientId);

    res.json({
        success: true,
        patient: { prenom: patient.prenom, nom: patient.nom },
        Protection: { date: newProtection.date, heure: newProtection.heure, poids: newProtection.poids },
        message: "Protection enregistrée!"
    });
};

exports.saveToilette = async (req, res) => {

    const { calendrierId, jour, mois, annee, heure, minute, volume, accident, besoin } = req.body;

    if (!isValidObjectId(calendrierId)) return sendError(res, 'cal id invalide!');

    if (!jour.trim() || !mois.trim() || !annee.trim()) return sendError(res, "Date manquante!");
    if (!heure.trim() || !minute.trim()) return sendError(res, "Heure manquante!");
    if (!accident.trim()) return sendError(res, "Fuite manquante!");
    const cal = await Calendrier.findById(calendrierId);
    if (!cal) return sendError(res, 'cal non trouvé!');

    const newToilette = new Toilette({
        calendrierId,
        jour,
        mois,
        annee,
        heure,
        minute,
        volume,
        accident,
        besoin

    });



    await newToilette.save();

    const patient = await PatientH.findById(cal.patientId);

    res.json({
        success: true,
        patient: { prenom: patient.prenom, nom: patient.nom },
        Protection: { date: newToilette.date, heure: newToilette.heure, volume: newToilette.volume, accident: newToilette.accident, besoin: newToilette.besoin },
        message: "Toilette enregistrée!"
    });
};


/* exports.calendrierEncours = async ( req, res) => {
        
    
        if(!isValidObjectId(calendrierId)) return sendError(res,'cal id invalide!');
        
        now  =  new Date();
        
        const cal =  Calendrier.findOne({date : moment.})
        if(cal) return sendError(res,'Un calendrier est déjà en cours!');
    
      
    
       
    
        
       
        const patient = await Patient.findById(cal.patientId);
    
        res.json({
            success: true,
            patient: {prenom: patient.prenom,nom: patient.nom},
            calendrier : {date: cal.date , id : cal._id , patientId:patient._id},
           
         });
    };
     */



exports.VerifyCal = async (req, res) => {
    const { patientId } = req.body;
    try {

        const data = await Calendrier.find({ patientId })


    } catch (error) {
        console.log(error)
    }

}


exports.ViewCalendrier = async (req, res) => {
    const { id } = req.params


    try {
        const cal = await Calendrier.find({ patientId: id }).sort({ createdAt: -1 })

        res.send(cal)



    } catch (error) {
        console.log(error)
    }

}

exports.Voirrev = async (req, res) => {
    const { id } = req.params


    try {
        const cal = await Reveil.find({ calendrierId: id }).then(result => {

            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }

}

exports.Voircou = async (req, res) => {
    const { id } = req.params


    try {
        const cal = await Coucher.find({ calendrierId: id }).then(result => {

            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }

}
exports.Voirboi = async (req, res) => {
    const { id } = req.params


    try {
        const cal = await Boisson.find({ calendrierId: id }).then(result => {

            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }

}
exports.Voirpro = async (req, res) => {
    const { id } = req.params


    try {
        const cal = await Protection.find({ calendrierId: id }).then(result => {

            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }

}
exports.Voirtoi = async (req, res) => {
    const { id } = req.params


    try {
        const cal = await Toilette.find({ calendrierId: id }).then(result => {

            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }

}

exports.deleterev = async (req, res) => {
    const { id } = req.body;
    const rev = await Reveil.findById(id);
    const cal = await Calendrier.findById(rev.calendrierId);


    try {
        await Reveil.findByIdAndDelete(id)
        await Reveil.find({ calendrierId: cal._id }).then(result => {

            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }


}



exports.afficherpatient = async (req, res) => {

    try {
        await Patient.find().sort({ createdAt: -1 })
            .then(result => {
                res.send(result)
            })
    } catch (error) {
        console.log(error)
    }

}
exports.InfoPatient = (req, res) => {



    Patient.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id unknown' + err);

    }

    ).select('-password')
};


exports.affecter = async (req, res) => {
    const { email1, email2 } = req.body
    console.log(email1)



    const patient = await Patient.findOne({ email: email1 })
    const hopital = await Hopital.findOne({ email: email2 })
    if (!patient) return sendError(res, 'patient non trouvé!');
    if (!hopital) return sendError(res, 'hopital non trouvé!');
    const newpatient = new PatientH({
        nom: patient.nom,
        prenom: patient.prenom,

        email: patient.email,
        hopitalId: hopital._id,
        motdepasse: patient.password,
        date_naissance: patient.date_naissance,
        adresse: patient.adresse,

        telephone: patient.phone
        , genre: patient.genre,
        type: patient.type


    });
    await newpatient.save();
    newpatient.type = 2
    await newpatient.save();
    await Patient.findOneAndDelete({ email: email1 })

    res.send(newpatient)
    mailTransport().sendMail({
        from: 'FYSALIverification@noreply.com',
        to: email2,
        subject: "Addition d'un nouveau patient ",
        html: ajoutEmail(hopital.nom, email1)


    });
}
exports.saveQuiz = async (req, res) => {
    const { jourd, moisd, anneed } = req.body;
    const patientId = req.params.id;
    console.log(req.params)

    // if(!message.trim() ) return sendError(res, "Message ou symptomes manquant!");

    if (!isValidObjectId(patientId)) return sendError(res, 'patient id invalide!');


    const patient = await PatientH.findById(patientId);
    if (!patient) return sendError(res, 'Patient non trouvé!');

    const newQuiz = new Quiz({
        patientId: patientId, jourd: jourd, moisd: moisd, anneed: anneed


    });



    await newQuiz.save();



    res.json({
        success: true,
        quiz: newQuiz,
        message: "Quiz ajoutée!"
    });
};
exports.saveQuestionnaire1 = async (req, res) => {
    const { score } = req.body;
    const quizId = req.params.id;
    console.log(req.params)

    // if(!message.trim() ) return sendError(res, "Message ou symptomes manquant!");

    if (!isValidObjectId(quizId)) return sendError(res, 'quiz id invalide!');


    const quiz = await Quiz.findById(quizId);
    if (!quiz) return sendError(res, 'Quiz non trouvé!');

    const newQuestionnaire = new Questionnaire({
        score: score,


    });




    await newQuestionnaire.save();


    quiz.IdQuest1 = newQuestionnaire._id;// bach n7ot l id mta3 l questionnaire 1 l quiz li 3amertou 


    await quiz.save();// pour l'enregistrer dans la base de donnee



    res.json({
        success: true,
        quiz: quiz,
        message: "Score ajoutée!"
    });
};
exports.saveQuestionnaire2 = async (req, res) => {
    const { score } = req.body;
    const quizId = req.params.id;
    console.log(req.params)

    // if(!message.trim() ) return sendError(res, "Message ou symptomes manquant!");

    if (!isValidObjectId(quizId)) return sendError(res, 'quiz id invalide!');


    const quiz = await Quiz.findById(quizId);
    if (!quiz) return sendError(res, 'Quiz non trouvé!');

    const newQuestionnaire = new Questionnaire({
        score: score,


    });




    await newQuestionnaire.save();


    quiz.IdQuest2 = newQuestionnaire._id;// bach n7ot l id mta3 l questionnaire 1 l quiz li 3amertou 


    await quiz.save();// pour l'enregistrer dans la base de donnee



    res.json({
        success: true,
        quiz: quiz,
        message: "Score ajoutée!"
    });
};
exports.saveQuestionnaire3 = async (req, res) => {
    const { score } = req.body;
    const quizId = req.params.id;
    console.log(req.params)

    // if(!message.trim() ) return sendError(res, "Message ou symptomes manquant!");

    if (!isValidObjectId(quizId)) return sendError(res, 'quiz id invalide!');


    const quiz = await Quiz.findById(quizId);
    if (!quiz) return sendError(res, 'Quiz non trouvé!');

    const newQuestionnaire = new Questionnaire({
        score: score,


    });




    await newQuestionnaire.save();


    quiz.IdQuest3 = newQuestionnaire._id;// bach n7ot l id mta3 l questionnaire 1 l quiz li 3amertou 


    await quiz.save();// pour l'enregistrer dans la base de donnee



    res.json({
        success: true,
        quiz: quiz,
        message: "Score ajoutée!"
    });
};

exports.VerifySc = async (req, res) => {
    const { patientId } = req.body;
    try {

        const data = await Score.find({ patientId })


    } catch (error) {
        console.log(error)
    }

}
exports.ViewScore = async (req, res) => {
    const { id } = req.params


    try {
        const sco = await Quiz.find({ patientId: id }).populate("IdQuest1").populate("IdQuest2").populate("IdQuest3").sort({ createdAt: -1 })

        res.send(sco)



    } catch (error) {
        console.log(error)
    }

}

exports.ViewQuest = async (req, res) => {
    const { id } = req.params


    try {
        const viewQuest = await Questionnaire.findById(id).sort({ createdAt: -1 })

        res.send(viewQuest)



    } catch (error) {
        console.log(error)
    }
}
