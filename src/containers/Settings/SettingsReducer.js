//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{

}
;
const SettingsReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'GET_BACKUP_SERVER_LIST':
		 return Object.assign({}, state, { listbackups: action.data });
 break;
 case 'GET_DETAILED_INFO_SERVER':
 return Object.assign({}, state, { detailed_info: action.data });
break;

case 'GET_ClUSTER_LIST':
return Object.assign({}, state, { cluster_list: action.data });
break;
case 'GET_DETAILED_INFO_CLUSTER':
return Object.assign({}, state, { cluster_detail: action.data });
break;

 
     


  default:

  return state;
  }
}
export default SettingsReducer
