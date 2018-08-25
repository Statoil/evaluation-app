import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageFrame from './components/PageFrame';
import NoFrame from './components/NoFrame';
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/frame" component={PageFrame} />
                    <Route path="/noframe" component={NoFrame} />
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
