import React from "react";
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import FormInput from '../form/FormInput';
import FormSubmitNotification from '../form/FormSubmitNotification';


class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            isSubmitted: false
        };
    }

    usernameFieldValidation = () => {
        const { isSubmitted, username } = this.state;
        return isSubmitted && (!username || !validator.isEmail(username));
    }

    passwordFieldValidation = () => {
        const { isSubmitted, password } = this.state;
        return isSubmitted && (!password || password.length < 5);
    }

    usernameValidation = () => {
        const username = this.state.username;
        if (!username) {
            return 'Username is required';
        }
        if (!validator.isEmail(username)) {
            return 'Username must be in email format';
        }
    }

    passwordValidation = () => {
        const password = this.state.password;
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 5) {
            return 'Password must contain atleast 5 characters';
        }
    }

    onSubmit = (formValues) => {
        this.registrationSuccess=''; this.registrationError='';
        const { firstName, lastName, username, password } = formValues;
        this.setState({ isSubmitted: true, firstName, lastName, username, password });
        if (firstName && lastName && username && password && validator.isEmail(username) && password.length > 5) {
            this.props.onSubmit(formValues);
        }
    }

    render() {
        const { firstName, lastName, isSubmitted } = this.state;
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <FormInput name="firstName" type="text" label="First Name" fieldValidation={isSubmitted && !firstName}
                    isSubmitted={isSubmitted} errorMessage={firstName ? '' : 'First Name is required'} />
                <FormInput name="lastName" type="text" label="Last Name" fieldValidation={isSubmitted && !lastName}
                    isSubmitted={isSubmitted} errorMessage={lastName ? '' : 'Last Name is required'} />
                <FormInput name="username" type="text" label="Username" fieldValidation={this.usernameFieldValidation()}
                    isSubmitted={isSubmitted} errorMessage={this.usernameFieldValidation()} />
                <FormInput name="password" type="password" label="Password" fieldValidation={this.passwordFieldValidation()}
                    isSubmitted={isSubmitted} errorMessage={this.passwordValidation()} />
                <div className="form-group">
                    <FormSubmitNotification successCondition={this.props.registrationSuccess} errorCondition={this.props.registrationError}
                    successMessage='Registration was successfull' errorMessage='Username already exists. Please choose another username'/>
                    <button className="btn btn-primary">Register</button>
                    <Link to="/login" className="btn btn-link">Login</Link>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'register',
})(RegistrationForm);