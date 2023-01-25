/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import FlatButton from '../src/Button';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';

const OnboardingItem = ({ item}) => {
    const navigation = useNavigation();
    const navigateToLogin = () => {
        navigation.navigate('Accueil')
    }
    const navigateToSignup = () => {
        navigation.navigate('Inscription')
    }
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />

            <View >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>


            </View>
            <TouchableOpacity 
        >
            <Icon
            size={45}
            color="#E3807B"
             name={item.name}
            />
        </TouchableOpacity>
            <FlatButton navigation={navigateToSignup} text='Rejoignez-nous' />
            <View style={{marginTop:10}}></View>
            <FlatButton navigation={navigateToLogin} text='Se connecter' />

        </View>
    );

};
export default OnboardingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        fontFamily: 'Poppins-Regular',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
        marginBottom: 20,

    },
    title: {
       
        fontSize: 20,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',

    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '300',
        textAlign: 'center',
        color: '#493d8a',
        paddingHorizontal: 64,
        marginBottom: 30,

    },

});