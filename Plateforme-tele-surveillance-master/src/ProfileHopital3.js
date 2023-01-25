/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase, Button } from 'react-native';
import { Dimensions } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';


const ProfileHopital3 = ({ navigation, route }) => {

   const { id } = route.params;
   console.log(route.params)
   const [profile, setProfile] = useState([])
   useEffect(() => {
      async function getAllInfoHopital(id) {
         try {
            console.log('ok')
            const info = await axios.get(`http://192.168.100.198:5000/api/hopital/profile/${id}`)
            console.log(info.data)

            setProfile(info.data)
         }
         catch (error) {
            console.log("erreur")
         }
      }

      getAllInfoHopital(id)

      console.log(id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])



   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height
   return (
      <View>
         <ScrollView>
            <View style={{ padding: 10, width: width, backgroundColor: '#5B779F', height: 0.09 * height }}>
               <TouchableOpacity onPress={() => navigation.navigate('Hopital', id)}>
                  <Image style={{ marginTop: height * 0.02, marginLeft: width * 0.02 }}
                     source={require('../images/symb.png')} />
               </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center' }}>
               <Image source={require('../images/ho.jpg')} style={{
                  width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                  marginTop: -0.05 * height, borderColor: '#fff', borderWidth: 8
               }}></Image>
               <Text style={{ fontSize: 30, color: '#3F3D56', marginBottom: 15 }}>{profile.nom}</Text>
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
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profile.adresse}</Text>
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
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profile.telephone}</Text>
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
               marginBottom: 10
            }}>
               <Image source={require('../images/mail.png')}
                  style={{ width: 20, height: 20 }}></Image>
               <Text style={{ fontSize: 15, color: '#3F3D56', fontWeight: 'bold', marginLeft: 10 }}>{profile.email}</Text>
            </View>
            <View></View>
            <View></View>
            <TouchableOpacity onPress={() => navigation.navigate("UpdateHopital", { id: id })}>
               <Image style={{ marginTop: height * 0.06, marginLeft: width * 0.32 }} source={require('../images/modifier.png')}></Image>
            </TouchableOpacity>







         </ScrollView>
      </View>
   );


};
export default ProfileHopital3;

