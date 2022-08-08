import React from 'react';
import { connect } from 'react-redux';
import {  update_tournament } from '../../../redux/actions';
import './SaveTournament.css';
import SaveTournamentForm from './SaveTournamentForm';

class SaveTournament extends React.Component {

    onSubmit = tournament => {
        if (this.props.savedTournament.id) {
            this.props.update_tournament(tournament);
        }
        else {
            console.log('Add');
            //this.props.add_tournament(tournament);
        }
    }

    render() {
        return (
            <div id="saveTournament">
                <SaveTournamentForm savedTournament={this.props.savedTournament} successMessage={this.props.successMessage} onSubmit={this.onSubmit} saveTournamentError={this.props.saveTournamentError} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedTournament: state.tournament.savedTournament,
        successMessage: state.tournament.successMessage,
        saveTournamentError: state.tournament.saveTournamentError
    };
}

export default connect(mapStateToProps, { update_tournament })(SaveTournament);
