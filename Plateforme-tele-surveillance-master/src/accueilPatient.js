/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {StackActions} from '@react-navigation/native'


const AccueilPatient = ({route}) => {
    const {profile} = route.params;
    const navigation = useNavigation();
    
    const navigateToLogin = () => {
        navigation.navigate('Accueil')
    };
    const navigateToProfile = () => {
        navigation.navigate('ProfilPatient',{profile: profile})
    };
    const navigateToCalendrier = () => {
        navigation.navigate('Calendrier',{profile: profile})
    };
    const navigateToSymp = () => {
        navigation.navigate('Symptomes',{profile: profile})
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
                <View style={{ backgroundColor: '#5B779F' ,height:0.1*height}} >
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={{ color: "#FFFFFF", fontFamily: 'Poppins-Regular', fontSize: 18, padding: 15, textAlign: 'center', marginLeft: 200 }}>
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                    <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 20, color: '#3F3D56' }}>
                        Bonjour,
                    </Text>
                    <Text style={{ fontSize: 20, marginLeft: 9, marginTop: 20,  fontFamily: 'Poppins-Bold', marginRight: 15, color: '#3F3D56' }}>
                       {profile.nom} {profile.prenom}
                    </Text>
              
                    </View>
                    <TouchableOpacity >
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.8* width,
                            height: 0.15 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                           
                            <Text style={{ marginTop: 5, color: '#3F3D56',  fontFamily: 'Poppins-Bold' }}>Vous n'etes pas encore affecté à un hopital ou un medecin merci d'attendre! </Text>
                        </View>

                    </TouchableOpacity>

                 <View style={{ alignItems:'center', marginBottom: 33, marginTop: 33 }}>

                    <TouchableOpacity onPress={navigateToProfile} >
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.2* height,
                            height: 0.2 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <Image source={require('../images/profile.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                            <Text style={{ marginTop: 5,  fontFamily: 'Poppins-Bold', color: '#3F3D56' }}>Profile</Text>
                        </View>

                    </TouchableOpacity>
                   


                </View>

               
                <View style={{ flexDirection: 'row', marginTop: 50 }}></View>
               </View>
             
              
        </ScrollView >
    )





};
export default AccueilPatient;

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


