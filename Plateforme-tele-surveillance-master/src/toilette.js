/* eslint-disable prettier/prettier */
import React,{ useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable, TouchableOpacity, Image, TouchableWithoutFeedbackBase, TextInput } from 'react-native';
import { Dimensions } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Formik } from 'formik';
import { toilette } from './utilsAuth';
import * as yup from 'yup';
import Slider from '@react-native-community/slider';
import {AppNotification, updateNotification } from './appNotifications';


const Fuite = ["Oui","Non"]

const initialValues = {
   date: '',
   accident:'',
   volume:'',
   besoin:'',

  
}

const validationSchema = yup.object({
 date: yup.string().trim().required('Ajouter un date!'),
 accident: yup.string().trim().required('C est vide!'),
 

})


const Toilette = ({route,navigation}) => {
   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height
 
   const{profile,calendrier}=route.params;

   const [volume, setvolume] = useState('');
   const [besoin, setbesoin] = useState('');

    const [sliding, setSliding] = useState('Inactive');
  
    var height = Dimensions.get('window').height;

    const Jour = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","24", "25", "26", "27", "28", "29", "30", "31"]
    const Mois = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12"]
    const Annee = ["2022"]
    
    const Heure = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","00"]
    const Minute = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","24", "25", "26", "27", "28", "29", "30", "31",
    "32", "33", "34", "35", "36", "37","38", "39", "40", "41","42", "43", "44", "45", "46", "47", "48", "49", "50", "51","52", "53", "54", "55", "56", "57", "58", "59"]
    

    const [message, setMessage] = useState({
        text:'',
        type: ''
    })
    const [jour, setjour] = useState('')
    const [heure, setheure] = useState('')
    const [mois, setmois] = useState('')
    const [annee, setannee] = useState('')
    const [minute, setminute] = useState('')
  
    const [accident, setaccident] = useState('')
    

    const handletoi = async () => {

        const res = await toilette(calendrier._id,jour,mois,annee,heure,minute,accident,volume,besoin);
            

       

        if(!res.success) return updateNotification(setMessage, res.error)
        
        updateNotification(setMessage, res.message,'success')
       
    };
   return (
      <>
    {message.text ?<AppNotification type={message.type} text={message.text}/> : null}
      <View style={{fontFamily: 'Poppins-Regular',}}>
         <ScrollView>
            <View style={{ padding: 10, width: width, backgroundColor: '#5B779F', height: 0.1 * height }}>
               <TouchableOpacity>
                  <View></View>
                  <View></View>
               </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center' }}>
               <Image source={require('../images/toilette.png')} style={{
                  width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                  borderColor: '#fff', borderWidth: 8
               }}></Image>

               <Text style={{ fontSize: 15, color: '#3F3D56', marginBottom: 0 }}>La date de calendrier est: {calendrier.jourd}/{calendrier.moisd}/{calendrier.anneed} </Text>
            </View>
            <Formik
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handletoi}
        >



            {()=>{
               
                return(<>
            <View style={{
               alignSelf: 'center',
               justifyContent: 'center',
               backgroundColor: '#fff',
               width: 0.9 * width,
               height:  1.35*height,
               padding: 20,
               paddingBottom: 10,
               borderRadius: 10,
               shadowOpacity: 80,

               elevation: 15,
               marginTop: 5,
            }}>
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
    defaultButtonText={'Année'}
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

               <Text style={{ fontSize: 15, color: '#3F3D56', fontFamily:'Poppins-Bold', marginLeft: 10 }}>Fuite?</Text>
               <SelectDropdown
               dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3}} 
               buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
               defaultButtonText={'Oui/Non'}
	            data={Fuite}
              
	            onSelect={(selectedItem, index) => {
		         setaccident(selectedItem)
	              }}
	
               />
               
              
             
           { /* Slider de volume */}
           <View style={{fontFamily: 'Poppins-Regular',}}>
<Text style={{ fontSize:20, color:'#E3807B',alignSelf:"center",marginTop:10}}>
<Text style={{ fontSize:16, color:'#3F3D56',alignSelf:"center",marginTop:10}}>Volume: </Text>{volume}</Text>
     <View style={{flexDirection: 'row',marginTop:10}} > 
         <Image source={require('../images/goutte1.png')} style={{ width: 12, height: 22,marginLeft:0 }}></Image>
         <Image source={require('../images/goutte2.png')} style={{ width: 21, height: 25,marginLeft: 1/3*width}}></Image>
         <Image source={require('../images/goutte3.png')} style={{ width: 28, height: 28,marginLeft: 1/3*width}}></Image>


     </View>

     <Slider
          style={{ width: 0.8*width, height:40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#E3807B"
          maximumTrackTintColor="#3F3D56"
          thumbTintColor="#E3807B"
          value={0}
          onValueChange={value => setvolume(parseInt(value * 650+50) + ' ml')}
          onSlidingStart = {() => setSliding('Sliding')}
          onSlidingComplete = {() => setSliding('Inactive')}


     />


</View>


{/* slider de besoin */}
            

<View style={{fontFamily: 'Poppins-Regular',marginTop:10}}>
<Text style={{ fontSize:20,fontFamily:'Poppins-Regular', color:'#E3807B',alignSelf:"center",marginTop:10}}>
<Text style={{ fontSize:16,fontFamily:'Poppins-Regular', color:'#3F3D56',alignSelf:"center",marginTop:10}}>Besoin: </Text>{besoin}</Text>

<View style={{flexDirection: 'row',marginTop:5}} > 

    <Text style={{ width: 20, height: 20,marginLeft:0 ,color:'#3F3D56'}}>0</Text>
    <Text style={{ width: 20, height: 20,marginLeft:1/8*width ,color:'#3F3D56'}}>1</Text>
    <Text style={{ width: 28, height: 20,marginLeft: 1/8*width,color:'#3F3D56'}}>2</Text>
    <Text style={{ width: 28, height: 28,marginLeft: 1/8*width,color:'#3F3D56'}}>3</Text>
    <Text style={{ width: 28, height: 28,marginLeft: 1/8*width,color:'#3F3D56'}}>4</Text>


</View>

<Slider
     style={{ width: 0.8*width, height:40}}
     minimumValue={0}
     maximumValue={4}
     minimumTrackTintColor="#E3807B"
     maximumTrackTintColor="#3F3D56"
     thumbTintColor="#E3807B"
     value={0}
     onValueChange={value => setbesoin(Math.round(value))}
     onSlidingStart = {() => setSliding('Sliding')}
     onSlidingComplete = {() => setSliding('Inactive')}


/>


</View>

<View style={{ marginTop:15}}>

            <Text style={{ fontSize: 15, color: '#3F3D56', fontFamily:'Poppins-Bold', marginLeft: 10 }}>Codes concernant la sensation de besoin:</Text>
<Text style={{ fontSize: 13,fontFamily: 'Poppins-Regular', color: '#3F3D56',  marginLeft: 10 }}>0 : Vous n’avez pas envie d’uriner, mais vous y allez par précaution.</Text>
<Text style={{ fontSize: 13,fontFamily: 'Poppins-Regular', color: '#3F3D56',  marginLeft: 10 }}>1 : Envie normale d’uriner sans urgence.</Text>
<Text style={{ fontSize: 13,fontFamily: 'Poppins-Regular', color: '#3F3D56',  marginLeft: 10 }}>2 : Besoin pressant, mais qui est passé avant que vous alliez aux toilettes.</Text>
<Text style={{ fontSize: 13,fontFamily: 'Poppins-Regular', color: '#3F3D56', marginLeft: 10 }}>3 : Urgence, mais vous avez pu arriver aux toilettes sans avoir eu de fuites urinaires.</Text>
<Text style={{ fontSize: 13,fontFamily: 'Poppins-Regular', color: '#3F3D56', marginLeft: 10 }}>4 : Urgence, mais vous n’êtes pas arrivé à temps aux toilettes et avez perdu des urines</Text>

</View>
           

<View style={{alignItems:'center', marginTop:15}}>
            <Pressable onPress={handletoi} style={{fontFamily: 'Poppins-Regular',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#5B779F',
    width: 250,
           }}>

            <Text style={{ color: 'white',
   fontFamily:'Poppins-Bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    }}>Sauvegarder
           </Text>
       </Pressable>
       
            </View>
           
           
            </View>


          

            <View style={{ flexDirection: 'row', marginTop: 20 }}></View>
            </>
       
       )}
       }
       </Formik>
         </ScrollView>
      </View>
      </>
   );


};
export default Toilette;
