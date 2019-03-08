import React from "react";
import Question from "./Question";
import Footer from "./Footer";


export default class FormPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
        this.state = {
            startUrl: props.match.url.replace(/form\/?$/, "")
        }
    }

    render() {
        const data = JSON.stringify(require('./questionnaire.json'))
        const questions = JSON.parse(data).questions
        return (
            <div className="content-area">
                <Question data={questions} startUrl={this.state.startUrl}/>
            </div>
        );
    }
}