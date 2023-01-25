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


const AccueilPatientH = ({ route }) => {
    const { profile } = route.params;
    console.log(profile)
    const navigation = useNavigation();
    const [info, setInfo] = useState([])

    useEffect(() => {
        async function getAllInfoPatient(id) {
            try {
                console.log('ok')
                const info = await axios.get(`http://192.168.100.198:5000/api/patientH/profile/${profile.id}`)
                console.log(info)

                console.log(info.data)
                setInfo(info.data)
            }
            catch (error) {
                console.log("erreur ")
            }
        }

        getAllInfoPatient(profile.id)
        console.log('okk')
        console.log(info)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigateToLogin = () => {
        navigation.navigate('Accueil')
    };
    const navigateToProfile = () => {
        navigation.navigate('ProfilePatient', { profile: profile })
    };
    const navigateToCalendrier = () => {
        navigation.navigate('Calendrier', { profile: profile })
    };
    const navigateToSymp = () => {
        navigation.navigate('Symptomes', { profile: profile })
    };
    const navigateToQuestionnaire = () => {
        navigation.navigate('Questionnaire', { profile: profile })
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
                        Bonjour,
                    </Text>
                    <Text style={{ fontSize: 30, marginLeft: 9, marginTop: 20, fontWeight: 'bold', marginRight: 15, color: '#3F3D56' }}>
                        {profile.nom} {profile.prenom}
                    </Text>
                </View>


                <View style={{ flexDirection: 'row', marginBottom: 33, marginTop: 33 }}>

                    <TouchableOpacity onPress={navigateToProfile} >
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

                    </TouchableOpacity>
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


                </View>

                <View style={{ flexDirection: 'row', }}>

                    <TouchableOpacity onPress={navigateToCalendrier} >
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
                    <TouchableOpacity onPress={navigateToQuestionnaire}>
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
                            elevation: 10,
                            shadowOpacity: 80
                        }} >
                            <Image source={require('../images/questionnaire.png')} style={{ width: 0.16 * height, height: 0.13 * height, marginRight: 34 }} />
                            <Text style={{ color: '#3F3D56', fontWeight: 'bold' }}>Questionnaire</Text>
                        </View>

                    </TouchableOpacity>


                </View>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileHopital1', { profile: info.hopitalId, id: profile._id })}>
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.3 * width,
                            paddingHorizontal: 10,
                            marginTop: 0,
                            marginBottom: 15,

                            backgroundColor: '#FAE7E6',
                            width: 0.18 * height,
                            height: 0.18 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <Image source={require('../images/détails.png')} style={{ width: 0.12 * height, height: 0.12 * height, marginTop: 6 }} />
                            <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Hopital</Text>
                        </View>
                        <View></View>

                    </TouchableOpacity>
                </View>


            </View >
        </ScrollView >
    )





};
export default AccueilPatientH;

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


