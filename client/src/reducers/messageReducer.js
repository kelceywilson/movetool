import { MESSAGE_SENT } from "../actions";

const initialState = {
  sent: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_SENT:
      return {
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        message: "",
        sent: "Your message has been sent"
      };
    default:
      return state;
  }
}
