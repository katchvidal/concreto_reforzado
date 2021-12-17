import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ closeShowModal, settitleModal }) {
  const [showLogin, setshowLogin] = useState(true);

  // Funcion para Cambiar de Login <-> Registro
  const ShowLoginForm = () => {
    settitleModal("Sign in");
    setshowLogin(true);
  };
  const ShowRegisterForm = () => {
    settitleModal("Sign up");
    setshowLogin(false);
  };

  return showLogin ? (
    <>
      <LoginForm ShowRegisterForm={ShowRegisterForm} />
    </>
  ) : (
    <>
      <RegisterForm ShowLoginForm={ShowLoginForm} />
    </>
  );
}
