/* eslint-disable prettier/prettier */

/* eslint-disable react-hooks/exhaustive-deps */
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



const VoirCalendrier = ({ route, navigation }) => {
    const { profile } = route.params;
    const id = profile.id
    const [cal, setcal] = useState([])


    useEffect(() => {
        async function getAllpatients() {
            console.log(id)
            try {
                const cal = await axios.get(`http://192.168.100.198:5000/api/patient/voir-calendrier/${id}`)

                setcal(cal.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getAllpatients()
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
                        Calendriers de:
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
                            onPress={() => navigation.navigate("DetailCalendrier", { profile: profile, calId: item })}  >


                            <View key={item._id}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between',
                                }}

                            >

                                <Text style={{ fontSize: 15, color: '#5B779F', fontFamily: 'Poppins-Bold', textAlign: 'right', marginRight: 20 }} > Calendrier de: {item.jourd}/{item.moisd}/{item.anneed}</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("AjouterCalendrier", { profile: profile, calendrier: item })}
                                >

                                    <Icon
                                        size={30}
                                        color="#E3807B"
                                        name='add-circle'
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => navigation.navigate("DetailCalendrier", { profile: profile, calId: item })}
                                >

                                    <Icon
                                        size={30}
                                        color="#E3807B"
                                        name='chevron-forward-circle'
                                    />
                                </TouchableOpacity>


                            </View>
                        </TouchableOpacity>

                    )
                })}



            </View >
        </ScrollView >
    )





};
export default VoirCalendrier;

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


