import React from "react";
import { Modal, Icon } from "semantic-ui-react";

export default function BasicModal({
  children,
  show,
  setShow,
  title,
  ...rest
}) {
  const onClose = () => setShow(false);
  return (
    <Modal className="basic-modal" open={show} onClose={onClose} {...rest}>
      <Modal.Header className="header">
        <span> {title} </span> <Icon onClick={onClose} name="close"></Icon>
      </Modal.Header>
      <Modal.Content> {children} </Modal.Content>
    </Modal>
  );
}
