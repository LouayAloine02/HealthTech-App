/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
const ProfilePatient_Med = ({ route }) => {
   const { profilePa, profileMed } = route.params;
   const [info, setInfo] = useState([])

   useEffect(() => {
      async function getAllInfoPatient(id) {
         try {
            console.log('ok')
            const info = await axios.get(`http://192.168.100.198:5000/api/patient/profile/${profilePa._id}`)
            console.log(info)

            console.log(info.data)
            setInfo(info.data)
         }
         catch (error) {
            console.log("erreur ")
         }
      }

      getAllInfoPatient(profilePa.id)
      console.log('okk')
      console.log(info)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height
   const navigation = useNavigation();
   const navigateToCalendrier = () => {
      navigation.navigate('Calendrier_Med', { profile: profilePa })
   };
   const navigateToHome = () => {

      navigation.navigate('AccueilPatientH_Med', { profilePa: profilePa, profileMed: profileMed })


   };
   const navigateToLogin = () => {
      navigation.navigate('LoginMed', { profile: profileMed })
   };
   return (
      <View style={{ fontFamily: 'Poppins-Regular', }}>
         <ScrollView>
            <View style={{ padding: 10, width: width, backgroundColor: '#5B779F', height: 0.15 * height }}>
               <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={{ color: "#FFFFFF", fontFamily: 'Poppins-Regular', fontSize: 18, padding: 15, textAlign: 'center', marginLeft: 200 }}>
                     Déconnexion
                  </Text>
               </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center' }}>
               <Image source={require('../images/profile.png')} style={{
                  width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                  marginTop: -0.1 * height, borderColor: '#fff', borderWidth: 8
               }}></Image>
               <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 10, color: '#3F3D56' }}>{profilePa.nom} {profilePa.prenom}</Text>
               <Text style={{ fontSize: 15, color: '#3F3D56', marginBottom: 15 }}>{profilePa.type == 1 ? <Text>{profilePa.date}</Text> : <Text>{profilePa.date_naissance}</Text>}, {profilePa.genre}</Text>
            </View>
            <View style={{
               alignSelf: 'center',
               flexDirection: 'row',
               justifyContent: 'center',
               backgroundColor: '#fff',
               width: 0.9 * width,

               padding: 20,
               paddingBottom: 22,
               borderRadius: 10,
               shadowOpacity: 80,
               elevation: 15,
               marginTop: 10,
            }}>
               <Image source={require('../images/address.png')}
                  style={{ width: 20, height: 20 }}></Image>
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profilePa.adresse}</Text>
            </View>
            <View style={{
               alignSelf: 'center',
               flexDirection: 'row',
               justifyContent: 'center',
               backgroundColor: '#fff',
               width: 0.9 * width,
               padding: 20,
               paddingBottom: 22,
               borderRadius: 10,
               shadowOpacity: 80,
               elevation: 15,
               marginTop: 10,
            }}>
               <Image source={require('../images/phone.png')}
                  style={{ width: 20, height: 20 }}></Image>
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profilePa.type == 1 ? <Text>{profilePa.phone}</Text> : <Text>{profilePa.telephone}</Text>}</Text>
            </View>
            <View style={{
               alignSelf: 'center',
               flexDirection: 'row',
               justifyContent: 'center',
               backgroundColor: '#fff',
               width: 0.9 * width,
               padding: 20,
               paddingBottom: 22,
               borderRadius: 10,
               shadowOpacity: 80,
               elevation: 15,
               marginTop: 10,
            }}>
               <Image source={require('../images/mail.png')}
                  style={{ width: 20, height: 20 }}></Image>
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profilePa.email}</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
               <TouchableOpacity onPress={() => navigation.navigate('ListeQuiz', { profilePa: profilePa })}>
                  <View style={{
                     borderRadius: 20,
                     paddingVertical: 14,
                     alignItems: 'center',
                     marginLeft: 0.09 * width,
                     paddingHorizontal: 10,
                     marginTop: 20,
                     backgroundColor: '#5B779F',
                     width: 0.18 * height,
                     height: 0.18 * height,
                     shadowColor: '#000000',
                     elevation: 20,
                     shadowOpacity: 80,
                     textAlign: 'center'
                  }} >
                     <Image source={require('../images/analyse.jpg')} style={{ marginRight: 1, height: height * 0.09, width: width * 0.27 }} />
                     <Text style={{ marginTop: 9, color: '#fff', fontWeight: 'bold' }}>Analyse de questionnaire </Text>
                  </View>

               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                  <View style={{
                     borderRadius: 20,
                     paddingVertical: 14,
                     alignItems: 'center',
                     marginLeft: 0.1 * width,
                     paddingHorizontal: 10,
                     marginTop: 20,
                     backgroundColor: '#5B779F',
                     width: 0.18 * height,
                     height: 0.18 * height,
                     shadowColor: '#000000',
                     elevation: 20,
                     shadowOpacity: 80,
                     textAlign: 'center'
                  }} >
                     <Image source={require('../images/chat.png')} style={{ marginRight: 1, height: height * 0.09, width: width * 0.17 }} />
                     <Text style={{ marginTop: 9, color: '#fff', fontWeight: 'bold' }}>Envoyer un message </Text>
                  </View>

               </TouchableOpacity>




            </View>
            <View>

               <TouchableOpacity onPress={navigateToCalendrier} style={{ alignItems: 'center' }} >
                  {/* <View style={{
                     borderRadius: 20,
                     paddingVertical: 14,
                     alignItems: 'center',
                     marginLeft: 0.07 * width,
                     paddingHorizontal: 10,
                     marginTop: 20,
                     backgroundColor: '#5B779F',
                     width: 0.18 * height,
                     height: 0.18 * height,
                     shadowColor: '#000000',
                     elevation: 20,
                     shadowOpacity: 80,
                     textAlign: 'center'
                  }} >
                     <View alignItems="center">
                        <Image source={require('../images/toilette.png')} style={{ width: 0.16 * height, height: 0.12 * height, backgroundColor: '#5B779F' }} />
                        <Text style={{ marginTop: 9, color: '#fff', fontWeight: 'bold' }}>Calendrier</Text>

                     </View>
                  </View> */}
                  <View style={{ alignItems: 'center', marginTop: 20 }}>

                     <TouchableOpacity onPress={navigateToHome}>
                        <View style={{
                           borderRadius: 20,
                           paddingVertical: 14,
                           alignItems: 'center',
                           marginLeft: 0.09 * width,
                           paddingHorizontal: 10,
                           marginTop: 20,
                           backgroundColor: '#5B779F',
                           width: 0.18 * height,
                           height: 0.18 * height,
                           shadowColor: '#000000',
                           elevation: 20,
                           shadowOpacity: 80,
                        }} >
                           <Image source={require('../images/détails.png')} style={{ width: 0.08 * height, height: 0.12 * height }} />
                           <Text style={{ marginTop: 5, color: '#fff', fontWeight: 'bold' }}>Détails</Text>
                        </View>

                     </TouchableOpacity>

                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}></View>


               </TouchableOpacity>



            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}></View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}></View>


         </ScrollView>
      </View>
   );


};
export default ProfilePatient_Med;

