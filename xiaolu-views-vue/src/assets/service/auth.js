import Cookies from 'js-cookie'
const TokenKey = 'Authorization'
export function setLocal(name,value) {
  Cookies.set(name,value);
}
export function  getLocal(name) {
  return Cookies.get(name);
}
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  Cookies.set(TokenKey, token)
}
export function removeToken() {
  Cookies.remove(TokenKey)
}

export function clearToken(name) {
  Cookies.remove(name)
}


export function setSession(name,value) {
  return sessionStorage.setItem(name,value);
}
export function getSession(name) {
  return sessionStorage.getItem(name);
}
export function delSession(name) {
  return sessionStorage.removeItem(name);
}
