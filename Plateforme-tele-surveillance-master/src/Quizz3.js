/* eslint-disable prettier/prettier */
import React, { useState } from "react";

import QuizeSingleChoice from "react-native-react-native-quiz-single-choice";
import { saveQuestionnaire3 } from "./utilsAuth";

const QuizSingleChoiceApp3 = ({ navigation, route }) => {
    var [List, setList] = useState([])
    const [score1, setScore1] = useState(0)
    const { profile, quiz } = route.params
    console.log('f quiz 3   ')
    console.log(quiz)

    var score3 = 0;

    const data = [

        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, comment décririez-vous votre miction (action d’uriner) habituelle durant ces 4 dernières semaines ?",
            optionA: "Normale",
            optionB: "Nécessité de pousser avec les muscles abdominaux (du ventre) ou miction penchée en avant (ou nécessitant un changement de position)",
            optionC: "Nécessité d’appuyer sur le bas ventre avec les mains",
            optionD: "Vidange par sonde urinaire",
            answer: 1


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, en général, comment décririez-vous votre jet d’urine ?",
            optionA: "Normal",
            optionB: "Jet faible",
            optionC: "Goutte à goutte",
            optionD: "Vidange par sondes urinaires",
            answer: 2


        },
        {
            question:
                "Durant ces 4 dernières semaines et dans les conditions habituelles de vos activités sociales, professionnelles ou familiales, En général, comment s’effectue votre miction (action d’uriner) ?",
            optionA: "Miction normale et rapide",
            optionB: "Miction difficile à débuter puis s’effectuant normalement",
            optionC: "Miction débutant facilement mais longue à terminer",
            optionD: "Miction très lente du début jusqu’à la fin",
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
                    // console.log(succ)
                }
                // else if (value.response == succ.optionE) {
                //     y = y + 4
                //     console.log('optionE')
                // }
            })
        })
        console.log(y)
        const cte = saveQuestionnaire3(y, quiz._id);
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

export default QuizSingleChoiceApp3;