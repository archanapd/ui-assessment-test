import axios from 'axios';

let axiosInstance = axios.create({
  headers: {
    Authorization: 'Bearer 543b8aab-2ed9-4581-b23c-defae8bc4dd4'
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
