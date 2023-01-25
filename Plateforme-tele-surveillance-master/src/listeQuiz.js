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

const ListeQuiz = ({ route, navigation }) => {
    const { profilePa } = route.params;
    const id = profilePa._id;

    const [Quiz, setQuiz] = useState([])


    useEffect(() => {
        async function getAllQuizs() {
            try {
                const Quiz = await axios.get(`http://192.168.100.198:5000/api/patient/afficher-score/${id}`)

                setQuiz(Quiz.data)
            }
            catch (error) {
                console.log('getquizerror', error)
            }
        }
        getAllQuizs()
    }, [])



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





                {Quiz.map((item) => {
                    { console.log(item.IdQuest1, item.IdQuest2, item.IdQuest3) }
                    { console.log(item) }
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ListeQuizParPatient', { qst: item })}
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

                            }}
                        >


                            <View

                                style={{ flexDirection: 'row' }}
                                key={item._id}                    >

                                <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'left', marginRight: 130 }} >
                                    a été rempli à:
                                    <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.jourd}/{item.moisd}/{item.anneed}</Text>
                                </Text>

                                <TouchableOpacity

                                >
                                    <Icon
                                        name="trash"
                                        size={30}
                                        color="#000"></Icon>
                                </TouchableOpacity>


                            </View>

                        </TouchableOpacity>
                    )
                })}













                <View style={{ flexDirection: 'row', marginTop: 50 }}></View>

            </ScrollView>
        </View >
    );


};
export default ListeQuiz;