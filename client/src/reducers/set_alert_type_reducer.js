import { SET_ALERT_TYPE } from '../actions/index'

export default function(state = {}, action){
  switch (action.type) {
  case SET_ALERT_TYPE:
    return { ...state, alert_type: action.payload }
  default:
    return state
  }
}
