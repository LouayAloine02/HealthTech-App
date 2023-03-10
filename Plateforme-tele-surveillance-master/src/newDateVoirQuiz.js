/* eslint-disable prettier/prettier */


import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from 'react-native';


import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import * as yup from 'yup';
import client from './utilsClient';
import { calend, quiz } from './utilsAuth';
import { scor } from './utilsAuth';
import { AppNotification, updateNotification } from './appNotifications';
import { StackActions } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import EmojiSelector from 'react-native-emoji-selector'




const initialValues = {
    date: '',
    mood: '',

}

const validationSchema = yup.object({
    date: yup.string().trim().required('Ajouter un date!'),
    mood: yup.string().trim().required('Ajouter un mood!'),


})
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const NewQuiz = ({ route, navigation }) => {
    const { profile } = route.params;

    const Jour = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
    const Mois = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const Annee = ["2022"]

    const Heure = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"]
    const Minute = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31",
        "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]

    const Mood = ["????", "????", "??????", "????"]

    //const { profile, calendrier } = route.params;

    var height = Dimensions.get('window').height;
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
    const [jourd, setjourd] = useState('')
    const [moisd, setmoisd] = useState('')
    const [anneed, setanneed] = useState('')



    //l fonction l t'hezk l liste de quiz l m3amrin lkol
    const handleQuiz = async () => {

        const res = await quiz(profile.id, jourd, moisd, anneed);
        // const e = JSON.stringify(res)

        // alert(e)
        // if(!res.success) return updateNotification(setMessage, res.error)
        // formikActions.resetForm()
        console.log(res.quiz)
        navigation.dispatch(
            StackActions.replace('PageQuiz', { profile: profile, quiz: res.quiz })
        )

    };


    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",

                fontFamily: 'Poppins-Regular'
            }]}>
                <ScrollView>
                    <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Image source={require('../images/home.png')} />

                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>


                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: '#3F3D56', padding: 10, marginTop: 15, fontWeight: 'bold' }}>Pr??ciser la date de consultation de questionnaire</Text>
                    </View>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleQuiz}
                    >



                        {() => {

                            return (<>

                                <View style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F9CAC8',
                                    width: 0.9 * width,
                                    height: 0.4 * height,
                                    padding: 20,
                                    paddingBottom: 22,
                                    borderRadius: 10,
                                    shadowOpacity: 80,

                                    elevation: 15,
                                    marginTop: 30,
                                }} >

                                    <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#3F3D56', textAlign: 'center', fontWeight: 'bold' }}>Date :</Text>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width / 27 }}>
                                            <SelectDropdown
                                                dropdownStyle={{ fontFamily: 'Poppins-Regular', borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, width: width / 5 }}
                                                buttonStyle={{ fontFamily: 'Poppins-Regular', borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, width: width / 5 }}

                                                data={Jour}
                                                defaultButtonText={'Jour'}
                                                onSelect={(selectedItem, index) => {
                                                    setjourd(selectedItem)
                                                }}

                                            />
                                            <SelectDropdown
                                                dropdownStyle={{ fontFamily: 'Poppins-Regular', borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, width: width / 5 }}
                                                buttonStyle={{ fontFamily: 'Poppins-Regular', borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, width: width / 5 }}

                                                data={Mois}
                                                defaultButtonText={'Mois'}
                                                onSelect={(selectedItem, index) => {
                                                    setmoisd(selectedItem)
                                                }}

                                            />
                                            <SelectDropdown
                                                dropdownStyle={{ fontFamily: 'Poppins-Regular', borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, width: width / 3 }}
                                                buttonStyle={{ fontFamily: 'Poppins-Regular', borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5, width: width / 3 }}

                                                data={Annee}
                                                defaultButtonText={'Ann??e'}
                                                onSelect={(selectedItem, index) => {
                                                    setanneed(selectedItem)
                                                }}

                                            />

                                        </View>


                                    </View>




                                    <View style={{ alignItems: 'center' }}>
                                        <Pressable onPress={handleQuiz}
                                            style={{
                                                fontFamily: 'Poppins-Regular',
                                                borderRadius: 20,
                                                paddingVertical: 14,
                                                paddingHorizontal: 10,
                                                backgroundColor: '#5B779F',
                                                width: 250,
                                            }}>

                                            <Text style={{
                                                color: 'white',


                                                fontSize: 16,
                                                textAlign: 'center',
                                                fontFamily: 'Poppins-Bold',
                                            }}>Sauvegarder
                                            </Text>
                                        </Pressable>

                                    </View>






                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 40 }}></View>
                            </>

                            )
                        }
                        }
                    </Formik>


                </ScrollView>
            </View>
        </>

    )
};
export default NewQuiz;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,

    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,

    },
    highlight: {

    },
    textSize: {
        textAlign: 'center',
        color: '#E3807B',

        fontSize: 25

    }
});