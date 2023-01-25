/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase, FlatList, Button } from 'react-native';
import { Dimensions } from "react-native";
import axios from 'axios'
// import baseURL from './api/medecin';
//const data = require('../assets/data/medecin.json')
const ProfileMedecin2 = ({ navigation, route }) => {
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
    const profile = route.params;
    const [medecin, setMedecin] = useState([]);

    useEffect(() => {
        async function getAllInfoMedecin(profile) {
            try {
                const info = await axios.get(`http://192.168.100.198:5000/api/medecin/profile/${profile}`)
                console.log(info.data)
                setMedecin(info.data)
            }
            catch (error) {
                console.log("error dans profil Medecin")
            }
        }
        getAllInfoMedecin(profile)
    }, [])

    const navigateToHome = () => {
        navigation.navigate('Doctor')
    };



    return (
        <View>

            <View style={{ padding: 10, width: width, backgroundColor: '#5B779F', height: 0.15 * height }}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Image style={{ marginTop: height * 0.04, marginLeft: 10 }}
                        source={require('../images/symb.png')} />
                </TouchableOpacity>

            </View>

            <View style={{ alignItems: 'center' }}>
                <Image source={require('../images/profileMedecin.png')} style={{
                    width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                    marginTop: -0.1 * height, borderColor: '#fff', borderWidth: 8
                }}></Image>

                <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 10, color: '#3F3D56' }}>Dr. {medecin.nomMed} {medecin.prenomMed}</Text>



                <Text style={{ fontSize: 15, color: '#3F3D56', marginBottom: 15 }}>{medecin.age}, Homme</Text>

            </View>
            <View style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: 0.9 * width,

                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,
            }}>
                <Image source={require('../images/address.png')}
                    style={{ width: 20, height: 20 }}></Image>
                <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10, textAlign: 'center' }}>{medecin.adresse}</Text>

            </View>
            <View style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: 0.9 * width,
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,
            }}>
                <Image source={require('../images/phone.png')}
                    style={{ width: 20, height: 20, }}></Image>
                <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10, textAlign: 'center' }}>{medecin.numTel}</Text>


            </View>
            <View style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: 0.9 * width,
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,
            }}>
                <Image source={require('../images/mail.png')}
                    style={{ width: 20, height: 20 }}></Image>
                <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10, textAlign: 'center' }}>{medecin.email}</Text>

            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>



            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}></View>


        </View>
    );


};
export default ProfileMedecin2;

