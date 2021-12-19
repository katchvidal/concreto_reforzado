/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Start from "../layouts/start";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { StrappiGetMe } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";

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
