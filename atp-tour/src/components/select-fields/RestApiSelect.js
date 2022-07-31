import atp from "../../apis/atp";
import AsyncSelect from 'react-select/async';
import { useState } from "react";

const RestApiSelect = ({ id, name, label, selectValue, filter, isSubmitted, errorMessage, url, getValue, getLabel, searchParam }) => {
    const [inputValue, setValue] = useState('');


    const changeValue = (value) => {
        selectValue(value);
    }

    const renderError = () => {
        if (isSubmitted && errorMessage) {
            return (
                <p id="errorMessage">{errorMessage}</p>
            );
        }
    }

    const fetchData = async () => {
        const results = await atp.get(url + '?' + searchParam + '=' + inputValue.toLocaleLowerCase());
        if (filter) {
            results.data.unshift({ name: 'All' });
        }
        return results.data;
    }

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <AsyncSelect id={id} name={name} onChange={changeValue} className='form-input'
                onInputChange={setValue} loadOptions={() => fetchData()} defaultOptions cacheOptions
                getOptionLabel={getLabel} getOptionValue={getValue} />
            {renderError()}
        </>
    );


}

export default RestApiSelect;