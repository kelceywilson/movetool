import _ from "lodash";
import {
  ADD_NEW_ALERT,
  DELETE_ALERT,
  EDIT_ALERT,
  GET_ALL_ALERTS,
  GET_ONE_ALERT,
  FILTER_ALERTS
} from "../actions/index";

// const mappedAlerts = action => _.mapKeys(action.payload.data, '_id')

export default function(state = {}, action) {
  console.log("action received", action);
  switch (action.type) {
    case ADD_NEW_ALERT:
      return { list: _.mapKeys(action.payload.data, "_id") };
    case DELETE_ALERT:
      return { list: _.mapKeys(action.payload.data, "_id") };
    case EDIT_ALERT:
      return { list: _.mapKeys(action.payload.data, "_id") };
    case FILTER_ALERTS:
      return { list: _.mapKeys(action.payload.data, "_id") };
    case GET_ALL_ALERTS:
      return { list: _.mapKeys(action.payload.data, "_id") };
    case GET_ONE_ALERT:
      return { ...state, alert: action.payload.data };
    default:
      return state;
  }
}
