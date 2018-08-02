import { CLOSE_MODAL, DELETE_ALERT, OPEN_MODAL } from '../actions/index'

export default function(state = {open: false}, action){
  switch (action.type) {
  case CLOSE_MODAL:
    return {open: false}
  case DELETE_ALERT:
    return {open: false}
  case OPEN_MODAL:
    return {...action.payload, open: true}
  default:
    return state
  }
}
