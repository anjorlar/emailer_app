import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./Header";
const Dashboard = () => <h3>dashboard </h3>
const SurveyNew = () => <h3>surveyNew</h3>
const Landing = () => <h1>landing </h1>


const App = () => {
    return (
        <div>
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
};

export default App;