import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Form.css';
import { validEmailRegex, validPasswordRegex } from '../validationRegex';

function Form({ triggerTableRequest }) {

    const [formDefinition, setFormDefinition] = useState([]);   // Form definition
    const [formState, setFormState] = useState([]); // Form state information
    const [inputErrorMessage, setInputErrorMessage] = useState('Input error');
    const [inputError, setInputError] = useState(false);

    // When component is rendered,
    // it will make HTTP GET request
    // and sets form definition from response data
    useEffect(() => {
        const getFormDefinition = async () => {
            await axios.get('http://127.0.0.1:9000/definition')
                .then(response => {
                    setFormDefinition(response.data);
                    //console.log(`(Form) Response from server: ${response.data}`);
                })
                .catch(e => alert(e));
        }
        getFormDefinition();
    }, []);

    // Handle any change in form
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
        //console.log(formState);
    }

    // Handle send button
    const send = (e) => {
        e.preventDefault();
        checkInputError(handleSend);
    }

    // Callback function, which sends data to server or output error message
    const handleSend = ({ error, errorMessage }) => {
        // Error in input
        if (error) {
            setInputError(error);
            setInputErrorMessage(errorMessage);
        }

        // No error
        else {
            const sendData = async () => {
                await axios.post(`http://127.0.0.1:9000/form/create?data=${JSON.stringify(formState)}`)
                    .then(res => {
                        triggerTableRequest(); // After successful post request => trigger table component to get form data from server
                    })
                    .catch(e => alert(e));
            }
            sendData();

            // Clear error handling variables
            setInputError(false);
            setInputErrorMessage('');
        }
    }

    // Checks if there is any kind of error in input fields
    // callback function to send data or output error
    const checkInputError = (callbackFunction) => {
        let error = false;
        let errorMessage = '';

        // Loop through form definition fields
        formDefinition?.map(item => {
            // Invalid password
            if (item.id === 'password' && !validPasswordRegex.test(formState[item.id])) {
                error = true;
                errorMessage = 'Incorrect password';
            }
            // Invalid e-mail
            if (item.id === 'email' && !validEmailRegex.test(formState[item.id])) {
                error = true;
                errorMessage = 'Incorrect e-mail';
            }
            // Input is empty
            if (formState[item.id] === undefined || formState[item.id] === '') {
                error = true;
                errorMessage = 'Empty input';
            }
        });

        callbackFunction({ error, errorMessage });
    }

    return (
        <div className='form'>
            <form>
                <h1>Form</h1>
                {formDefinition?.map(item => (
                    <div key={item.id} className='form__item'>
                        <h5>{item.fieldName}</h5>
                        <input type={item.id === 'password' ? 'password' : item.id === 'email' ? 'email' : 'text'}
                            placeholder={item.fieldName}
                            name={item.id}
                            onChange={e => handleChange(e)} />
                    </div>
                ))}
            </form>
            {inputError &&
                <div className='form__error'>
                    {inputErrorMessage}
                </div>
            }
            <button onClick={send}>SEND</button>
        </div>
    );
}

export default Form;
