import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from "../nav/Nav.js";
import { getUserInfo } from "../../redux/actions/index.js";
import { ContactForm } from "../contactForm/ContactForm.js";
import FooterPage from "../footer/Footer.js";
import Component from "../faq/faq";
import { Guide } from "../guide/Guide.js";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import r from "../home/home.module.css";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const user = useSelector((state) =>
    state.userInfo ? state.userInfo.userInfo : null
  );
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
  })

  useEffect(() => {
    if (!isLogged) history.push("/");
  }, [isLogged, history]);

  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo());
    } else {
      for (let prop in user) {
        if (prop !== "deletedAt" && prop !== "superuser") {
          if (!user[prop]) {
            Toast.fire({
              icon: 'warning',
              title: 'Debe completar la información de su usuario'
            })
            return history.push("/home/panel");
          }
        }
      }
    }
  }, [dispatch, history, user, Toast]);

  return (
    <div className={r.backgroundHome}>
      <Navbar />
      <div>
        <div>
          <Link to="/fields">
            <button className={r.button}>
              <h4 className={r.text}>Ve por tu cancha</h4>
            </button>
          </Link>
        </div>
      </div>
      <br />
      <Guide />
      <ContactForm />
      <Component />
      <FooterPage />
    </div>
  );
}