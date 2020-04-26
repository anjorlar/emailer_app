import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";


const Dashboard = () => <h3>dashboard </h3>
const SurveyNew = () => <h3>surveyNew</h3>
const Landing = () => <h1>landing </h1>


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        console.log('got here apppp')
    }
    render() {
        return (
            <div className='container' >
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact={true} path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);