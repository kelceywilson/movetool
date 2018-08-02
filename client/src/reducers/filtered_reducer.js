import { ADD_NEW_ALERT, DELETE_ALERT, GET_ALL_ALERTS, FILTER_ALERTS } from '../actions/index'

// const mappedAlerts = action => _.mapKeys(action.payload.data, '_id')

export default function(state = false, action){
  // console.log('action received', action)
  switch (action.type) {
  case ADD_NEW_ALERT:
    return false
  case GET_ALL_ALERTS:
    return false
  case DELETE_ALERT:
    return false
  case FILTER_ALERTS:
    return true
  default:
    return state
  }
}
