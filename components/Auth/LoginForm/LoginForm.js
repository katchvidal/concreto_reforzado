import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { StrappiLogin, StrappiResetPassword } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
import { LOGIN } from "../../../graphql/user";

export default function LoginForm({ ShowRegisterForm, closeShowModal }) {
  const [LoginUser] = useMutation(LOGIN);
  const [Loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validateSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { identifier, password } = values;
        const { data, loading, errors } = await LoginUser({
          variables: {
            email: identifier,
            password,
          },
        });
        if (loading && errors) {
          toast.error(`Bienvenido/a ${data.LoginUser.message}`, {
            theme: "dark",
          });
        }
        login(data.LoginUser.token);
        console.log(data.LoginUser);
        toast.success(
          `Bienvenido/a ${data.LoginUser.user.name} ${data.LoginUser.user.lastname}`,
          {
            theme: "colored",
          }
        );
        closeShowModal();
      } catch (error) {
        console.log(error);
      }

      /*
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
      }*/
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
    password: Yup.string().required(true),
  };
}
