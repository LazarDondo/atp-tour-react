import { GET_MATCHES, SAVE_MATCHES, SAVE_MATCHES_ERROR, PREVIEW_MATCH } from "./types";
import atp from '../../apis/atp';

export const get_matches = (pagingValues, tournament, firstPlayer, secondPlayer) => async dispatch => {
    let params = { };
    let body = {tournament, firstPlayer, secondPlayer }
    if (pagingValues) {
        const { page, size, sort } = pagingValues;
        params.page = page;
        params.size = size;
        params.sort = sort;
    }

    await atp.post('/matches/filter',  body, { params: params })
        .then(
            (result) => {
                dispatch({ type: GET_MATCHES, foundMatches: result.data });
            },
            error => {
                dispatch({ type: GET_MATCHES, matches: { content: [] } });
            });
}

export const update_match = matches => async dispatch => {
    atp.put('/matches', matches)
        .then(
            (updatedMatches) => {
                dispatch({ type: SAVE_MATCHES, savedMatches: updatedMatches.data, successMessage: 'Matches updated successfully' });
            },
            saveMatchesError => {
                dispatch({ type: SAVE_MATCHES_ERROR, saveMatchesError });
            });
}

export const find_match = (match)=>{
    return {
        type: PREVIEW_MATCH,
        payload: match
    }
}