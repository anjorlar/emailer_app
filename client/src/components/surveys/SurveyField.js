//Surveyfield contains logic to render a single label and text input

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { // {input} destructures input and meta from props i.e(props.input etc) and also does deep nested destructuring for meta to access error, touched etc 
    return (
        <div>
            <label>
                {label}
            </label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    )
}