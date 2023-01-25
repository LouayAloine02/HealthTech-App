/* eslint-disable prettier/prettier */
import React from "react";
import * as yup from 'yup';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import SubmitButton from './submitButton';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native' ;
import { affecter } from './utilsAuth';


const Répartition = ({ navigation, route }) => {

    const {id,profile} = route.params;
    console.log(route.params)
    const email = profile.email
    const initialValues = {

        email1: `${email}`,
        email2: '',


    }
    const handleCancel = async (formikActions) => {

        try {
            // formikActions.resetForm()
            navigation.dispatch(
                StackActions.replace('Hopital', id)
            )
        } catch (error) {
            console.log("inconnu2")

        }
    }

    const handleAffecter = async (values, formikActions) => {
        const res = await affecter(values, id);
        formikActions.setSubmitting(false);
        if (!res.success) return updateNotification(setMessage, res.error)
        console.log("cccc")

        updateNotification(setMessage, res.message, 'success')
        navigation.dispatch(
            StackActions.replace('Hopital', id)
        )
        formikActions.resetForm()

    }

    const validationSchema = yup.object({

        email1: yup.string().email('Email patient invalide').required('Ajouter un email patient !'),
        email2: yup.string().email('Email médecin invalide').required('Ajouter un email médecin !'),




    });
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
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
                    enableReinitialize={true}

                    onSubmit={handleAffecter}
                >



                    {() => {

                        return (
                            <ScrollView>
                                <View style={[{ flex: 0.8, backgroundColor: "#5B779F" }, { flexDirection: "row" }]} >
                                    <TouchableOpacity onPress={handleCancel}>
                                        <Image style={{ marginTop: height * 0.04, marginLeft: 10 }}
                                            source={require('../images/symb.png')} />
                                    </TouchableOpacity>
                                    <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, marginLeft: 55, padding: 15 }} >
                                        Patient X Médecin
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20, marginLeft: 15,color: '#3F3D56', marginTop: 20 }}>
                                        Donnez à chaque patient le médecin  autorisé à le suivre:
                                    </Text>
                                </View>


                                <View style={{ marginTop: 20 ,padding:20}}>
                                    <Text style={{marginTop: 20, fontFamily: 'Poppins-Regular', fontWeight: 'bold', color: '#3F3D56', fontSize: 15 }}>Adresse E-mail Patient</Text>
                                    <AddInput name="email1" placeholder="example@gmail.com" />

                                    <Text style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: 15, color: '#3F3D56' }}>Adresse E-mail Médecin</Text>
                                    <AddInput name="email2" placeholder="example@gmail.com" />


                                    <View style={{ alignItems: 'center',marginTop: 20 }}>
                                        <SubmitButton title="Enregistrer" />



                                    </View>








                                </View>




                            </ScrollView>
                        )
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

export default Répartition;