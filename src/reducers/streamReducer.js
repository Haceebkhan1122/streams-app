import { EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, CREATE_STREAM } from "../actions/typesOfActions";
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type) {
            // take the action.payload.id as the key and assign action.payload to key
            case EDIT_STREAM:
                return { ...state, [action.payload.id]: action.payload };
            case FETCH_STREAM:
                return {...state, [action.payload.id]: action.payload};
            case CREATE_STREAM:
                return {...state, [action.payload.id]: action.payload};
            case DELETE_STREAM:
                return _.omit(state, action.payload);
            case FETCH_STREAMS:
                return {...state, ..._.mapKeys(action.payload, 'id')}
        default:
          return state;
    }
}