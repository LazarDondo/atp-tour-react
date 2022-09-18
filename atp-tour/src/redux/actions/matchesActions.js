import { GET_MATCHES, PREVIEW_MATCH } from "./types";
import atp from '../../apis/atp';

export const get_matches = (pagingValues, tournament, firstPlayer, secondPlayer) => async dispatch => {
    let params = {};
    let body = {};

    if (pagingValues) {
        const { page, size, sort } = pagingValues;
        params.page = page;
        params.size = size;
        params.sort = sort;
    }

    if (tournament && tournament.name !== 'All') {
        body.tournament = tournament;
    }

    if (firstPlayer && firstPlayer.firstName !== 'All') {
        body.firstPlayer = firstPlayer;
    }

    if (secondPlayer && secondPlayer.firstName !== 'All') {
        body.secondPlayer = secondPlayer;
    }

    await atp.post('/matches/filter', body, { params: params })
        .then(
            (result) => {
                dispatch({ type: GET_MATCHES, foundMatches: result.data });
            },
            error => {
                dispatch({ type: GET_MATCHES, matches: { content: [] } });
            });
}

export const update_matches = (pagingValues, tournament, firstPlayer, secondPlayer, results) => async dispatch => {
    let params = {};
    let body = {};

    if (pagingValues) {
        const { page, size } = pagingValues;
        params.page = page;
        params.size = size;
        params.sort = 'matchDate,asc';
    }

    if (tournament && tournament.name !== 'All') {
        body.tournament = tournament;
    }

    if (firstPlayer && firstPlayer.firstName !== 'All') {
        body.firstPlayer = firstPlayer;
    }

    if (secondPlayer && secondPlayer.firstName !== 'All') {
        body.secondPlayer = secondPlayer;
    }

    body.results = results;

    atp.put('/matches', body, { params: params })
        .then(
            (result) => {
                dispatch({ type: GET_MATCHES, foundMatches: result.data });
            },
            error => {
                dispatch({ type: GET_MATCHES, matches: { content: [] } });
            });
}

export const find_match = (match) => {
    return {
        type: PREVIEW_MATCH,
        payload: match
    }
}