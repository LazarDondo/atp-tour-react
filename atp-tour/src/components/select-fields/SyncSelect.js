import atp from "../../apis/atp";
import Select from 'react-select'
import { useEffect, useState } from "react";

const SyncSelect = ({ id, name, label, filter, isSubmitted, errorMessage, changeFieldValue, url, getLabel, getValue }) => {

    const [selectValues, setSelectValues] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await atp.get(url);
            if (filter) {
                data.unshift({ name: 'All' });
            }
            setSelectValues(data);
        })();
    },[filter, url]);

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
            <Select id={id} name={name} className='form-input' options={selectValues} onChange={changeValue}
                getOptionLabel={getLabel} getOptionValue={getValue} />
            {renderError()}
        </>
    );


}

export default SyncSelect;