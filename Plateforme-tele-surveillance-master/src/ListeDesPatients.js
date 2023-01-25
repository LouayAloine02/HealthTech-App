/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image, FlatList,
  TouchableOpacity, Button, ScrollView, Dimensions
} from "react-native";
import axios from "axios";
import { useEffect } from "react";

// import { Feather, Entypo } from "@expo/vector-icons";


const Listedespatients = ({ navigation, route }) => {
  const { id, hopitalId } = route.params
  console.log(id)
  console.log(hopitalId)
  // const donnee = route.params
  // console.log(donnee)
  var width = Dimensions.get('window').width;
  var height = Dimensions.get('window').height;

  const [patients, setPatients] = useState([])
  useEffect(() => {
    async function getAllpatients() {
      try {
        const patients = await axios.get(`http://192.168.100.198:5000/api/medecinH/afficherpatient/${id}`)
        console.log(patients.data)
        setPatients(patients.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getAllpatients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [info, setInfo] = useState([])


  return (


    <View style={[styles.container, {
      // Try setting flexDirection to "row".
      flexDirection: "column"
    }]}>



      <View style={{ height: height * 0.1, backgroundColor: "#5B779F", flexDirection: "row" }} >
        <TouchableOpacity onPress={() => navigation.navigate('Medecin', id)}>
          <Image style={{ marginTop: height * 0.04, marginLeft: 10 }}
            source={require('../images/symb.png')} />
        </TouchableOpacity>
        <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, textAlign: 'center', marginLeft: width * 0.17, marginTop: height * 0.025 }} >
          Liste Des Patients
        </Text>
      </View>


      <View style={{ flexDirection: "column" }}>

        <ScrollView >
          {patients.map((item) => {
            console.log(item)

            {/* const hello = getAllInfoPatient(item.patientId) */ }
            return (<TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: 0.9 * width,
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                borderColor: '#E3807B',
                borderWidth: 2,
                shadowOpacity: 80,
                elevation: 5,
                marginTop: 10,

              }}
              onPress={() => navigation.navigate('ProfilePatient_Med', { profilePa: item.patientId, profileMed: id })}
            >


              <View key={item._id}
                style={{
                  flexDirection: 'column', justifyContent: 'space-between',
                }}

              >

                <Text style={{ fontSize: 15, color: '#5B779F', fontFamily: 'Poppins-Bold', textAlign: 'left', marginRight: 20 }} >
                  {item.patientId.nom}  {item.patientId.prenom}</Text>








              </View>
            </TouchableOpacity>



            )
          })}
        </ScrollView>
      </View>
      <View style={{ marginTop: 20 }}></View>

    </View>



  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  item: {

    borderColor: "#FFFFFF",
    elevation: 10,
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,


  },
  items: {
    fontSize: 22,
    color: "#3F3D56",

    padding: 20,


  },
  bord: {
    borderColor: "#E3807B",
  }

});


export default Listedespatients;
