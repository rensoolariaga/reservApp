import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout /*, logoutG, activeSessionGoogle */ } from "../../redux/actions/index.js";
import s from "./menuH.module.css";

function Menu() {

  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    history.push("/");

  }
  return (
    <div className={s.font}>
      <div className="grid grid-columns-4 items-center text-center ">
        <Link to="/home/panel" className="p-4">
          Mi panel
        </Link>
        <Link to="/fields" className="p-4">
          Ve por tu cancha
        </Link>
        <Link to="/agregarCancha" className="p-4">
          Suma tu club
        </Link>
        <button className="p-4" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Menu;