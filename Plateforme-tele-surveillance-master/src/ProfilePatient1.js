/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/core';

const ProfilePatient1 = ({route}) => {
   const profile = route.params;
   console.log(profile)
   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height
   const navigation = useNavigation();
   const navigateToHome = () => {
       navigation.navigate('Listedespatients',{id:profile.medecinId,hopitalId:profile.hopitalId})
   };
   return (
      <View>
         <ScrollView>
            <View style={{ padding: 10, width: width, backgroundColor: '#5B779F', height: 0.15 * height }}>
            <TouchableOpacity onPress={() => navigateToHome()}>
                  <Image style={{ marginTop: height * 0.02, marginLeft: width * 0.02 }}
                     source={require('../images/symb.png')} />
               </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center' }}>
               <Image source={require('../images/profile.png')} style={{
                  width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                  marginTop: -0.1 * height, borderColor: '#fff', borderWidth: 8
               }}></Image>
               <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 10, color: '#3F3D56' }}>{profile.patientId.nom} {profile.patientId.prenom}</Text>
               <Text style={{ fontSize: 15, color: '#3F3D56', marginBottom: 15 }}>{profile.patientId.age}, {profile.patientId.genre}</Text>
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
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profile.patientId.adresse}</Text>
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
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profile.patientId.telephone}</Text>
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
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profile.patientId.email}</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
               <TouchableOpacity>
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
                     <Image source={require('../images/doctor.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                     <Text style={{ marginTop: 5, color: '#fff', fontWeight: 'bold' }}>M??decin</Text>
                  </View>

               </TouchableOpacity>
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
                     <Image source={require('../images/d??tails.png')} style={{ width: 0.08 * height, height: 0.12 * height }} />
                     <Text style={{ marginTop: 5, color: '#fff', fontWeight: 'bold' }}>D??tails</Text>
                  </View>

               </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}></View>

         </ScrollView>
      </View>
   );


};
export default ProfilePatient1;

