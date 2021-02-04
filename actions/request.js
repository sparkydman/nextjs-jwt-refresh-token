import axios from 'axios';
import { store } from '../store';
import { getToken } from './user';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const http = axios.create({
  baseURL: 'http://localhost:3000',
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
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        await store().dispatch(getToken());
        // const token = store().getState().token;
        http.get('/api/user/refresh').then((res) => {
          const { accessToken } = res.data;
          // console.log(accessToken);
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(accessToken);
        });
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((accessToken) => {
          // http.defaults.headers.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = 'Bearer ' + accessToken;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export default http;
