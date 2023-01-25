/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AjouterSymptomes({ ajouterSymp }) {

    const [text, setText] = useState('');
    const changeHandler = (value) => {
        setText(value);

    }
    return (
        <View>
            <TextInput
                placeholder='Quelle sont les symptômes à ajouter ? ...'
                onChangeText={changeHandler}
                style={styles.input}
            />
           

            <TouchableOpacity style={{ marginBottom: 22 }} onPress={() => ajouterSymp(text)}>
           
                <View style={[styles.button, { flexDirection: 'row' }]}>
                    <Icon size={40} color="#E3807B" name='add-circle'/>
                    <Text style={{ fontSize: 16, fontFamily:'Poppins-Bold', textAlign:'center', marginTop: 9 }}>Ajouter symptômes</Text>

                </View>

            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBotton: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        
        backgroundColor:"#fff",
        marginBottom:10
    },
    button: {

        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#E3807B',
        borderWidth: 2,

    }

})