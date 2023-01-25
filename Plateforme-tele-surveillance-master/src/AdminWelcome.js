/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const Admin = ({ navigation, route }) => {

   const donnee = route.params;
   console.log(donnee + "ok")
   const [info, setInfo] = useState([])
   useEffect(() => {
      async function getAllInfoAdmin(id) {
         try {
            console.log('ok')
            const info = await axios.get(`http://192.168.100.198:5000/api/admin/profile/${id}`)
            console.log(info.data)

            setInfo(info.data)
         }
         catch (error) {
            console.log("erreur")
         }
      }

      getAllInfoAdmin(donnee)

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height
   return (
      <View>
         <ScrollView>
            <View style={{ backgroundColor: '#5B779F' }} >
               <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
                  <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 23, padding: 15, textAlign: 'center', marginLeft: 200 }}>
                     Déconnexion
                  </Text>
               </TouchableOpacity>
            </View>
            <View><Text style={{ marginLeft: 0.1 * width, fontSize: 22, fontWeight: 'bold', color: '#3F3D56', paddingTop: 14 }}>Bienvenue, {info.prenom}   !</Text></View>



            <View style={{ flexDirection: 'row', marginTop: 35, marginLeft: 0 }}>

               <TouchableOpacity onPress={() => navigation.navigate('ListeMedecins1', donnee)}>
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
                     <Image source={require('../images/doctor.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                     <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Médecins</Text>
                  </View>

               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('ListePatients1', donnee)}>
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
                     <Image source={require('../images/profile.png')} style={{ width: 0.15 * height, height: 0.12 * height }} />
                     <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Patients</Text>
                  </View>

               </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
               <TouchableOpacity onPress={() => navigation.navigate('ListeHopital', info._id)}>
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
                     <Image source={require('../images/patientMedecin.png')} style={{ width: 0.2 * height, height: 0.15 * height }} />
                     <Text style={{ marginTop: 10, color: '#3F3D56', fontWeight: 'bold' }}>Hopital</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => navigation.navigate('ListeAdmin', info._id)} >
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
                     <Image source={require('../images/admin.png')} style={{ width: 0.15 * height, height: 0.15 * height }} />
                     <Text style={{ marginTop: 5, color: '#3F3D56', fontWeight: 'bold' }}>Admin</Text>
                  </View>

               </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', marginTop: 50 }}></View>


         </ScrollView>
      </View>
   );


};
export default Admin;

