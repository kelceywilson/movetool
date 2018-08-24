import axios from "axios";

export const ADD_NEW_ALERT = "ADD_NEW_ALERT";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const DELETE_ALERT = "DELETE_ALERT";
export const DELETE_PHOTO_URL = "DELETE_PHOTO_URL";
export const EDIT_ALERT = "EDIT_ALERT";
export const FETCH_MESSAGE = "FETCH_MESSAGE";
export const FILTER_ALERTS = "FILTER_ALERTS";
export const GET_ALL_ALERTS = "GET_ALL_ALERTS";
export const GET_ERRORS = "GET_ERRORS";
export const GET_ONE_ALERT = "GET_ONE_ALERT";
export const GET_DETAILS = "GET_DETAILS";
export const OPEN_MODAL = "OPEN_MODAL";
// export const SELECT_ALERT = 'SELECT_ALERT'
export const SET_ALERT_TYPE = "SET_ALERT_TYPE";
export const UPLOAD_FILE = "UPLOAD_FILE";

// ALERT ACTIONS //
export function addNewAlert(values) {
  console.log("addNewAlert", values);
  axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
  const request = axios.post(`/api/alert`, values);
  return {
    type: ADD_NEW_ALERT,
    payload: request
  };
}
// export const addNewAlert = values => dispatch => {
//   axios
//     .post(`${ROOT_URL}/alerts`, values)
//     .then(response =>
//       dispatch({
//         type: ADD_NEW_ALERT,
//         payload: response
//       })
//     )
//     .catch(err => {
//       console.log(err);

//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response
//       });
//     });
// };
export function deleteAlert(alertId) {
  console.log("deleteAlert", alertId);
  const request = axios.delete(`/api/alert/${alertId}`);
  return {
    type: DELETE_ALERT,
    payload: request
  };
}
export function deletePhotoUrl() {
  console.log("deletePhotoUrl");
  return {
    type: DELETE_PHOTO_URL
  };
}
export function editAlert(aID, values) {
  axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
  const request = axios.put(`/api/alert/${aID}`, values);
  return {
    type: EDIT_ALERT,
    payload: request
  };
}
export function filterAlerts(filter) {
  console.log("filterAlerts", filter);
  const request = axios.get(`/api/alert/filter?filterBy=${filter}`);
  return {
    type: FILTER_ALERTS,
    payload: request
  };
}
export function getAllAlerts() {
  const request = axios.get(`/api/alert`);
  return {
    type: GET_ALL_ALERTS,
    payload: request
  };
}
export function getAlertById(id) {
  const request = axios.get(`/api/alert/${id}`);
  return {
    type: GET_ONE_ALERT,
    payload: request
  };
}
export function getDetails(alertId) {
  return {
    type: GET_DETAILS,
    payload: alertId
  };
}
export function searchAlerts(terms) {
  console.log("searchAlerts", terms);
  const request = axios.get(`/api/alert/search?terms=${terms}`);
  return {
    type: FILTER_ALERTS,
    payload: request
  };
}
// export function selectAlert(alertId){
//   console.log('selectAlert', alertId);
//   return {
//     type: SELECT_ALERT,
//     payload: alertId
//   }
// }
export function setAlertType(alertType) {
  console.log("setAlertType", alertType);
  return {
    type: SET_ALERT_TYPE,
    payload: alertType
  };
}

export const uploadFile = event => {
  const file = event.target.files[0];
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/alertsapi/upload";
  const CLOUDINARY_UPLOAD_PRESET = "p2egownn";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  return dispatch => {
    delete axios.defaults.headers.common["Authorization"];
    return axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(response => {
        dispatch({
          type: UPLOAD_FILE,
          payload: response.data.secure_url
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

// MODAL ACTIONS //
export function openModal(payload) {
  // localStorage.setItem("modal", true);
  return {
    type: OPEN_MODAL,
    payload: payload
  };
}
export function closeModal() {
  // localStorage.setItem("modal", false);
  return {
    type: CLOSE_MODAL
  };
}

// USER ACTIONS? //
// redux thunk version of fetchMessage
// export function fetchMessage() {
//   return function(dispatch) {
//     axios
//       .get(ROOT_URL, {
//         headers: { authorization: localStorage.getItem("token") }
//       })
//       .then(response => {
//         console.log(response);
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data.message
//         });
//       });
//   };
// }
// redux promise version
// export function fetchMessage(){
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token')}
//   })
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request.message
//   }
// }
