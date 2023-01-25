/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Text, View } from 'react-native'
import QuizeSingleChoice from "react-native-react-native-quiz-single-choice";
import axios from "axios";
import client from "./utilsClient";
import { saveQuestionnaire1 } from "./utilsAuth";
const QuizSingleChoiceApp1 = ({ navigation, route }) => {
    var [List, setList] = useState([])
    const [score1, setScore1] = useState(0)
    const { profile, quiz } = route.params
    console.log('f quiz 1   ')
    console.log(quiz)
    const [resultats, setResultats] = useState(0)



    const data = [
        {
            question:
                "Durant les 4 dernières semaines, pouvez-vous préciser le nombre de fois par semaine où vous avez eu des fuites au cours d’efforts physiques IMPORTANTS",
            optionA: "Jamais de fuites d’urine",
            optionB: "Moins d'une fuite d'urine par semaines",
            optionC: "Plusieurs fuites d'urine par semaines",
            optionD: "Plusieurs fuites d'urine par jours",
            answer: 1


        },
        {
            question:
                "Durant les 4 dernières semaines, pouvez-vous préciser le nombre de fois par semaine où vous avez eu des fuites au cours d’efforts physiques MODERES",
            optionA: "Jamais de fuite d’urine",
            optionB: "Moins d'une fuite d'urine par semaine",
            optionC: "Plusieurs fuites d'urine par semaine",
            optionD: "Plusieurs fuites d'urine par jour",
            answer: 2


        },
        {
            question:
                "Durant les 4 dernières semaines, pouvez-vous préciser le nombre de fois par semaine où vous avez eu des fuites au cours d’efforts physiques LEGERS",
            optionA: "Jamais de fuite d’urines",
            optionB: "Moins d'une fuite d'urines par semaine",
            optionC: "Plusieurs fuites d'urines par semaine",
            optionD: "Plusieurs fuites d'urines par jour",
            answer: 3


        },





    ];

    const calculScore = (result) => {
        var y = 0;

        result.map((value, i) => {
            data.map((succ, j) => {
                if (value.response == succ.optionA) {
                    console.log('optionA')
                } else if (value.response == succ.optionB) {
                    y = y + 1
                    console.log('optionB')
                } else if (value.response == succ.optionC) {
                    y = y + 2
                    console.log('optionC')
                } else if (value.response == succ.optionD) {
                    y = y + 3
                    console.log('optionD')
                }
            })
        })

        console.log(quiz._id)

        console.log(y)
        const cte = saveQuestionnaire1(y, quiz._id);
        navigation.navigate('PageQuiz', { profile: profile, quiz: quiz })
    }
    return (
        <>
            <QuizeSingleChoice
                containerStyle={{ backgroundColor: "#FEBFBC", paddingTop: 30 }}
                questionTitleStyle={{ fontSize: 20, color: "#000" }}
                responseStyle={{
                    borderRadius: 15,
                    backgroundColor: "#5B779F"
                }}
                responseTextStyle={{ fontSize: 12, fontWeight: "normal" }}
                selectedResponseStyle={{
                    borderRadius: 15,
                    backgroundColor: "#FCC050",
                }}
                selectedResponseTextStyle={{
                    fontSize: 14,
                    fontWeight: "normal",
                }}
                responseRequired={true}
                nextButtonText={"Next"}
                nextButtonStyle={{ backgroundColor: "#06d755" }}
                nextButtonTextStyle={{ color: "#FFF" }}
                prevButtonText={"Prev"}
                prevButtonStyle={{ backgroundColor: "#fa5541" }}
                prevButtonTextStyle={{ color: "#FFF" }}
                endButtonText={"Done"}
                endButtonStyle={{ backgroundColor: "#5B779F" }}
                endButtonTextStyle={{ color: "#FFF" }}
                buttonsContainerStyle={{ marginTop: "auto" }}
                onEnd={results => calculScore(results)}
                data={data}

            />




        </>




    );

};

export default QuizSingleChoiceApp1;