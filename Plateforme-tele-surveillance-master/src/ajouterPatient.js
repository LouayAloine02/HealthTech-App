/* eslint-disable prettier/prettier */
import React from "react";
// eslint-disable-next-line prettier/prettier
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
// eslint-disable-next-line prettier/prettier
import { Button } from "react-native";

const AjouterPatient = () => {
    return (


        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <View style={{ flex: 0.8, backgroundColor: "#5B779F" }} >
                <Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, textAlign: 'center', padding: 15 }} >
                    Ajouter Patient
                </Text>
            </View>
            <View style={{ flex: 8, backgroundColor: "#FFFFFF", margin: 15, borderRadius: 20, borderColor: '#3F3D56' }} >
                <View style={{ margin: 20 }}>
                    <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Nom</Text>
                    <TextInput placeholder="Entrer votre Nom" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 5, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
                    <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Prénom</Text>
                    <TextInput placeholder="Entrer votre Prénom" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
                    <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Adresse</Text>
                    <TextInput placeholder="Entrer votre Adresse" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
                    <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Email</Text>
                    <TextInput placeholder="Entrer votre Email" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20 }} />
                    <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Mot de passe</Text>
                    <TextInput placeholder="Entrer votre Mot de passe" style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 10, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />
                    <Text style={{ marginLeft: 12, fontFamily: 'poppins', fontWeight: 'bold', fontSize: 18 }}>Numéro de téléphone</Text>
                    <TextInput placeholder="Numéro de téléphone " style={{ borderWidth: 2, borderColor: '#E3807B', margin: 10, marginBottom: 20, padding: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowRadius: 5 }} />

                    <Button
                        title="Enregistrer"
                        color="#5B779F"
                        borderRadius="40"
                        style={{ margin: '40', padding: 9, borderRadius: 30, width: 30 }}
                    />
                </View>



            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

export default AjouterPatient;