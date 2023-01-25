/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';



const Profile = () => (
    <ScrollView>
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <View style={{ backgroundColor: '#5B779F' }} ><Text style={{ color: "#FFFFFF", fontFamily: "Bold", fontSize: 25, padding: 15, textAlign: 'center' }}>Profile</Text></View>

            <View style={{ backgroundColor: "#FCBBB8", padding: 20, margin: 12, borderRadius: 20, borderColor: '#FCBBB8' }} >
                <Image source={require('../images/sarra.png')} style={{ marginLeft: 116, marginBottom: 20 }} />
                <View>
                    <Text style={{ fontWeight: "bold", textAlign: 'center', fontSize: 20, color: '#3F3D56' }}>
                        Sarra Bernard
                    </Text>
                </View>
            </View>


            <View>
                <View style={{ backgroundColor: "#FAE7E6", padding: 20, margin: 25, borderRadius: 20, borderColor: '#3F3D56' }} >
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15, marginBottom: 18 }}>
                            Age:
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15, marginBottom: 18 }}>
                            Sexe:
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15, marginBottom: 18 }}>
                            Adresse:
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15, marginBottom: 18 }}>
                            Num de téléphone:
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15, marginBottom: 18 }}>
                            Email:
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15, marginBottom: 18 }}>
                            Médecin:
                        </Text>
                    </View>



                </View>
            </View>

        </View>
    </ScrollView>


);
export default Profile;

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


