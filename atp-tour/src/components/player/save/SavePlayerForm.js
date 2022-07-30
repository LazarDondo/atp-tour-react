import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../../form/FormInput';
import FormSubmitNotification from '../../form/FormSubmitNotification';
import CountrySelect from '../../country/CountrySelect';
import FormDatePicker from '../../form/FormDatePicker';
import moment from 'moment';


const SavePlayerForm = ({ onSubmit, handleSubmit, successMessage, savePlayerError, savedPlayer }) => {
    const [player, setPlayer] = useState(savedPlayer);
    const [isSubmitted, setIsSubmitted] = useState(false);

    let maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() - 16);

    useEffect(() => {
        setPlayer(savedPlayer);
    }, [savedPlayer]);


    const onFormSubmit = () => {
        console.log(player);
        setIsSubmitted(true);
        const { firstName, lastName, birthCountry, dateOfBirth } = player;
        if (firstName && lastName && birthCountry && dateOfBirth) {
            onSubmit(player);
        }
    }

    const firstNameValidation = () => {
        if (!player.firstName) {
            return 'First name is required';
        }
    }

    const lastNameValidation = () => {
        if (!player.lastName) {
            return 'Last name is required';
        }
    }

    const dateOfBirthValidation = () => {
        if (!player.dateOfBirth) {
            return 'Date of birth is required';
        }
    }

    const birthCountryValidation = () => {
        if (isSubmitted && !player.birthCountry) {
            return 'You must select birth country';
        }
    }

    const changeFirstName = (value) => {
        setPlayer({ ...player, firstName: value });
    }
    const changeLastName = (value) => {
        setPlayer({ ...player, lastName: value });
    }

    const changeCountryValue = (value) => {
        setPlayer({ ...player, birthCountry: value });
    }
    const changeDate = (value) => {
        setPlayer({ ...player, dateOfBirth: moment(value).format('MM/DD/YYYY') });
    }

    const clearForm = () => {
        setIsSubmitted(false);
        setPlayer({ firstName: '', lastName: '', birthCountry: {} })
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} >
            <FormInput name="firstName" type="text" label="First Name" fieldValidation={isSubmitted && !player.firstName} value={player.firstName}
                onChange={(e) => changeFirstName(e.target.value)} isSubmitted={isSubmitted} errorMessage={firstNameValidation()} />

            <FormInput name="lastName" type="text" label="Last Name" fieldValidation={isSubmitted && !player.lastName} value={player.lastName}
                onChange={(e) => changeLastName(e.target.value)} isSubmitted={isSubmitted} errorMessage={lastNameValidation()} />

            <div className='form-group'>
                {player.id ?
                    <FormInput name="birthCountry" type="text" label="Birth Country" value={player.birthCountry.name}
                        onChange={(e) => changeCountryValue(e.target.value)} readOnly />
                    :
                    <Field component={CountrySelect} changeCountryValue={changeCountryValue} name='birthCountry'
                        label='Birth Country' errorMessage={birthCountryValidation()} isSubmitted={isSubmitted} />}
            </div>

            <Field component={FormDatePicker} name="dateOfBirth" placeholder="MM/dd/yyyy" label='Date of Birth' dateValue={player.dateOfBirth}
                onChange={changeDate} maxDate={maximumDate} isSubmitted={isSubmitted} errorMessage={dateOfBirthValidation()} readOnly={player.id} />

            <div className="form-group">
                <FormSubmitNotification successCondition={isSubmitted && successMessage} errorCondition={savePlayerError} successMessage={successMessage} errorMessage='Error saving player' />
                <button id="playerButton" className="btn btn-primary">{player.rank ? 'Update' : 'Add'}</button>
                <button id="    " type="button" onClick={clearForm} className="btn btn-secondary">Clear Form</button>
            </div>
        </form >
    );
};

export default reduxForm({
    form: 'savePlayer',
})(SavePlayerForm);