import React from "react";
import {withRouter} from "react-router-dom";
import { Button } from 'antd'

const SubmitButton = withRouter((props) => (
    <Button className="btn btn-primary" onClick={() => { console.log("url: " + props.url); props.history.push(props.url);}}
            style={{"float": "right", "fontSize": "3vh"}}>
        Submit
    </Button>
));

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url
        }
    }

    render() {
        return (
            <div className="form-footer">
                <SubmitButton url={this.state.url}/>
            </div>
        );
    }
}