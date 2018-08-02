import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import AlertsReducer from "./alerts_reducer";
import SetAlertTypeReducer from "./set_alert_type_reducer";
import FilteredReducer from "./filtered_reducer";
import ModalReducer from "./modal_reducer";
import FileUploaderReducer from "./file_uploader_reducer";

export default combineReducers({
  alerts: AlertsReducer,
  auth: authReducer,
  filtered: FilteredReducer,
  open: ModalReducer,
  file: FileUploaderReducer,
  alert_type: SetAlertTypeReducer,
  errors: errorReducer,
  profile: profileReducer
});
