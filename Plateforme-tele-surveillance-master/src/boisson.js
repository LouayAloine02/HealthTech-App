/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image,TextInput,Dimensions , Pressable} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { Formik } from 'formik';
import { boisson } from './utilsAuth';
import * as yup from 'yup';
import Slider from '@react-native-community/slider';
import {AppNotification, updateNotification } from './appNotifications';


const initialValues = {
   date: '',
   volume:'',
   type:'',
 

  
}

const validationSchema = yup.object({
 jour: yup.string().trim().required('Ajouter un jour!'),
 mois: yup.string().trim().required('Ajouter un mois!'),
 Annee: yup.string().trim().required('Ajouter une année!'),
 heure: yup.string().trim().required('Ajouter heure!'),
 minute: yup.string().trim().required('Ajouter minute!'),
 type: yup.string().trim().required('Ajouter un type!'),

})


const Boisson = ({route,navigation}) => {

   const{profile,calendrier}=route.params;
   const [sliding, setSliding] = useState('Inactive');
   const [volume, setvolume] = useState('');
   const [message, setMessage] = useState({
      text:'',
      type: ''
  })
  const [jour, setjour] = useState('')
  const [heure, setheure] = useState('')
  const [mois, setmois] = useState('')
  const [annee, setannee] = useState('')
  const [minute, setminute] = useState('')
  const [type, settype] = useState('')
  
   
   var width = Dimensions.get('window').width; //full width
   var height = Dimensions.get('window').height; //full height


   const Jour = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","24", "25", "26", "27", "28", "29", "30", "31"]
const Mois = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12"]
const Annee = ["2022"]

const Heure = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","00"]
const Minute = ["01", "02", "03", "04","05", "06", "07", "08","09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20", "21", "22", "23","24", "25", "26", "27", "28", "29", "30", "31",
"32", "33", "34", "35", "36", "37","38", "39", "40", "41","42", "43", "44", "45", "46", "47", "48", "49", "50", "51","52", "53", "54", "55", "56", "57", "58", "59"]
const Typej = ["Jus","Eau","Caffé","Thé","Lait","Sodas","boisson Alcoolisées","Autre"]

   const handleboi = async () => {

      const res = await boisson(calendrier._id,jour,mois,annee,heure,minute,volume,type);
          

     

      if(!res.success) return updateNotification(setMessage, res.error)
      
      updateNotification(setMessage, res.message,'success')
     
  };


   return (
      <>
      {message.text ?<AppNotification type={message.type} text={message.text}/> : null}
      <View style={{ fontFamily: 'Poppins-Regular',   }}>
         <ScrollView>
            <View style={{ padding: 10,width: width, backgroundColor: '#5B779F', height: 0.1 * height }}>
               <TouchableOpacity>
                  <View></View>
                  <View></View>
               </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center' }}>
               <Image source={require('../images/boisson.png')} style={{
                  width: 0.2 * height, height: 0.2 * height, borderRadius: 100,
                  borderColor: '#fff', borderWidth: 8}}></Image>
 <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15, color: '#3F3D56', marginBottom: 15 }}>La date de calendrier est: {calendrier.jourd}/{calendrier.moisd}/{calendrier.anneed}  </Text>
        
            </View>
            <Formik
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handleboi}
        >



            {()=>{
               
                return(<>
            <View style={{
               alignSelf: 'center',
               justifyContent: 'center',
               backgroundColor: '#fff',
               width: 0.9 * width,
               height: 0.75 * height,
               padding: 10,
               paddingBottom: 22,
               borderRadius: 10,
               shadowOpacity: 80,

               elevation: 15,
               marginTop: 10,
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
               
         <View>
         <Text style={{ fontSize: 15, color: '#3F3D56', fontFamily:'Poppins-Bold', marginLeft: 10 }}>Type de boisson</Text>
               <SelectDropdown
               dropdownStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3}} 
               buttonStyle={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5,width:width/3 }} 
               defaultButtonText={'Quel type?'}
	            data={Typej}
              
	            onSelect={(selectedItem, index) => {
		         settype(selectedItem)
	              }}
	
               />
               
         </View>


               {/* Slider de boisson ! */}
              
               <View style={{fontFamily: 'Poppins-Regular',}} >
<Text style={{ fontSize:20, color:'#E3807B',alignSelf:"center",marginTop:10}}>
<Text style={{ fontSize:16, color:'#3F3D56',alignSelf:"center",marginTop:10}}>Volume: </Text>{volume}</Text>
     <View style={{flexDirection: 'row',marginTop:10}} > 
         <Image source={require('../images/cup1.png')} style={{ width: 20, height: 20,marginLeft:0 }}></Image>
         <Image source={require('../images/cup2.png')} style={{ width: 28, height: 20,marginLeft: 1/3*width}}></Image>
         <Image source={require('../images/cup3.png')} style={{ width: 28, height: 28,marginLeft: 1/3*width}}></Image>


     </View>

     <Slider
          style={{ width: 0.8*width, height:40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#E3807B"
          maximumTrackTintColor="#3F3D56"
          thumbTintColor="#5B779F"
          value={0}
          onValueChange={value => setvolume(parseInt(value * 650+50) + ' ml')}
          onSlidingStart = {() => setSliding('Sliding')}
          onSlidingComplete = {() => setSliding('Inactive')}


     />

     


</View>

<View style={{alignItems:'center', marginTop:20}}>
            <Pressable onPress={handleboi} style={{fontFamily: 'Poppins-Regular',
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
export default Boisson;

