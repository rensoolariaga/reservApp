import React, { useEffect } from "react";
import { Menu } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Badge } from "@mui/material/";
import { useGoogleLogout } from "react-google-login";
import {
  logout,
  logoutG,
  activeSessionGoogle,
  getUserInfo,
} from "../../redux/actions/index.js";
import s from "./dropdownmenu.module.css";

export default function DropdownMenu() {
  let clientId =
    "466690440359-5vqeuq9phv2er29r0jcpmlq43240cg54.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const history = useHistory();
  let googleSession = useSelector((state) => state.googleLogin);
  let activeSessionG = useSelector((state) => state.activeSessionG);
  const user = useSelector((state) =>
    state.userInfo ? state.userInfo.userInfo : null
  );

  const User = useSelector((state) => (state.userInfo ? state.userInfo : null));

  let na = null;
  let su = null;

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (user && user.name) {
    na = user.name.slice(0, 1).toUpperCase();
    su = user.surname.slice(0, 1).toUpperCase();
  }

  // verificar sessión activa en google
  if (activeSessionG.login) {
    googleSession.login = true;
  }

  useEffect(() => {
    dispatch(activeSessionGoogle());
  }, [dispatch]);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  }

  const onLogoutSuccess = (respuesta) => {
    const mail = null;
    const tokenId = null;
    const name = null;
    const surname = null;

    dispatch(
      logoutG({
        mail: mail,
        tokenId: tokenId,
        name: name,
        surname: surname,
      })
    );
    history.push("/");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
  });

  return (
    <Menu>
      <>
        {user && user.superuser ? (
          <>
            {" "}
            <Menu.Button>
              {" "}
              <Badge>
                <Avatar src="diego1.jpg" alt="Super" sx={{ width: 77, height: 77 }} />
              </Badge>
            </Menu.Button>{" "}
          </>
        ) : (
          <>
            {" "}
            {User?.privileges?.length && User.privileges.length > 0 ? (
              <>
                <Menu.Button>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color="success"
                  >
                    <Avatar
                      src=""
                      sx={{
                        width: 66,
                        height: 66,
                        bgcolor: "gray",
                        color: "black",
                      }}
                    >
                      {" "}
                      admin{" "}
                    </Avatar>
                  </Badge>
                </Menu.Button>
              </>
            ) : (
              <>
                <Menu.Button>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color="success"
                  >
                    <Avatar
                      src=""
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "gray",
                        color: "black",
                      }}
                    >
                      {na} {su}{" "}
                    </Avatar>
                  </Badge>
                </Menu.Button>
              </>
            )}{" "}
          </>
        )}
      </>
      <Menu.Items className="z-50 origin-top-right absolute right-0 shadow-lg ring-4 ring-white  ring-opacity-20 mr-2 mt-2">
        <div className={s.itemBlanco}>
          <Menu.Item>
            {({ active }) => (
              <a
                href="/home/panel"
                className={`${active ? "opacity-100 " : "opacity-60"}`}
              >
                Mi Panel
              </a>
            )}
          </Menu.Item>
        </div>
        <div className={s.itemGris}>
          <Menu.Item>
            {({ active }) => (
              <a
                href="/agregarComplejo"
                className={`${active ? "opacity-100 " : "opacity-60"}`}
              >
                Suma tu Club
              </a>
            )}
          </Menu.Item>
        </div>
        {googleSession.login ? (
          <div className={s.itemBlanco}>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOut}
                  className={`${active ? "opacity-100" : "opacity-60"}`}
                >
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        ) : (
          <div className={s.itemBlanco}>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${active ? "opacity-100" : "opacity-60"}`}
                >
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        )}
      </Menu.Items>
    </Menu>
  );
}
