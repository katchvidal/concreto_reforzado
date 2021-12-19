/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Start from "../layouts/start";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { StrappiGetMe } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import { Icon } from "semantic-ui-react";
import BasicModal from "../components/Modal/BasicModal/BasicModal";
import Direcciones from "../components/Account/DireccionesForm/Direcciones";

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await StrappiGetMe(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && user) {
    router.replace("/");
    return null;
  }
  return (
    <>
      <Start className="account">
        <Configuration
          user={user}
          setReloadUser={setReloadUser}
          logout={logout}
        />
        <Direciones />
      </Start>
    </>
  );
}

function Configuration({ user, setReloadUser, logout }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          setReloadUser={setReloadUser}
          logout={logout}
        />
        <ChangeEmailForm
          user={user}
          setReloadUser={setReloadUser}
          logout={logout}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}

function Direciones() {
  const [showModal, setshowModal] = useState(false);
  const [titleModal, settitleModal] = useState("");
  const [formModal, setformModal] = useState(null);
  const openModal = (title) => {
    settitleModal(title);
    setformModal(<Direcciones setshowModal={setshowModal} />);
    setshowModal(true);
  };
  return (
    <div className="account__direcciones">
      <div className="title">
        Direcciones
        <Icon
          name="plus"
          link
          onClick={() => openModal("Nueva Direccion")}
        ></Icon>
      </div>
      <div className="data">
        <p> lista de direcciones </p>
      </div>
      <BasicModal
        show={showModal}
        setShow={setshowModal}
        title={titleModal}
        size="medium"
      >
        {formModal}
      </BasicModal>
    </div>
  );
}
