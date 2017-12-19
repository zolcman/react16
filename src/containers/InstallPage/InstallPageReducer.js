//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{

}
;
const LoginReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'GET_LOGIN':
		 return Object.assign({}, state, { loginId: action.data });
        break;
        case 'SHOW_SETUP':
        return Object.assign({}, state, { showInstall: action.data });
           break;
            

                          
                          



  default:

  return state;
  }
}
export default LoginReducer
