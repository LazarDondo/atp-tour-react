import React, { useEffect, useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../../form/FormInput';
import FormSubmitNotification from '../../form/FormSubmitNotification';
import FormDatePicker from '../../form/FormDatePicker';
import moment from 'moment';
import SyncSelect from '../../select-fields/SyncSelect';
import TournamentParticipantSelect from '../../select-fields/TournamentParticipantsSelect';
import ParticipantsModal from './ParticipantsModal';


const SaveTournamentForm = ({ onSubmit, handleSubmit, successMessage, saveTournamentError, savedTournament, tournamentTypes }) => {
    const [tournament, setTournament] = useState(savedTournament);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    let minimumDate = new Date();
    let participants = useRef([]);

    useEffect(() => {
        setTournament(savedTournament);
        participants.current = savedTournament.participants;
    }, [savedTournament]);


    const onFormSubmit = () => {
        setIsSubmitted(true);
        const { name, tournamentType, startDate, hostCountry } = tournament;
        if (name && tournamentType && startDate && hostCountry && participants.current.length === 16) {
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

    const tournamentTypeValidation = () => {
        if (isSubmitted && !tournament.tournamentType) {
            return 'Tournament type is required';
        }
    }

    const hostCountryValidation = () => {
        if (isSubmitted && Object.keys(tournament.hostCountry).length === 0) {
            return 'Host country is required';
        }
    }

    const participantsValidation = () => {
        if (isSubmitted && participants.current.length < 16) {
            return 'You must select exactly 16 participants';
        }
    }

    const changeName = (value) => {
        setTournament({ ...tournament, name: value });
    }

    const changeTournamentType = (tournamentType) => {
        setTournament({ ...tournament, tournamentType: tournamentType.value });
    }

    const changeStartDate = (value) => {
        setTournament({ ...tournament, startDate: moment(value).format('MM/DD/YYYY') });
    }

    const changeCountryValue = (value) => {
        setTournament({ ...tournament, hostCountry: value });
    }

    const addParticipant = (value) => {
        const insertIndex = participants.current.findIndex(p => p.rank > value.rank);
        if (insertIndex !== -1) {
            participants.current.splice(insertIndex, 0, value);
        }
        else {
            participants.current.push(value);
        }
        if (participants.current.length === 16) {
            setTournament({ ...tournament, participants: participants.current });
        }
    }

    
    const removeParticipant = (participant) => {
        const index = participants.current.indexOf(participant);
        participants.current.splice(index,1);
        setTournament({ ...tournament, participants: participants.current });
    }

    const clearForm = () => {
        setIsSubmitted(false);
        participants.current = [];
        setTournament({ name: '', tournamentType: '', birthCountry: {}, participants: [] })
    }

    return (
        <>
            {tournament.id ? <h2 id="tournamentTitle">Update Tournament</h2> : <h2 id="tournamentTitle">Add Tournament</h2>}
            <form onSubmit={handleSubmit(onFormSubmit)} >
                <FormInput name="name" type="text" label="Name" fieldValidation={isSubmitted && !tournament.name} value={tournament.name}
                    onChange={(e) => changeName(e.target.value)} isSubmitted={isSubmitted} errorMessage={nameValidation()} />
                <div className='form-group'>
                    {tournament.id ?
                        <FormInput name="tournamentType" type="text" label="Tournament Type" value={tournament.tournamentType} readOnly />
                        :
                        <Field component={SyncSelect} name='tournamentType' label='Tournament Type' changeFieldValue={changeTournamentType}
                            errorMessage={tournamentTypeValidation()} isSubmitted={isSubmitted} selectData={tournamentTypes}
                            getLabel={tournamentType => tournamentType.label} getValue={tournamentType => tournamentType.value} />}
                </div>
                <Field component={FormDatePicker} name="startDate" placeholder="MM/dd/yyyy" label='Start Date' dateValue={tournament.startDate}
                    onChange={changeStartDate} minDate={minimumDate} isSubmitted={isSubmitted} errorMessage={startDateValidation()} readOnly={new Date(tournament.startDate) <= new Date()} />
                {tournament.id ?
                    <Field component={FormDatePicker} name="completionDate" label='Completion Date' dateValue={tournament.completionDate} readOnly />
                    : null}
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
                    {!tournament.id || new Date(tournament.startDate) >= new Date() ?
                        <Field component={TournamentParticipantSelect} name='participants' label='Participants' changeFieldValue={addParticipant}
                            errorMessage={participantsValidation()} isSubmitted={isSubmitted}
                            isDisabled={tournament.participants.length === 16} participants={tournament.participants}
                            getLabel={player => player.firstName + ' ' + player.lastName} getValue={player => player}/>
                        : null}
                </div>
                <ParticipantsModal closeModal={()=>setIsOpen(false)} isOpen={isOpen} participantsList={participants.current}
                 removeParticipant={removeParticipant} tournamentStarted={new Date(tournament.startDate) >= new Date()}/>
                <div className="form-group">
                    <FormSubmitNotification successCondition={isSubmitted && successMessage} errorCondition={saveTournamentError} successMessage={successMessage} errorMessage='Error saving tournament' />
                    <button id="tournamentButton" className="btn btn-primary save-button">{tournament.id ? 'Update' : 'Add'}</button>
                    <button id="showParticipants" type="button" className="btn btn-info " onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(true) }}>Show Participants</button>
                    <button id="clearButton" type="button" onClick={clearForm} className="btn btn-secondary">Clear Form</button>
                </div>
            </form >
        </>
    );
};

export default reduxForm({
    form: 'saveTournament',
})(SaveTournamentForm);