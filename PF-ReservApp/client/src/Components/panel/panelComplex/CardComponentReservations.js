import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReservation } from "../../../redux/actions";
import { useHistory } from "react-router";
import { MdOutlineCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2/dist/sweetalert2.js";

import s from "./CardComponentReservations.module.css";

export default function CardComponentReservations({
    index,
    id,
    hora,
    fecha,
    idCancha,
    tiempo,
    half,
    precio,
    total,
    Reservas,
}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const fields = useSelector((state) => state.fields);
    let Cancha = fields.filter((n) => n.id === idCancha);
    let nombre = Cancha[0].name;

    let Fecha = fecha.slice(5);
    let Hora = hora;
    if (half === true) {
        Hora = hora + " :  30";
    }

    const createdArr = [];

    let Reserva = Reservas.filter((r) => r.id === id);

    let reservaSlice = Reserva[0].createdAt.slice(0, 20);

    for (var i = 0; i < Reservas.length; i++) {
        let CreatedAtSlice = Reservas[i].createdAt.slice(0, 20);
        createdArr.push(CreatedAtSlice);
    }

    function handleCards() {
        Swal.fire({
            // title: '¿Está seguro que desea eliminar su reserva?.',
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
                        // console.log("soy reserva(id): ", reserva);
                        dispatch(deleteReservation(reserva)); // modifique, estaba reserva
                    } else {
                        // console.log("yo no", j);
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
    return (
        <div>
            <div className={s.card}>
                <div className={s.parent}>
                    <div className={s.div1}>
                        <h4 className="text-xl"> {index + 1}</h4>
                    </div>
                    <div className={s.div2}>
                        <h5 className="text-xl"> {nombre}</h5>
                        <h5 className="text-xl"> {Hora} hrs</h5>
                        <h5 className="text-xl">Fecha {Fecha}</h5>
                    </div>
                    <div className={s.div3}>
                        <h5 className="text-xl"> {tiempo} minutos</h5>
                        <h5 className="h-5"> </h5>
                        <h5 className="text-xl"> $ {precio}</h5>
                    </div>
                </div>
                <div className={s.div4}>
                    <button onClick={handleCards} className={s.btnPos}>
                        <MdOutlineCancelPresentation className={s.btn} />
                    </button>
                </div>
            </div>
        </div>
    );
}