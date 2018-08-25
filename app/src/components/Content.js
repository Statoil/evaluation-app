import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FormPage from './FormPage';
import FrontPage from './FrontPage';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: props.match
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path={`${this.state.match.url}/`} component={FrontPage}/>
                    <Route path={`${this.state.match.url}/form`} component={FormPage}/>
                </div>
            </Router>
        );
    }
}