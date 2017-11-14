import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_VM_LIST = 'GET_VM_LIST';
export const GET_VM_LIST_DETAIL = 'GET_VM_LIST_DETAIL';



const getURI = (key) => apiUrl + Urls[key]


const headers = {
	headers: {'Content-Type': 'multipart/form-data','UserAgentInternal': 'webfrontend/1.0', "Accept": "application/json"}
}


export function upload (file) {
	
		return dispatch => {
	
			return (
	
				axios.post(apiUrl + `/api/v1/restoreconfig`, file,  headers
			).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
					 //console.log(response.data + '1111111111111');
					dispatch(receiveData27(response.data));
	
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

