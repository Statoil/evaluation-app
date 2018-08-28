import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageFrame from './components/PageFrame';
import NoFrame from './components/NoFrame';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const RedirComponent = () => (
    <Redirect to="/noframe"/>
);

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/frame" component={PageFrame} />
                    <Route path="/noframe" component={NoFrame} />
                    <Route path="/index.html" component={RedirComponent} />
                    <Route exact path="/" component={RedirComponent} />
                </div>
            </Router>
        );
    }
}


// ========================================

ReactDOM.render(

<App />,
    document.getElementById('root')
);
