/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, View ,Dimensions,TextInput,Text,TouchableOpacity,Image, Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useRef } from 'react';
import { verifyEmailadmin } from './utilsAuth';
import { StackActions } from '@react-navigation/native';
import {AppNotification, updateNotification } from './appNotifications';



var height = Dimensions.get('window').height; //full height
const inputs = Array(4).fill('');
var width = Dimensions.get('window').width;
let newInputIndex=0;

const isObjectValid = (obj) => {
    return Object.values(obj).every(val => val.trim())
}

const VerificationAdmin = ({ navigation , route}) => {
    const {profile , iduser} = route.params
    console.log("ok")
    console.log(profile)
    const input = useRef();
    const [OTP, setOTP] = useState({0 : '' ,1: '',2: '',3: ''});
    const [nextInputIndex, setNextInputIndex] = useState(0)
    const handleChangeText = (text, index) => {
        const newOTP = {...OTP};
        newOTP[index]=text;
        setOTP(newOTP);
        const lastInputIndex = inputs.length - 1;
        if(!text) newInputIndex = index === 0 ? 0 : index-1 ;
        else newInputIndex = index ===  lastInputIndex ?  lastInputIndex: index+1 ;
        setNextInputIndex(newInputIndex);
    }; 
    useEffect(() => {
        input.current.focus();

    }, [nextInputIndex]);
    
    const [message, setMessage] =useState({
        text:'',
        type:''
    })

    const submitOTP = async () => {
        Keyboard.dismiss();
        if(isObjectValid(OTP)){
            let val ='';
            Object.values(OTP).forEach(v =>{
                val+= v;
            })
            console.log(val)
            console.log(profile.id)
            const res = await verifyEmailadmin(val, profile.id)
            console.log(res)
            if(!res.success) return updateNotification(setMessage, res.error)
            navigation.dispatch(
                StackActions.replace('ListeAdmin',iduser)
            )
        }

    };

    return <>
    {message.text ?<AppNotification type={message.type} text={message.text}/> : null }
    <KeyboardAvoidingView style={{flex:1, justifyContent:'center'}}>
         <View style={{ alignItems:'center'}}> 
                    
                    <Image style={{marginBottom:0.1*height}} source={require('../images/logo.png')}  ></Image>
                </View>

        <Text style={{color:"#3F3D56", textAlign:'center',fontSize:20,fontWeight:'bold', marginBottom: 15}}>Vérifiez votre Email, le code est envoyé!</Text>
               

        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:width/12}}>
            {inputs.map((inp, index) =>{
                return (
                    <View   key={index.toString()} style={{justifyContent:'center', alignItems:'center'}}>
                <TextInput 
              
                value={OTP[index]}
                onChangeText={text => handleChangeText(text, index)}
                placeholder='0' 
               
                ref={nextInputIndex === index ? input : null}
                keyboardType='numeric' 
                maxLength={1}
                style={{textAlign:'center',width:width/6 , height:width/6, borderWidth:2,  borderColor: '#E3807B', paddingHorizontal:15}}/>
                </View>
                );
            })}
        </View>
        <TouchableOpacity onPress={submitOTP}
        style={{
            alignSelf:'center',
            padding:15,
            backgroundColor:'#E3807B',
            borderRadius: 50,
            marginTop:20,
        }}>
            <Icon
            size={24}
            color="#fff"
             name='checkmark-outline'
            />
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </>
}
export default VerificationAdmin;