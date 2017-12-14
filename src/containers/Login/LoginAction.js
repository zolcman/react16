import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_LOGIN = 'GET_LOGIN';
export const GET_MYNAME = 'GET_MYNAME';
export const GET_LOGOUT = 'GET_LOGOUT';
export const SHOW_SETUP = 'SHOW_SETUP';


import { ShowAlert, HideAlert } from '../../components/Alert/AlertAction'


const getURI = (key) => apiUrl + Urls[key]



const headers = {
	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
}


const getHeader = (AuthToken) => {
	return {
		headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0','Authorization':localStorage.getItem('AuthToken')}
	}

}

 function GetLoginInServer(json) {
	
	return{

		type: GET_LOGIN,
		data: json

	}
};

function SendError() {

	

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

				
			 console.log(response)
					dispatch(GetLoginInServer(response.data));
	
				  })
				.catch((error) => {
					 // console.log(error);
					  console.log(error)
					  if(error.response.status == 401){
						
					//	console.log(response.data.message)
						dispatch(SendError())
						 return
				 }		
				 else {
					 
					dispatch(ShowAlert('warning','oops! some problem with connection',true,true));
				 }
				})
				)
		}
	}

	export function ShowSetup() {

		const ert = {show:true}

		return{
	
			type: SHOW_SETUP,
			data: true
	
		}
	};


	function LetLogOut() {

		localStorage.removeItem('AuthToken');
		window.location.replace('./');

		return{
			
					type: GET_LOGOUT,
					data: 'LOGUOTED'
			
				}
	}

	export function LogOutFromServer () {
		
			return dispatch => {
		var accessToken = sessionStorage.getItem('accessToken');
				return (
					
					//axios.post(apiUrl + `/api/v1/Policies/${ 'testjob1' }/startbackup`,{body: {}},  headers
					axios.post(apiUrl + `/api/v1/Account/logout`,{},  getHeader()
				).then(function (response) {
	
					
				 console.log(response)
						dispatch(LetLogOut());
		
					  })
					.catch((error) => {
						  console.log(error);
						  
					//	  console.log(error.response.status)
						  if(error.response.status > 200){
							
						//	console.log(response.data.message)
						dispatch(ShowAlert('warning','oops! some problem with connection',true,true));
						dispatch(LogOut())
							 return
					 }		
					})
					)
			}
		}

		function GetName(json) {
			return {
				type: GET_MYNAME,
				data: json
			}
		}

		export function MyName (params) {
			
				return dispatch => {
				
					const AuthToken = localStorage.getItem('AuthToken');
				//	console.log(headers);
			
					return (
						//dispatch(showLoading()),
						axios.get(apiUrl + `/api/v1/Account/whoami`,getHeader()).then(function (response) {
						 if(response.data.code>200){
								// dispatch(toastrActions.add('error', '',response.data.message))
								 return
						 }
							 console.log(response.data);
							dispatch(GetName(response.data));
							//	dispatch(hideLoading())
						  })
						.catch((error) => {
							  console.log(error);
							  if(error.response.status > 200){
								dispatch(LogOut())
								 return
								 }	
						})
						)
				}
			}

