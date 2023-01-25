/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, Dimensions, Image, Pressable,TouchableOpacity } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import AddInput from "./addInput";
import SubmitButton from "./submitButton";
import * as yup from 'yup';
import { Formik } from 'formik';
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native'
import { signIn } from "./utilsAuth";


const LoginMedecin = ({ navigation }) => {
    const navigateToSignup = () => {
        navigation.navigate('InscriptionMedecin')
    }
    const navigateToForgetpassword = () => {
        navigation.navigate('ForgetPassword')
    }

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    const initialValues = {

        email: '',
        password: '',

    }

    const validationSchema = yup.object({

        email: yup.string().email('Email invalide').required('Ajouter un email!'),

        password: yup.string().trim().required('Ajouter un mot de passe!'),


    });
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
    const handleLogin = async (values, formikActions) => {
        const res = await signIn(values);
        formikActions.setSubmitting(false);

        if (res.success == true) {
            formikActions.resetForm()

            // updateNotification(setMessage, res.message, 'success')
            if (res.data.type == "medecin") {
                console.log(res.data.medecin.id)
                navigation.dispatch(
                    StackActions.replace('Doctor', res.data.medecin.id)
                )
            }
            else {
                console.log(res.data.medecinh.id)

                navigation.dispatch(
                    
                    StackActions.replace('Medecin', res.data.medecinh.id)
                )

            }
        }
        else return updateNotification(setMessage, res.error)

    }




    return (

        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}


            <View style={[styles.container, {
                // Try setting LoginDirection to "row".
                flexDirection: "column",
                backgroundColor: "#fff",

            }]}>
                <ScrollView>
                <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
            <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
                <Image source={require('../images/home.png')} />

            </TouchableOpacity>
        </View>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >



                        {() => {

                            return (
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ alignItems: 'center', backgroundColor: "#FAE7E6", width: 0.95 * width, height: 0.8 * height, marginTop: 0.05 * height, borderRadius: 20, borderColor: '#FAE7E6' }} >
                                        <View style={{ marginTop: height * 0.01, width: 0.9 * width, }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'poppins', color: "#E3807B", fontWeight: 'bold', fontSize: 24 }}>Bienvenue !</Text>

                                                <Image source={require('../images/Frame4.png')}  ></Image>
                                            </View>


                                            <View style={{ marginTop: 20 }}>
                                                <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: 'bold', color: '#3F3D56', fontSize: 15 }}>Adresse E-mail</Text>
                                                <AddInput name="email" placeholder="example@gmail.com" />

                                                <Text style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: 15, color: '#3F3D56' }}>Mot de passe</Text>
                                                <AddInput secureTextEntry name="password" placeholder="********" />


                                                <View style={{ alignItems: 'center' }}>
                                                    <SubmitButton title="Se connecter" />



                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >

                                                    <Pressable onPress={navigateToSignup}>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E3807B' }}>Nouveau compte</Text>
                                                    </Pressable>
                                                    <Pressable onPress={navigateToForgetpassword}>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#E3807B' }}>Mot de passe oublié?</Text>
                                                    </Pressable>


                                                </View>








                                            </View>


                                        </View>

                                    </View>

                                </View>
                            )
                        }
                        }
                    </Formik>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "Poppins-Regular",

    }
});

export default LoginMedecin;
