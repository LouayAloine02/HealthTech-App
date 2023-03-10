/* eslint-disable prettier/prettier */


import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from 'react-native';
import { TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import SubmitButton from './submitButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import AddInput from './addInput';
import * as yup from 'yup';
import client from './utilsClient';
import { protection } from './utilsAuth';
import {AppNotification, updateNotification } from './appNotifications';
import {StackActions} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'

const initialValues = {
    date: '',
    poids:'',
   
}

const validationSchema = yup.object({
  date: yup.string().trim().required('Ajouter un date!'),
  poids: yup.string().trim().required('Ajouter un mood!'),
 
 
})
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const Jour = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","24", "25", "26", "27", "28", "29", "30", "31"]
const Mois = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12"]
const Annee = ["2022"]

const Heure = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","00"]
const Minute = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","24", "25", "26", "27", "28", "29", "30", "31",
"32", "33", "34", "35", "36", "37","38", "39", "40", "41","42", "43", "44", "45", "46", "47", "48", "49", "50", "51","52", "53", "54", "55", "56", "57", "58", "59"]


const Protection = ({route, navigation}) => {
    
    const{profile,calendrier}=route.params;
  
    var height = Dimensions.get('window').height;
    const [message, setMessage] = useState({
        text:'',
        type: ''
    })
    const [jour, setjour] = useState('')
    const [heure, setheure] = useState('')
    const [mois, setmois] = useState('')
    const [annee, setannee] = useState('')
    const [minute, setminute] = useState('')
    const [poids, setpoids] = useState('')
   
    const [sliding, setSliding] = useState('Inactive');

    const handlerev = async () => {

        const res = await protection(calendrier._id,jour,mois,annee,heure,minute,poids);
            

       

        if(!res.success) return updateNotification(setMessage, res.error)
        
        updateNotification(setMessage, res.message,'success')
       
    };


return(
    <>
    {message.text ?<AppNotification type={message.type} text={message.text}/> : null}
    <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column",
      
        fontFamily: 'Poppins-Regular'
    }]}>
        <ScrollView>
        <View style={{ backgroundColor: '#5B779F', padding: 10 }} >
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Image source={require('../images/home.png')} />

            </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
               <Image source={require('../images/protection.png')} style={{
                  width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                  borderColor: '#fff', borderWidth: 8
               }}></Image>

               <Text style={{ fontFamily: 'Poppins-Regular',fontSize: 15, color: '#3F3D56', marginBottom: 15 }}>La date de calendrier est: {calendrier.jourd}/{calendrier.moisd}/{calendrier.anneed} </Text>
            </View>
        
        <Formik
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handlerev}
        >



            {()=>{
               
                return(<>
                    
                <View style={{  alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: 0.9 * width,
                height: 0.6 * height,
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
 
                elevation: 15,
                marginTop: 10, }} >
        
        <View style={{ flexDirection: 'column', marginBottom: 10 }}>
            <Text style={{  fontFamily: 'Poppins-Bold', fontSize: 15, color: '#3F3D56',marginLeft: 10 }}>Date</Text>
          
            <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:width/12}}>
    <SelectDropdown
            dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/5 }} 
            buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/5 }} 
          
	data={Jour}
    defaultButtonText={'Jour'}
	onSelect={(selectedItem, index) => {
		setjour(selectedItem)
	}}
	
/>
<SelectDropdown
            dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/5 }} 
            buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/5 }} 
          
	data={Mois}
    defaultButtonText={'Mois'}
	onSelect={(selectedItem, index) => {
		setmois(selectedItem)
	}}
	
/>
<SelectDropdown
            dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
            buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
          
	data={Annee}
    defaultButtonText={'Ann??e'}
	onSelect={(selectedItem, index) => {
		setannee(selectedItem)
	}}
	
/> 

</View>


        </View>
        <View style={{  flexDirection: 'column', marginBottom: 10}}>
        <Text style={{  fontFamily: 'Poppins-Bold', fontSize: 15, color: '#3F3D56' }}>Heure</Text>
        <View style={{alignItems:'center'}}>
        <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:width/6}}>
                 
                 <SelectDropdown
                         dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
                         buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
                       
                 data={Heure}
                 defaultButtonText={'Heure'}
                 onSelect={(selectedItem, index) => {
                     setheure(selectedItem)
                 }}
             
             /> 
             
             <SelectDropdown
                         dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
                         buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
                       
                 data={Minute}
                 defaultButtonText={'Minute'}
                 onSelect={(selectedItem, index) => {
                     setminute(selectedItem)
                 }}
             
             /> 
             
                            </View>
        </View>
 
               </View>
        
       
        {/* Slider de poids ! */}
              
        <View style={{fontFamily: 'Poppins-Regular',}} >
<Text style={{ fontSize:20, color:'#E3807B',alignSelf:"center",marginTop:10}}>
    <Text style={{ fontSize:16,color:'#3F3D56',alignSelf:"center",marginTop:10}}>Poids:</Text> {poids}</Text>
     

     <Slider
          style={{ width: 0.8*width, height:40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#E3807B"
          maximumTrackTintColor="#3F3D56"
          thumbTintColor="#5B779F"
          value={0}
          onValueChange={value => setpoids(parseInt(value * 1000) + ' gr')}
          onSlidingStart = {() => setSliding('Sliding')}
          onSlidingComplete = {() => setSliding('Inactive')}


     />

     


</View>
         
               

            

            <View style={{alignItems:'center'}}>
            <Pressable onPress={handlerev} style={{fontFamily: 'Poppins-Regular',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#5B779F',
    width: 250,
           }}>

            <Text style={{ color: 'white',
    
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',}}>Sauvegarder
           </Text>
       </Pressable>
       
            </View>
          


         
                  

        </View>
          <View style={{ flexDirection: 'row', marginTop: 40 }}></View>
          </>
       
        )}
        }
        </Formik>

        
        </ScrollView>
    </View>
    </>

)};
export default Protection;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    textSize: {
        textAlign: 'center',
        color: '#E3807B',
        fontWeight: 'bold',
        fontSize: 25

    }
});


