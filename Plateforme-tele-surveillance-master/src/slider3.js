/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';

export default function ValueSlider2() {
    const [range, setRange] = useState('50%');
    const [sliding, setSliding] = useState('Inactive');
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
    return (
        <View style={{ fontFamily: 'Poppins-Regular', }} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#E3807B', alignSelf: "center", marginTop: 10 }}>{range}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }} >



            </View>

            <Slider
                style={{ width: 0.8 * width, height: 40 }}
                minimumValue={0}
                maximumValue={9}
                minimumTrackTintColor="#E3807B"
                maximumTrackTintColor="#3F3D56"
                thumbTintColor="#5B779F"
                value={0}
                onValueChange={value => setRange(parseInt(value))}
                onSlidingStart={() => setSliding('Sliding')}
                onSlidingComplete={() => setSliding('Inactive')}


            />


        </View>
    );
}