import React from "react";
import { Container } from "semantic-ui-react";

export default function Start({ children }) {
  return (
    <Container fuild className="start">
      <Container className="content">{children}</Container>
    </Container>
  );
}
