/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native'


const AjouterCalendrier = ({ route }) => {
    const { profile, calendrier } = route.params;
    const navigation = useNavigation();
    const navigateToRev = () => {
        navigation.navigate('Reveiller', { profile: profile, calendrier: calendrier })
    };
    const navigateToCoucher = () => {
        navigation.navigate('Coucher', { profile: profile, calendrier: calendrier })
    };
    const navigateToToilette = () => {
        navigation.navigate('Toilette', { profile: profile, calendrier: calendrier })
    };
    const navigateToBoisson = () => {
        navigation.navigate('Boisson', { profile: profile, calendrier: calendrier })
    };
    const navigateToProtection = () => {
        navigation.navigate('Protection', { profile: profile, calendrier: calendrier })
    };
    const navigateToLogin = () => {
        navigation.navigate('Login', { profile: profile, calendrier: calendrier })
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
                        <Text style={{ color: "#FFFFFF", fontFamily: "Poppins-Regular", fontSize: 18, padding: 15, textAlign: 'center', textAlign: 'right' }}>
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20, marginLeft: 15, marginTop: 20, color: '#3F3D56' }}>
                        Calendrier de
                    </Text>
                    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20, marginLeft: 9, marginTop: 20, marginRight: 15, color: '#3F3D56' }}>
                        {profile.nom} {profile.prenom}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, marginLeft: 15, marginTop: 10, color: '#3F3D56' }}>
                        Date du calendrier:
                    </Text>
                    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, marginLeft: 9, marginTop: 10, marginRight: 15, color: '#E3807B' }}>
                        {calendrier.jourd}/{calendrier.moisd}/{calendrier.anneed}
                    </Text>
                </View>



                <View style={{ flexDirection: 'row', marginBottom: 33, marginTop: 33 }}>

                    <TouchableOpacity onPress={navigateToRev}>
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.2 * height,
                            height: 0.2 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../images/reveiller.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                                <Text style={{ fontFamily: 'Poppins-Bold', marginTop: 5, color: '#3F3D56' }}>Se réveiller</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToCoucher}>
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.2 * height,
                            height: 0.2 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../images/coucher.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                                <Text style={{ fontFamily: 'Poppins-Bold', marginTop: 5, color: '#3F3D56' }}>Se coucher </Text>
                            </View>

                        </View>

                    </TouchableOpacity>


                </View>

                <View style={{ flexDirection: 'row', marginBottom: 33, }}>

                    <TouchableOpacity onPress={navigateToToilette} >
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.2 * height,
                            height: 0.2 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../images/toilette.png')} style={{ width: 0.16 * height, height: 0.12 * height }} />
                                <Text style={{ fontFamily: 'Poppins-Bold', marginTop: 5, color: '#3F3D56' }}>Toilette</Text>
                            </View>

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToProtection}>
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.2 * height,
                            height: 0.2 * height,
                            shadowColor: '#000000',
                            elevation: 10,
                            shadowOpacity: 80
                        }} >
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../images/protection.png')} style={{ width: 0.1 * height, height: 0.09 * height }} />
                                <Text style={{ fontFamily: 'Poppins-Bold', color: '#3F3D56', marginTop: 10 }}>Protection</Text>
                            </View>

                        </View>

                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={navigateToBoisson}>
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.2 * height,
                            height: 0.2 * height,
                            shadowColor: '#000000',
                            elevation: 10,
                            shadowOpacity: 80
                        }} >
                            <View style={{ alignItems: 'center' }}>
                                <Image source={require('../images/boisson.png')} style={{ width: 0.16 * height, height: 0.13 * height }} />
                                <Text style={{ fontFamily: 'Poppins-Bold', color: '#3F3D56' }}>Boisson</Text>
                            </View>

                        </View>

                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 50 }}></View>


            </View >
        </ScrollView >
    )





};
export default AjouterCalendrier;

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


