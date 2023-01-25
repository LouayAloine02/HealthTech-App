/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
// eslint-disable-next-line prettier/prettier
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Dimensions } from "react-native";
import { TextInput } from "react-native";
// eslint-disable-next-line prettier/prettier
import { Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import medecin from "./api/baseURL";
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native'
// import SubmitButton from './submitButton';
// import Verification from "./Verification";
import ValueSlider from "./slider";
const RemarquesMedecin3 = ({ navigation, route }) => {
    const score1 = route.params.score

    var height = Dimensions.get('window').height;

    const navigateToLogin = () => {
        navigation.navigate('LoginMedecin')
    }
    const navigateToForgetpassword = () => {
        navigation.navigate('ForgetPassword')
    }

    const initialValues = {
        nomMed: "",

        prenomMed: "",

        age: "",


        email: "",

        password: "",

        passwordConfirmation: "",


        adresse: "",

        numTel: "",

        specialite: "",


    }

    const validationSchema = yup.object({
        nomMed: yup.string().trim().required('Nom est vide'),
        prenomMed: yup.string().required('Prenom est vide'),
        age: yup.string().trim().required('Age est vide '),

        email: yup.string().trim().email('Email invalide ').required('Email est vide '),

        password: yup.string().trim().required('Mot de passe est vide '),
        passwordConfirmation: yup.string().trim().min(8, 'mot de passe est très courte !').required('Mot de passe est vide '),

        adresse: yup.string().trim().required('Adresse est vide '),

        numTel: yup.string().trim().required('Numero de téléphone est vide '),
        specialite: yup.string().trim().required('Spécialité est vide'),

    })

    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
    const handleSignup = async (values, formikActions,) => {

        try {
            console.log('ok')
            const res = await medecin.post('/ajouterMedecin', { ...values })
            console.log('ça marche');
            console.log(res.data);

            formikActions.setSubmitting();

            if (!res.success) return updateNotification(setMessage, res.error)
            formikActions.resetForm()

            navigation.navigate('Verification', medecin)

        } catch (error) {
            console.log('inconnu')
        }



    }


    return (

        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}

            <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column"
            }]}>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    {({ errors, values, touched, handleSubmit, isSubmitting, handleBlur, handleChange }) => {
                        // console.log(errors, values);
                        const { nomMed, prenomMed, age, email, password, passwordConfirmation, adresse, numTel, specialite } = values;


                        return (
                            <ScrollView>
                                <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
                                    <TouchableOpacity onPress={() => navigation.navigate('LoginMedecin')}>
                                        <Image source={require('../images/home.png')} />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 8, backgroundColor: "#FAE7E6", padding: 18, margin: 15, borderRadius: 20, borderColor: '#E3807B', marginTop: 170, borderWidth: 2 }} >
                                    <Text style={{
                                        textAlign: 'center',
                                        color: '#E3807B',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        marginBottom: 50
                                    }}>
                                        SCORE « DYSURIE »</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../images/happ.png')} style={{
                                            width: 0.05 * height, height: 0.05 * height, borderRadius: 100,

                                        }}></Image>
                                        <Image source={require('../images/sadSmile.png')} style={{
                                            width: 0.05 * height, height: 0.05 * height, borderRadius: 100, marginLeft: 240

                                        }}></Image>

                                    </View>
                                    <ValueSlider score1={score1} />






                                </View>
                            </ScrollView>
                        );
                    }
                    }
                </Formik>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textSize: {
        textAlign: 'center',
        color: '#E3807B',
        fontWeight: 'bold',
        fontSize: 25

    }
});

export default RemarquesMedecin3
    ;