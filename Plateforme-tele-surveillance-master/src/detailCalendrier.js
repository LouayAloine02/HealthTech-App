/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image, TouchableWithoutFeedbackBase } from 'react-native';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/core';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { deleterev } from './utilsAuth';
import { StackActions } from '@react-navigation/native';

const DetailCalendrier = ({ route, navigation }) => {
  const { profile, calId } = route.params;

  const id = calId._id

  // reveiller
  const [rev, setrev] = useState([])
  useEffect(() => {
    async function getAllrev() {
      try {
        const rev = await axios.get(`http://192.168.100.198:5000/api/patient/voir-rev/${id}`)

        setrev(rev.data)

      }
      catch (error) {

      }
    }
    getAllrev()
  }, [])

  //coucher

  const [cou, setcou] = useState([])
  useEffect(() => {
    async function getAllcou() {
      try {
        const cou = await axios.get(`http://192.168.100.198:5000/api/patient/voir-cou/${id}`)

        setcou(cou.data)

      }
      catch (error) {

      }
    }
    getAllcou()
  }, [])

  //toilette

  const [toi, settoi] = useState([])
  useEffect(() => {
    async function getAlltoi() {
      try {
        const toi = await axios.get(`http://192.168.100.198:5000/api/patient/voir-toi/${id}`)

        settoi(toi.data)

      }
      catch (error) {

      }
    }
    getAlltoi()
  }, [])


  //protection

  const [pro, setpro] = useState([])
  useEffect(() => {
    async function getAllpro() {
      try {
        const pro = await axios.get(`http://192.168.100.198:5000/api/patient/voir-pro/${id}`)

        setpro(pro.data)

      }
      catch (error) {

      }
    }
    getAllpro()
  }, [])

  //Boisson

  const [boi, setboi] = useState([])
  useEffect(() => {
    async function getAllboi() {
      try {
        const boi = await axios.get(`http://192.168.100.198:5000/api/patient/voir-boi/${id}`)

        setboi(boi.data)

      }
      catch (error) {

      }
    }
    getAllboi()
  }, [])


  //delete rev
  const handlerev = async () => {


  };


  const navigateToLogin = () => {
    navigation.navigate('Accueil')
  };
  var width = Dimensions.get('window').width; //full width
  var height = Dimensions.get('window').height; //full height

  return (
    <View style={{ fontFamily: 'Poppins-Regular', }}>
      <ScrollView>
        <View style={{ backgroundColor: '#5B779F', flexDirection: 'row', justifyContent: 'space-between', height: 0.1 * height }} >

          <TouchableOpacity onPress={() => navigation.navigate('AccueilPatient')} >
            <Image source={require('../images/home.png')} style={{}} />


          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={{ color: "#FFFFFF", fontFamily: 'Poppins-Regular', fontSize: 18, padding: 15, textAlign: 'center', textAlign: 'right' }}>
              Déconnexion
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={{ textAlign: 'center', color: '#493d8a', fontSize: 18, fontFamily: 'Poppins-Regular' }}>Date: {calId.jourd}/{calId.moisd}/{calId.anneed}
          </Text>
        </View>

        {rev.map((item) => {
          console.log(item)

          return (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#5B779F',
                width: 0.9 * width,
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,

              }}
            >


              <View key={item._id}
                style={{ flexDirection: 'column' }}

              >

                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Poppins-Regular', textAlign: 'right', marginRight: 20 }} >
                  Se réveiller à:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.heure}:{item.minute} </Text>
                  | Humeur:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.mood}</Text> </Text>
                <TouchableOpacity onPress={async () => { const rev = await deleterev(item._id); setrev(rev) }

                } >
                  <Icon
                    name="trash"
                    size={30}
                    color="#fff"></Icon>
                </TouchableOpacity>


              </View>
            </TouchableOpacity>

          )
        })}
        {pro.map((item) => {
          console.log(item)

          return (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#FFB0AC',
                width: 0.9 * width,
                borderColor: '#493d8a',
                borderWidth: 2,
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,

              }}
            >


              <View key={item._id}
                style={{ flexDirection: 'column' }}

              >

                <Text style={{ fontSize: 15, color: '#493d8a', fontFamily: 'Poppins-Regular', textAlign: 'center' }} >
                  Changement protection à:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}> {item.heure}:{item.minute} </Text> </Text>
                <Text style={{ fontSize: 15, color: '#493d8a', fontFamily: 'Poppins-Regular', textAlign: 'center' }} >
                  Poids:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}> {item.poids} </Text></Text>
                <TouchableOpacity onPress={async () => { const rev = await deleterev(item._id); setrev(rev) }

                } >
                  <Icon
                    name="trash"
                    size={30}
                    color="#fff"></Icon>
                </TouchableOpacity>


              </View>
            </TouchableOpacity>




          )
        })}


        {toi.map((item) => {
          console.log(item)

          return (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#493d8a',
                width: 0.9 * width,

                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,

              }}
            >


              <View key={item._id}
                style={{ flexDirection: 'column' }}

              >

                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Poppins-Regular', textAlign: 'center' }} >
                  Toilette à:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.heure}:{item.minute} </Text>
                  | volume:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}> {item.volume} </Text></Text>
                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Poppins-Regular', textAlign: 'center' }} >
                  Fuite:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}> {item.accident} </Text>
                  | besoin:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}> {item.besoin}</Text></Text>
                <TouchableOpacity onPress={async () => { const rev = await deleterev(item._id); setrev(rev) }

                } >
                  <Icon
                    name="trash"
                    size={30}
                    color="#fff"></Icon>
                </TouchableOpacity>



              </View>
            </TouchableOpacity>

          )
        })}

        {boi.map((item) => {
          console.log(item)

          return (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#E3807B',
                width: 0.9 * width,
                padding: 20,
                borderColor: '#493d8a',
                borderWidth: 2,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,

              }}

            >


              <View key={item._id}
                style={{ flexDirection: 'column' }}

              >

                <Text style={{ fontSize: 15, color: '#493d8a', fontFamily: 'Poppins-Regular', textAlign: 'center' }} >
                  Boire à:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.heure}:{item.minute} </Text>
                  | volume:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.volume} </Text></Text>
                <Text style={{ fontSize: 15, color: '#493d8a', fontFamily: 'Poppins-Regular', textAlign: 'center' }} >
                  Type:<Text style={{ fontFamily: 'Poppins-Bold' }}> {item.type}</Text> </Text>
                <TouchableOpacity onPress={async () => { const rev = await deleterev(item._id); setrev(rev) }

                } >
                  <Icon
                    name="trash"
                    size={30}
                    color="#fff"></Icon>
                </TouchableOpacity>



              </View>
            </TouchableOpacity>

          )
        })}


        {cou.map((item) => {
          console.log(item)

          return (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#FAE7E6',
                width: 0.9 * width,
                padding: 20,
                borderColor: '#493d8a',
                borderWidth: 2,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 10,

              }}
            >


              <View key={item._id}
                style={{ flexDirection: 'column', justifyContent: 'space-between' }}

              >

                <Text style={{ fontSize: 15, color: '#493d8a', fontFamily: 'Poppins-Regular', textAlign: 'right', marginRight: 20 }} >Se coucher à: <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.heure}:{item.minute}</Text>
                  | Humeur:
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.mood}
                  </Text></Text>
                <TouchableOpacity onPress={async () => { const rev = await deleterev(item._id); setrev(rev) }

                } >
                  <Icon
                    name="trash"
                    size={30}
                    color="#493d8a"></Icon>
                </TouchableOpacity>



              </View>
            </TouchableOpacity>

          )
        })}








        <View style={{ flexDirection: 'row', marginTop: 50 }}></View>

      </ScrollView>
    </View>
  );


};
export default DetailCalendrier;

