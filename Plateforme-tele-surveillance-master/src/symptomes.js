/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AjouterSymptomes from './ajouterSymptomes';
import SubmitButton from './submitButton';
import AddInput from './addInput';
import * as yup from 'yup';
import { Formik } from 'formik';
import {AppNotification, updateNotification } from './appNotifications';
import { useNavigation } from '@react-navigation/core';
import {StackActions} from '@react-navigation/native'
import { ajoutSymp } from './utilsAuth';

const initialValues = {
    patientId: '',
    message:'',
    symptomes: [],
   
}

const validationSchema = yup.object({
 
 
})
var nb = 3;





const Symptomes = ({route}) => {
    const {profile} = route.params;
   

    
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    

    const [symptomes, setSymp] = useState([
        { text: 'Fièvre', id: 1 },
        { text: 'Douleur', id: 2 },
        { text: 'Miction excessive', id: 3 },
    ]);

   

    const deleteSymptome = (id) => {
        setSymp((prevSymp) => {
            return prevSymp.filter(Symp => Symp.id != id);
        });
    }
   

    const ajouterSymp = (text) => {
      
        setSymp((prevSymp) => {
            return [
                { text: text, id: (++nb).toString() },
                ...prevSymp
            ];
        });
    };
    const [mess, setMessage] = useState({
        text:'',
        type: ''
    })

    const navigation = useNavigation();
    const handleAjout = async (values,formikActions) => {
        
        const res = await ajoutSymp(profile.id,values,symptomes);
            formikActions.setSubmitting(false);

            if(!res.success) return updateNotification(setMessage, res.error)
            formikActions.resetForm()
            navigation.dispatch(
                StackActions.replace('ViewSymptomes',{symp: symptomes, profile: profile})
                
            )
            
       
    };


    return (<>
         {mess.text ?<AppNotification type={mess.type} text={mess.text}/> : null}
        <ScrollView nestedScrollEnabled={true}>
            <View style={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "column",
                fontFamily: 'Poppins-Regular',
                backgroundColor:"#fff"
              
            }]}>
                <View style={{ backgroundColor: '#5B779F', padding: 9, flexDirection: 'row' }} >
                    <TouchableOpacity onPress={() => navigation.navigate('Inscription')} style={{ marginTop: height * 0.01 }}>
                        <Image source={require('../images/home.png')} />


                    </TouchableOpacity>
                    <Text style={{ color: "#FFFFFF",  fontFamily: 'Poppins-Bold', fontSize: 25, padding: 10, marginLeft: width * 0.2 }}>
                        Symptômes
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 20, marginRight: 15 }}>
                        Vous pouvez signaler vos symptômes afin que votre médecin puisse les consulter.                
                    </Text>
                </View>
                <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleAjout}
                       >



            {()=>{
               
                return(
                    <>
              

                <View >
                    <View style={{ backgroundColor: "#FAE7E6", padding: 20, margin: 25, borderRadius: 20, borderColor: '#3F3D56', shadowRadius: 5 }} >
                    <AddInput name='message' placeholder="Bonjour docteur!" />
                    <ScrollView horizontal={true}>
                    <FlatList
                            numColumns={1}
                            keyExtractor={(item) => item.id}
                            data={symptomes}
                            renderItem={({ item }) => (
                                <View style={{ width: 220, height: 35, backgroundColor: '#E3807B', borderRadius: 18, marginBottom: 30, flexDirection: 'row' }}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 19, marginTop: 4, marginLeft: 20 }}>
                                        {item.text}
                                    </Text>
                                    <TouchableOpacity onPress={() => deleteSymptome(item.id)}>
                                        <Image source={require('../images/close.png')} style={{ margin: 4 }} />
                                    </TouchableOpacity>
                                </View>

                            )}
                        />
                    </ScrollView>

                        
                        

                        <View>
                            <AjouterSymptomes ajouterSymp={ajouterSymp} />
                        </View>
                        <View tyle={{alignItems:"center"}}>
                                <SubmitButton title="Envoyer"/>
                        </View>
                      

                        </View>


                </View>
                </>
                )}
            }
            </Formik>
            </View >
        </ScrollView >
        </>)

    


};
export default Symptomes;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    highlight: {
        fontFamily: 'Poppins-Light',
    },
    textSize: {
        textAlign: 'center',
        color: '#E3807B',
        fontFamily: 'Poppins-Bold',
        fontSize: 25

    }

});


