import React, { useEffect, useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormSubmitNotification from '../../form/FormSubmitNotification';
import FormDatePicker from '../../form/FormDatePicker';


const SaveMatchForm = ({ onSubmit, handleSubmit, successMessage, saveMatchError, savedMatch, possibleResults }) => {
    const [match, setMatch] = useState(savedMatch);
    const [isSubmitted, setIsSubmitted] = useState(false);

    let minimumDate = new Date();
    let result = useRef();

    useEffect(() => {
        setMatch(savedMatch);
    }, [savedMatch]);


    const onFormSubmit = () => {
        setIsSubmitted(true);
        
        if (result) {
            onSubmit(match);
        }
    }

    const matchDateValidation = () => {
        if (isSubmitted && result) {
            return 'Match date is required';
        }
    }

    return (
        <>
            <h2 id="tournamentTitle">Update Match</h2>
            <form onSubmit={handleSubmit(onFormSubmit)} >
                <div className='form-group'>
                    <label>Tournament</label>
                    <input className='form-control' value={match.tournament.name}  readOnly/>
                </div>
                <div className='form-group'>
                    <label>First Player</label>
                    <input className='form-control' value={match.firstPlayer.firstName + ' ' + match.firstPlayer.lastName}  readOnly/>
                </div>
                <div className='form-group'>
                    <label>Second Player</label>
                    <input className='form-control' value={match.secondPlayer.firstName + ' ' + match.secondPlayer.lastName}  readOnly/>
                </div>
                <Field component={FormDatePicker} name="matchDate" placeholder="MM/dd/yyyy" label='Match Date' dateValue={match.matchDate}
                    minDate={minimumDate} isSubmitted={isSubmitted} errorMessage={matchDateValidation()} readOnly />
                <div className='form-group'>
                    <label>Round</label>
                    <input className='form-control' value={match.round}  readOnly/>
                </div>
                <div className='form-group'>
                    <label>Result</label>
                    <input className='form-control' value={match.result ? match.result : ''}  readOnly/>
                </div>
                <div className='form-group'>
                    <label>Winner</label>
                    <input className='form-control' value={match.winner ? match.winner : ''}  readOnly/>
                </div>
               
                <div className="form-group">
                    <FormSubmitNotification successCondition={isSubmitted && successMessage} errorCondition={saveMatchError} successMessage={successMessage} errorMessage='Error updating match' />
                    <button id="updateMatch" className="btn btn-primary save-button">Update</button>
                </div>
            </form >
        </>
    );
};

export default reduxForm({
    form: 'updateMatch',
})(SaveMatchForm);