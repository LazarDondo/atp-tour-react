import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from "./types";
import atp from '../../apis/atp';
import 'bootstrap/dist/css/bootstrap.min.css';

export const login = formValues => async dispatch => {
    await atp.post('/user/login', formValues)
        .then(
            user => {
                dispatch({ type: LOGIN_SUCCESS, user });
            },
            loginError => {
                dispatch({ type: LOGIN_FAILURE, loginError });
            });
}

export const register = formValues => async dispatch => {
    await atp.post('/user/register', formValues)
        .then(
            () => {
                console.log(123);
                dispatch({ type: REGISTRATION_SUCCESS, registrationError: '' });
            },
            registrationError => {
                console.log(223);
                dispatch({ type: REGISTRATION_FAILURE, registrationError });
            });
}