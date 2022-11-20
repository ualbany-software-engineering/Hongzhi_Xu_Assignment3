export async function httpRequest (url, method = 'GET', data = {}, needAuth = true) {
  let headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  url = '/api' + url;
  if (needAuth) {
    if (!token) {
      location.href = '/login'
      return
    }
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
  const body = method === 'POST' || method === 'PUT' || method === 'DELETE'
    ? JSON.stringify(data)
    : null;

  return fetch(url, {
    method,
    body,
    headers
  }).then(res => res.json())
}
