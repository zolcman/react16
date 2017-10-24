import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_BACK_LIST = 'GET_BACK_LIST';
export const GET_BACK_DETAIL = 'GET_BACK_DETAIL';
export const GET_TREE = 'GET_TREE';
export const GET_TASK_ID = 'GET_TASK_ID';
export const GET_TASK_STATUS = 'GET_TASK_STATUS';
export const GET_VM_ID = 'GET_VM_ID';
export const GET_TREE_FLAT = 'GET_TREE_FLAT';
export const GET_REPOS = 'GET_REPOS';
export const RUN_AUTO_JOB = 'RUN_AUTO_JOB';
export const STOP_TIMER = 'STOP_TIMER';





const getURI = (key) => apiUrl + Urls[key]


const headers = {
	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
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
			axios.get(apiUrl + `/api/v1/Clusters/${ id }/vms?format=flatlist`,headers).then(function (response) {
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
			axios.post(apiUrl + `/api/v1/Policies/${ id }/startbackup`,{body: {}},  headers
   	 ).then(function (response) {



			 	dispatch(GetBackList());
   	 		 //console.log(response.data + '1111111111111');
    			dispatch(receiveData25(response.data));

  			})
   	 	.catch((error) => {
      			console.log(error);
						dispatch(cleartask_info());
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



function receiveData26(json) {
	return{

		type: GET_TASK_STATUS,
		data: json

	}
};



export function updatestatus (id) {

	return dispatch => {
var accessToken = sessionStorage.getItem('accessToken');
		return (

			//dispatch(showLoading()),
			axios.get(apiUrl + `/api/v1/Tasks/${ id }`,headers).then(function (response) {
			 if(response.data.code>200){
					// dispatch(toastrActions.add('error', '',response.data.message))
					 return
			 }
   	 		 console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
				 console.log(response.data);
    			dispatch(receiveData26(response.data));
				//	dispatch(hideLoading())
  			})
   	 	.catch((error) => {
      			console.log(error);
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


export function StartVMTask (id) {

	return dispatch => {

		return (

			axios.post(apiUrl + `/api/v1/Vms/${id}/restore/`,{body: {}},  headers
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
			axios.post(getURI("jobs"), id,  headers
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
    		})
			)
	}
}


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
			axios.get(apiUrl + `/api/v1/BackupServers/${ id }/repositories`,headers).then(function (response) {
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
    		})
			)
	}
}
