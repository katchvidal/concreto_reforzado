import { URL_BASE } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function StrappiCreateAddress(data, logout) {
  console.log(data);
  try {
    const url = `${URL_BASE}/api/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
  }
}
