import {
    LOGIN_FAILURE, LOGIN_SUCCESS, REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
    GET_PLAYERS, SAVE_PLAYER, SAVE_PLAYER_ERROR
} from "./types";
import atp from '../../apis/atp';


export const login = formValues => async dispatch => {
    atp.post('/user/login', formValues)
        .then(
            user => {
                dispatch({ type: LOGIN_SUCCESS, user: user.data });
            },
            loginError => {
                dispatch({ type: LOGIN_FAILURE, loginError });
            });
}

export const register = formValues => async dispatch => {
    atp.post('/user/register', formValues)
        .then(
            () => {
                dispatch({ type: REGISTRATION_SUCCESS, registrationSuccess: 'S' });
            },
            registrationError => {
                dispatch({ type: REGISTRATION_FAILURE, registrationError });
            });
}

export const get_players = (pagingValues, firstName, lastName, birthCountry) => async dispatch => {
    let params = { firstName, lastName };
    if (pagingValues) {
        const { page, size, sort } = pagingValues;
        params.page = page;
        params.size = size;
        params.sort = sort;
    }

    if (birthCountry && birthCountry.name !== 'All') {
        params.birthCountry = birthCountry.name;
    }

    await atp.get('/player', { params: params })
        .then(
            (result) => {
                dispatch({ type: GET_PLAYERS, players: result.data });
            },
            error => {
                dispatch({ type: GET_PLAYERS, players: { content: [] } });
            });
}

export const add_player = player => async dispatch => {
    atp.post('/player', player)
        .then(
            (savedPlayer) => {
                dispatch({ type: SAVE_PLAYER, savedPlayer: savedPlayer.data, successMessage: 'Successfully added new player' });
            },
            savePlayerError => {
                dispatch({ type: SAVE_PLAYER, savePlayerError });
            });
}

export const update_player = player => async dispatch => {
    atp.put('/player', player)
        .then(
            (savedPlayer) => {
                dispatch({ type: SAVE_PLAYER, savedPlayer: savedPlayer.data, successMessage: 'Player updated successfully' });
            },
            savePlayerError => {
                dispatch({ type: SAVE_PLAYER_ERROR, savePlayerError });
            });
}

export const find_player = id => async dispatch => {
    atp.get('/player/' + id)
        .then(
            (foundPlayer) => {
                dispatch({ type: SAVE_PLAYER, savedPlayer: foundPlayer.data, successMessage: 'Player found successfully' });
            },
            findPlayerError => {
                dispatch({ type: SAVE_PLAYER_ERROR, findPlayerError });
            });
};
