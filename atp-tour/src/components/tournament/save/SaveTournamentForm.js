import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../../form/FormInput';
import FormSubmitNotification from '../../form/FormSubmitNotification';
import FormDatePicker from '../../form/FormDatePicker';
import moment from 'moment';
import SyncSelect from '../../select-fields/SyncSelect';


const SaveTournamentForm = ({ onSubmit, handleSubmit, successMessage, saveTournamentError, savedTournament }) => {
    const [tournament, setTournament] = useState(savedTournament);
    const [isSubmitted, setIsSubmitted] = useState(false);

    let minimumDate = new Date();

    useEffect(() => {
        setTournament(savedTournament);
    }, [savedTournament]);


    const onFormSubmit = () => {
        setIsSubmitted(true);
        const { name, tournamentType, startDate, completionDate, hostCountry } = tournament;
        if (name && tournamentType && startDate && completionDate && hostCountry) {
            onSubmit(tournament);
        }
    }

    const nameValidation = () => {
        if (!tournament.name) {
            return 'Name is required';
        }
    }

    const startDateValidation = () => {
        if (!tournament.startDate) {
            return 'Start date is required';
        }
    }

    const completionDateValidation = () => {
        if (!tournament.completionDate) {
            return 'Completion date is required';
        }
    }

    const hostCountryValidation = () => {
        if (isSubmitted && !tournament.hostCountry) {
            return 'Host country is required';
        }
    }

    const changeName = (value) => {
        setTournament({ ...tournament, name: value });
    }

    const changeTournamentType = (value) => {
        setTournament({ ...tournament, tournamentType: value });
    }

    const changeStartDate = (value) => {
        setTournament({ ...tournament, startDate: moment(value).format('MM/DD/YYYY') });
    }

    const changeCompletionDate = (value) => {
        setTournament({ ...tournament, completionDate: moment(value).format('MM/DD/YYYY') });
    }

    const changeCountryValue = (value) => {
        setTournament({ ...tournament, hostCountry: value });
    }

    const clearForm = () => {
        setIsSubmitted(false);
        setTournament({ name: '', tournamentType: '', birthCountry: {} })
    }

    return (
        <>
            {tournament.id ? <h2 id="tournamentTitle">Update Tournament</h2> : <h2 id="tournamentTitle">Add Tournament</h2>}
            <form onSubmit={handleSubmit(onFormSubmit)} >
                <FormInput name="name" type="text" label="Name" fieldValidation={isSubmitted && !tournament.name} value={tournament.name}
                    onChange={(e) => changeName(e.target.value)} isSubmitted={isSubmitted} errorMessage={nameValidation()} />

                <FormInput name="tournamentType" type="text" label="Tournament Type" value={tournament.tournamentType}
                    onChange={(e) => changeTournamentType(e.target.value)} isSubmitted={isSubmitted} readOnly={tournament.id} />


                <Field component={FormDatePicker} name="startDate" placeholder="MM/dd/yyyy" label='Start Date' dateValue={tournament.startDate}
                    onChange={changeStartDate} minDate={minimumDate} isSubmitted={isSubmitted} errorMessage={startDateValidation()} readOnly={new Date(tournament.startDate) <= new Date()} />

                <Field component={FormDatePicker} name="completionDate" placeholder="MM/dd/yyyy" label='Completion Date' dateValue={tournament.completionDate}
                    onChange={changeCompletionDate} minDate={minimumDate} isSubmitted={isSubmitted} errorMessage={completionDateValidation()} readOnly={tournament.id} />

                <div className='form-group'>
                    {tournament.id ?
                        <FormInput name="hostCountry" type="text" label="Host Country" value={tournament.hostCountry.name}
                            onChange={(e) => changeCountryValue(e.target.value)} readOnly />
                        :
                        <Field component={SyncSelect} name='hostCountry' label='Host Country' changeFieldValue={changeCountryValue}
                            errorMessage={hostCountryValidation()} isSubmitted={isSubmitted} url='country'
                            getLabel={country => country.name} getValue={country => country} />}
                </div>
                <div className="form-group">
                    <FormSubmitNotification successCondition={isSubmitted && successMessage} errorCondition={saveTournamentError} successMessage={successMessage} errorMessage='Error saving tournament' />
                    <button id="tournamentButton" className="btn btn-primary save-button">{tournament.id ? 'Update' : 'Add'}</button>
                    <button id="clearButton" type="button" onClick={clearForm} className="btn btn-secondary">Clear Form</button>
                </div>
            </form >
        </>
    );
};

export default reduxForm({
    form: 'saveTournament',
})(SaveTournamentForm);