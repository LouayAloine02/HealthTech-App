/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/core';
import {AppNotification} from './appNotifications';
import client from './utilsClient';
import { patients } from './utilsAuth';

const ViewSymptomes = ({route}) => {
   const {symp, profile} = route.params;
   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height
   const navigation = useNavigation();
   const navigateToHome = () => {
       navigation.navigate('AccueilPatientH',{profile: profile})
   };
   const navigateToLogin = () => {
      navigation.navigate('Accueil')
  };
   
   return (
      <View style={{fontFamily: 'Poppins-Regular',}}>
         <ScrollView>
         <View style={{ backgroundColor: '#5B779F' }} >
                     <TouchableOpacity onPress={navigateToLogin}>
                         <Text style={{ color: "#FFFFFF", fontFamily: 'Poppins-Regular', fontSize: 18, padding: 15, textAlign: 'center', marginLeft: 200 }}>
                             Déconnexion
                         </Text>
                     </TouchableOpacity>
                 </View>
      <View style={[{ flex: 7, backgroundColor: "#FFFFFF", marginTop: height * 0.03, marginLeft: width * 0.03, marginRight: width * 0.03, borderRadius: 20, borderColor: '#FAE7E6' }, { flexDirection: "column" }]}>

      <AppNotification text={"Vos symptomes sont enregistrés!"}/>
      
        
          {symp.map((item) => {
            return (
              <TouchableOpacity >
                <View key={item.id} style={{
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

                  <Text style={{ fontSize: 15, color: '#3F3D56', fontFamily:'Poppins-Bold', marginLeft: 10 }} >{item.text}</Text>

                </View>
              </TouchableOpacity>

            )
          })}
    
      </View>
      <View style={{  marginTop: 20, alignSelf:"center" }}>
      <TouchableOpacity onPress={navigateToHome} >
                        <View style={{
                            borderRadius: 20,
                            paddingVertical: 14,
                            alignItems: 'center',
                            marginLeft: 0.09 * width,
                           
                            paddingHorizontal: 10,
                            marginTop: 20,
                            backgroundColor: '#FAE7E6',
                            width: 0.18 * height,
                            height: 0.18 * height,
                            shadowColor: '#000000',
                            elevation: 20,
                            shadowOpacity: 80,
                        }} >
                            <Image source={require('../images/profile.png')} style={{ width: 0.12 * height, height: 0.12 * height }} />
                            <Text style={{ fontFamily:'Poppins-Bold',marginTop: 5, fontWeight: 'bold', color: '#3F3D56' }}>Accueil</Text>
                        </View>

      </TouchableOpacity>
      </View>
      <View style={{  marginTop: 40 }}></View>

         </ScrollView>
      </View>
   );


};
export default ViewSymptomes;

