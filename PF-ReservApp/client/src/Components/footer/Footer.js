import React from "react";
import j from "./footer.module.css";

export default function FooterPage() {
  return (
    <div className={j.body}>
      <div fluid="true" className="text-center text-md-left">
        <div>
          <div>
            <h5 className={j.titulo}>Reserv</h5>
            <h5 className={j.titulo2}>App</h5>
            <h5 className={j.eslogan}>Una cancha en tu bolsillo</h5>
          </div>
          <div>
            <ul>
              <h1 className={j.reservaTuCancha}>Reserva Tu Cancha</h1>
            </ul>
            <li className={j.textReserva}>
              <h3>Puedes reservar tu cancha con nosotros</h3>
              <h3>de una forma sencilla y práctica</h3>
              <h3>juega en familia y con amigos.</h3>
            </li>
          </div>
          <div>
            <ul>
              <h1 className={j.clubes}>Clubes y centros deportivos</h1>
            </ul>
            <li className={j.textClubes}>
              <h3>Puedes agregar tu club de forma gratuita</h3>
              <h3>Llegarle a más personas que no conocen tu club</h3>
              <h3>tus ventas subirán considerablemente.</h3>
            </li>
          </div>
          <div>
            <ul>
              <h1 className={j.ubicacion}>Estamos ubicados</h1>
            </ul>
            <li className={j.textUbicacion}>
              <h3>En toda la Argentina</h3>
              <h3>Próximamente en Colombia</h3>
            </li>
          </div>
        </div>
      </div>
      <div className={j.copyright}>
        <div fluid="true">
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://reservappoficial-5qb1plrvg-reservappoficial.vercel.app/">
            {" "}
            ReservApp{" "}
          </a>
        </div>
      </div>
    </div>
  );
}