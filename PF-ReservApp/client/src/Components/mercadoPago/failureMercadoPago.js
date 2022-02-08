import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { failMail, getUserInfo } from "../../redux/actions/index.js";
import Navbar from "../nav/Nav.js";
import j from "../mercadoPago/failureMercadoPago.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function FailureMercadoPago() {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.isLogged);
    const user = useSelector((state) => state.userInfo);
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
    };

    useEffect(() => {
        if (!isLogged) {
            if (queryParams.status === "rejected" || queryParams.status === "null") {
                dispatch(failMail(objReservation));
            }
            dispatch(getUserInfo());
        }
    });

    const divUserInfo = () => {
        return (
            <div>
                <h2>Usuario: {user.userInfo.mail}</h2>
                <h2>nombre: {user.userInfo.name + " " + user.userInfo.surname}</h2>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className={j.background}>
                <div className={j.containerCardNoPago}>
                    <h1 className={j.titulo}>PAGO NO REALIZADO</h1>
                    <form className="grid grid-cols-1 gap-4  border-opacity-30 m-5 py-2">
                        <h2>Id de la compra: {objReservation.fieldID}</h2>
                        <h2>Fecha: {objReservation.date}</h2>
                        <h2>
                            {"Desde las: " +
                                objReservation.startTime +
                                ":" +
                                (objReservation.startHalf === "true" ? "30" : "00")}
                            horas
                        </h2>
                        <h2 className="pt-0 pb-2">
                            {"Hasta las: " +
                                (objReservation.endHalf === "false"
                                    ? objReservation.endTime
                                    : parseInt(objReservation.endTime) + 1) +
                                ":" +
                                (objReservation.endHalf === "false" ? "30" : "00")}
                            horas
                        </h2>
                        <h2 className="pt-0 pb-2">{"Precio por fracción: " + objReservation.cost}</h2>
                        {isLogged ? divUserInfo() : null}
                        <Link to="/fields">
                            <button className={j.button}>
                                <h4 className={j.text}>Inténtalo de nuevo</h4>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}