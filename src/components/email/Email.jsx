import React from 'react';

const Email = (props) => {
    return (
        <>
            <label htmlFor='email'>
                Email:
                <input
                    id='email'
                    type='text'
                    name='email'
                    value={props.value}
                    onChange={props.input}
                />
            </label>
        </>
    );
};

export default Email;