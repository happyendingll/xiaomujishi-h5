const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { get };
