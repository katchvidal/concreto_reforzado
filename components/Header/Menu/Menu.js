/* eslint-disable @next/next/link-passhref */
import React, { useState } from "react";
import { Container, Menu, Grid, Icon, Button } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";

export default function MenuWeb() {
  //  Estado del Modal
  const [showModal, setshowModal] = useState(false);
  // Funcion para Abrir Modal
  const onShowModal = () => setshowModal(true);
  // Funcion para Cerrar Modal
  const closeShowModal = () => setshowModal(false);
  // Estado del Titulo
  const [titleModal, settitleModal] = useState("Iniciar Sesion");
  //  Funcion de Logout, Auth
  const { logout, auth } = useAuth();

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {auth ? (
              <Button basic onClick={logout}>
                Cerrar Sesion
              </Button>
            ) : (
              <MenuUser onShowModal={onShowModal} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setshowModal}
        title={titleModal}
        size="small"
      >
        <Auth closeShowModal={closeShowModal} settitleModal={settitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatform() {
  return (
    <Menu>
      <Link href="/PS5">
        <Menu.Item as="a">PS5</Menu.Item>
      </Link>
      <Link href="/X-BOX">
        <Menu.Item as="a">X-BOX</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuUser({ onShowModal }) {
  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
}
