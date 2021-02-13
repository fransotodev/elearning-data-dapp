import axios from "axios";

axios.defaults.headers.common["X-Experience-API-Version"] = "1.0.3";

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error);
});

export function get(endpoint, config) {
  return axios.get(endpoint, config);
}

/*
    try {
      const result = await get(endpointAPI, {
        headers: { Authorization: authorizationHeader },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
*/
