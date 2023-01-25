/* eslint-disable prettier/prettier */

import  { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { TextInput } from 'react-native';

import SubmitButton from './submitButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import * as yup from 'yup';
import axios from "axios";
import {  signuphopital } from './utilsAuth';
import { Image } from "react-native";
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native'


const AjouterHopital

    = ({navigation,route}) => {
        const donnee = route.params;
        console.log(route.params)


        const initialValues = {
            nom: "",

           

            email: "",
adresse:"",
                  motdepasse: "",

            telephone: "",


        }

        const [message, setMessage] = useState({
            text: '',
            type: ''
        })

        const validationSchema = yup.object({
            //yup to validate 
            nom: yup.string().trim().required('Non is missing'),

            email: yup.string().trim().email('Invalid Email').required('Email is missing'),

            telephone: yup.string().trim().required('Telephone is missing'),

            adresse: yup.string().trim().required('Adresse is missing'),
            motdepasse: yup.string().trim().min(8, 'password is to short !').required('Mot de passe is missing'),

        })
        const handleCancel = async (formikActions) => {

            try {
                formikActions.resetForm()
                navigation.dispatch(
                    StackActions.replace('ListeAdmin')
                )
            } catch (error) {
                console.log("inconnu2")

            }
        }

        const handleSignup = async (values, formikActions) => {
            // const navigation = useNavigation () ;
            try {

                console.log("ok")
                const res = await signuphopital(values);

                  console.log(res)
                formikActions.setSubmitting(false);

                if (!res.success) return updateNotification(setMessage, res.error)
                formikActions.resetForm()
                navigation.dispatch(
                    StackActions.replace('VerificationHopital', { profile: res.Hopital , iduser:donnee })
                )






            } catch (error) {
                console.log("inconnu3")


            }


            // setTimeout(() => {
            //     console.log(values, formikActions)
            //     formikActions.resetForm();
            //     formikActions.setSubmitting(false);
            // }, 3000);

        }

        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;






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
                        {({}) => {

                            return (

                                <ScrollView>
                                    <View style={[{ flex: 0.8, backgroundColor: "#5B779F" }, { flexDirection: "row" }]} >
                                        <TouchableOpacity onPress={handleCancel}>
                                            <Image style={{ marginTop: height * 0.04, marginLeft: 10 }}
                                                source={require('../images/symb.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, marginLeft: 55, padding: 15 }} >
                                            Ajouter Hopital
                                        </Text>
                                    </View>
                                    <View style={{ flex: 8, backgroundColor: "#FFFFFF", margin: 15, borderRadius: 20, borderColor: '#3F3D56' }} >


                                        <View style={{ margin: 20 }}>

                                            <AddInput name='nom' placeholder="Entrer votre Nom" />


                                            <AddInput name='email' placeholder="Entrer votre Email" />
                                            <AddInput name='adresse' placeholder="Entrer votre adresse" />

                                            <AddInput secureTextEntry name='motdepasse' placeholder="Entrer votre Mot de passe" />

                                          
                                            <AddInput name='telephone' placeholder="Entrer votre Numéro de téléphone" />

                                        </View>

                                        <View style={{ alignItems: 'center' }}>
                                            <SubmitButton title="S'inscrire" />
                                        </View>







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

    }
});

export default AjouterHopital
    ;