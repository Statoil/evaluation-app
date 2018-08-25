import React from "react";
import { Link } from "react-router-dom";

export default class FrontPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.match.url.replace(/\/$/,"")
        };
    }

    render() {
        return (
            <div className="content-area">
                Front Page

                <Link to={`${this.state.url}/form`}>Form</Link>
            </div>
        );
    }
}