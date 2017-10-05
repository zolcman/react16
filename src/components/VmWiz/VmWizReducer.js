//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{  emulate: [],


}
;
const WorkReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'EMULATE':
		 return Object.assign({}, state, { emulate: action.data });
 break;




  default:

  return state;
  }
}
export default WorkReducer
