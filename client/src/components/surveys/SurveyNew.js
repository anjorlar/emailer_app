// SurveyNew shows SurveyForm and SurveyFormReview 
import React, { Component } from "react";
import { reduxForm } from 'redux-form'

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    //using component level state
    // constructor(props) {
    //     super(props);

    //     this.state = { new: true };
    // } or the one immediately below

    state = { showFormReview: false }; //setting the initial state to be false

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);