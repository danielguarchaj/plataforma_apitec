const http = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'https://apitec-backend.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'JWT '.concat(auth.token)
  }
})

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
