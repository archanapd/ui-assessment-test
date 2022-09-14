import axios from 'axios';

let axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer 2e3e4e7c-2b4a-4c6c-a482-3594c7281219'
  }
});

export const callAPI = ({
  method,
  resource,
  data = {},
  success = (data) => data,
  error = (data) => data,
  headers = { 'Content-Type': 'application/json'}
}) => {
  let axiosInstanceGenerator =
    method === 'delete'
      ? axiosInstance[method](resource, {
          data,
          headers
        })
      : axiosInstance[method](resource, data, {
          headers
        });

  return axiosInstanceGenerator
    .then((response) => {
      success(response.data);
    })
    .catch((err) => {
      error(err);
    });
};
