import React from 'react';
import { connect } from 'react-redux';
import { add_tournament, update_tournament } from '../../../redux/actions';
import './SaveTournament.css';
import SaveTournamentForm from './SaveTournamentForm';

class SaveTournament extends React.Component {

    onSubmit = tournament => {
        if (tournament.id) {
            this.props.update_tournament(tournament);
        }
        else {
            this.props.add_tournament(tournament);
        }
    }

    render() {
        return (
            <div id="saveTournament">
                <SaveTournamentForm savedTournament={this.props.savedTournament} successMessage={this.props.successMessage}
                    onSubmit={this.onSubmit} saveTournamentError={this.props.saveTournamentError} tournamentTypes={this.props.tournamentTypes} />
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

export default connect(mapStateToProps, { add_tournament, update_tournament })(SaveTournament);
