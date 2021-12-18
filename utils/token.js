import jwtDecode from "jwt-decode";
import { TOKEN } from "./constants";

// Guardar Token
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

//  Obtener Token
export function getToken(token) {
  return localStorage.getItem(TOKEN);
}

//  Remover Token
export function removeToken() {
  localStorage.removeItem(TOKEN);
}

//  Token Expirado
export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const ExpireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();

  if (currentDate > ExpireDate) {
    return true;
  }
  return false;
}
