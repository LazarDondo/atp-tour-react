import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import LoginForm from './LoginForm';
import './Login.css';

class Login extends React.Component {

    onSubmit = formValues => {
        this.props.login(formValues);
    }

    render() {
        return (
            <div className='col-md-6 col-md-offset-3 center_div '>
                <h2>Login</h2>
                <LoginForm onSubmit={this.onSubmit} loginError={this.props.loginError}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { loggedUser: state.auth.loggedUser ,
            loginError: state.auth.loginError};
}

export default connect(mapStateToProps, { login })(Login);
