import { URL_BASE } from "../utils/constants";
import { authFetch } from "../utils/fetch";

//  Peticiones Fetch a API publicas

export async function StrappiRegister(formData) {
  try {
    const url = `${URL_BASE}/api/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function StrappiLogin(formData) {
  try {
    const url = `${URL_BASE}/api/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function StrappiResetPassword(identifier) {
  try {
    const url = `${URL_BASE}/api/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(identifier),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function StrappiGetMe(logout) {
  try {
    const url = `${URL_BASE}/api/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function StrappiUpdateUser(idUser, data, logout) {
  try {
    const url = `${URL_BASE}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
