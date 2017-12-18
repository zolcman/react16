import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

import { push } from 'react-router-redux'
export const GET_BACK_LIST = 'GET_BACK_LIST';
export const GET_BACK_DETAIL = 'GET_BACK_DETAIL';
export const GET_BACK_DETAIL2 = 'GET_BACK_DETAIL2';
export const GET_TREE = 'GET_TREE';
export const GET_TASK_ID = 'GET_TASK_ID';
export const GET_TASK_STATUS = 'GET_TASK_STATUS';
export const GET_VM_ID = 'GET_VM_ID';
export const GET_TREE_FLAT = 'GET_TREE_FLAT';
export const GET_REPOS = 'GET_REPOS';
export const RUN_AUTO_JOB = 'RUN_AUTO_JOB';
export const STOP_TIMER = 'STOP_TIMER';
export const GET_JOB_INFO_DATA = 'GET_JOB_INFO_DATA';
export const GET_TREE_PROTECTED = 'GET_TREE_PROTECTED';
export const LOGOUT = 'LOGOUT';
export const GO_TO_BACK_LIST = 'GO_TO_BACK_LIST';
export const PASS_JOB_INFO_TO_POINTS = 'PASS_JOB_INFO_TO_POINTS';



import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { ShowAlert, HideAlert } from '../../components/Alert/AlertAction'

const getURI = (key) => apiUrl + Urls[key]


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

//const headers = {
//	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
//}


//{ headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0','Authorization':AuthToken}}


function receiveData22(json) {
	return{

		type: GET_BACK_LIST,
		data: json

	}
};



