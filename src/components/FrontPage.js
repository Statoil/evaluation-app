import React from "react";
import { withRouter } from 'react-router-dom'




const Button = withRouter((props) => (
    <button className="btn btn-primary" onClick={() => { props.history.push(props.url);}}
    >
        Click Here!
    </button>
));



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
                <div className="heading-container">
                    <div style={{"float":"right"}}>
                        <img src="/img/equinor-black.png" width="150px"/>
                    </div>
                    <div className="heading">
                        How was your experience today?
                    </div>
                </div>
                <div className="heading-container">
                    <div className="button-area">
                        <Button url={`${this.state.url}/form`}><strong>Click here</strong></Button>
                    </div>
                </div>

            </div>
        );
    }

}