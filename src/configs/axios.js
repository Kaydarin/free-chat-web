import axios from 'axios';

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
        return Promise.reject(error);
    },
);

export default instance;
