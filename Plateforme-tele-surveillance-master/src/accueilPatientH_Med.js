/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native'
import axios from 'axios';


const AccueilPatientH_Med = ({ route }) => {
    const { profilePa, profileMed } = route.params;
    console.log(profilePa)

    const navigation = useNavigation();
    const [info, setInfo] = useState([])

    useEffect(() => {
        async function getAllInfoPatient(id) {
            try {
                console.log('ok')
                const info = await axios.get(`http://192.168.100.198:5000/api/patientH/profile/${profilePa._id}`)
                console.log(info)

                console.log(info.data)
                setInfo(info.data)
            }
            catch (error) {
                console.log("erreur ")
            }
        }

        getAllInfoPatient(profilePa._id)
        console.log('okk')
        console.log(info)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigateToLogin = () => {
        navigation.navigate('Accueil')
    };
    const navigateToProfile = () => {
        navigation.navigate('ProfilePatient_Med', { profilePa: profilePa, profileMed: profileMed })
    };
    const navigateToCalendrier = () => {
        navigation.navigate('Calendrier_Med', { profile: profilePa })
    };
    const navigateToSymp = () => {
        navigation.navigate('Symptomes_Med', { profile: profilePa })
    };
    const navigateToQst = () => {
        navigation.navigate('Questionnaire_Med', { profile: profilePa })
    };

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    return (
        <ScrollView>
            <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column"
            }]}>
                <View style={{ backgroundColor: '#5B779F' }} >
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 23, padding: 15, textAlign: 'center', marginLeft: 200 }}>
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, marginLeft: 15, marginTop: 20, color: '#3F3D56' }}>
                        Votre Patient:
                    </Text>
                    <Text style={{ fontSize: 30, marginLeft: 9, marginTop: 20, fontWeight: 'bold', marginRight: 15, color: '#3F3D56' }}>
                        {profilePa.nom}  {profilePa.prenom}
                    </Text>
                </View>


                <View style={{ flexDirection: 'row', marginBottom: 33, marginTop: 33 }}>

                    {/* <TouchableOpacity onPress={navigateToProfile} >
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.18 * height,
                            height: 0.18 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <Image source={require('../images/profile.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                            <Text style={{ marginTop: 5, fontWeight: 'bold', color: '#3F3D56' }}>Profile</Text>
                        </View>

                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={navigateToSymp}>
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.18 * height,
                            height: 0.18 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <Image source={require('../images/docteur.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                            <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Symptôme </Text>
                        </View>

                    </TouchableOpacity>


              

                    <TouchableOpacity onPress={navigateToCalendrier} style={{ alignItems: 'center' }} >
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.18 * height,
                            height: 0.18 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <View alignItems="center">
                                <Image source={require('../images/toilette.png')} style={{ width: 0.16 * height, height: 0.12 * height }} />
                                <Text style={{ color: '#3F3D56', fontWeight: 'bold' }}>Calendrier</Text>

                            </View>
                        </View>

                    </TouchableOpacity>



                </View>
                <View style={{ marginTop: 40 }}></View>


            </View >
        </ScrollView >
    )





};
export default AccueilPatientH_Med;

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

    },
    button: {

        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#E3807B',
        borderWidth: 2,

    }

});


