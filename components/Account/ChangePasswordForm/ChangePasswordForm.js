import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { StrappiUpdateEmail } from "../../../api/user";

export default function ChangePasswordForm({ user, logout }) {
  const { id } = user;
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: intialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await StrappiUpdateEmail(id, values, logout);
      if (!response) {
        toast.error("Something went wrong", { theme: "colored" });
      } else {
        toast.success("Password Change Succesfull", { theme: "dark" });
        logout();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-password-form">
      <h3>Change your Password</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={formik.values.password}
            name="password"
            iconPosition="left"
            icon="user"
            placeholder="Password"
            type="password"
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Form.Input
            value={formik.values.password2}
            name="password2"
            iconPosition="left"
            icon="user"
            placeholder="Password Confirm"
            type="password"
            onChange={formik.handleChange}
            error={formik.errors.password2}
          />
        </Form.Group>
        <Button className="submit" loading={Loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function intialValues() {
  return {
    password: "",
    password2: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required()
      .oneOf([Yup.ref("password2")], "Matches with Confirm Password Required"),
    password2: Yup.string()
      .required("Password Confirm is Required Field")
      .oneOf([Yup.ref("password")], "Matches with Password Required"),
  };
}
