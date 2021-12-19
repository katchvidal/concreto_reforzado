import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { StrappiUpdateEmail } from "../../../api/user";

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const { email, id } = user;
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: intialValues(email),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      const result = await StrappiUpdateEmail(id, values, logout);
      console.log(result);
      if (!result || result?.error) {
        toast.error(`Something went wrong, ${result.error.message}`, {
          theme: "light",
        });
      } else {
        toast.success("Email update Succesfull", { theme: "dark" });
        setReloadUser(true);
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h3>
        Change your Email <span> {user.email} </span>
      </h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={formik.values.email}
            name="email"
            iconPosition="left"
            icon="mail"
            placeholder="Email"
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        </Form.Group>
        <Button className="submit" loading={Loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function intialValues(email) {
  return {
    email: email || "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email().required(),
  };
}
