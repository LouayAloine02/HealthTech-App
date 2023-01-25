/* eslint-disable prettier/prettier */
import { useFormikContext } from "formik";
import React from "react";

import { View,Dimensions, TextInput ,Text} from "react-native" ;

const AddInput =({ placeholder,name,...rest}) => {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    const {errors,values, touched, handleChange,handleBlur} = useFormikContext()

    const value = values[name]
    const error = errors[name]
    const isInputTouched = touched[name]
    return (
        <>
        {error && isInputTouched ? <Text style={{ fontWeight: "bold", color: '#E3807B', fontFamily: 'Poppins-Regular',
}}> {error} </Text>: null}
         <TextInput style={{  fontFamily: 'Poppins-Regular',borderWidth: 2, borderColor: '#E3807B', marginTop: height * 0.01, marginBottom: height * 0.02,  backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 5 }} 
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...rest}
        />
           </>
                   
    )
}
export default AddInput;