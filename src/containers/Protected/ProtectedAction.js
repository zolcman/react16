import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_VM_LIST = 'GET_VM_LIST';


const getURI = (key) => apiUrl + Urls[key]




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
			axios.get(getURI("vms"),{headers: {'Content-Type': 'application/json'}}).then(function (response) {
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
