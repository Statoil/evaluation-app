import React from "react";
import Question from "./Question";


export default class FormPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
        this.state = {
            startUrl: props.match.url.replace(/form\/?$/,"")
        }
    }

    render() {
        const data = FormPage.data();
        return (
            <div className="content-area">
                { data.map(question => <Question data={question} key={question.id} startUrl={this.state.startUrl}/>)}
            </div>
        );
    }

    static data() {
        return [
            {
                id: "1.0",
                phrase: "Which of these did you use during your visit today?",
                type: "multiple",
                alternatives: [
                    {id: 1, value: "The Bar"},
                    {id: 2, value: "The Lounge"},
                    {id: 3, value: "The Booth"},
                    {id: 4, value: "Surface Hub (the digital whiteboard)"},
                    {id: 5, value: "Collaboration desks"},
                    {id: 6, value: "I just came for the coffee"}
                ]
            },
            {
                id: "2.0",
                phrase: "How do you rate your overall experience?",
                type: "grading",
                range: {
                    min: 1,
                    max: 6,
                    minText: "Very Bad",
                    maxText: "Very Good",
                    showNotApplicable: true
                },
                subQuestions: [
                    {id: "2.1", value: "The Bar"},
                    {id: "2.2", value: "The Lounge"},
                    {id: "2.3", value: "The Booth"},
                    {id: "2.4", value: "Surface Hub (the digital whiteboard)"},
                    {id: "2.5", value: "Collaboration desks"},
                    {id: "2.6", value: "I just came for the coffee"},
                ]
            },
            {
                id: "3.0",
                phrase: "How often have you used the meeting point?",
                type: "single",
                alternatives: [
                    {id: 1, value: "First time"},
                    {id: 2, value: "Seldom"},
                    {id: 3, value: "Monthly"},
                    {id: 4, value: "Weekly"},
                    {id: 5, value: "Daily"}
                ]
            },
            {
                id: "4.0",
                phrase: "feel...",
                type: "grading",
                range: {
                    min: 1,
                    max: 6,
                    minText: "Do not agree",
                    maxText: "Fully agree",
                    showNotApplicable: false
                },
                subQuestions: [
                    {id: "4.1", value: "the visit enabled me to be more productive"},
                    {id: "4.2", value: "this visit has positively added to my overall workday"},
                    {id: "4.3", value: "ths area adds value to working at Equinor"},
                    {id: "4.4", value: "this visit enabled me to collaborate efficiently"},
                ]
            },
            {
                id: "5.0",
                phrase: "Do you have any additional comments about Meeting Point?",
                type: "freetext"
            }
        ]
    }
}