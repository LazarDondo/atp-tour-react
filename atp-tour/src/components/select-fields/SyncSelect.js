import atp from "../../apis/atp";
import Select from 'react-select'
import React, { useEffect, useState } from "react";

const SyncSelect = ({ id, name, label, showAll, isSubmitted, errorMessage, changeFieldValue, url, 
    getLabel, getValue, className, accessor }) => {
    const maxValue=100000;
    const [selectValues, setSelectValues] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await atp.get(url + '?size='+maxValue);
            if (showAll) {
                accessor ? data[accessor].unshift({ name: 'All' }) : data.unshift({ name: 'All' })
            }
            const content = 'content';
            accessor ? setSelectValues(data[content]) : setSelectValues(data)
        })();
    }, [showAll, url, accessor]);

    const changeValue = (value) => {
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
                getOptionLabel={getLabel} getOptionValue={getValue}/>
            {renderError()}
        </>
    );


}

export default SyncSelect;