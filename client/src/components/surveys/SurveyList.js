import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }
    renderSurveys() {
        return this.props.surveys.reverse().map(survey => { // the reverse()  sorts the surveys so the newest shows first
            return (
                <div className="card indigo" key={survey._id}>
                    <div className="card-content">
                        <span className='card-title'> {survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                        {/* stiil working on the logic}
                        {/* <p className='right'>
                            Last Responded On: {new Date(survey.lastResponded).toLocaleDateString()} 
                        </p> */}
                    </div>
                    <div className='card-action'>
                        <a href="#">Yes: {survey.yes}</a>
                        <a href="#">No: {survey.no}</a>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}
function mapStateToProps({ surveys }) { // destructures surveys from state in '../../reducers/index'
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)