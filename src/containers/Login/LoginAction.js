import axios from 'axios'
import { apiUrl, Urls } from '../../middlewares/url'

export const GET_LOGIN = 'GET_LOGIN';




const getURI = (key) => apiUrl + Urls[key]


const headers = {
	headers: {'Content-Type': 'application/json','UserAgentInternal': 'webfrontend/1.0'}
}

export function LoginInServer(json) {
	return{

		type: GET_LOGIN,
		data: "123456"

	}
};




