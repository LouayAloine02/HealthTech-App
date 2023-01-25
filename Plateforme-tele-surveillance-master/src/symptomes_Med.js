/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const Symptomes_Med = ({ route, navigation }) => {
    const { profile } = route.params;
    const id = profile._id
    const [cal, setcal] = useState([])


    useEffect(() => {
        async function getAllpatients() {
            console.log(id)
            try {
                const cal = await axios.get(`http://192.168.100.198:5000/api/patient/voir-sym/${id}`)

                setcal(cal.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getAllpatients()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigateToLogin = () => {
        navigation.navigate('Accueil')
    };

    const navigateToCalendrier = () => {
        navigation.navigate('Calendrier', { profile: profile })
    };


    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    return (
        <ScrollView>
            <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",
                fontFamily: 'Poppins-Regular',

            }]}>
                <View style={{ backgroundColor: '#5B779F' }} >
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={{ color: "#FFFFFF", fontFamily: 'Poppins-Regular', fontSize: 18, padding: 15, textAlign: 'center', marginLeft: 200 }}>
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 20, color: '#3F3D56' }}>
                        Symptomes de:
                    </Text>
                    <Text style={{ fontSize: 20, marginLeft: 9, marginTop: 20, fontFamily: 'Poppins-Bold', marginRight: 15, color: '#3F3D56' }}>
                        {profile.nom} {profile.prenom}
                    </Text>
                </View>



                {cal.map((item) => {
                    console.log(item)
                    {/* const hello = getAllInfoPatient(item.patientId) */ }
                    return (
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                width: 0.9 * width,
                                padding: 20,
                                paddingBottom: 22,
                                borderRadius: 10,
                                borderColor: '#E3807B',
                                borderWidth: 2,
                                shadowOpacity: 80,
                                elevation: 5,
                                marginTop: 10,

                            }}
                        >


                            <View key={item._id}
                                style={{
                                    flexDirection: 'column', justifyContent: 'space-between',
                                }}

                            >

                                <Text style={{ fontSize: 15, color: '#5B779F', fontFamily: 'Poppins-Bold', textAlign: 'left', marginRight: 20 }} >
                                    Symptomes:</Text>
                                <Text>Date: {item.date} </Text>
                                {item.symptomes.map((elem) => <Text> {elem.text} /</Text>)}







                            </View>
                        </TouchableOpacity>

                    )
                })}



            </View >
            <View style={{ marginTop: 30 }}></View>
        </ScrollView >
    )





};
export default Symptomes_Med;

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


