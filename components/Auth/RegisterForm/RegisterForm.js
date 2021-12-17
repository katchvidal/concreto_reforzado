import React from "react";
import { Button } from "semantic-ui-react";

export default function RegisterForm({ ShowLoginForm }) {
  return (
    <div>
      <h1> Register Form</h1>
      <Button onClick={ShowLoginForm}> Ir al Login </Button>
    </div>
  );
}
