/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image, FlatList,
  TouchableOpacity, Button, ScrollView, Dimensions
} from "react-native";

// import { Feather, Entypo } from "@expo/vector-icons";


const Questionnaire = ({ navigation, route }) => {
  const {profile} = route.params


  var width = Dimensions.get('window').width;
  var height = Dimensions.get('window').height;


  return (


    <View style={[styles.container, {
      // Try setting flexDirection to "row".
      flexDirection: "column",
      fontFamily: 'Poppins-Regular',
    }]}>



      <View style={{ flex: 0.8, backgroundColor: "#5B779F", flexDirection: "row" }} >
        <TouchableOpacity>
          <Image style={{ marginTop: height * 0.02, marginLeft: width * 0.01 }}
            source={require('../images/Vector.png')} />
        </TouchableOpacity>
        <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, textAlign: 'center', marginLeft: 10 }} >
          Questionnaires
        </Text>
      </View>


      <View style={[{ flex: 7, backgroundColor: "#FFFFFF" }, { flexDirection: "column" },]}>
        <View style={[{ color: "#FAE7E6", marginLeft: width * 0.09, marginTop: height * 0.025, marginRight: width * 0.08 }, { flexDirection: "column" }]} >
          <Text style={{ color: "#3F3D56", textAlign: "justify", fontFamily: "Bold", fontSize: 18 }} >
            -Les questions suivantes portent sur l’intensité et la fréquence des symptômes urinaires que vous
            avez eu au cours des 4 dernières semaines.
          </Text>
          <Text>

          </Text>

          <Text style={{ color: "#3F3D56", textAlign: "justify", fontFamily: "Bold", fontSize: 18 }} >
            -Pour répondre aux questions suivantes, il vous suffit de cocher la case qui correspond le mieux à
            votre situation. Il n’y a pas de « bonnes » ou de « mauvaises » réponses. Si vous ne savez pas très
            bien comment répondre, choisissez la réponse la plus proche de votre situation.
          </Text>


        </View>
        <Image style={{ marginTop: height * 0.01, marginLeft: width * 0.25 }}
          source={require('../images/quest.png')} />
        <TouchableOpacity onPress={() => navigation.navigate('NewQuiz',{profile:profile})}>
          <Image style={{ marginTop: height * 0.04, marginLeft: width * 0.25 }}
            source={require('../images/Frame11.png')} />
        </TouchableOpacity>

      </View>

    </View>


  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  item: {
    fontSize: 22,
    backgroundColor: "#FAE7E6",
    marginTop: 15,


    borderRadius: 30
  },
  items: {
    fontSize: 22,
    marginLeft: 40,

    padding: 20,
    textAlign: "center",

  },
  bord: {
    borderColor: "#E3807B",
  }

});


export default Questionnaire;
