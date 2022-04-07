import axios from 'axios';
import { GET_API_RESULT, GET_API_RESULT_FAIL, GET_JAVA_RESULT, GET_JAVA_RESULT_FAIL } from './types';



export const loadAPICALL = (url,body,method,content) => (dispatch) => {

    
    var config = {
        method: method,
        url: url,
        headers: { 
          'Content-Type': content
        },
        data : body
      };

      console.log(config);

    axios(config).then(res => {
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

    var qs = require('qs');
var data = qs.stringify({
  'schema': JSON.stringify(json),
  'classname': 'TestClass',
  'targetpackage': 'com.test.test',
  'sourcetype': 'json',
  'annotationstyle': 'jackson2' 
});
var config = {
  method: 'post',
  url: 'https://www.jsonschema2pojo.org/generator/preview',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (res) {
  console.log(JSON.stringify(res.data));
  dispatch({type: GET_JAVA_RESULT, payload: res.data});

})
.catch(function (error) {
  console.log(error);
  dispatch({type: GET_JAVA_RESULT_FAIL})

});

}