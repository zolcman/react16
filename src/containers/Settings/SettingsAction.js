import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_BACKUP_SERVER_LIST = 'GET_BACKUP_SERVER_LIST';
export const RUN = 'RUN';
export const GET_DETAILED_INFO_SERVER = 'GET_DETAILED_INFO_SERVER';
export const GET_ClUSTER_LIST = 'GET_ClUSTER_LIST';
export const GET_DETAILED_INFO_CLUSTER = 'GET_DETAILED_INFO_CLUSTER';
export const LOGOUT = 'LOGOUT';


const getURI = (key) => apiUrl + Urls[key]


const headers = {
	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
}

function SaveList(json) {
	return{

		type: GET_BACKUP_SERVER_LIST,
		data: json

	}
};

const getHeader = (AuthToken) => {
	return {
		headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0','Authorization':localStorage.getItem('AuthToken')}
	}

}

function LogOut () {
	localStorage.removeItem('AuthToken');
	window.location.replace('./');

	return {

		type: LOGOUT,
		data: "LOGOUTED"


	}
}



export function GetBackupServers () {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/BackupServers`,getHeader()).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log(response.data);
    			dispatch(SaveList(response.data));
				//	dispatch(hideLoading())
  			})
   	 	.catch((error) => {
				  console.log(error);
				  if(error.response.status == 401){
					dispatch(LogOut())
					 return
			 		}	
    		})
			)
	}
}

function SaveClusters(json) {
	return{
		
				type: GET_ClUSTER_LIST,
				data: json
		
			}
}



export function GetClusters () {
	
		return dispatch => {
	var accessToken = sessionStorage.getItem('accessToken');
			return (
				//dispatch(showLoading()),
				axios.get(apiUrl + `/api/v1/Clusters`,getHeader()).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
					 console.log(response.data);
					dispatch(SaveClusters(response.data));
					//	dispatch(hideLoading())
				  })
				.catch((error) => {
					  console.log(error);
					  if(error.response.status == 401){
						dispatch(LogOut())
						 return
						 }	
				})
				)
		}
	}




export function AddSettingsNewServer (objs) {
	
		return dispatch => {
	
			return (
	
				axios.post(apiUrl + `/api/v1/BackupServers`, objs,  getHeader()
			).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
					 //console.log(response.data + '1111111111111');
					dispatch(GetBackupServers());
	
				  })
				.catch((error) => {
					  console.log(error);
					  if(error.response.status == 401){
						dispatch(LogOut())
						 return
						 }	
				})
				)
		}
	}


	export function EditSettingsNewServer (objs,id) {
			console.log('sss')
			return dispatch => {
		
				return (
		
					axios.put(apiUrl + `/api/v1/BackupServers/${id}`, objs,  getHeader()
				).then(function (response) {
					 if(response.data.code>200){
							// dispatch(toastrActions.add('error', '',response.data.message))
							 return
					 }
						 console.log(response.data);
						dispatch(GetBackupServers());
		
					  })
					.catch((error) => {
						  console.log(error);
						  if(error.response.status == 401){
							dispatch(LogOut())
							 return
							 }	
					})
					)
			}
		}

	function GetInfoDetail (json) {
		return{
			
					type: GET_DETAILED_INFO_SERVER,
					data: json
			
				}
	}


	export function clearDataFromServerDetail () {
		return{
			
					type: GET_DETAILED_INFO_SERVER,
					data: null
			
				}
	}


		export function GetDetailServer (id) {
			
				return dispatch => {
			var accessToken = sessionStorage.getItem('accessToken');
					return (
						//dispatch(showLoading()),
						axios.get(apiUrl + `/api/v1/BackupServers/${id}`,getHeader()).then(function (response) {
						 if(response.data.code>200){
								// dispatch(toastrActions.add('error', '',response.data.message))
								 return
						 }
							 console.log(response.data);
							dispatch(GetInfoDetail(response.data));
							//	dispatch(hideLoading())
						  })
						.catch((error) => {
							  console.log(error);
							  if(error.response.status == 401){
								dispatch(LogOut())
								 return
								 }	
						})
						)
				}
			}


			function GetInfoDetail2 (json) {
				return{
					
							type: GET_DETAILED_INFO_CLUSTER,
							data: json
					
						}
			}

			export function clearDataFromClusterDetail () {
				return{
					
							type: GET_DETAILED_INFO_CLUSTER,
							data: null
					
						}
			}
		
		
				export function GetDetailCluster (id) {
					
						return dispatch => {
					var accessToken = sessionStorage.getItem('accessToken');
							return (
								//dispatch(showLoading()),
								axios.get(apiUrl + `/api/v1/Clusters/${id}`,getHeader()).then(function (response) {
								 if(response.data.code>200){
										// dispatch(toastrActions.add('error', '',response.data.message))
										 return
								 }
									 console.log(response.data);
									dispatch(GetInfoDetail2(response.data));
									//	dispatch(hideLoading())
								  })
								.catch((error) => {
									  console.log(error);
									  if(error.response.status == 401){
										dispatch(LogOut())
										 return
										 }	
								})
								)
						}
					}

	export function AddSettingsCluster (objs) {
	
		return dispatch => {
	
			return (
	
				axios.post(apiUrl + `/api/v1/Clusters`, objs,  getHeader()
			).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
					 //console.log(response.data + '1111111111111');
					dispatch(GetClusters());
	
				  })
				.catch((error) => {
					  console.log(error);
					  if(error.response.status == 401){
						dispatch(LogOut())
						 return
						 }	
				})
				)
		}
	}

	export function EditSettingsCluster (objs,id) {
		
			return dispatch => {
		
				return (
		
					axios.put(apiUrl + `/api/v1/Clusters/${id}`, objs,  getHeader()
				).then(function (response) {
					 if(response.data.code>200){
							// dispatch(toastrActions.add('error', '',response.data.message))
							 return
					 }
						 console.log(response.data);
						dispatch(GetClusters());
		
					  })
					.catch((error) => {
						  console.log(error);
						  if(error.response.status == 401){
							dispatch(LogOut())
							 return
							 }	
					})
					)
			}
		}