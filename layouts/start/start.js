import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import classNames from "classnames";

export default function Start({ children, className }) {
  //className="start"
  return (
    <Container
      fluid
      className={classNames("start", { [className]: className })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
}
