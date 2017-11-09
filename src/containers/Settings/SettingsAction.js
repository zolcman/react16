import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_VM_LIST = 'GET_VM_LIST';
export const RUN = 'RUN';




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

