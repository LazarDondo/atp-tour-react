import { LOGIN_FAILURE, LOGIN_SUCCESS } from "./types";
import atp from '../../apis/atp';
import 'bootstrap/dist/css/bootstrap.min.css';

export const login = formValues => async dispatch => {
    await atp.post('/user/login', formValues)
        .then(
            user => {
                dispatch({ type: LOGIN_SUCCESS, user });
            },
            error => {
                dispatch({ type: LOGIN_FAILURE, error });
            });
}