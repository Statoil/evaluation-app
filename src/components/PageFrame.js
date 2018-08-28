import React from "react";
import Content from './Content';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class PageFrame extends React.Component {

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
                <div className="wrapper">
                    <div className="ipad-frame">
                        <div className="inner-wrapper">

                            <Router>
                                <Route path={`${this.state.matchedUrl}/`} component={Content}/>
                            </Router>

                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}