import { SEND_MESSAGE } from "../actions";

export default function(state = "", action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return state;
    default:
      return state;
  }
}
