import React from 'react';

const FirstName = (props) => {
    return (
        <>
            <label htmlFor='firstName'>
                First Name:
                <input
                    id='firstName'
                    type='text'
                    name='firstName'
                    value={props.firstName}
                    onChange={props.input}
                />
            </label>

        </>
    );
};

export default FirstName;