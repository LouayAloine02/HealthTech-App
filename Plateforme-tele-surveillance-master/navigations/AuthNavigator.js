/* eslint-disable prettier/prettier */
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inscription from "../src/inscription";
import Login from "../src/Login";
import ForgetPassword from "../src/ForgetPassword";
import Verification from "../src/verification";
import AccueilPatient from "../src/accueilPatient";

import Calendrier from "../src/Calendrier"
import AjouterCalendrier from "../src/ajoutercalendrier";
import Reveiller from "../src/reveiller";
import Coucher from "../src/coucher";
import Toilette from "../src/toilette";
import Boisson from "../src/boisson";
import Symptomes from '../src/symptomes';
import Symptomes_Med from '../src/symptomes_Med';
import Protection from "../src/protection";
import ViewSymptomes from "../src/viewSymptomes";
import Onboarding from "../src/Onboarding";
import ProfilePatient_Med from "../src/ProfilePatient_Med";
import ProfilePatient from "../src/ProfilPatient";
import NewCalendrier from "../src/newCalendrier";
import VoirCalendrier from "../src/voirCalendrier";
import DetailCalendrier from "../src/detailCalendrier";
import FlatButton from "../src/Button";
import Questionnaire from "../src/Questionnaire"

import Calendrier_Med from "../src/Calendrier_Med"
import Hopital from '../src/HopitalWelcome';
import AjouterAdmin from '../src/ajouterAdmin';
import LoginAdmin from '../src/LoginAdmin';
import LoginPatient from '../src/LoginPatient';
import LoginMedecin from '../src/LoginMedecin';
import InscriptionMedecin from '../src/inscriptionMedecin';
import Doctor from '../src/DoctorWelcome';
import Medecin from '../src/MedecinWelcome';
import ListeAdmin from '../src/ListeAdmins'
import Listedespatients from '../src/ListeDesPatients'
import ListeMedecins from '../src/ListeMedecins';
import ListePatients from '../src/ListePatients';
import Admin from '../src/AdminWelcome'
import ProfilePatient1 from '../src/ProfilePatient1';
import Répartition from '../src/repartition';
import UpdateAdmin from '../src/updateAdmin';
import Accueil from '../src/Accueil';
import MessagesScreen from '../src/MessageScreens';
import ProfileHopital from '../src/ProfileHopital';
import ProfileAdmin1 from '../src/ProfileAdmin1';
import VerificationAdmin from '../src/verificationadmin'
import VerificationMedecin from '../src/verificationmedecin'

import VerificationHopital from '../src/verificationhopital'
import AjouterHopital from '../src/ajouterHopital';
import AjouterPatient from '../src/ajouterPatient';
import AjouterMedecinH from '../src/ajoutermedecinH';
import AjouterPatientH from '../src/ajouterpatientH';
import ListeHopital from '../src/ListeHopital';
import ProfileAdmin from '../src/ProfileAdmin';
import ChatScreen from '../src/ChatScreens';
import ProfileMedecinH from '../src/ProfileMedecinH';
import ProfileMedecin from '../src/ProfileMedecin';
import AccueilPatientH from '../src/accueilPatientH';
import ProfileHopital1 from '../src/ProfileHopital1';
import ListePatients1 from '../src/ListePatients1';
import ProfilePatient2 from '../src/ProfilePatient2';

