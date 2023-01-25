/* eslint-disable prettier/prettier */
import React from "react";
import { View } from "react-native";
import { StyleSheet, Text, TextInput } from "react-native";
import { Button } from "react-native";


const ResetPassword = () => {
    return (

        <View>


            <View style={{
                padding: 20, marginTop: 160 , borderWidth:2
            }}>
                <Text style={{ fontFamily: "poppins", fontSize: 23, margin: 30, color: "#3F3D56" }}> Changer le mot de passe </Text>
                <View style={[{flexDirection:"row"},{padding:6 , marginLeft:16,}]}>
                <Text style={{ fontFamily: "poppins", fontSize: 20,  color: "#3F3D56" }} >Nouveau</Text>
                    <View style={{ borderWidth: 1 ,marginLeft:34,height:40, width:200}}>
                        <TextInput secureTextEntry style={{}} placeholder="****************" />

                    </View>
                </View>

                <View style={[{flexDirection:"row"},{padding:6 , marginLeft:16,}]}>
                <Text style={{ fontFamily: "poppins", fontSize: 20,  color: "#3F3D56" }} >Confirmer</Text>
                    <View style={{ borderWidth: 1 ,marginLeft:26,height:40, width:200}}>
                        <TextInput secureTextEntry style={{}} placeholder="****************" />

                    </View>
                </View>

                <Text></Text>
                <Button color={"#3F3D56"}   title="Enregistrer " />
            </View>

        </View>


    );
};

export default ResetPassword; 