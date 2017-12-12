//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{  emulate: [],


}
;
const AlertReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'SHOW_ALERT':
		 return Object.assign({}, state, { showAlert: action.data });
 break;




  default:

  return state;
  }
}
export default AlertReducer
