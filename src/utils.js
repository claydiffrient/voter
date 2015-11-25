export function isAuthed (token = getToken(), parser = parseJWT) {
  if (token) {
    const params = parser(token);
    return Math.round(new Date().getTime() / 1000) <= params.exp;
  } else {
    return false;
  }
}

export function parseJWT (token = getToken(), aToB = window.atob) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(aToB(base64));
}

export function deleteToken () {
  window.sessionStorage.removeItem('voter');
}

export function getToken () {
  return window.sessionStorage.getItem('voter')
}

export function setToken (token) {
  window.sessionStorage.setItem('voter', JSON.stringify(token));
}

/**
 * Use this method to configure the axios library as
 * it needs to be with interceptors etc.
 * @param  {Object} axiosLib The axios library
 * @return {Object}          The configure axios library
 */
export function configureAxios (axiosLib, token = getToken()) {
  // Set the auth token if it's available
  axiosLib.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosLib.interceptors.response.use((response) => {
    if (response.data.token) {
      setToken(response.data.token);
    }
    return response;
  });

  return axiosLib;
}
