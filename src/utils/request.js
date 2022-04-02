const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials:true//允许请求带cookie
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
const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const patch = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
        .patch(url, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
  });
};
export { get ,post,patch};
