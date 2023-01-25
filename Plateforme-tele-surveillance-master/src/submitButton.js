/* eslint-disable prettier/prettier */
import { useFormikContext } from "formik";
import React from "react";

import { View,Dimensions,Text, Pressable } from "react-native" ;

const SubmitButton =({title}) => {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    const {handleSubmit, isSubmitting}=useFormikContext();
   
    return (
        <Pressable onPress={isSubmitting ? null : handleSubmit} style={{borderRadius: 20,
            paddingVertical: 14,
            paddingHorizontal: 10,
          
            width: 250,
            backgroundColor: isSubmitting ? 'gray' : '#5B779F'}}>

            <Text style={{color: 'white',
             fontFamily: 'Poppins-Bold',
           
           fontSize: 16,
           textAlign: 'center',}}>{title}
           </Text>
       </Pressable>
                       
    )
}
export default SubmitButton;