import React, { useEffect, useState } from 'react';
import Modal from '../../modal/Modal';


const ParticipantsModal = ({ closeModal, isOpen, participantsList, removeParticipant, tournamentStarted }) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        setParticipants(participantsList);
    }, [participantsList]);

    const showParticipants = () => {
        const firstChunk = participants.slice(0, 8);
        const secondChunk = participants.slice(8, 16);
        return (
            <div className='row'>
                <div className='col-md-6'>
                    {
                        firstChunk.map((participant) =>
                            <p key={participant.rank}>
                                {participant.firstName} {participant.lastName} ({participant.rank})
                                {tournamentStarted ?
                                    <i className="fa fa-remove remove-participant" onClick={() => removeParticipant(participant)} />
                                    : null}
                            </p>)
                    }
                </div>
                <div className='col-md-6'>
                    {
                        secondChunk.map((participant) =>
                            <p key={participant.rank}>
                                {participant.firstName} {participant.lastName} ({participant.rank})
                                {tournamentStarted ?
                                    <i className="fa fa-remove remove-participant" onClick={() => removeParticipant(participant)} />
                                    : null}
                            </p>)
                    }
                </div>
            </div>
        )
    }

    return (
        <Modal handleClose={closeModal} isOpen={isOpen} title='Participants'>
            {showParticipants()}
        </Modal>
    );
}

export default ParticipantsModal;