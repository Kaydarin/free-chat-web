import axios from 'axios';
import { setLogOut } from '@store/app';

let store;

export const injectStore = _store => {
    store = _store
}

const baseUrl = 'http://localhost:8100';
const apiPrefix = '/api';

const instance = axios.create({
    baseURL: baseUrl + apiPrefix,
    withCredentials: true,
});

instance.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        return {
            ...config,
        };
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response && error.response.status === 403) {
            store.dispatch(setLogOut());
        }
        return Promise.reject(error);
    },
);

export default instance;
