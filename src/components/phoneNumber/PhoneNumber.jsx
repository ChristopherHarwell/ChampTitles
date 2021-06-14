import React from 'react';

const PhoneNumber = (props) => {
    return (
        <>
        <label htmlFor='phoneNumber'>
            Phone Number:
            <input
                id='phoneNumber'
                type='tel'
                name='phoneNumber'
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                placeholder="800-123-4567"
                value={props.value}
                onChange={props.input}
            />
        </label>
        <br/>
    </>
    );
};

export default PhoneNumber;