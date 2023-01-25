/* eslint-disable prettier/prettier */


import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from 'react-native';
import { TextInput } from 'react-native';

import SubmitButton from './submitButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import * as yup from 'yup';
import client from './utilsClient';
import { signup, signupmedecin } from './utilsAuth';
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native'

const initialValues = {
    nomMed: "",

    prenomMed: "",

    date_naissance: "",


    email: "",

    password: "",

    passwordConfirmation: "",


    adresse: "",

    numTel: "",
    genre: "",

    specialite: "",

}

const validationSchema = yup.object({
    nomMed: yup.string().trim().required('Nom est vide'),
    prenomMed: yup.string().required('Prenom est vide'),
    date_naissance: yup.string().trim().required('date de naissance est vide '),

    email: yup.string().trim().email('Email invalide ').required('Email est vide '),

    password: yup.string().trim().required('Mot de passe est vide '),
    passwordConfirmation: yup.string().trim().min(8, 'mot de passe est très courte !').required('Mot de passe est vide '),

    adresse: yup.string().trim().required('Adresse est vide '),
    genre: yup.string().trim().required('Genre est vide '),

    numTel: yup.string().trim().required('Numero de téléphone est vide '),
    specialite: yup.string().trim().required('Spécialité est vide'),

})

const Inscription = () => {
    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('LoginMedecin')
    }
    const navigateToForgetpassword = () => {
        navigation.navigate('ForgetPassword')
    }

    var height = Dimensions.get('window').height;
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })

    const handleSignup = async (values, formikActions) => {
        console.log(values)
        const res = await signupmedecin(values);
        
        formikActions.setSubmitting(false);

        if (!res.success) return updateNotification(setMessage, res.error)
        formikActions.resetForm()
        navigation.dispatch(
            StackActions.replace('VerificationMedecin', { profile: res.medecin })
        )

    };


    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",
                backgroundColor: '#fff'
            }]}>
                <ScrollView>
                    <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Image source={require('../images/home.png')} />

            </TouchableOpacity> */}
                    </View>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSignup}
                    >



                        {() => {

                            return (
                                <View style={{ backgroundColor: "#FAE7E6", padding: 20, margin: 25, borderRadius: 20, borderColor: '#3F3D56' }} >
                                    <Text style={[styles.textSize]}>
                                        Inscrivez-vous

                                    </Text>
                                    <View style={{ margin: 20 }}>

                                        <AddInput name='nomMed' placeholder="Entrer votre Nom" />

                                        <AddInput name='prenomMed' placeholder="Entrer votre Prénom" />

                                        <AddInput name='email' placeholder="Entrer votre Emaill" />
                                        <AddInput name='genre' placeholder="Entrer votre Genre" />

                                        <AddInput secureTextEntry name='password' placeholder="Entrer votre Mot de passe" />

                                        <AddInput secureTextEntry name='passwordConfirmation' placeholder="Confirmer votre Mot de passe " />
                                        <AddInput name='adresse' placeholder="Entrer votre Adresse" />
                                        <AddInput name='date_naissance' placeholder="Entrer votre date de naissance" />
                                        <AddInput name='numTel' placeholder="Entrer votre Numéro de téléphone" />
                                        <AddInput name='specialite' placeholder="Entrer votre Specialite" />

                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <SubmitButton title="S'inscrire" />
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0.08 * height, alignItems: 'center' }} >

                                        <Pressable onPress={navigateToLogin}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E3807B' }}>Se connecter</Text>
                                        </Pressable>
                                        <Pressable onPress={navigateToForgetpassword}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E3807B' }}>Mot de passe oublié?</Text>
                                        </Pressable>
                                    </View>


                                </View>

                            )
                        }
                        }
                    </Formik>


                </ScrollView>
            </View>
        </>

    )
};
export default Inscription;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    textSize: {
        textAlign: 'center',
        color: '#E3807B',
        fontWeight: 'bold',
        fontSize: 25

    }
});







// /* eslint-disable prettier/prettier */
// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// // eslint-disable-next-line prettier/prettier
// import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Dimensions } from "react-native";
// import { TextInput } from "react-native";
// // eslint-disable-next-line prettier/prettier
// import { Button } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { Formik } from "formik";
// import * as yup from 'yup';
// import axios from "axios";
// import { AppNotification, updateNotification } from './appNotifications';
// import { StackActions } from '@react-navigation/native'
// import SubmitButton from './submitButton';
// import client from "./utilsClient";

// const InscriptionMedecin = ({ navigation }) => {
//     var height = Dimensions.get('window').height;

//     const navigateToLogin = () => {
//         navigation.navigate('LoginMedecin')
//     }
//     const navigateToForgetpassword = () => {
//         navigation.navigate('ForgetPassword')
//     }

//     const initialValues = {
//         nomMed: "",

//         prenomMed: "",

//         age: "",


//         email: "",

//         password: "",

//         passwordConfirmation: "",


//         adresse: "",

//         numTel: "",

//         specialite: "",


//     }

//     const validationSchema = yup.object({
//         nomMed: yup.string().trim().required('Nom est vide'),
//         prenomMed: yup.string().required('Prenom est vide'),
//         age: yup.string().trim().required('Age est vide '),

//         email: yup.string().trim().email('Email invalide ').required('Email est vide '),

//         password: yup.string().trim().required('Mot de passe est vide '),
//         passwordConfirmation: yup.string().trim().min(8, 'mot de passe est très courte !').required('Mot de passe est vide '),

