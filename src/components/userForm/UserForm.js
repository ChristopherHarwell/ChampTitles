/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from 'react';
import './UserForm.css'
import * as yup from 'yup';
import LastName from '../lastName/LastName';
import Email from '../email/Email';
import Submit from '../SubmitButton/SubmitButton';
import PhoneNumber from '../phoneNumber/PhoneNumber';
import FirstName from '../firstName/FirstName';
import CustomersTable from '../userTable/CustomersTable';
import { CustomerContext } from '../../contexts/CustomerContexts';
import axios from 'axios'

const UserForm = () => {



    // Form State
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    // state for errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })


    // state for customer
    const [customer, setCustomer] = useState([]);


    // use yup to create form schema
    const formSchema = yup.object().shape({
        firstName: yup
            .string()
            .required("First name is a required field"),
        lastName: yup
            .string()
            .required("Last name is a required field"),
        email: yup
            .string()
            .email()
            .required("Email is a required field"),
        phoneNumber: yup
            .string()
            .required("Phone number is a required field")

    });

    // keep track of input state
    const inputChanged = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]: event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };
    // submit button state
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const validateEmail = (valid) => {
        if (customer.length > 0) {
            for (let i = 0; i < customer.length; i++) {
                if (customer[i].email === formState.email) {
                    alert("Invalid Email Please Try Again!")
                    return setButtonDisabled(!valid)

                }
            }


        }
    }



    // handle state when form is submitted
    const submitForm = event => {
        event.preventDefault();
        axios
            .post('localhost:8000/customers', formState)
            .then((res) => {
                setCustomer([res.data, ...customer]);
                // clear state after submitting
                setFormState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: ''
                })
            })
            .catch(err => console.error(err.res))
            console.log(customer)
            // handleGetCustomer(event);
    };



    /** Each time the form value state is updated, check to see if it is valid per our schema.
     * This will allow us to enable/disable the submit button
     */
    useEffect(() => {
        // when input is valid change button state
        formSchema
            .isValid(formState)
            .then(valid => {
                setButtonDisabled(!valid)
                validateEmail();
            })
    }, [formState]);

    // useEffect(() => {
    //     axios.get('localhost:8000/customers')
    // })
    // validate changes based on schema
    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors, [event.target.name]: ''
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            });
    };


    return (
        <CustomerContext.Provider value={customer}>
            <div className="UserForm">
                <form class="Form" onSubmit={submitForm} >
                    <FirstName
                        firstName={formState.firstName}
                        input={inputChanged}
                    />
                    {
                        errors.firstName.length > 0 ?
                            (<p className='error' > { errors.firstName} </p>)
                            : null
                    }
                    <LastName
                        lastName={formState.lastName}
                        input={inputChanged}
                    />
                    {
                        errors.lastName.length > 0 ?
                            (<p className='error' > { errors.lastName} </p>)
                            : null
                    }
                    < Email
                        value={formState.email}
                        input={inputChanged}
                    />
                    {
                        errors.email.length > 0 ?
                            (<p className='error' > { errors.email} </p>)
                            : null
                    }
                    <PhoneNumber
                        value={formState.phoneNumber}
                        input={inputChanged}
                    />
                    {
                        errors.phoneNumber.length > 10 ?
                            (<p className='error' > { errors.phoneNumber} </p>)
                            : null
                    }


                    <Submit
                        value={formState.submit}
                        input={inputChanged}
                        disabled={buttonDisabled}
                    />
                </form>
                <CustomersTable />
            </div>
        </CustomerContext.Provider>

    );
};

export default UserForm;