import RépartitionPH from '../src/repartitionpatient_hopital';
import ProfileHopital0 from '../src/ProfileHopital0';
import ListeMedecins1 from '../src/ListeMedecins1';
import ProfilePatient3 from '../src/ProfilePatient3';
import ProfileHopital3 from '../src/ProfileHopital3';
import Répartition0 from '../src/repartition0';
import Répartition1 from '../src/repartition1';
import UpdateHopital from '../src/updateHopital';
import AccueilPatientH_Med from "../src/accueilPatientH_Med";
import QuizSingleChoiceApp1 from '../src/Quizz1'
import QuizSingleChoiceApp2 from '../src/Quizz2'
import QuizSingleChoiceApp3 from '../src/Quizz3'
import RemarquesMedecin from '../src/RemarquesMedecin';
import RemarquesMedecin2 from '../src/RemarquesMedecin2';
import RemarquesMedecin3 from '../src/RemarquesMedecin3';
import PageQuiz from '../src/PageQuiz';
import NewQuiz from "../src/newDateVoirQuiz";
import ListeQuizParPatient from "../src/listeQuizParPatients"
import ListeQuiz from "../src/listeQuiz"
import ProfileMedecin2 from "../src/ProfileMedecin2"

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Onboarding" component={Onboarding} />
         <Stack.Screen name='Accueil' component={Accueil} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Inscription" component={Inscription} />
         <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
         <Stack.Screen name="Verification" component={Verification} />
         <Stack.Screen name="AccueilPatient" component={AccueilPatient} />

         <Stack.Screen name="Calendrier" component={Calendrier} />
         <Stack.Screen name="AjouterCalendrier" component={AjouterCalendrier} />
         <Stack.Screen name="NewCalendrier" component={NewCalendrier} />
         <Stack.Screen name="Reveiller" component={Reveiller} />
         <Stack.Screen name="Coucher" component={Coucher} />
         <Stack.Screen name="Toilette" component={Toilette} />
         <Stack.Screen name="Boisson" component={Boisson} />
         <Stack.Screen name="Protection" component={Protection} />
         <Stack.Screen name="Symptomes" component={Symptomes} />
         <Stack.Screen name="ViewSymptomes" component={ViewSymptomes} />
         <Stack.Screen name="VoirCalendrier" component={VoirCalendrier} />
         <Stack.Screen name="DetailCalendrier" component={DetailCalendrier} />

         <Stack.Screen name="Symptomes_Med" component={Symptomes_Med} />







         <Stack.Screen name='PageQuiz' component={PageQuiz} />
         <Stack.Screen name='QuizSingleChoiceApp1' component={QuizSingleChoiceApp1} />
         <Stack.Screen name='QuizSingleChoiceApp2' component={QuizSingleChoiceApp2} />
         <Stack.Screen name='QuizSingleChoiceApp3' component={QuizSingleChoiceApp3} />
         <Stack.Screen name='RemarquesMedecin3' component={RemarquesMedecin3} />
         <Stack.Screen name='RemarquesMedecin2' component={RemarquesMedecin2} />
         <Stack.Screen name='RemarquesMedecin' component={RemarquesMedecin} />

         <Stack.Screen name='LoginPatient' component={LoginPatient} />

         <Stack.Screen name='Questionnaire' component={Questionnaire} />




         <Stack.Screen name='FlatButton' component={FlatButton} />

         <Stack.Screen name='AjouterPatient' component={AjouterPatient} />



         <Stack.Screen name='ChatScreen' component={ChatScreen} />
         <Stack.Screen name='MessagesScreen' component={MessagesScreen} />





         <Stack.Screen name='AccueilPatientH' component={AccueilPatientH} />

         <Stack.Screen name='ProfileMedecinH' component={ProfileMedecinH} />


         <Stack.Screen name='ProfileHopital1' component={ProfileHopital1} />




         <Stack.Screen name='Doctor' component={Doctor} />
         <Stack.Screen name='Medecin' component={Medecin} />
         <Stack.Screen name='InscriptionMedecin' component={InscriptionMedecin} />
         <Stack.Screen name='LoginMedecin' component={LoginMedecin} />
         <Stack.Screen name='VerificationAdmin' component={VerificationAdmin} />
         <Stack.Screen name='VerificationMedecin' component={VerificationMedecin} />
         <Stack.Screen name='AjouterMedecinH' component={AjouterMedecinH} />
         <Stack.Screen name='AjouterPatientH' component={AjouterPatientH} />
         <Stack.Screen name='VerificationHopital' component={VerificationHopital} />

         <Stack.Screen name='ProfilePatient' component={ProfilePatient} />

         <Stack.Screen name='ProfileHopital' component={ProfileHopital} />
         <Stack.Screen name='ProfilePatient1' component={ProfilePatient1} />
         <Stack.Screen name='LoginAdmin' component={LoginAdmin} />
         <Stack.Screen name='AjouterHopital' component={AjouterHopital} />

         <Stack.Screen name='Hopital' component={Hopital} />
         <Stack.Screen name='AjouterAdmin' component={AjouterAdmin} />
         <Stack.Screen name='ListeHopital' component={ListeHopital} />
         <Stack.Screen name='UpdateAdmin' component={UpdateAdmin} />
         <Stack.Screen name='ProfileAdmin' component={ProfileAdmin} />
         <Stack.Screen name='ProfileAdmin1' component={ProfileAdmin1} />
         <Stack.Screen name='ListeAdmin' component={ListeAdmin} />
         <Stack.Screen name='Admin' component={Admin} />
         <Stack.Screen name='Répartition' component={Répartition} />
         <Stack.Screen name='ListeMedecins' component={ListeMedecins} />
         <Stack.Screen name='Listedespatients' component={Listedespatients} />
         <Stack.Screen name='ListePatients' component={ListePatients} />
         <Stack.Screen name='ProfilePatient_Med' component={ProfilePatient_Med} />
         <Stack.Screen name="ProfileMedecin" component={ProfileMedecin} />
         <Stack.Screen name="ListePatients1" component={ListePatients1} />
         <Stack.Screen name="ProfilePatient2" component={ProfilePatient2} />
         <Stack.Screen name="RépartitionPH" component={RépartitionPH} />
         <Stack.Screen name="ProfileHopital0" component={ProfileHopital0} />
         <Stack.Screen name="ListeMedecins1" component={ListeMedecins1} />
         <Stack.Screen name="ProfilePatient3" component={ProfilePatient3} />
         <Stack.Screen name="ProfileHopital3" component={ProfileHopital3} />
         <Stack.Screen name="Répartition0" component={Répartition0} />
         <Stack.Screen name="Répartition1" component={Répartition1} />
         <Stack.Screen name="UpdateHopital" component={UpdateHopital} />
         <Stack.Screen name="ProfileMedecin2" component={ProfileMedecin2} />

         <Stack.Screen name="AccueilPatientH_Med" component={AccueilPatientH_Med} />
         <Stack.Screen name="Calendrier_Med" component={Calendrier_Med} />
         <Stack.Screen name="NewQuiz" component={NewQuiz} />
         <Stack.Screen name="ListeQuizParPatient" component={ListeQuizParPatient} />
         <Stack.Screen name="ListeQuiz" component={ListeQuiz} />



      </Stack.Navigator>

   )
}

export default AuthNavigator;