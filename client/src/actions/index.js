import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return async function (dispatch) {
        console.log('got here >>>>>>>>')
        try {
            const res = await axios.get('http://localhost:5000/api/current_user')
            console.log('ress', res)
        } catch (e) {
            console.log("error fetching user", e)
        }

        //     .then(res => dispatch({ type: FETCH_USER, payload: res }))
        // .catch(e => console.log("error fetching user", e));
    }
};