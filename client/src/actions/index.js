import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return async function (dispatch) {
        try {
            console.log('got here >>>>>>>>')
            const res = await axios.get('/api/current_user')
            console.log('got here', res)
            // .then(res => dispatch({ type: FETCH_USER, payload: res }))
            console.log('res', res)
            console.log('FETCH_USER', FETCH_USER)
            if (res) {
                dispatch({ type: FETCH_USER, payload: res })
            }
        } catch (error) {
            console.log('error fetching user', error)
        }
    };
    // .catch(e => console.log("error fetching user", e));
};