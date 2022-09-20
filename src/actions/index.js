import { SIGN_OUT, SIGN_IN, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM, SHOW_STREAM } from "./typesOfActions";
import streams from '../apis/streams';
import history from "../history";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = (userId) => {
    return {
        type: SIGN_OUT,
        payload: userId
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    // console.log(getState().auth.userId, "my get state")
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });
    history.push('/');


}
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}
export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });
    console.log(response.data)
    history.push('/');
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id
    })
    history.push('/');
}

export const showStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
        type: SHOW_STREAM,
        payload: response.data
    })
}