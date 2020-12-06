import axios from "axios";
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter((callback) => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        http.get("/api/user/refresh").then((res) => {
          const { accessToken } = res.data;
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(accessToken);
        });
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export default http;
