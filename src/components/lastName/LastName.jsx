import React from 'react';

const LastName = (props) => {
    return (
        <>
            <label htmlFor='lastName'>
                Last Name:
                <input
                    id='lastName'
                    type='text'
                    name='lastName'
                    value={props.lastName}
                    onChange={props.input}
                />
            </label>

        </>
    );
};

export default LastName;