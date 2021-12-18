import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { StrappiUpdateUser } from "../../../api/user";

export default function ChangeNameForm({ user, logout, setReloadUser }) {
  const { name, lastname, id } = user;
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: intialValues(name, lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (value) => {
      setLoading(true);
      const response = await StrappiUpdateUser(id, value, logout);
      if (!response) {
        toast.error("Error to Update User ", { theme: "dark" });
      } else {
        setReloadUser(true);
        toast.success("Update Succesfull", { theme: "dark" });
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-name-form">
      <h3> Change Name & Lastname </h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={formik.values.name}
            name="name"
            iconPosition="left"
            icon="user"
            placeholder="Nombre"
            onChange={formik.handleChange}
            error={formik.errors.name && true}
          />
          <Form.Input
            value={formik.values.lastname}
            name="lastname"
            iconPosition="left"
            icon="user outliner"
            placeholder="Apellido"
            onChange={formik.handleChange}
            error={formik.errors.lastname && true}
          />
        </Form.Group>
        <Button className="submit" loading={Loading}>
          {" "}
          Actualizar{" "}
        </Button>
      </Form>
    </div>
  );
}

function intialValues(name, lastname) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(),
    lastname: Yup.string().required(),
  };
}
