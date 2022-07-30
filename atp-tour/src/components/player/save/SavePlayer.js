import React from 'react';
import { connect } from 'react-redux';
import { add_player, update_player } from '../../../redux/actions';
import SavePlayerForm from './SavePlayerForm';
import './SavePlayer.css';

class SavePlayer extends React.Component {

    onSubmit = player => {
        if (this.props.savedPlayer.rank) {
            this.props.update_player(player);
        }
        else {
            this.props.add_player(player);
        }
    }

    render() {
        return (
            <div id="savePlayer">
                {this.props.savedPlayer.rank? <h2 id="playerTitle">Update Player</h2>: <h2 id="playerTitle">Add Player</h2>}
                <SavePlayerForm savedPlayer={this.props.savedPlayer} successMessage={this.props.successMessage} onSubmit={this.onSubmit} savePlayerError={this.props.savePlayerError} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedPlayer: state.player.savedPlayer,
        successMessage: state.player.successMessage,
        savePlayerError: state.player.savePlayerError
    };
}

export default connect(mapStateToProps, { add_player, update_player })(SavePlayer);
