import { getToken, hasExpiredToken } from "./token";

//  Peticion fetch de Usuario Autorizado
export async function authFetch(url, params, logout) {
  // Recoger el Token
  const token = getToken();

  //    Verificar Token sea Valido y Correcto
  if (!token) {
    // Si no hay Token desloguear Automaticamente
    logout();
  } else {
    // Si hay Token -> Checalo que sea Correcto y no haya Expirado
    if (hasExpiredToken(token)) {
      // Si no es Correcto o ha Expirado -> Desloguear Automaticamente
      logout();
    } else {
      // Token Correcto y Vigente Hacer la peticion fetch Autenticada
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
}
