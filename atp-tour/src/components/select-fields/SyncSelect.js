import atp from "../../apis/atp";
import Select from 'react-select'
import React, { useEffect, useState } from "react";

const SyncSelect = ({ id, name, label, showAll, isSubmitted, errorMessage, changeFieldValue, url, selectData,
    getLabel, getValue, className, accessor, value }) => {
    const maxValue = 100000;
    const [selectValues, setSelectValues] = useState([]);
    useEffect(() => {
        if (url) {
            (async () => {
                const { data } = await atp.get(url + '?size=' + maxValue);
                if (showAll) {
                    const allSelectOption = getAllSelectOption(name);
                    accessor ? data[accessor].unshift(allSelectOption) : data.unshift(allSelectOption)
                }
                accessor ? setSelectValues(data[accessor]) : setSelectValues(data)
            })();
        }
        else {
            accessor ? setSelectValues(selectData[accessor]) : setSelectValues(selectData);
        }
    }, [showAll, url, accessor, selectData, name]);

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

    const getAllSelectOption = (name) => {
        if (name.toLowerCase().includes('player')) {
            return { firstName: 'All', lastName: '' };
        }
        else return { name: 'All' };
    }

    return (
        <>

            <label htmlFor={name}>{label}</label>
            <Select id={id} name={name} className={`form-input ${className}`} options={selectValues} onChange={changeValue}
                getOptionLabel={getLabel} getOptionValue={getValue} value={value} />
            {renderError()}
        </>
    );


}

export default SyncSelect;