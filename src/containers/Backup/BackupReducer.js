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
        case 'GET_TREE':
           return Object.assign({}, state, { tree: action.data });
           break;
           case 'GET_TREE_FLAT':
              return Object.assign({}, state, { tree_flat: action.data });
              break;
           case 'GET_TASK_ID':
              return Object.assign({}, state, { taskidtoupdate: action.data });
              break;
              case 'GET_TASK_STATUS':
                 return Object.assign({}, state, { task_status: action.data });
                 break;
                 case 'GET_VM_ID':
                    return Object.assign({}, state, { vmidtoupdate: action.data });
                    break;
                    case 'GET_REPOS':
                       return Object.assign({}, state, { repos: action.data });
                       break;



  default:

  return state;
  }
}
export default BackupReducer
