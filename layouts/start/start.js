import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../../components/Header";

export default function Start({ children }) {
  return (
    <Container fluid className="start">
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
}
