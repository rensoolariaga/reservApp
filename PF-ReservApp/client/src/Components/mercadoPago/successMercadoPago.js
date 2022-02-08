import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../nav/Nav.js";
import { getUserInfo, postReservation } from "../../redux/actions/index.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import j from "../mercadoPago/successMercadoPago.module.css";

export default function SuccessMercadoPago() {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.isLogged);
    const queryString = window.location.search.split("?")[1];
    const queryParams = JSON.parse(
        '{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
            return key === "" ? value : decodeURIComponent(value);
        }
    );

    const objReservation = {
        date: queryParams.date,
        startTime: queryParams.startTime,
        startHalf: queryParams.startHalf,
        endTime: queryParams.endTime,
        endHalf: queryParams.endHalf,
        cost: queryParams.cost,
        fieldID: queryParams.fieldID,
        mpID: queryParams.payment_id,
    };

    function delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    useEffect(() => {
        if (!isLogged) {
            if (queryParams.status === "approved") {
                dispatch(postReservation(objReservation));
            }
            delay(1000).then(() => dispatch(getUserInfo()));
        }
    });

    return (
        <div>
            <Navbar />
            <div className={j.background}>
                <div className={j.containerCardPago}>
                    <h1 className={j.titulo}>PAGO APROBADO</h1>
                    <form className="grid grid-cols-1 gap-4  border-opacity-30 m-5 py-2">
                        <h2>Id de la compra: {objReservation.fieldID}</h2>
                        <h2>Fecha: {objReservation.date}</h2>
                        <h2>
                            {"Desde las: " +
                                objReservation.startTime +
                                ":" +
                                (objReservation.startHalf === "true" ? "30" : "00")} horas
                        </h2>
                        <h2 className="pt-0 pb-2">
                            {"Hasta las: " +
                                (objReservation.endHalf === "false"
                                    ? objReservation.endTime
                                    : parseInt(objReservation.endTime) + 1) +
                                ":" +
                                (objReservation.endHalf === "false" ? "30" : "00")} horas
                        </h2>
                        <h2 className="pt-0 pb-2">{"Precio por fracción: " + objReservation.cost}</h2>
                        <h2>{"Comprobante Mercado Pago: " + queryParams.payment_id}</h2>
                        <Link to="/fields">
                            <button className={j.button}>
                                <h4 className={j.text}>Ya tienes tu cancha</h4>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}