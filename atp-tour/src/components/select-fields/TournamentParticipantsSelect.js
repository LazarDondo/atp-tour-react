import atp from "../../apis/atp";
import Select from 'react-select'
import React, { useEffect, useState } from "react";

const SyncSelect = ({ id, name, label, isSubmitted, errorMessage, changeFieldValue, 
    getLabel, getValue, className, isDisabled, participants }) => {
    const maxValue=100000;
    const [selectValues, setSelectValues] = useState([]);


    useEffect(() => {
        if(!isDisabled){
        (async () => {
            const { data } = await atp.get('player?size='+maxValue);
            const content = 'content';
            participants.forEach(participant => {
                const index = data[content].findIndex(p => p.rank === participant.rank);
                data[content].splice(index,1);
            });
            setSelectValues(data[content]);
        })();
    }
    }, [participants, isDisabled]);

    const changeValue = (value) => {
        selectValues.splice(selectValues.indexOf(value),1);
        changeFieldValue(value);
    }

    const renderError = () => {
        if (isSubmitted && errorMessage) {
            return (
                <p id="errorMessage">{errorMessage}</p>
            );
        }
    }

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Select id={id} name={name} className={`form-input ${className}`} options={selectValues} onChange={changeValue}
                getOptionLabel={getLabel} getOptionValue={getValue} isDisabled={isDisabled}/>
            {renderError()}
        </>
    );


}

export default SyncSelect;