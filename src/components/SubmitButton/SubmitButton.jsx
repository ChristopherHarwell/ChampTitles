import React from 'react';
import './SubmitButton.css'
const Submit = (props) => {
    return (
        <button disabled={props.disabled}>Submit</button>
    );
};

export default Submit;