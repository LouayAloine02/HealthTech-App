/* eslint-disable prettier/prettier */

import React from "react";
import { StyleSheet, Text, View, Image, Span, TouchableOpacity } from "react-native";
import { TextInput, ScrollView, Dimensions, Pressable } from "react-native";
import { Button } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import { signinadmin } from "./utilsAuth";

import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native'
import AddInput from "./addInput";
import SubmitButton from "./submitButton";



const LoginAdmin = ({ navigation }) => {


    const navigateToForgetpassword = () => {
        navigation.navigate('ForgetPassword')
    }

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
    const initialValues = {

        email: '',
        password: '',

    }

    const validationSchema = yup.object({
        //yup to validate 

        email: yup.string().trim().email('Invalid Email').required('Ajouter un email '),


        motdepasse: yup.string().trim().min(8, 'mot de passe trop court !').required('Ajouter un mot de passe '),

    })



    const handleLogin = async (values, formikActions) => {

        const res = await signinadmin(values);
        formikActions.setSubmitting(false);
        console.log(res)
        if (res.success == true) {
            formikActions.resetForm()

            if (res.data.type == "admin") {
                navigation.dispatch(
                    StackActions.replace('Admin', res.data.user.id)
                )
            }
            else {
                navigation.dispatch(
                    StackActions.replace('Hopital', res.data.user.id)
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
                                                <AddInput secureTextEntry name="motdepasse" placeholder="********" />


                                                <View style={{ alignItems: 'center' }}>
                                                    <SubmitButton title="Se connecter" />



                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >


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

export default LoginAdmin;
