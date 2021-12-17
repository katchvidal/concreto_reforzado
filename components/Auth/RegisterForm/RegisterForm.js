import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { StrappiRegister } from "../../../api/user";
import { toast } from "react-toastify";

export default function RegisterForm({ ShowLoginForm }) {
  const [Loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validateSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await StrappiRegister(values);
      console.log(response);
      if (response?.jwt) {
        toast.success("User Create Succesfull", {
          theme: "colored",
          icon: "🟢",
        });
        ShowLoginForm();
      } else {
        toast.error("Error Try Again", { theme: "dark" });
      }
      setLoading(false);
    },
  });
  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name && true}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        value={formik.values.lastname}
        onChange={formik.handleChange}
        error={formik.errors.lastname && true}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username && true}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={ShowLoginForm}>
          {" "}
          Sign in
        </Button>
        <Button type="submit" className="submit" loading={Loading}>
          Sign up
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}

function validateSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().required(true).email(true),
    password: Yup.string()
      .required(true)
      .min(6, "Minimo Seis Caracteres Incluidas Mayusculas y Minisculas"),
  };
}