export function GetBackList (params) {

	return dispatch => {
	
		const AuthToken = localStorage.getItem('AuthToken');
	//	console.log(headers);

		return (
			dispatch(showLoading()),
			axios.get(getURI("jobs"),getHeader(AuthToken)).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
			 
    			dispatch(receiveData22(response.data));
					dispatch(hideLoading())
					
  			})
   	 	.catch((error) => {
				  console.log(error);
				  
				  if(error.response.status == 401){
					dispatch(LogOut())
					 return
					 }	
				    if(error.response.status >= 500){
					 dispatch(ShowAlert('warning','oops! some problem with connection',true,true));
						 return
					   }	
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
			axios.get(apiUrl + `/api/v1/Policies/${ id }/vms`,getHeader()).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		
    			dispatch(receiveData23(response.data));
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

function receiveBackDetail(json) {
	return{

		type: GET_BACK_DETAIL2,
		data: json

	}
};


export function GetBackDetail2 (id) {
	
		return dispatch => {
	var accessToken = sessionStorage.getItem('accessToken');
			return (
				//dispatch(showLoading()),
				axios.get(apiUrl + `/api/v1/Policies/${ id }`,getHeader()).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
					 
					dispatch(receiveBackDetail(response.data));
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

function GoToBackList () {
	
	return {
		type:GO_TO_BACK_LIST,
		data:"GO"
	}
}

export function DeleteBackupJob (id,detail) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (
			//dispatch(showLoading()),
			axios.delete(apiUrl + `/api/v1/Policies/${ id }`,getHeader()).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
			 if (!detail) {
				dispatch(GetBackList());
			 }

			 if (detail) {
				dispatch(push('/backupjobs'));
			 }
			
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


function receiveData24(json) {
	return{

		type: GET_TREE,
		data: json

	}
};

function treeProtected(json) {
	return{

		type: GET_TREE_PROTECTED,
		data: json

	}
};


export function TreeProtected (id,bool) {
	
		return dispatch => {
	var accessToken = sessionStorage.getItem('accessToken');
			return (
	
				//dispatch(showLoading()),
				axios.get(apiUrl + `/api/v1/Clusters/${ id }/vms?format=protdomainstreeview`,getHeader()).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
					 
					 if (bool) {
						
						dispatch(treeProtected(response.data));
					 }
					 if (!bool) {
						dispatch(receiveData24(response.data));
					 }
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

export function Tree (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Clusters/${ id }/vms`,getHeader()).then(function (response) {
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
				  if(error.response.status == 401){
					dispatch(LogOut())
					 return
			 		}	
    		})
			)
	}
}

function TreeFlatGet(json) {
	return{

		type: GET_TREE_FLAT,
		data: json

	}
};

export function TreeFlat (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Clusters/${ id }/vms?format=flatlist`,getHeader()).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log(response.data);
    			dispatch(TreeFlatGet(response.data));
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


export function cleartaskid(json) {
	return{

		type: GET_TASK_ID,
		data: null

	}
};

function receiveData25(json) {
	return{

		type: GET_TASK_ID,
		data: json

	}
};


export function StartJobTask (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//axios.post(apiUrl + `/api/v1/Policies/${ 'testjob1' }/startbackup`,{body: {}},  headers
			axios.post(apiUrl + `/api/v1/Policies/${ id }/startbackup`,{body: {}},  getHeader()
   	 ).then(function (response) {



			 	dispatch(GetBackList());
   	 		 //console.log(response.data + '1111111111111');
    			dispatch(receiveData25(response.data));

  			})
   	 	.catch((error) => {
      			console.log(error);
					//	dispatch(cleartask_info());
					if(error.response.status == 401){
						dispatch(LogOut())
						 return
						 }	
    		})
			)
	}
}


export function cleartask_info(json) {
	return{

		type: GET_TASK_STATUS,
		data: null

	}
};


export function PassJobInfo(id,name) {
	return{

		type: PASS_JOB_INFO_TO_POINTS,
		data: {id,name}

	}
};




function receiveData26(json) {
	return{

		type: GET_TASK_STATUS,
		data: json

	}
};



export function updatestatus (id) {
	console.log(id);
	console.log("UPDATESTATUS");
	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Tasks/${ id }`,getHeader()).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		
				
    			dispatch(receiveData26(response.data));
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






export function cleartaskvmid(json) {
	return{

		type: GET_VM_ID,
		data: null

	}
};


function receiveData27(json) {
	return{

		type: GET_VM_ID,
		data: json

	}
};


export function StartVMTask (param) {

	return dispatch => {

		return (

			axios.post(apiUrl + `/api/v1/Vms/restore`, param,  getHeader()
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
				  if(error.response.status == 401){
					dispatch(LogOut())
					 return
			 		}	
    		})
			)
	}
}

export function stopTimer() {
	return{

		type: STOP_TIMER,
		data: 'stop',

	}
};



export function clear_auto() {
	return{

		type: RUN_AUTO_JOB,
		data: null

	}
};


export function openAuto (id) {
	if (id) {
		return{

			type: RUN_AUTO_JOB,
			data: true

		}
	}

	if (!id) {
		return{

			type: RUN_AUTO_JOB,
			data: false

		}
	}

}


export function addJobSS (id,runner) {
	
	return dispatch => {

		return (

			//axios.post(getURI("jobs"),{"name": "Demo Policy","@odata.type": "Policy"},  headers
			axios.post(getURI("jobs"), id,  getHeader()
   	 ).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
			 if(runner) {
				
				 dispatch(StartJobTask(response.data.Id));
				 dispatch(openAuto(true));
			 }
			 if(!runner) {
				 dispatch(GetBackList());
				 dispatch(openAuto(false));
			 }

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




export function clearReposInRedux() {
	return{

		type: GET_REPOS,
		data: null

	}
};

function receiveDataRepos(json) {
	return{

		type: GET_REPOS,
		data: json

	}
};

export function GetRepos (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/BackupServers/${ id }/repositories`,getHeader()).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 	//	 console.log(response.data);
    			dispatch(receiveDataRepos(response.data));
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



export function clearJobEditInfo() {
	return{

		type: GET_JOB_INFO_DATA,
		data: null

	}
};

function receiveDataJobInfo(json) {
	return{

		type: GET_JOB_INFO_DATA,
		data: json

	}
};


export function EditJobInfo (id) {
	
		return dispatch => {
	var accessToken = sessionStorage.getItem('accessToken');
			return (
	
				//dispatch(showLoading()),
				axios.get(apiUrl + `/api/v1/Policies/${ id }/settings`,getHeader()).then(function (response) {
				 if(response.data.code>200){
						// dispatch(toastrActions.add('error', '',response.data.message))
						 return
				 }
				//	 console.log(response.data);
					dispatch(receiveDataJobInfo(response.data));
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

	export function UpdateJob (id,obj,runner) {

		
		
			return dispatch => {
		var accessToken = sessionStorage.getItem('accessToken');
				return (
		
					//dispatch(showLoading()),
					axios.put(apiUrl + `/api/v1/Policies/${ id }/settings`,obj,getHeader()).then(function (response) {
					 if(response.data.code>200){
							// dispatch(toastrActions.add('error', '',response.data.message))
							 return
					 }
					 if(runner) {
						
						 dispatch(StartJobTask( id));
						 dispatch(openAuto(true));
						 dispatch( GetBackDetail ( id))
						 dispatch( GetBackDetail2 ( id))
					 }
					 if(!runner) {
						 dispatch(GetBackList());
						 dispatch(openAuto(false));
						 dispatch( GetBackDetail ( id))
						 dispatch( GetBackDetail2 ( id))
					 }
						 
						
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