import { TOKEN } from "./constants";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken(token) {
  return localStorage.getItem(TOKEN);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}
