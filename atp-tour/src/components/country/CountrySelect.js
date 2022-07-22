import atp from "../../apis/atp";
import AsyncSelect from 'react-select/async';
import { useState } from "react";
import './CountrySelect.css';

const CountrySelect = (props) => {

    const [inputValue, setValue] = useState('');

    const loadOptions = async () => {
        const countries = await atp.get('/country', { params: { name: inputValue.toLocaleLowerCase() } });
        countries.data.unshift({ name: 'All' });
        return countries.data;
    }

    const changeValue = (value) => {
        props.changeCountryValue(value);
    }

    return (
        <AsyncSelect id="countrySelect" onChange={changeValue} onInputChange={setValue} defaultOptions cacheOptions loadOptions={loadOptions} getOptionValue={country => country} getOptionLabel={country => country.name} />
    );


}

export default CountrySelect;