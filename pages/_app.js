import { ToastContainer } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "../scss/global.scss";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import React, { useMemo, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getToken, removeToken, setToken } from "../utils/token";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  // Estado que se encarga de Verificar si estan Autenticados o no
  const [auth, setAuth] = useState(undefined);
  // Estado que se encarga de forzar una Actualizacion a la Aplicacion
  const [reloadUser, setReloadUser] = useState(false);
  //  Hook de next para poder moverse a un punto en especifico
  const router = useRouter();

  // Siempre busca si hay un token guardado en el LocalStorage
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        id: jwt_decode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [setReloadUser]);

  //Funcion de Login
  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      id: jwt_decode(token).id,
    });
  };

  // Funcion de Logout
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  //  Datos que nos interesa que distribuya el Contexto
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  //  Si no hay ningun token regresa null
  if (auth === undefined) return null;
  return (
    <>
      <AuthContext.Provider value={authData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </>
  );
}
