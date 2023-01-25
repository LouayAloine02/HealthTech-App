/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image, FlatList,
    TouchableOpacity, Button, ScrollView, Dimensions
} from "react-native";

const PageQuiz = ({ navigation, route }) => {
    const { profile, quiz } = route.params
    console.log('f page quiz')
    console.log(quiz)


    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <View style={{ flex: 0.8, backgroundColor: "#5B779F", flexDirection: "row" }} >
                <TouchableOpacity>
                    <Image style={{ marginTop: height * 0.02, marginLeft: width * 0.01 }}
                        source={require('../images/Vector.png')} />
                </TouchableOpacity>

            </View>


            <View style={[{ flex: 7, backgroundColor: "#FFFFFF" }, { flexDirection: "column" },]}>

                <TouchableOpacity style={{ flex: 8, backgroundColor: "#FAE7E6", padding: 70, margin: 15, borderRadius: 20, borderColor: '#E3807B', marginTop: 20, borderWidth: 2 }} onPress={() => navigation.navigate('QuizSingleChoiceApp1', { profile: profile, quiz: quiz })}>

                    <Text style={{
                        textAlign: 'center',
                        color: '#E3807B',
                        fontWeight: 'bold',
                        fontSize: 25,

                    }}>
                        Questionnaire 1

                    </Text>





                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 8, backgroundColor: "#FAE7E6", padding: 70, margin: 15, borderRadius: 20, borderColor: '#E3807B', marginTop: 20, borderWidth: 2 }} onPress={() => navigation.navigate('QuizSingleChoiceApp2', { profile: profile, quiz: quiz })}>

                    <Text style={{
                        textAlign: 'center',
                        color: '#E3807B',
                        fontWeight: 'bold',
                        fontSize: 25,

                    }}>
                        Questionnaire 2

                    </Text>




                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 8, backgroundColor: "#FAE7E6", padding: 70, margin: 15, borderRadius: 20, borderColor: '#E3807B', marginTop: 20, borderWidth: 2 }} onPress={() => navigation.navigate('QuizSingleChoiceApp3', { profile: profile, quiz: quiz })}>

                    <Text style={{
                        textAlign: 'center',
                        color: '#E3807B',
                        fontWeight: 'bold',
                        fontSize: 25,

                    }}>
                        Questionnaire 3

                    </Text>




                </TouchableOpacity>

            </View>
        </View>

    );


}
const styles = StyleSheet.create({
    container: {
        flex: 1

    }
});


export default PageQuiz;