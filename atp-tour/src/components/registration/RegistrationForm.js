import React from "react";
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';


class RegistrationForm extends React.Component {

    successStatus='S';
    errorStatus='E';

    constructor(props) {
        super(props);
        //this.props.logout() reset login status
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            isSubmitted: false
        };
    }

    renderField = ({ label, input, type, name, className }) => {
        return (
            <>
                <label htmlFor={name}>{label}</label>
                <input {...input} value={input.value} type={type} name={name} className={className} />
            </>
        );
    }

    usernameValidation = (username) => {
        if (!username) {
            return 'Username is required';
        }
        if (!validator.isEmail(username)) {
            return 'Username must be in email format';
        }
    }

    passwordValidation = (password) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 5) {
            return 'Password must contain atleast 5 characters';
        }
    }

    renderNotification = (condition, message, classFlag) => {
        const className = classFlag === this.successStatus ? 'alert alert-success' : 'alert alert-danger';
        if (condition && message) {
            console.log(message);
            return (
                <div id="notificationMessageDiv" className={className}>{message}</div>
            );
        }
    }

    onSubmit = (formValues) => {
        const { firstName, lastName, username, password } = formValues;
        this.setState({ isSubmitted: true, firstName, lastName, username, password });
        if (firstName && lastName && username && password && validator.isEmail(username) && password.length > 5) {
            this.props.onSubmit(formValues);
        }
    }

    render() {
        console.log(444);
        const { firstName, lastName, isSubmitted, username, password } = this.state;
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className='form-group'>
                    <Field name='firstName' component={this.renderField} type='text'
                        className={'form-control ' + (isSubmitted && !firstName ? 'is-invalid' : '')} label="First Name" />
                </div>
                {this.renderNotification(isSubmitted && !firstName, 'First name is required', this.errorStatus)}

                <div className='form-group'>
                    <Field name='lastName' component={this.renderField} type='text'
                        className={'form-control ' + (isSubmitted && !lastName ? 'is-invalid' : '')} label="Last name" />
                </div>
                {this.renderNotification(isSubmitted && !lastName, 'Last name is required', this.errorStatus)}

                <div className='form-group'>
                    <Field name='username' component={this.renderField} type='text'
                        className={'form-control ' + (isSubmitted && (!username || !validator.isEmail(username)) ? 'is-invalid' : '')} label="Username" />
                </div>
                {this.renderNotification(isSubmitted, this.usernameValidation(username), this.errorStatus)}

                <div className='form-group'>
                    <Field name='password' component={this.renderField} type='password'
                        className={'form-control ' + (isSubmitted && (!password || password.length < 5) ? 'is-invalid' : '')} label="Password" />

                </div>
                {this.renderNotification(isSubmitted, this.passwordValidation(username), this.errorStatus)}

                {this.renderNotification(isSubmitted && !this.props.registrationError, 'Registration was successfull', this.successStatus)}
                {this.renderNotification(isSubmitted && this.props.registrationError, 'Username already exists. Please choose another username', this.errorStatus)}
                <div className="form-group">
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