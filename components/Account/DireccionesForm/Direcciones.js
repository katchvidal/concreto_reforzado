import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";

import { toast } from "react-toastify";
import { StrappiCreateAddress } from "../../../api/address";

export default function Direcciones({ setshowModal }) {
  const [Loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validateSchema()),
    onSubmit: async (values) => {
      createAdress(values);
    },
  });

  const createAdress = async (values) => {
    setLoading(true);
    const Address = {
      ...values,
      user: auth.id,
    };
    const result = await StrappiCreateAddress({ Address }, logout);
    console.log(result);
    setLoading(false);
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="title"
          type="text"
          label="Address Title "
          placeholder="Titutlo de la Direccion"
          iconPosition="left"
          icon="wpforms"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Name & Lastname"
            name="name"
            type="text"
            placeholder="Name & Lastname "
            iconPosition="left"
            icon="male"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            label="Address"
            name="address"
            type="text"
            placeholder="Address"
            iconPosition="left"
            icon="address book"
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.errors.address}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            type="text"
            name="city"
            label="City"
            placeholder="City"
            iconPosition="left"
            icon={"pin"}
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.errors.city}
          />
          <Form.Input
            type="text"
            name="state"
            label="State / Region / Provincia"
            placeholder="State / Region / Provincia"
            iconPosition="left"
            icon={"pin"}
            onChange={formik.handleChange}
            value={formik.values.state}
            error={formik.errors.state}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            type="text"
            label="Zip Code"
            placeholder="Zip Code"
            name="zip"
            iconPosition="left"
            icon={"zip"}
            onChange={formik.handleChange}
            value={formik.values.zip}
            error={formik.errors.zip}
          />
          <Form.Input
            type="tel"
            label="Phone Number"
            placeholder="Phone Number"
            name="phone"
            iconPosition="left"
            icon={"phone"}
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
          />
        </Form.Group>
        <div className="actions">
          <Button className="submit" type="submit" loading={Loading}>
            Create Address
          </Button>
        </div>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    address: "",
    title: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };
}

function validateSchema() {
  return {
    name: Yup.string().required(),
    address: Yup.string().required(),
    title: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
    phone: Yup.number().required(),
  };
}
