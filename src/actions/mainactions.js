import axios from 'axios';
import { GET_API_RESULT, GET_API_RESULT_FAIL, GET_JAVA_RESULT, GET_JAVA_RESULT_FAIL } from './types';



export const loadAPICALL = (url) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios
        .get(`${url}`, config)
        .then(res => {
            console.log(res.data);
            // dispatch request to update redux state with the logged in user details
            dispatch({type: GET_API_RESULT, payload: res.data});
            dispatch(loadJavaClass(res.data));
        })
        .catch(err => {
            // dispatch auth error if any error occurs
            dispatch({type: GET_API_RESULT_FAIL})
        })
}


export const loadJavaClass = (json) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }

    var bodyFormData = new FormData();
    bodyFormData.append('schema', JSON.stringify(json));
    bodyFormData.append('classname', 'TestClass');
    bodyFormData.append('targetpackage', 'com.test.test');
    bodyFormData.append('sourcetype', 'json');
    bodyFormData.append('annotationstyle', 'jackson2');



    const body = {
        schema: JSON.stringify(json),
        classname: "TestClass",
        targetpackage: "com.test.test",
        sourcetype:"json",
        annotationstyle:"jackson2"
    }

    axios
        .post(`https://www.jsonschema2pojo.org/generator/preview`, body, config)
        .then(res => {
            console.log(res.data);
            // dispatch request to update redux state with the logged in user details
            dispatch({type: GET_JAVA_RESULT, payload: res.data});
        })
        .catch(err => {
            // dispatch auth error if any error occurs
            dispatch({type: GET_JAVA_RESULT_FAIL})
        })
}