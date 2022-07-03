import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import FormInput from '../form/FormInput';
import FormSubmitNotification from '../form/FormSubmitNotification';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        //this.props.logout() reset login status
        this.state = {
            username: this.props.loggedUser,
            password: this.props.loggedUser,
            isSubmitted: false
        };
    }

    usernameValidation = () => {
        const { username } = this.state;
        if (!username) {
            return 'Username is required';
        }
        if (!validator.isEmail(username)) {
            return 'Username must be in email format';
        }
    }

    passwordValidation = () => {
        const { password } = this.state;
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 5) {
            return 'Password must contain atleast 5 characters';
        }
    }

    usernameFieldValidation = () => {
        const { isSubmitted, username } = this.state;
        return isSubmitted && (!username || !validator.isEmail(username));
    }

    passwordFieldValidation = () => {
        const { isSubmitted, password } = this.state;
        return isSubmitted && (!password || password.length < 5);
    }

    onSubmit = (formValues) => {
        const { username, password } = formValues;
        this.setState({ isSubmitted: true, username, password });
        if (username && password && validator.isEmail(username) && password.length > 5) {
            this.props.onSubmit(formValues);
        }
    }

    render() {
        const { isSubmitted } = this.state;
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <FormInput name="username" type="text" label="Username" fieldValidation={this.usernameFieldValidation()}
                    isSubmitted={isSubmitted} errorMessage={this.usernameValidation()} />

                <FormInput name="password" type="password" label="Password" fieldValidation={this.passwordFieldValidation()}
                    isSubmitted={isSubmitted} errorMessage={this.passwordValidation()} />

                <div className="form-group">
                    <FormSubmitNotification errorCondition={this.props.loginError} errorMessage='Invalid username or password'/>
                    <button className="btn btn-primary">Login</button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form >
        );
    }
};

export default reduxForm({
    form: 'login',
})(LoginForm);