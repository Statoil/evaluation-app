import React from "react";
import Content from './Content';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class NoFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFrame: props.match.params.showFrame === "true",
            matchedUrl : props.match.url
        };
    }

    render() {
        return (
            <Router>
                <Route path={`${this.state.matchedUrl}/`} component={Content}/>
            </Router>
        )
    }

}