//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{

}
;
const ProtectedReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'GET_VM_LIST':
		 return Object.assign({}, state, { vms: action.data });
 break;
     case 'GET_VM_LIST_DETAIL':
        return Object.assign({}, state, { vmsdetail: action.data });
        break;



  default:

  return state;
  }
}
export default ProtectedReducer
