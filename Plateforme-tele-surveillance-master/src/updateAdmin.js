/* eslint-disable prettier/prettier */

import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { TextInput } from 'react-native';
import { useEffect } from 'react';
import SubmitButton from './submitButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import * as yup from 'yup';
import axios from "axios";
import { signinadmin, signupadmin } from './utilsAuth';
import { Image } from "react-native";
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native'
import { updateadmin } from './utilsAuth';


const UpdateAdmin

    = ({ route }) => {
        const navigation = useNavigation();
        const donnee = route.params;
        console.log(donnee)


        const [info, setInfo] = useState([])
        useEffect(() => {
            async function getAllInfoAdmin(id) {
                try {
                    console.log("hi")

                    const info = await axios.get(`http://192.168.100.198:5000/api/admin/profile/${id}`)
                    console.log("bye")

                    console.log(info.data.nom)
                    console.log(info.data)
                    setInfo(info.data)
                }
                catch (error) {
                    console.log("erreur")
                }
            }
            console.log(donnee)
            getAllInfoAdmin(donnee)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        const nom = info.nom
        const telephone = info.telephone
        const adresse = info.adresse
        const motdepasse = info.motdepasse
        const prenom = info.prenom
        const email = info.email
        const genre = info.genre
        console.log(telephone)


        const initialValues = {
            nom: `${nom}`,

            prenom: `${prenom}`,

            email: `${email}`,

            genre: `${genre}`,

            motdepasse: `${motdepasse}`,

            telephone: `${telephone}`,
            adresse: `${adresse}`


        }

        const [message, setMessage] = useState({
            text: '',
            type: ''
        })

        const validationSchema = yup.object({
            //yup to validate 
            nom: yup.string().trim().required('Non is missing'),
            prenom: yup.string().required('Prenom is missing'),

            email: yup.string().trim().email('Invalid Email').required('Email is missing'),

            telephone: yup.string().trim().required('Telephone is missing'),

            genre: yup.string().trim().required('Genre is missing'),
            motdepasse: yup.string().trim().min(8, 'password is to short !').required('Mot de passe is missing'),

        })
        const handleCancel = async (formikActions) => {

            try {
                formikActions.resetForm()
                navigation.dispatch(
                    StackActions.replace('ProfileAdmin', donnee)
                )
            } catch (error) {
                console.log("inconnu2")

            }
        }

        const handleSignup = async (values, formikActions) => {
            // const navigation = useNavigation () ;
            try {

                console.log("ok")
                const res = await updateadmin(values, donnee);

                console.log(res)
                formikActions.setSubmitting(false);

                if (!res.success) return updateNotification(setMessage, res.error)
                formikActions.resetForm()
                navigation.dispatch(
                    StackActions.replace('ProfileAdmin', donnee)
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
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={handleSignup}




                    >
                        {({ }) => {

                            return (

                                <ScrollView>
                                    <View style={[{ flex: 0.8, backgroundColor: "#5B779F" }, { flexDirection: "row" }]} >
                                        <TouchableOpacity onPress={handleCancel}>
                                            <Image style={{ marginTop: height * 0.04, marginLeft: 10 }}
                                                source={require('../images/symb.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, marginLeft: 55, padding: 15 }} >
                                            Modifier Admin
                                        </Text>
                                    </View>
                                    <View style={{ flex: 8, backgroundColor: "#FFFFFF", margin: 15, borderRadius: 20, borderColor: '#3F3D56' }} >


                                        <View style={{ margin: 20 }}>

                                            <AddInput name='nom' placeholder="Entrer votre Nom" />

                                            <AddInput name='prenom' placeholder="Entrer votre Prénom" />

                                            <AddInput name='email' placeholder="Entrer votre Email" />
                                            <AddInput name='genre' placeholder="Entrer votre genre" />

                                            {/* <View style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, backgroundColor: '#FFFFFF', borderRadius: 22, height: 50 }} >
                                                <RNPickerSelect onBlur={handleBlur('genre')}
                                                    placeholder={{
                                                        label: 'Selectionner votre genre...',

                                                        color: '#E3807B',
                                                    }}
                                                    // onChangeText={handleChange('genre')}
                                                    onValueChange={handleChange('genre')}
                                                    items={[
                                                        { label: 'Femme', value: 'Femme' },
                                                        { label: 'Homme', value: 'Homme' },

                                                    ]}
                                                />
                                            </View> */}

                                            <AddInput secureTextEntry name='motdepasse' placeholder="Entrer votre Mot de passe" />


                                            <AddInput name='telephone' placeholder="Entrer votre Numéro de téléphone" />
                                            <AddInput name='adresse' placeholder="Entrer votre Adresse" />

                                        </View>

                                        <View style={{ alignItems: 'center' }}>
                                            <SubmitButton title="Enregistrer" />
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

export default UpdateAdmin
    ;