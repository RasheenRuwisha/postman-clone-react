import { GET_API_RESULT, GET_JAVA_RESULT } from "../actions/types";


const initialState = {
    api: {"apo": "apo"},
    java: {"java": "java"}
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_API_RESULT:
                return {
                    ...state,
                    api:action.payload,
                };
                case GET_JAVA_RESULT:
                    return {
                        ...state,
                        java:action.payload,
                    };
        default:
            return state;

    }
}