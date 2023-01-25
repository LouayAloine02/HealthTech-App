/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import { Text } from "react-native";
import QuizeSingleChoice from "react-native-react-native-quiz-single-choice";
import { saveQuestionnaire2 } from "./utilsAuth";

const QuizSingleChoiceApp2 = ({ navigation ,route}) => {
    var [List, setList] = useState([])
    var [L, setL] = useState([])
    const [score1, setScore1] = useState(0)
    const { profile, quiz } = route.params
    console.log('f quiz 2  ')
    console.log(quiz)

    const data = [

        {
            question:
                "Durant les 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, combien de fois avez-vous dû vous précipiter aux toilettes pour uriner en raison d’un besoin urgent ? ",
            optionA: "Jamais",
            optionB: "Moins d'une fois par semaine",
            optionC: "Plusieurs fois par semaine",
            optionD: "Plusieurs fois par jour",
            answer: 1


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, quand vous êtes pris par un besoin urgent d’uriner, combien de minutes en moyenne pouvez-vous vous retenir ?:",
            optionA: "Plus de 15 minutes",
            optionB: "De 6 à 15 minutes",
            optionC: "De 1 à 5 minutes",
            optionD: "Moins de 1 minute",
            answer: 2


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, combien de fois avez-vous eu une fuite d’urine précédée d’un besoin urgent d’uriner que vous n’avez pas pu contrôler ?",
            optionA: "Jamais ",
            optionB: "Moins d'une fois par semaines ",
            optionC: "Plusieurs fois par semaines ",
            optionD: "Plusieurs fois par jours ",
            answer: 3


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, Dans ces circonstances, quel type de fuites avez-vous ?",
            optionA: "Pas de fuites dans cette circonstance",
            optionB: "Quelques gouttes",
            optionC: "Fuites en petites quantités",
            optionD: "Fuites inondantes",
            answer: 4


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales , pendant la journée, quel est le temps habituel espaçant deux mictions (action d’uriner) ?",
            optionA: "Deux heures ou plus",
            optionB: "Entre 1 heure et 2 heures",
            optionC: "Entre 30 minutes et 1 heure",
            optionD: "Moins de 30 minutes",
            answer: 5


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales ,Combien de fois en moyenne avez-vous été réveillé(e) la nuit par un besoin d’uriner ?",
            optionA: "0 ou 1 fois",
            optionB: "2 fois",
            optionC: "3 ou 4 fois",
            optionD: "Plus de 4 fois",
            answer: 6


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, combien de fois avez-vous eu une fuite d’urine en dormant ou vous êtes-vous réveillé(e) / mouillé(e) ?",
            optionA: "Jamais  ",
            optionB: "Moins d une fois par semaine  ",
            optionC: "Plusieurss fois par semaine  ",
            optionD: "Plusieurss fois par jour  ",
            answer: 7


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
        console.log(y)
        const cte = saveQuestionnaire2(y, quiz._id);
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

export default QuizSingleChoiceApp2;