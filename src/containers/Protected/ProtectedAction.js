import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_VM_LIST = 'GET_VM_LIST';
export const GET_VM_LIST_DETAIL = 'GET_VM_LIST_DETAIL';
export const GET_LIST_FOR_ADD_BTN_WMS_WIZARD = 'GET_LIST_FOR_ADD_BTN_WMS_WIZARD';
export const GET_POINTS = 'GET_POINTS';



const getURI = (key) => apiUrl + Urls[key]


const headers = {
	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
}

function receiveData22(json) {
	return{

		type: GET_VM_LIST,
		data: json

	}
};



export function GetVmList (params) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.get(getURI("vms"),headers).then(function (response) {
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

		type: GET_VM_LIST_DETAIL,
		data: json

	}
};

export function GetVmListDetail (id) {
//	console.log(id)
	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Vms/${ id }/backups`,headers).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 	//	 console.log(response.data);
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

		type: GET_LIST_FOR_ADD_BTN_WMS_WIZARD,
		data: json

	}
};

export function GetListOfPoliciesForAddBtn () {
	
	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Policies?format=treeview`,headers).then(function (response) {
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

function receiveData25(json) {
	return{

		type: GET_POINTS,
		data: json

	}
};

export function GetPointList (id) {
	
	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			console.log(apiUrl + `api/v1/Vms/${ id.vmUid }/backups?policyuid=${ id.policyUid }`),

			axios.get(apiUrl + `/api/v1/Vms/${ id.vmUid }/backups?policyuid=${ id.policyUid }`,headers).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log(response.data);
    			dispatch(receiveData25(response.data));
				//	dispatch(hideLoading())
  			})
   	 	.catch((error) => {
      			console.log(error);
    		})
			)
	}
}

