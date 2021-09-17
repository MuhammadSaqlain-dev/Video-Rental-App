import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const TokenKey = "Web Token";

http.setJwt(getJwt());

async function loginUser(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(TokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(TokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(TokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem(TokenKey);
}

export function getJwt() {
  return localStorage.getItem("Web Token");
}

export default {
  loginUser,
  loginWithJwt,
  getCurrentUser,
  logoutUser,
  getJwt,
};
