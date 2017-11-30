import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_LOGIN = 'GET_LOGIN';




const getURI = (key) => apiUrl + Urls[key]



const headers = {
	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
}

 function GetLoginInServer(json) {
	
	return{

		type: GET_LOGIN,
		data: json

	}
};

function SendError() {

	console.log('ssss')

	return{
		
				type: GET_LOGIN,
				data: 'ERROR'
		
			}
}

export function LoginInServer (id) {
	
		return dispatch => {
	var accessToken = sessionStorage.getItem('accessToken');
			return (
				
				//axios.post(apiUrl + `/api/v1/Policies/${ 'testjob1' }/startbackup`,{body: {}},  headers
				axios.post(apiUrl + `/api/v1/Account/login`,id,  headers
			).then(function (response) {

				if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					console.log(response.data.message)
					dispatch(SendError())
					 return
			 }
			 console.log(response)
					dispatch(GetLoginInServer(response.data));
	
				  })
				.catch((error) => {
					  console.log(error);
							
				})
				)
		}
	}




