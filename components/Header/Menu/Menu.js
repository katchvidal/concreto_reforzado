/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from "react";
import { Container, Menu, Grid, Icon, Button } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { StrappiGetMe } from "../../../api/user";
import { useQuery } from "@apollo/client";
import { GETME } from "../../../graphql/user";

export default function MenuWeb() {
  const { data, loading, error } = useQuery(GETME);
  //  Estado del Modal
  const [showModal, setshowModal] = useState(false);
  // Funcion para Abrir Modal
  const onShowModal = () => setshowModal(true);
  // Funcion para Cerrar Modal
  const closeShowModal = () => setshowModal(false);
  // Estado del Titulo
  const [titleModal, settitleModal] = useState("Iniciar Sesion");
  //  Estado que guarda el Usuario de la Peticion a Strappi
  const [user, setUser] = useState(undefined);
  //  Funcion de Logout, Auth
  const { logout, auth, setReloadUser } = useAuth();

  useEffect(() => {
    (async () => {
      if (data === null || data === undefined) {
        return setUser(null);
      }
      //const response = await StrappiGetMe(logout);
      setUser(data.me.user);
      setReloadUser(true);
    })();
  }, [auth, logout, data, setReloadUser]);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuUser onShowModal={onShowModal} logout={logout} user={user} />
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

function MenuUser({ onShowModal, user, logout }) {
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Whish List
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a">
              <Icon name="cart" />
              Shopping Cart
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout}>
            <Icon name="power off" />
            Cerrar Sesion
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
