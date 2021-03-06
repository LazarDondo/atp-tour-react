import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/actions';
import RegistrationForm from './RegistrationForm';
import './Registration.css';

const Register = (props) => {

    const { register, registrationSuccess, registrationError } = props;

    const onSubmit = formValues => {
        register(formValues);
    }

    return (
        <div className='col-md-6 col-md-offset-3 center_div '>
            <h2>Register</h2>
            <RegistrationForm onSubmit={onSubmit} registrationSuccess={registrationSuccess} registrationError={registrationError} />
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        registrationError: state.auth.registrationError,
        registrationSuccess: state.auth.registrationSuccess
    };
}

export default connect(mapStateToProps, { register })(Register);
