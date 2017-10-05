//import { CLOSE_POPUP } from '../../actionTypes'
import Immutable from 'immutable'

const initialUserState =
{

}
;
const BackupReducer = function(state = initialUserState, action) {
   //console.log('actiondata in reducer:' + action.data + action.type);

  switch(action.type) {

  case 'GET_BACK_LIST':
		 return Object.assign({}, state, { backups: action.data });
 break;
     case 'GET_BACK_DETAIL':
        return Object.assign({}, state, { backupdetail: action.data });
        break;



  default:

  return state;
  }
}
export default BackupReducer
