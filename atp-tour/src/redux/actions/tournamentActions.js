import {
    GET_TOURNAMENTS, SAVE_TOURNAMENT, SAVE_TOURNAMENT_ERROR
} from "./types";
import atp from '../../apis/atp';


export const get_tournaments = (pagingValues, name, tournamentType, hostCountry) => async dispatch => {
    let params = { name };

    if (pagingValues) {
        const { page, size, sort } = pagingValues;
        params.page = page;
        params.size = size;
        params.sort = sort;
    }

    if (tournamentType !== 'All') {
        params.tournamentType = tournamentType;
    }

    if (hostCountry && hostCountry.name !== 'All') {
        params.hostCountry = hostCountry.name;
    }

    await atp.get('/tournament', { params: params })
        .then(
            (result) => {
                dispatch({ type: GET_TOURNAMENTS, tournaments: result.data });
            },
            error => {
                dispatch({ type: GET_TOURNAMENTS, tournaments: { content: [] } });
            });
}


export const update_tournament = tournament => async dispatch => {
    atp.put('/tournament', tournament)
        .then(
            (savedTournament) => {
                dispatch({ type: SAVE_TOURNAMENT, savedTournament: savedTournament.data, successMessage: 'Tournament updated successfully' });
            },
            saveTournamentError => {
                dispatch({ type: SAVE_TOURNAMENT_ERROR, saveTournamentError });
            });
}

export const find_tournament = id => async dispatch => {
    atp.get('/tournament/' + id)
        .then(
            (foundTournament) => {
                dispatch({ type: SAVE_TOURNAMENT, savedTournament: foundTournament.data, successMessage: 'Tournament found successfully' });
            },
            findTournamentError => {
                dispatch({ type: SAVE_TOURNAMENT_ERROR, findTournamentError });
            });
};
