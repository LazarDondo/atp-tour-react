import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_FAILURE} from "../actions/types";

const reducers = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, loggedUser: action.user, loginError: '' };
        case LOGIN_FAILURE:
            return { ...state, loginError: action.loginError };
        case REGISTRATION_SUCCESS:
            return { ...state, registrationError: action.registrationError };
        case REGISTRATION_FAILURE:
            console.log()
            return { ...state, registrationError: action.registrationError };
        default:
            return state;
    }
};

export default reducers;