//SurveyFormReview shows users their form input for review
import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom';


import formFields from './formFields';
import * as actions from '../../actions'


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewField = _.map(formFields, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    })

    return (
        <div>
            <h5>
                Please confirm your entries
            </h5>
            {reviewField}
            <button className='yellow darken-3 btn-flat' onClick={onCancel}>
                Back
           <i className="material-icons left">undo</i>
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="teal btn-flat right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));