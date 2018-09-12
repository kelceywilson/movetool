import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import AlertsReducer from "./alerts_reducer";
import SetAlertTypeReducer from "./set_alert_type_reducer";
import FilteredReducer from "./filtered_reducer";
import MessageReducer from "./messageReducer";
import ModalReducer from "./modal_reducer";
import FileUploaderReducer from "./file_uploader_reducer";

export default combineReducers({
  alert_type: SetAlertTypeReducer,
  alerts: AlertsReducer,
  auth: authReducer,
  errors: errorReducer,
  file: FileUploaderReducer,
  filtered: FilteredReducer,
  message: MessageReducer,
  open: ModalReducer,
  profile: profileReducer
});
