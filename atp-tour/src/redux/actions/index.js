import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from "./types";
import atp from '../../apis/atp';


export const login = formValues => async dispatch => {
    await atp.post('/user/login', formValues)
        .then(
            user => {
                dispatch({ type: LOGIN_SUCCESS, user: user.data });
            },
            loginError => {
                dispatch({ type: LOGIN_FAILURE, loginError });
            });
}

export const register = formValues => async dispatch => {
    await atp.post('/user/register', formValues)
        .then(
            () => {
                dispatch({ type: REGISTRATION_SUCCESS, registrationSuccess: 'S' });
            },
            registrationError => {
                dispatch({ type: REGISTRATION_FAILURE, registrationError });
            });
}