let httpProtocol: string = 'https://';
let host: string;
let backendBaseUrl: string;

const buildEnv = process.env.REACT_APP_ENV;
console.log('Build environment: ', buildEnv);

switch (buildEnv) {
  case 'production':
    host = 'https://api.cakap.com';
    backendBaseUrl = '';
    break;
  case 'development':
    host = 'https://api-dev.cakap.com/v3/material';
    backendBaseUrl = '';
    break;
  case 'staging':
    host = 'https://api-staging.cakap.com/v3/material';
    backendBaseUrl = '';
    break;
  case 'hotfix':
    host = 'https://api-hotfix.cakap.com/v3/material';
    backendBaseUrl = '';
    break;
  default:
    host = 'https://api-staging.cakap.com/v3/material';
    backendBaseUrl = '';
    break;
}

export const HTTP_PROTOCOL = `${httpProtocol}`;
export const BASE_URL = `${host}`;
export const BACKEND_BASE_URL = `${backendBaseUrl}`;
