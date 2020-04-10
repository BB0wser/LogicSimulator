import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log(window);
    console.log(error);
    if (error.response.status === 401) {
      window.location.href =
        process.env.REACT_APP_API_AUTH_URL +
        "/login" +
        "?next=" +
        window.location.href;
    }
    return Promise.reject(error);
  }
);

export default instance;
