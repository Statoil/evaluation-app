import React from "react";

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            answers: [],
            startUrl: props.startUrl
        }
    }

    generateGradingRangeLabels() {
        var questions = this.props.data;
        if (!questions.range.minText || !questions.range.maxText) {
            return null;
        }
        return (
            `${questions.range.min}: ${questions.range.minText}, ${questions.range.max}: ${questions.range.maxText}`
        );
    }


    render() {
        var questions = this.props.data;

        if (questions.type === "multiple") {
            return (
                <div className="question">
                    <table style={{"width": "100%"}}>
                        <tbody>
                            <tr>
                                <td className="id-column">{questions.id}</td>
                                <td colSpan="2">{questions.phrase}</td>
                            </tr>
                            {questions.alternatives.map(alt => {
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
        if (questions.type === "grading") {
            const rangeArray = Array.from(
                new Array(questions.range.max - questions.range.min + 1),
                (val, index) => index + questions.range.min
            );
            return (
                <div className="question">
                    <table style={{"width": "100%"}}>
                        <tbody>
                        <tr>
                            <td className="id-column">{questions.id}</td>
                            <td>{questions.phrase}</td>
                            <td className="input-cell" colSpan={questions.range.max - questions.range.min + 1 + (questions.range.showNotApplicable ? 1 : 0)}/>
                        </tr>
                        <tr>
                            <td/>
                            <td>{ this.generateGradingRangeLabels() }</td>
                            {rangeArray.map(index =><td key={index} className="input-cell">{index}</td>)}
                            {questions.showNotApplicable ? <td className="input-cell">N/A</td>: null}
                        </tr>
                        {questions.subQuestions.map(subQuestion => {
                            return (
                                <tr key={subQuestion.id}>
                                    <td colSpan="2" style={{"whiteSpace": "nowrap", "paddingRight": "8px", "textAlign": "right"}}>{subQuestion.value}</td>
                                    {rangeArray.map(index => <td key={index} className="input-cell"><input type="radio" name={subQuestion.id}/></td>)}
                                    {questions.range.showNotApplicable ? <td className="input-cell"><input type="radio" name={subQuestion.id}/></td> : null}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>                </div>
            );
        }
        if (questions.type === "single") {
            return (
                <div className="question">
                    <table style={{"width": "100%"}}>
                        <tbody>
                        <tr>
                            <td className="id-column">{questions.id}</td>
                            <td colSpan="2">{questions.phrase}</td>
                        </tr>
                        {questions.alternatives.map(alt => {
                            return (
                                <tr key={alt.id}>
                                    <td/>
                                    <td className="level2-spacer"/>
                                    <td>{alt.value}</td>
                                    <td className="input-cell"><input type="radio" name={questions.id}/></td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }
        if (questions.type === "freetext") {
            return (
                <div className="question">
                    <div className="text-area-container">
                        {questions.phrase}

                        <textarea className="area form-control" id="exampleFormControlTextarea1" rows="2"/>
                    </div>


                </div>
            );
        }
    }

}