import axios from "axios";

export const ADD_NEW_ALERT = "ADD_NEW_ALERT";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const DELETE_ALERT = "DELETE_ALERT";
export const DELETE_PHOTO_URL = "DELETE_PHOTO_URL";
export const EDIT_ALERT = "EDIT_ALERT";
export const FETCH_MESSAGE = "FETCH_MESSAGE";
export const FILTER_ALERTS = "FILTER_ALERTS";
export const GET_ALERT_AUTHOR = "GET_ALERT_AUTHOR";
export const GET_ALL_ALERTS = "GET_ALL_ALERTS";
export const GET_ERRORS = "GET_ERRORS";
export const GET_ONE_ALERT = "GET_ONE_ALERT";
export const GET_DETAILS = "GET_DETAILS";
export const MESSAGE_SENT = "MESSAGE_SENT";
export const OPEN_MODAL = "OPEN_MODAL";
// export const SELECT_ALERT = 'SELECT_ALERT'
// export const SEND_MESSAGE = "SEND_MESSAGE";
export const SET_ALERT_TYPE = "SET_ALERT_TYPE";
export const UPLOAD_FILE = "UPLOAD_FILE";

// MESSAGE ACTIONS //
export const sendMessage = message => dispatch => {
  axios
    .post("/api/message", message)
    .then(res =>
      dispatch({
        type: MESSAGE_SENT
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post(`/api/profile`, profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// ALERT ACTIONS //
export function addNewAlert(values) {
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
  const request = axios.delete(`/api/alert/${alertId}`);
  return {
    type: DELETE_ALERT,
    payload: request
  };
}
export function deletePhotoUrl() {
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
  const request = axios.get(`/api/alert/search?terms=${terms}`);
  return {
    type: FILTER_ALERTS,
    payload: request
  };
}
// export function selectAlert(alertId){
//   return {
//     type: SELECT_ALERT,
//     payload: alertId
//   }
// }
export function setAlertType(alertType) {
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

// Get alert author by user id
export const getUserById = userId => dispatch => {
  axios.get(`/api/user/${userId}`).then(user => {
    dispatch({
      type: GET_ALERT_AUTHOR,
      payload: user
    });
  });
};

// MODAL ACTIONS //
export function openModal(payload) {
  return {
    type: OPEN_MODAL,
    payload: payload
  };
}
export function closeModal() {
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
