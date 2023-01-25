/* eslint-disable prettier/prettier */

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, Dimensions, Image,  Pressable } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import AddInput from "./addInput";
import SubmitButton from "./submitButton";
import * as yup from 'yup';
import { Formik } from 'formik';
import { forgetPassword } from "./utilsAuth";
import {AppNotification, updateNotification } from './appNotifications';
import {StackActions} from '@react-navigation/native'



const ForgetPassword = () => {
    const navigation = useNavigation();
    const navigateToSignup = () => {
        navigation.navigate('Inscription')
    }
    const navigateToLogin= () => {
        navigation.navigate('Login')
    }
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    const initialValues = {
       
        email: '',
       
        
    }
    
    const validationSchema = yup.object({
    
      email: yup.string().email('Email invalide').required('Ajouter un email!'),
    
  
     
     
    });
    const [message, setMessage] =useState({
        text:'',
        type:''
    })
    const handleForget = async (values, formikActions) => {
            const res = await forgetPassword(values.email);
            formikActions.setSubmitting(false);

            if(!res.success) return updateNotification(setMessage, res.error)
            formikActions.resetForm()
            updateNotification(setMessage, res.message,'success')
            console.log(res);
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
           onSubmit={handleForget}
        >



            {()=>{
               
                return(
            <View style={{ alignItems:'center'}}>
            <View style={{ alignItems:'center', backgroundColor: "#FAE7E6", width: 0.95*width, height:0.8*height,marginTop:0.05*height, borderRadius: 20, borderColor: '#FAE7E6' }} >
                <View style={{ marginTop: height * 0.01,width:0.9*width,}}>
                <View style={{ alignItems:'center'}}>
                    <Text style={{ fontFamily: 'poppins', color: "#E3807B", fontWeight: 'bold', fontSize: 24 }}>Mot de passe oublié !</Text>

                    <Image source={require('../images/logo.png')}  ></Image>
                </View>


                    <View style={{ marginTop: 20}}>
                        <Text style={{  fontFamily: 'Poppins-Regular', fontWeight: 'bold', color: '#3F3D56', fontSize: 15 }}>Adresse E-mail</Text>
                        <AddInput name="email" placeholder="example@gmail.com"/>
                        
                         
                        
                        <View style={{ alignItems:'center'}}>
                        <SubmitButton title="Envoyer un lien" />
                           
                        
                        
                           </View>
                           <View  style={{ flexDirection: 'row' , justifyContent:'space-between',alignItems:'center' }} >
                           
                           <Pressable onPress={navigateToSignup}>
                              <Text style={{fontSize:14,fontWeight:'bold' ,color:'#E3807B'}}>Nouveau compte</Text>
                           </Pressable>
                           <Pressable onPress={navigateToLogin}>
                              <Text style={{fontSize:14,fontWeight:'bold', color:'#E3807B'}}>J'ai déjà un compte!</Text>
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

export default ForgetPassword;
