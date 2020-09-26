//Surveyfield contains logic to render a single label and text input

import React from 'react';
import'./Survey.css';

export default ({ input, label, meta: { error, touched } }) => { // {input} destructures input and meta from props i.e(props.input etc) and also does deep nested destructuring for meta to access error, touched etc 
    return (
        <div>
            <label className="f4 bg-near-white br3 br--top black-60 mv0 pv1 ph3">
                {label}
            </label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    )
}