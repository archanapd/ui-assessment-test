import axios from 'axios';

let axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer'
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
