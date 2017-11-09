//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{

}
;
const SettingsReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'RUN':
		 return Object.assign({}, state, { run: action.data });
 break;

 
     


  default:

  return state;
  }
}
export default SettingsReducer
