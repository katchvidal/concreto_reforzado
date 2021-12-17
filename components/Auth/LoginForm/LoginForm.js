import React from "react";
import { Button } from "semantic-ui-react";

export default function LoginForm({ ShowRegisterForm }) {
  return (
    <div>
      <h1> Login Form </h1>
      <Button onClick={ShowRegisterForm}> Ir al Registro </Button>
    </div>
  );
}
