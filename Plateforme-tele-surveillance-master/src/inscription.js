/* eslint-disable prettier/prettier */


import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from 'react-native';
import { TextInput } from 'react-native';

import SubmitButton from './submitButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import * as yup from 'yup';
import client from './utilsClient';
import { signup } from './utilsAuth';
import {AppNotification, updateNotification } from './appNotifications';
import {StackActions} from '@react-navigation/native';

const initialValues = {
    nom: '',
    prenom:'',
    email: '',
    password: '',
    password1:'',
    adresse: '',
    phone:'',
    date_naissance:''
}

const validationSchema = yup.object({
  nom: yup.string().trim().required('Ajouter un nom!'),
  prenom: yup.string().trim().required('Ajouter un prénom!'),
  email: yup.string().email('Email invalide').required('Ajouter un email!'),

  password: yup.string().trim().min(8,'Court mot de passe').max(20,'Long mot de passe').required('Ajouter un mot de passe!'),
  password1: yup.string().oneOf([yup.ref('password'), null],'Différents mots de passes'),
 
})

const Inscription = () => {
    const navigation = useNavigation();
    const navigateToLogin = () => {
        navigation.navigate('Login')
    }
    const navigateToForgetpassword = () => {
        navigation.navigate('ForgetPassword')
    }
  
    var height = Dimensions.get('window').height;
    const [message, setMessage] = useState({
        text:'',
        type: ''
    })

    const handleSignup = async (values, formikActions) => {

        const res = await signup(values);
            formikActions.setSubmitting(false);

            if(!res.success) return updateNotification(setMessage, res.error)
            formikActions.resetForm()
            navigation.dispatch(
                StackActions.replace('Verification',{profile: res.patient})
            )
       
    };


return(
    <>
    {message.text ?<AppNotification type={message.type} text={message.text}/> : null}
    <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column",
        backgroundColor:'#fff',
        fontFamily: 'Poppins-Regular'
    }]}>
        <ScrollView>
        <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Image source={require('../images/home.png')} />

            </TouchableOpacity>
        </View>
        
        <Formik
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handleSignup}
        >



            {()=>{
               
                return(
                <View style={{ backgroundColor: "#FAE7E6", padding: 20, margin: 25, borderRadius: 20, borderColor: '#3F3D56' }} >
            <Text style={[styles.textSize]}>
                Inscrivez-vous

            </Text>
            <View style={{ margin: 20 }}>
                
                <AddInput name='nom' placeholder="Entrer votre Nom" />
               
                <AddInput name='prenom' placeholder="Entrer votre Prénom"/>
                <AddInput name='genre' placeholder="Entrer votre genre"/>
         
                <AddInput name='email' placeholder="Entrer votre Emaill"/>
               
                <AddInput secureTextEntry name='password' placeholder="Entrer votre Mot de passe" />
              
                <AddInput secureTextEntry name='password1' placeholder="Confirmer votre Mot de passe " />
                <AddInput name='adresse' placeholder="Entrer votre Adresse" />
                <AddInput name='date_naissance' placeholder="Entrer votre Date de naissance" />
                <AddInput name='phone' placeholder="Entrer votre Numéro de téléphone" />

            </View>

            <View style={{alignItems:'center'}}>
               <SubmitButton title="S'inscrire" />
            </View>

            <View style={{ flexDirection: 'row' , justifyContent:'space-between', marginTop:0.08*height,alignItems:'center' }} >
                         
                         <Pressable onPress={navigateToLogin}>
                            <Text style={{fontSize:14,fontWeight:'bold', color:'#E3807B'}}>Se connecter</Text>
                         </Pressable>
                         <Pressable onPress={navigateToForgetpassword}>
                            <Text style={{fontSize:14,fontWeight:'bold' ,color:'#E3807B'}}>Mot de passe oublié?</Text>
                         </Pressable>
                      </View>
                  

        </View>
       
        )}
        }
        </Formik>

        
        </ScrollView>
    </View>
    </>

)};
export default Inscription;

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

    }
});


