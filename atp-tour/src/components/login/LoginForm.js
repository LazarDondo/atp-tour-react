import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';

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

    renderError = (condition, message) => {
        if (condition && message) {
            return (
                <div id="errorMessageDiv" className=" alert alert-danger">{message}</div>
            );
        }
    }

    onSubmit = (formValues) => {
        const { username, password } = formValues;
        this.setState({ isSubmitted: true, username, password });
        if (username && password && validator.isEmail(username) && password.length>5) {
            this.props.onSubmit(formValues);
        }
    }
    

    render() {
        const { isSubmitted, username, password } = this.state;
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <div className='form-group'>
                    <Field name='username' component={this.renderField} type='text'
                        className={'form-control ' + (isSubmitted && (!username || !validator.isEmail(username)) ? 'is-invalid' : '')} label="Username" />
                    {this.renderError(isSubmitted, this.usernameValidation(username))}
                </div>
                <div className='form-group'>
                    <Field name='password' component={this.renderField} type='password'
                        className={'form-control ' + (isSubmitted && (!password || password.length<5) ? 'is-invalid' : '')} label="Password" />
                    {this.renderError(isSubmitted, this.passwordValidation(password))}
                </div>
                               
                <div className="form-group">
                {this.renderError(this.props.loginError, 'Invalid username or password')}
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