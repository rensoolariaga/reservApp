import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { ReviewChecker } from "../../../redux/Hooks";

import {
    getUserInfo,
    getFields,
    deleteReservation,
} from "../../../redux/actions";
import FormReview from "../../reviews/FormReview";
import Swal from "sweetalert2/dist/sweetalert2.js";

import s from "./cardreservas.module.css";

export default function CardReservas({
    hora,
    fecha,
    idCancha,
    idReserva,
    tiempo,
    half,
    duration,
}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [isHidden, setHidden] = useState(true);

    useEffect(() => {
        dispatch(getFields());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    function toggle() {
        setHidden(!isHidden);
    }

    let Fecha = fecha.slice(5);
    let Hora = hora;

    if (half === true) {
        Hora = hora + " :  30";
    }

    const allFields = useSelector((state) => state.fields);
    const cancha = allFields.filter((c) => c.id === idCancha);
    const User = useSelector((state) => state.userInfo);

    if (!cancha[0]) {
        return null;
    }
    let complexID = cancha[0].complex.id;

    const Reservas = User.reservations;

    const createdArr = [];
    let Reserva = Reservas.filter((r) => r.id === idReserva);

    let reservaSlice = Reserva[0].createdAt.slice(0, 20);

    for (var i = 0; i < Reservas.length; i++) {
        let CreatedAtSlice = Reservas[i].createdAt.slice(0, 20);
        createdArr.push(CreatedAtSlice);
    }

    function handleCards() {
        Swal.fire({
            text: "¿Está seguro que desea cancelar su reserva?.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
        }).then((result) => {
            if (result.isConfirmed) {
                for (var j = 0; j < createdArr.length; j++) {
                    if (createdArr[j] === reservaSlice) {
                        let reserva = Reservas[j].id;
                        dispatch(deleteReservation(reserva));
                    } else {
                    }
                }
                Swal.fire({
                    tittle: "Cancelada!",
                    text: "Su reserva ha sido cancelada, se le devolverá el pago en los proximos dias",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
                history.push("/home/panel");
            }
            window.location.reload(false);
        });
    }

    const timeCheck = ReviewChecker({
        date: fecha,
        hour: hora,
        duration: duration,
    });

    return (
        <div>
            <div className={s.card}>
                {cancha[0] ? (
                    <div className="aling-item-end">
                        <button onClick={handleCards} className={s.btnPos}>
                            <MdOutlineCancelPresentation className="h-5 w-5" />
                        </button>
                        <div className="rounded-t-md h-28 ">
                            <div className="text-xl pt-2 "> {cancha[0].name} </div>
                            <div className="text-2xl pt-2  ">
                                {" "}
                                {Hora} hrs <br /> <p> {tiempo} min </p>{" "}
                            </div>
                            <div className="text-2xl pt-5">
                                {cancha[0].complex.name} <br />
                                <div className="text-sm pt-2">
                                    {" "}
                                    {cancha[0].complex.address}{" "}
                                </div>
                                {timeCheck ? (
                                    <button className={s.btn} onClick={toggle}>
                                        Puntuar club
                                    </button>
                                ) : (
                                    <button disabled className={s.btn} onClick={toggle}>
                                        Puntuar club
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={s.fecha}>{Fecha}</div>
                    </div>
                ) : null}
            </div>
            {!isHidden ? (
                <div className="-ml-52">
                    {" "}
                    <FormReview
                        id={complexID}
                        duration={duration}
                        hora={hora}
                        fecha={fecha}
                    />{" "}
                </div>
            ) : null}
        </div>
    );
}