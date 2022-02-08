import React, { Component } from "react";
import Faq from "react-faq-component";
import j from "../faq/faq.module.css";

const data = {
    title: "Preguntas Frecuentes",
    rows: [
        {
            title: "¿Que datos necesito para registrarme?",
            content:
                "Para registrarte en ReservApp, deberás iniciar sesión con google o mail. Esto nos servirá para poder dejar los datos de la reserva a la cancha.",
        },
        {
            title: "¿Cómo reservar un turno para jugar?",
            content:
                "Para reservar una cancha, es tan sencillo como darle en reservar a la cancha que te guste, luego escoger horario, fecha y así podrás ver la disponibilidad. Luego, dependiendo del club, deberás o no dejar una tarjeta como un deposito de seguridad. No se te cobrará nada a menos que no cumplas con las polticas de cancelación. Podrás encontrar canchas de fútbol, padel, tenis y todos los deportes que estén disponibles en la plataforma.",
        },
        {
            title: "¿La reserva es instantánea o necesito una confirmación del club?",
            content:
                "La reserva es instantanea. Los clubes utilizan nuestro software de gestión profesional para clubes en donde vuelcan su disponibilidad en tiempo real. De esta manera le garantizamos al usuario el 100% de efectividad en las reservas",
        },
        {
            title: "¿Cuánto tiempo tengo para cancelar una reserva ya confirmada?",
            content:
                "La cancelación siempre dependerá de las políticas del club. De todas maneras siempre las sabrás antes de reservar, ya que nosotros te las informaremos antes de procesar el pago. En caso de lluvia, podrás contactarte directamente con el club y así el mismo club gestionará la devolución de la seña en caso de que corresponda.",
        },
        {
            title: "¿Qué pasa si no voy a jugar?",
            content:
                "En caso de que no te presentes, se debitará el monto de la seña de tu tarjeta ingresada. Es importante que canceles lo antes posible para poder permitirle a otros usuarios que practiquen deporte.",
        },
    ],
};

export default class App extends Component {
    render() {
        return (
            <div className={j.estilos}>
                <Faq data={data} />
            </div>
        );
    }
}