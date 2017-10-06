import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_BACK_LIST = 'GET_BACK_LIST';
export const GET_BACK_DETAIL = 'GET_BACK_DETAIL';
export const GET_TREE = 'GET_TREE';


const getURI = (key) => apiUrl + Urls[key]


const headers = {
	headers: {'Content-Type': 'application/json','User-Agent': 'webfrontend/1.0'}
}

function receiveData22(json) {
	return{

		type: GET_BACK_LIST,
		data: json

	}
};



export function GetBackList (params) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.get(getURI("jobs"),headers).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log(response.data);
    			dispatch(receiveData22(response.data));
				//	dispatch(hideLoading())
  			})
   	 	.catch((error) => {
      			console.log(error);
    		})
			)
	}
}

function receiveData23(json) {
	return{

		type: GET_BACK_DETAIL,
		data: json

	}
};

export function GetBackDetail (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Policies/${ id }/vms`,headers).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log(response.data);
    			dispatch(receiveData23(response.data));
				//	dispatch(hideLoading())
  			})
   	 	.catch((error) => {
      			console.log(error);
    		})
			)
	}
}


function receiveData24(json) {
	return{

		type: GET_TREE,
		data: json

	}
};

export function Tree (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Clusters/${ id }/vms`,headers).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log(response.data);
    			dispatch(receiveData24(response.data));
				//	dispatch(hideLoading())
  			})
   	 	.catch((error) => {
      			console.log(error);
    		})
			)
	}
}
