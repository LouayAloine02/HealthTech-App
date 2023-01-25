/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { Component, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { StackActions } from '@react-navigation/native'
import axios from 'axios';
const Doctor = ({ navigation, route }) => {
   const profile = route.params;

   const [info, setInfo] = useState([])

   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height


   const navigateToLogin = () => {
      navigation.navigate('Accueil')
   };
   const navigateToProfile = () => {
      navigation.navigate('ProfileMedecin2', profile)
   };
   useEffect(() => {
      async function getAllInfoMedecin(id) {
         try {
            console.log('ok')
            const info = await axios.get(`http://192.168.100.198:5000/api/medecin/profile/${id}`)
            console.log('aaa')

            console.log(info.data)
            setInfo(info.data)
         }
         catch (error) {
            console.log("erreur dans doctor welcome")
            console.log(error)
         }
      }

      getAllInfoMedecin(profile)
   }, [])

   return (
      <View>
         <ScrollView>
            <View style={{ padding: 10, width: width, backgroundColor: '#5B779F', height: 0.08 * height }}>
               <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 23, padding: 4, textAlign: 'center', marginLeft: 200 }}>
                     Déconnexion
                  </Text>
               </TouchableOpacity>

            </View>
            <View><Text style={{ marginLeft: 0.07 * width, fontSize: 25, fontWeight: 'bold', color: '#3F3D56', paddingTop: 14, marginTop: 15 }}>Bonjour, Dr.{info.nomMed}{info.prenomMed} </Text></View>




            <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: -22 }}>
               <TouchableOpacity onPress={navigateToProfile}>
                  <View style={{
                     borderRadius: 20,
                     paddingVertical: 14,
                     alignItems: 'center',
                     marginLeft: 0.09 * width,
                     paddingHorizontal: 10,
                     marginTop: 20,
                     backgroundColor: '#FAE7E6',
                     width: 0.22 * height,
                     height: 0.22 * height,
                     shadowColor: '#000000',
                     elevation: 20,
                     shadowOpacity: 80,
                  }} >
                     <Image source={require('../images/profile.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                     <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Profile</Text>
                  </View>

               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Listedespatients', { id: profile.id, hopitalId: profile.hopitalId })}>
                  <View style={{
                     borderRadius: 20,
                     paddingVertical: 14,
                     alignItems: 'center',
                     marginLeft: 0.09 * width,
                     paddingHorizontal: 10,
                     marginTop: 20,
                     backgroundColor: '#FAE7E6',
                     width: 0.22 * height,
                     height: 0.22 * height,
                     shadowColor: '#000000',
                     elevation: 20,
                     shadowOpacity: 80,
                  }} >
                     <Image source={require('../images/patient.png')} style={{ width: 0.15 * height, height: 0.12 * height }} />
                     <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Patients</Text>
                  </View>

               </TouchableOpacity>

            </View>


            <View style={{ flexDirection: 'row', marginTop: 50 }}></View>


         </ScrollView >
      </View >
   );


};
export default Doctor;
