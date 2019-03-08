import React from "react";
import { Button } from 'antd'

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            answers: [],
            startUrl: props.startUrl
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmitQuestionnaire = this.handleSubmitQuestionnaire.bind(this);
    }

    handleTextChange(e, questionId) {
        var values = {
            subQuestionId: 0,
            value: e.target.value
        }

        var answer = {
            questionId: questionId,
            values: values
        };

        this.setState({
            answers: answer
        });
    }

    handleSubmitQuestionnaire(){
        let { answers } = this.state;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
            }
        });

        xhr.open("POST", "https://eval-app.azurewebsites.net/api/v1/forms/1/responses");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "b36d0504-5bb4-42e8-9185-95aeac9a0213");

        xhr.send(answers);
    }

    generateGradingRangeLabels(question) {
        if (!question.range.minText || !question.range.maxText) {
            return null;
        }
        return (
            `${question.range.min}: ${question.range.minText}, ${question.range.max}: ${question.range.maxText}`
        );
    }

    getFooter() {
        return (
            <div style={{ padding: 20, textAlign: 'center' }}>
                <Button type="primary" size="large" onClick={this.handleSubmitQuestionnaire}>Submit</Button>
            </div>
        );
    }

    getTitle() {
        return (
            <div className="editTitle" style={{ margin: '0 20px 20px 20px', padding: 20, textAlign: 'center' }} onClick={this.handleTitleClick}>
                <h2><strong>{this.state.title}</strong></h2>
            </div>
        );
    }

    getQuestions() {
        let questions = this.props.data;

        return questions.map((question) => {
            if (question.type === "multiple") {
                return (
                    <div className="question">
                        <table style={{"width": "100%"}}>
                            <tbody>
                                <tr>
                                    <td className="id-column">{question.id}</td>
                                    <td colSpan="2">{question.phrase}</td>
                                </tr>
                                {question.alternatives.map(alt => {
                                    return (
                                        <tr key={alt.id}>
                                            <td/>
                                            <td className="level2-spacer"/>
                                            <td>{alt.value}</td>
                                            <td className="input-cell"><input type="checkbox"/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
            if (question.type === "grading") {
                const rangeArray = Array.from(
                    new Array(question.range.max - question.range.min + 1),
                    (val, index) => index + question.range.min
                );
                return (
                    <div className="question">
                        <table style={{"width": "100%"}}>
                            <tbody>
                            <tr>
                                <td className="id-column">{question.id}</td>
                                <td>{question.phrase}</td>
                                <td className="input-cell" colSpan={question.range.max - question.range.min + 1 + (question.range.showNotApplicable ? 1 : 0)}/>
                            </tr>
                            <tr>
                                <td/>
                                <td>{ this.generateGradingRangeLabels(question) }</td>
                                {rangeArray.map(index =><td key={index} className="input-cell">{index}</td>)}
                                {question.showNotApplicable ? <td className="input-cell">N/A</td>: null}
                            </tr>
                            {question.subQuestions.map(subQuestion => {
                                return (
                                    <tr key={subQuestion.id}>
                                        <td colSpan="2" style={{"whiteSpace": "nowrap", "paddingRight": "8px", "textAlign": "right"}}>{subQuestion.value}</td>
                                        {rangeArray.map(index => <td key={index} className="input-cell"><input type="radio" name={subQuestion.id}/></td>)}
                                        {question.range.showNotApplicable ? <td className="input-cell"><input type="radio" name={subQuestion.id}/></td> : null}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>                
                    </div>
                );
            }
            if (question.type === "single") {
                return (
                    <div className="question">
                        <table style={{"width": "100%"}}>
                            <tbody>
                            <tr>
                                <td className="id-column">{question.id}</td>
                                <td colSpan="2">{question.phrase}</td>
                            </tr>
                            {question.alternatives.map(alt => {
                                return (
                                    <tr key={alt.id}>
                                        <td/>
                                        <td className="level2-spacer"/>
                                        <td>{alt.value}</td>
                                        <td className="input-cell"><input type="radio" name={question.id}/></td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                );
            }
            if (question.type === "freetext") {
                return (
                    <div className="question">
                        <div className="TextArea">
                            {question.phrase}
                            <textarea className="area form-control" id="exampleFormControlTextarea1" rows="2" onChange={e => this.handleTextChange(e, question.id)}/>
                        </div>
                    </div>
                );
            }
        });
    }

    render() {
        return (
            <div>
                {this.getTitle()}
                {this.getQuestions()}
                {this.getFooter()}
            </div>
        );
    }
}