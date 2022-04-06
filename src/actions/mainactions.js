import axios from 'axios';
import { GET_API_RESULT, GET_API_RESULT_FAIL } from './types';



export const loadAPICALL = (url) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(url)

    axios
        .get(`${url}`, config)
        .then(res => {
            console.log(res.data);
            // dispatch request to update redux state with the logged in user details
            dispatch({type: GET_API_RESULT, payload: res.data});
        })
        .catch(err => {
            // dispatch auth error if any error occurs
            dispatch({type: GET_API_RESULT_FAIL})
        })
}