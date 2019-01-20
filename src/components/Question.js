import React from "react";

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.startUrl = props.startUrl;
    }

    generateGradingRangeLabels() {
        if (!this.state.range.minText || !this.state.range.maxText) {
            return null;
        }
        return (
            `${this.state.range.min}: ${this.state.range.minText}, ${this.state.range.max}: ${this.state.range.maxText}`
        );
    }


    render() {
        if (this.state.type === "multiple") {
            return (
                <div className="question">
                    <table style={{"width": "100%"}}>
                        <tbody>
                            <tr>
                                <td className="id-column">{this.state.id}</td>
                                <td colSpan="2">{this.state.phrase}</td>
                            </tr>
                            {this.state.alternatives.map(alt => {
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
        if (this.state.type === "grading") {
            const rangeArray = Array.from(
                new Array(this.state.range.max - this.state.range.min + 1),
                (val, index) => index + this.state.range.min
            );
            return (
                <div className="question">
                    <table style={{"width": "100%"}}>
                        <tbody>
                        <tr>
                            <td className="id-column">{this.state.id}</td>
                            <td>{this.state.phrase}</td>
                            <td className="input-cell" colSpan={this.state.range.max - this.state.range.min + 1 + (this.state.range.showNotApplicable ? 1 : 0)}/>
                        </tr>
                        <tr>
                            <td/>
                            <td>{ this.generateGradingRangeLabels() }</td>
                            {rangeArray.map(index =><td key={index} className="input-cell">{index}</td>)}
                            {this.state.range.showNotApplicable ?<td className="input-cell">N/A</td>: null}
                        </tr>
                        {this.state.subQuestions.map(subQuestion => {
                            return (
                                <tr key={subQuestion.id}>
                                    <td colSpan="2" style={{"whiteSpace": "nowrap", "paddingRight": "8px", "textAlign": "right"}}>{subQuestion.value}</td>
                                    {rangeArray.map(index => <td key={index} className="input-cell"><input type="radio" name={subQuestion.id}/></td>)}
                                    {this.state.range.showNotApplicable ? <td className="input-cell"><input type="radio" name={subQuestion.id}/></td> : null}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>                </div>
            );
        }
        if (this.state.type === "single") {
            return (
                <div className="question">
                    <table style={{"width": "100%"}}>
                        <tbody>
                        <tr>
                            <td className="id-column">{this.state.id}</td>
                            <td colSpan="2">{this.state.phrase}</td>
                        </tr>
                        {this.state.alternatives.map(alt => {
                            return (
                                <tr key={alt.id}>
                                    <td/>
                                    <td className="level2-spacer"/>
                                    <td>{alt.value}</td>
                                    <td className="input-cell"><input type="radio" name={this.state.id}/></td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }
        if (this.state.type === "freetext") {
            return (
                <div className="question">
                    <div className="text-area-container">
                        {this.state.phrase}

                        <textarea className="area form-control" id="exampleFormControlTextarea1" rows="2"/>
                    </div>


                </div>
            );
        }
    }

}