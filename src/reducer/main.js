import { GET_API_RESULT } from "../actions/types";


const initialState = {
    api: null,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_API_RESULT:
                return {
                    ...state,
                    api:action.payload,
                };
        default:
            return state;

    }
}