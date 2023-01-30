import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Table.css';

function Table({ triggerTable }) {

    // Form information
    const [formData, setFormData] = useState({});

    // Everytime triggetTable changes in parent component
    // HTTP GET request is send to server
    // to retrieve latest form data
    useEffect(() => {
        if (triggerTable !== 0) {
            const getFormData = async () => {
                await axios.get('http://127.0.0.1:9000/form')
                    .then(response => {
                        setFormData(response.data);
                        //console.log(`(Table) Response from server: ${response.data}`);
                    }
                    )
                    .catch(e => alert(e));
            }
            getFormData();
        }

    }, [triggerTable]);

    return (
        <div className='table'>
            <h1>Table</h1>
            {Object.keys(formData).map((key, index) => {
                return (
                    <div key={index} className='table__item'>
                        <p className='table__itemLeft'><strong>{key}:</strong></p> <p className='table__itemRight'>{formData[key]}</p>
                    </div>
                );
            })}
        </div >
    );
}

export default Table;
