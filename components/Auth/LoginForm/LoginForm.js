import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { StrappiLogin, StrappiResetPassword } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm({ ShowRegisterForm, closeShowModal }) {
  const [Loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validateSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      const result = await StrappiLogin(values);
      if (result?.jwt) {
        login(result.jwt);
        closeShowModal();
        toast.success(
          `Bienvenido/a ${result.user.name} ${result.user.lastname}`,
          { theme: "colored" }
        );
      } else {
        toast.error("Email or Password are invalid", { theme: "light" });
      }
      setLoading(false);
    },
  });

  const ResetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      StrappiResetPassword(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        placeholder="Email"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.identifier}
        error={formik.errors.identifier && true}
      />
      <Form.Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={ShowRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={Loading}>
            Sign in
          </Button>
          <Button type="button" onClick={ResetPassword}>
            ¿Forgot Password?
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validateSchema() {
  return {
    identifier: Yup.string().required(true).email(true),
    password: Yup.string()
      .required(true)
      .min(6, "Minimo Seis Caracteres Incluidas Mayusculas y Minisculas"),
  };
}
