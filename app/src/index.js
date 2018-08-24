import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        return (
            <div className="question">{this.state.phrase}</div>
        );
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [
                "Which of these did you use during your visit today?",
                "On a scale from 1 to 6, how do you rate your overall experience?",
                "How often have you used the Meeting Point?",
                "On a scale from 1 to 6, how do you feel…"
            ]
        };
    }
    render() {
        return (
            <div className="content-area">
                <Question phrase={this.state.question[0]}/>
                <Question phrase={this.state.question[1]}/>
                <Question phrase={this.state.question[2]}/>
                <Question phrase={this.state.question[3]}/>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
<Page />,
    document.getElementById('root')
);
