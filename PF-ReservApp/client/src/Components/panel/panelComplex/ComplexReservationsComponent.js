import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import CardReservas from "./CardComponentReservations.js";
import { getUserInfo, getFieldsByComplex } from "../../../redux/actions";
import s from "./complexreservationscomponent.module.css";


import Navbar from "../../nav/Nav";

export default function ComplexReservationsComponent() {
    const history = useHistory();
    const dispatch = useDispatch();
    const fieldsByComplex = useSelector((state) =>
        state.fieldsByComplex ? state.fieldsByComplex : null
    );
    const { id } = useParams();

    useEffect(() => {
        dispatch(getFieldsByComplex(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    function handleReturn(e) {
        e.preventDefault();
        history.push("/home/panel");
    }

    const Reservas = fieldsByComplex?.rReservations;
    const arr = Reservas?.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return 1;
        }
        if (a.createdAt < b.createdAt) {
            return -1;
        }
        return 0;
    });

    const createdArr = [];
    const reservas = [];
    const arrCount = [];
    const repeCount = [];

    if (arr && arr.length) {
        for (var i = 0; i < arr.length; i++) {
            let CreatedAtSlice = arr[i].createdAt.slice(0, 20);
            createdArr.push(CreatedAtSlice);
        }
    }

    let count = 30;
    let repes = 1;

    for (var j = 0; j < createdArr.length; j++) {
        if (createdArr[j] === createdArr[j - 1]) {
            if (j === createdArr.length - 1) {
                count = count + 30;
                repes = repes + 1;
                arrCount.push(count);
                repeCount.push(repes);
            } else {
                count = count + 30;
                repes = repes + 1;
            }
        } else {
            reservas.push(arr[j]);
            if (count > 30) {
                arrCount.push(count);
                repeCount.push(repes);
                count = 30;
                repes = 1;
            }
        }
    }

    let total = 0;

    return (
        <div>
            <Navbar />
            <div className={s.bgGeneral}>
                <div className="pt-6">
                    <button
                        className="absolute left-10 top-25 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
                        onClick={handleReturn}
                    >
                        Volver
                    </button>
                    <div className={s.gridCont}>
                        {/* ACA VA EL MAP */}
                        {reservas &&
                            reservas.map((e, i) => {
                                let tiempo = arrCount.shift();
                                let repe = repeCount.shift();
                                let precio = e.cost * repe;
                                total = total + precio;
                                return (
                                    <div key={"Reservacard" + i} className=" pt-6 pb-40 ">
                                        <CardReservas
                                            hora={e.startTime}
                                            fecha={e.date}
                                            index={i}
                                            idCancha={e.fieldId}
                                            tiempo={tiempo}
                                            half={e.half}
                                            duracion={repe}
                                            precio={precio}
                                            total={total}
                                            id={e.id}
                                            Reservas={arr}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                    {
                        total !== 0 ?
                            <h1 className="text-4xl pb-10">SALDO A FAVOR DEL COMPLEJO: ${total}</h1>
                            :
                            <h1 className="text-4xl pb-10">NO SE REALIZARON RESERVAS POR EL MOMENTO</h1>
                    }
                </div>
            </div>
        </div>
    );
}