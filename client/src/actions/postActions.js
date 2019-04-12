import axios from 'axios';
import {
    ADD_POST,
    GET_ERRORS
} from './types';

// Add post
export const addPost = postData => dispatch => {
    axios
        .post('/api/post', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: releaseEvents.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}