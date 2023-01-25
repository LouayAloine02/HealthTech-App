/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, Dimensions, Image,  Pressable } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import AddInput from "./addInput";
import SubmitButton from "./submitButton";
import * as yup from 'yup';
import { Formik } from 'formik';
import { signInpatient } from "./utilsAuth";
import {AppNotification, updateNotification } from './appNotifications';
import {StackActions} from '@react-navigation/native'



const Login = () => {
    const navigation = useNavigation();
    const navigateToSignup = () => {
        navigation.navigate('Inscription')
    }
    const navigateToForgetpassword = () => {
        navigation.navigate('ForgetPassword')
    }
   
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    const initialValues = {
       
        email: '',
        password: '',
        
    }
    
    const validationSchema = yup.object({
    
      email: yup.string().email('Email invalide').required('Ajouter un email!'),
    
      password: yup.string().trim().required('Ajouter un mot de passe!'),
     
     
    });

    const [message, setMessage] =useState({
        text:'',
        type:''
    });

    const handleLogin = async (values, formikActions) => {
        const res = await signInpatient(values);
        formikActions.setSubmitting(false);

        if (res.success == true) {
            formikActions.resetForm()

            // updateNotification(setMessage, res.message, 'success')
            if (res.data.type == "patient") {
                console.log(res.data.patient.id)
                navigation.dispatch(
                    StackActions.replace('AccueilPatient',{profile: res.data.patient})
                )
            }
            else {
                console.log(res.data.patienth.id)

                navigation.dispatch(
                    
                    StackActions.replace('AccueilPatientH', {profile: res.data.patienth})
                )

            }
        }
        else return updateNotification(setMessage, res.error)
    }
    
    
    return (

        <>
        {message.text ?<AppNotification type={message.type} text={message.text}/> : null }
       

        <View style={[styles.container, {
            // Try setting LoginDirection to "row".
            flexDirection: "column",
            backgroundColor: "#fff",
            fontFamily: 'Poppins-Regular',
            
        }]}>
            <ScrollView>
            <View style={{ backgroundColor: "#5B779F" ,width:width}} >
                <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, textAlign: 'center', padding: 15 }} >

                </Text>
            </View>
            
            <Formik
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handleLogin}
        >



            {()=>{
               
                return(
            <View style={{ alignItems:'center'}}>
            <View style={{ alignItems:'center', backgroundColor: "#FAE7E6", width: 0.95*width, height:0.8*height,marginTop:0.05*height, borderRadius: 20, borderColor: '#FAE7E6' }} >
                <View style={{ marginTop: height * 0.01,width:0.9*width,}}>
                <View style={{ alignItems:'center'}}>
                    <Text style={{color: "#E3807B", fontFamily: 'Poppins-Bold', fontSize: 24 }}>Bienvenue !</Text>

                    <Image source={require('../images/Frame4.png')}  ></Image>
                </View>


                    <View style={{ marginTop: 20}}>
                        <Text style={{  fontFamily: 'Poppins-Bold', color: '#3F3D56', fontSize: 15 }}>Adresse E-mail</Text>
                        <AddInput name="email" placeholder="example@gmail.com"/>
                        
                        <Text style={{  fontFamily: 'Poppins-Bold', fontSize: 15, color: '#3F3D56' }}>Mot de passe</Text>
                        <AddInput secureTextEntry name="password"  placeholder="********"/>
                        
                        
                        <View style={{ alignItems:'center'}}>
                        <SubmitButton title="Se connecter" />
                           
                        
                        
                           </View>
                           <View  style={{ flexDirection: 'row' , justifyContent:'space-between',alignItems:'center' }} >
                           
                           <Pressable onPress={navigateToSignup}>
                              <Text style={{fontSize:14 ,color:'#E3807B'}}>Nouveau compte</Text>
                           </Pressable>
                           <Pressable onPress={navigateToForgetpassword}>
                              <Text style={{fontSize:14, color:'#E3807B'}}>Mot de passe oublié?</Text>
                           </Pressable>
                         
                          
                        </View>
                      
                        
                        

                    

                       

                    </View>
                   

                </View>
            
            </View>

            </View>
             )}
            }
            </Formik>
            </ScrollView>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "Poppins-Regular",

    }
});

export default Login;
