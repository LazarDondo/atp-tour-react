import React from 'react';
import { connect } from 'react-redux';
import SaveMatchForm from './SaveMatchForm';
import './SaveMatch.css';

class SaveMatch extends React.Component {

    render() {
        return (

            <div id="saveMatch">
                {this.props.savedMatch ?
                    <SaveMatchForm savedMatch={this.props.savedMatch} successMessage={this.props.successMessage}
                         saveMatchError={this.props.saveMatchError} />
                    : null}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedMatch: state.matches.foundMatch,
        successMessage: state.matches.successMessage,
        saveMatchError: state.matches.saveMatchError
    };
}

export default connect(mapStateToProps)(SaveMatch);
