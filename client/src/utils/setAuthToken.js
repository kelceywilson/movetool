import axios from "axios";

const setAuthToken = (token, modal) => {
  console.log("modal?", modal);
  // if (modal === "true") {
  //   delete axios.defaults.headers.common["Authorization"];
  // } else
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