//         adresse: yup.string().trim().required('Adresse est vide '),

//         numTel: yup.string().trim().required('Numero de téléphone est vide '),
//         specialite: yup.string().trim().required('Spécialité est vide'),

//     })

//     const [message, setMessage] = useState({
//         text: '',
//         type: ''
//     })
//     const handleSignup = async (values, formikActions,) => {

//         try {
//             console.log('ok')
//             const res = await client.post('medecin/ajouterMedecin', { ...values })
//             console.log('ça marche');
//             console.log(res.data);

//             formikActions.setSubmitting();

//             if (!res.success) return updateNotification(setMessage, res.error)
//             formikActions.resetForm()

//             navigation.navigate('VerificationMedecin',{ profile: res.medecin})

//         } catch (error) {
//             console.log('inconnu')
//         }



//     }


//     return (

//         <>
//             {message.text ? <AppNotification type={message.type} text={message.text} /> : null}

//             <View style={[styles.container, {
//                 // Try setting `flexDirection` to `"row"`.
//                 flexDirection: "column"
//             }]}>

//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSignup}
//                 >
//                     {({ errors, values, touched, handleSubmit, isSubmitting, handleBlur, handleChange }) => {
//                         // console.log(errors, values);
//                         const { nomMed, prenomMed, age, email, password, passwordConfirmation, adresse, numTel, specialite } = values;


//                         return (
//                             <ScrollView>
//                                 <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
//                                     <TouchableOpacity onPress={() => navigation.navigate('LoginMedecin')}>
//                                         <Image source={require('../images/home.png')} />

//                                     </TouchableOpacity>
//                                 </View>
//                                 <View style={{ flex: 8, backgroundColor: "#FAE7E6", padding: 18, margin: 15, borderRadius: 20, borderColor: '#3F3D56' }} >
//                                     <Text style={[styles.textSize]}>
//                                         Inscrivez-vous
//                                     </Text>
//                                     <View style={{ margin: 20 }}>
//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Nom</Text>
//                                         <TextInput value={nomMed} onBlur={handleBlur('nomMed')} onChangeText={handleChange('nomMed')} placeholder="Entrer votre Nom" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 5, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.nomMed && errors.nomMed ? errors.nomMed : ''}</Text>

//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Prénom</Text>
//                                         <TextInput value={prenomMed} onBlur={handleBlur('prenomMed')} onChangeText={handleChange('prenomMed')} placeholder="Entrer votre Prénom" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.prenomMed && errors.prenomMed ? errors.prenomMed : ''}</Text>

//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Age</Text>
//                                         <TextInput value={age} onBlur={handleBlur('age')} onChangeText={handleChange('age')} placeholder="Entrer votre age" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.age && errors.age ? errors.age : ''}</Text>

//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Email</Text>
//                                         <TextInput value={email} onBlur={handleBlur('email')} onChangeText={handleChange('email')} placeholder="Entrer votre email" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.email && errors.email ? errors.email : ''}</Text>

//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Mot de passe</Text>
//                                         <TextInput value={password} secureTextEntry onBlur={handleBlur('password')} onChangeText={handleChange('password')} placeholder="Entrer votre mot de passe" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.password && errors.password ? errors.password : ''}</Text>

//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Confirmer votre mot de passe</Text>
//                                         <TextInput value={passwordConfirmation} secureTextEntry onBlur={handleBlur('passwordConfirmation')} onChangeText={handleChange('passwordConfirmation')} placeholder="Confirmer votre mot de passe" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.passwordConfirmation && errors.passwordConfirmation ? errors.passwordConfirmation : ''}</Text>


//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Adresse</Text>
//                                         <TextInput value={adresse} onBlur={handleBlur('adresse')} onChangeText={handleChange('adresse')} placeholder="Entrer votre adresse" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.adresse && errors.adresse ? errors.adresse : ""}</Text>
//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Numéro de téléphone</Text>
//                                         <TextInput value={numTel} onBlur={handleBlur('numTel')} onChangeText={handleChange('numTel')} placeholder="Entrer votre numéro de téléphone" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.numTel && errors.numTel ? errors.numTel : ""}</Text>

//                                         <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Spécialité</Text>
//                                         <TextInput value={specialite} onBlur={handleBlur('specialite')} onChangeText={handleChange('specialite')} placeholder="Spécialité " style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 20, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
//                                         <Text style={{ color: "red", marginLeft: 23 }}>{touched.specialite && errors.specialite ? errors.specialite : ""}</Text>

//                                         <View style={{ alignItems: 'center' }}>
//                                             <SubmitButton title="S'inscrire" />
//                                         </View>

//                                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0.08 * height, alignItems: 'center' }} >

//                                             <Pressable onPress={navigateToLogin}>
//                                                 <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E3807B' }}>Se connecter</Text>
//                                             </Pressable>
//                                             <Pressable onPress={navigateToForgetpassword}>
//                                                 <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E3807B' }}>Mot de passe oublié?</Text>
//                                             </Pressable>
//                                         </View>
//                                     </View>



//                                 </View>
//                             </ScrollView>
//                         );
//                     }
//                     }
//                 </Formik>

//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,

//     },
//     textSize: {
//         textAlign: 'center',
//         color: '#E3807B',
//         fontWeight: 'bold',
//         fontSize: 25

//     }
// });

// export default InscriptionMedecin
//     ;