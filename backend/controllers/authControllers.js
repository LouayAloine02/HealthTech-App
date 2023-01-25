const Admin = require('../models/Admin');
const Hopital = require('../models/Hopital')
const VerificationToken = require('../models/verificationToken');
const Medecin = require ("../models/medecinModels")
const MedecinH = require ("../models/MedecinH")
const Patient = require ("../model/patient")
const PatientH = require("../models/PatientH")

const { sendError } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, planeEmailTemplate } = require("../utils/mail");
const { isValidObjectId } = require('mongoose');


exports.signin = async ( req, res) => {
    const {email, motdepasse} = req.body;
    if(!email.trim() || !motdepasse) return sendError(res, "Email ou mot de passe manquant!");

    const admin = await Admin.findOne({email});
    const hopital = await Hopital.findOne({email});

    if(admin) {

    const isMatched = await admin.comparePassword(motdepasse);
    if(!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({AdminId: admin._id},process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        type:"admin" ,
        user: {nom: admin.nom, prenom: admin.prenom, email: admin.email, id: admin._id, token},
     });
    }
    else if(hopital) {

        const isMatched = await hopital.comparePassword(motdepasse);
        if(!isMatched) return sendError(res, 'Mot de passe incorrect');
    
        const token = jwt.sign({AdminId: hopital._id},process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
    
        res.json({
            success: true,
            type:"hopital",
            user: {nom: hopital.nom, prenom: hopital.prenom, email: hopital.email, id: hopital._id, token},
         });
         
        }

        else {
            return sendError(res, 'vérifier votre mot de passe et votre adresse email  ');
        }
    
};



exports.signIn = async ( req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    console.log(password)
    console.log(email)
    // if(!email.trim() || !motdepasse) return sendError(res, "Email ou mot de passe manquant!");

    const medecinh = await MedecinH.findOne({email});
    const medecin = await Medecin.findOne({email});

    if(medecin) {

    const isMatched = await medecin.comparePassword(password);
    if(!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({medecinId: medecin._id},process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        type:"medecin" ,
        medecin: {nom: medecin.nom, prenom: medecin.prenom, email: medecin.email, id: medecin._id, token},
     });
    }
    else if(medecinh) {

        const isMatched = await medecinh.comparePassword(password);
        if(!isMatched) return sendError(res, 'Mot de passe incorrect');
    
        const token = jwt.sign({ medecinhopitalId: medecinh._id},process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
    
        res.json({
            success: true,
            type:"medecinh",
            medecinh: {nom: medecinh.nom, prenom: medecinh.prenom, email: medecinh.email, id: medecinh._id, token},
         });
         
        }

        else {
            return sendError(res, 'vérifier votre mot de passe et votre adresse email  ');
        }
    
};

exports.signInpatient = async ( req, res) => {
    const {email, motdepasse} = req.body;
    console.log(req.body)
    console.log(motdepasse)
    console.log(email)
    // if(!email.trim() || !motdepasse) return sendError(res, "Email ou mot de passe manquant!");

    const patienth = await PatientH.findOne({email});
    const patient = await Patient.findOne({email});

    if(patient) {

    const isMatched = await patient.comparePassword(motdepasse);
    if(!isMatched) return sendError(res, 'Mot de passe incorrect');

    const token = jwt.sign({patientId: patient._id},process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.json({
        success: true,
        type:"patient" ,
        patient: {nom: patient.nom, prenom: patient.prenom, email: patient.email,date: patient.date_naissance,phone: patient.phone, adresse: patient.adresse,genre: patient.genre,id: patient._id, token},
     });
    }
    else if(patienth) {

        const isMatched = await patienth.comparePassword(motdepasse);
        if(!isMatched) return sendError(res, 'Mot de passe incorrect');
    
        const token = jwt.sign({ patienthopitalId: patienth._id},process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
    
        res.json({
            success: true,
            type:"patienth",
            patienth: {nom: patienth.nom, prenom: patienth.prenom, email: patienth.email,date: patienth.date_naissance,phone: patienth.telephone, adresse: patienth.adresse,genre: patienth.genre,id: patienth._id, token},
         });
         
        }

        else {
            return sendError(res, 'vérifier votre mot de passe et votre adresse email  ');
        }
    
};