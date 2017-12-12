

export const SHOW_ALERT = 'SHOW_ALERT';

///<summary>
/// type: Warning or success
/// message: string
/// autohide: true or false, auto hide alert after 5 srconds
/// reloadbtn : true or false, show or hide reload page btn
///</summary>
export function ShowAlert(type,message,autohide,reloadbtn) {

return {
      type: SHOW_ALERT,
      data: {ShowAlert:true,type:type,message:message,autohide:autohide,reloadbtn:reloadbtn}
    }
  
  }

  export function HideAlert() {
    return {
      type: SHOW_ALERT,
      data: {ShowAlert:false}
    }
  }