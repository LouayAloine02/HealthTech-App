/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-dupe-keys */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/core';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { deleterev } from './utilsAuth';
import { StackActions } from '@react-navigation/native';


const ListeQuizParPatient = ({ route, navigation }) => {
    const { qst } = route.params;
    const qst1 = qst.IdQuest1
    const qst2 = qst.IdQuest2
    const qst3 = qst.IdQuest3


    const [List1, setList1] = useState([])
    // console.log('quest1', qst1)


    // useEffect(() => {
    //     async function getAllquest1() {
    //         try {
    //             const List1 = await axios.get(`http://192.168.100.198:5000/api/patient/afficher-questionnaire/${qst1}`)

    //             setList1(List1.data)

    //         }
    //         catch (error) {
    //             console.log(error)

    //         }
    //     }
    //     getAllquest1()
    // }, [])


    // const [List2, setList2] = useState([])
    // useEffect(() => {
    //     async function getAllquest2() {
    //         try {
    //             const List2 = await axios.get(`http://192.168.100.198:5000/api/patient/afficher-questionnaire/${quest2}`)

    //             setList2(List2.data)

    //         }
    //         catch (error) {

    //         }
    //     }
    //     getAllquest2()
    // }, [])


    // const [List3, setList3] = useState([])
    // useEffect(() => {
    //     async function getAllquest3() {
    //         try {
    //             const List3 = await axios.get(`http://192.168.100.198:5000/api/patient/afficher-questionnaire/${quest3}`)

    //             setList3(List3.data)

    //         }
    //         catch (error) {

    //         }
    //     }
    //     getAllquest3()
    // }, [])





    const navigateToLogin = () => {
        navigation.navigate('Accueil')
    };
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height

    return (
        <View style={{ fontFamily: 'Poppins-Regular', }}>
            <ScrollView>
                <View style={{ backgroundColor: '#5B779F', flexDirection: 'row', justifyContent: 'space-between', height: 0.1 * height }} >

                    <TouchableOpacity onPress={() => navigation.navigate('AccueilPatient')} style={{ marginTop: 20, marginLeft: 10 }} >
                        <Image source={require('../images/home.png')} style={{}} />


                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={{ color: "#FFFFFF", fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 20, textAlign: 'center', textAlign: 'right', marginRight: 10 }}>
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>






                <View style={{ marginTop: 90 }}>
                    <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'left' }} >

                    </Text>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFB0AC',
                            width: 0.9 * width,
                            padding: 20,
                            paddingBottom: 22,
                            borderRadius: 10,
                            shadowOpacity: 80,
                            elevation: 15,
                            marginTop: 10,
                            marginBottom: 15


                        }}
                    >


                        <View


                        >

                            <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'center', fontWeight: 'bold', marginBottom: 15 }} >
                                Questionnaire 1
                            </Text>
                            <View >
                                <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'left' }} >
                                    Score incontinence urinaire à l'effort :{qst1.score}
                                </Text>
                            </View>



                        </View>

                    </TouchableOpacity>



                    <TouchableOpacity

                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFB0AC',
                            width: 0.9 * width,
                            padding: 20,
                            paddingBottom: 22,
                            borderRadius: 10,
                            shadowOpacity: 80,
                            elevation: 15,
                            marginTop: 10,
                            marginBottom: 15

                        }}
                    >


                        <View

                        >

                            <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'center', fontWeight: 'bold', marginBottom: 15 }} >
                                Questionnaire 2
                            </Text>

                            <TouchableOpacity

                            >

                            </TouchableOpacity>


                        </View>
                        <View>
                            <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'left' }} >
                                Score hyperactvite vesicale :{qst2.score}
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFB0AC',
                            width: 0.9 * width,
                            padding: 20,
                            paddingBottom: 22,
                            borderRadius: 10,
                            shadowOpacity: 80,
                            elevation: 15,
                            marginTop: 10,
                            marginBottom: 15


                        }}
                    >


                        <View


                        >

                            <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'center', fontWeight: 'bold', marginBottom: 15 }} >
                                Questionnaire 3
                            </Text>

                            <TouchableOpacity

                            >

                            </TouchableOpacity>


                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'left', marginRight: 130 }} >
                                Score dysurie :{qst3.score}
                            </Text>
                        </View>
                    </TouchableOpacity>


                </View>


            </ScrollView>
        </View >
    );


};
export default ListeQuizParPatient;