import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "../../nav/Nav";
import Calendar from "../../calendar/Calendar";
import {
    getField,
    getReviews,
    getUserInfo,
    postReservation,
} from "../../../redux/actions/index";
import CardReview from "../../reviews/CardReview";
import { IoIosFootball } from "react-icons/io";
import s from "./complexReservations.module.css";

export default function ComplexReservations() {
    const history = useHistory();
    const dispatch = useDispatch();
    const reservations = useSelector((state) => state.reservations);
    const Reviews = useSelector((state) => state.reviews);
    const isLogged = useSelector((state) => state.isLogged);

    const queryString = window.location.search.split("?")[1];
    const queryParams = JSON.parse(
        '{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
            return key === "" ? value : decodeURIComponent(value);
        }
    );

    let currentTime = new Date();
    let complexId = reservations.complex.id;
    let reviews = Reviews.filter((r) => r.complexId === complexId);

    let puntajes = 0;
    for (var i = 0; i < reviews.length; i++) {
        puntajes = puntajes + reviews[i].rating;
    }
    let promedios = puntajes / reviews.length;
    let promedio = Math.round(promedios);

    useEffect(() => {
        dispatch(getReviews());
        dispatch(getUserInfo());
    }, [dispatch]);

    useEffect(() => {
        if (!reservations.id) {
            dispatch(getField({ id: queryParams.id }));
        }
    });

    function handleReturn(e) {
        e.preventDefault();
        history.push("/home/panel");
    }

    const onClick_CreateReservation = (e) => {
        if (!isLogged) {
            alert("Debes iniciar sesión para proceder");
            return history.push("/");
        }
        let splitDate = reservations.data.firstSlot.date.split("/");
        let auxDate = "";
        if (currentTime.getMonth() + 1 === 12 && splitDate[1] === 1)
            auxDate =
                currentTime.getFullYear() + 1 + "-" + splitDate[1] + "-" + splitDate[0];
        else {
            auxDate =
                currentTime.getFullYear() + "-" + splitDate[1] + "-" + splitDate[0];
        }

        const objReservation = {
            date: auxDate,
            startTime: reservations.data.firstSlot.hour,
            startHalf: reservations.data.firstSlot.half === 1 ? "true" : "false",
            endTime: reservations.data.secondSlot.hour,
            endHalf: reservations.data.secondSlot.half === 1 ? "true" : "false",
            cost: reservations.cost,
            fieldID: reservations.id,
        };
        dispatch(postReservation(objReservation));
        window.location.reload(false);
    };

    let r = 0;
    let a = 0;
    let t = 0;
    let j = 0;
    let n = 0;
    if (promedio === 1) {
        r = <IoIosFootball />;
        a = null;
        t = null;
        j = null;
        n = null;
    }
    if (promedio === 2) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = null;
        j = null;
        n = null;
    }
    if (promedio === 3) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = <IoIosFootball />;
        j = null;
        n = null;
    }
    if (promedio === 4) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = <IoIosFootball />;
        j = <IoIosFootball />;
        n = null;
    }
    if (promedio === 5) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = <IoIosFootball />;
        j = <IoIosFootball />;
        n = <IoIosFootball />;
    }

    return (
        <div className={s.bgGeneral}>
            <Navbar />
            {reservations.id !== "" ? (
                <div>
                    <button
                        className="absolute left-5 top-28 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
                        onClick={handleReturn}
                    >
                        Volver
                    </button>
                    <h1 className="text-3xl pt-8 pb-3">{reservations.complex.name}</h1>
                    <h1 className="text-3xl pt-4 pb-3 inline-block">{r}</h1>
                    <h1 className="text-3xl pt-4 pb-3 inline-block">{a}</h1>
                    <h1 className="text-3xl pt-4 pb-3 inline-block">{t}</h1>
                    <h1 className="text-3xl pt-4 pb-3 inline-block">{j}</h1>
                    <h1 className="text-3xl pt-4 pb-3 inline-block">{n}</h1>
                    <h1 className="text-5xl pt-3 pb-3">{reservations.name}</h1>
                    <div>
                        <h2 className={s.type}>{reservations.type}</h2>
                        <h4 className={s.horarios}>Horarios disponibles: </h4>
                    </div>
                    <div className={s.calendar}>
                        <Calendar />
                    </div>
                    <div className={s.imagen}>
                        <img
                            src={reservations.complex.images}
                            alt="imagen cancha"
                            height="1px"
                            width="550px"
                        />
                    </div>

                    <h3 className="text-xl pt-14">
                        Precio x media hora: {reservations.cost}$
                    </h3>
                    <button
                        className={s.buttonCreateReserva}
                        onClick={onClick_CreateReservation}
                    >
                        RESERVAR
                    </button>
                </div>
            ) : null}

            {Object.keys(reservations.complex).length === 0 ? (
                <div className={s.loading}>
                    <span> CARGANDO...</span>
                </div>
            ) : (
                <div className={s.posicion}>
                    <div className={s.detalleComplex}>
                        <h1 className="text-lg pb-2">{reservations.complex.address}</h1>
                        <h1 className="text-lg ">
                            {reservations.complex.district}, {reservations.complex.province}
                        </h1>
                        <h1 className="text-m pt-4">{reservations.complex.description}</h1>
                    </div>
                </div>
            )}
            <div className="pt-10 ml-10">
                {reviews &&
                    reviews.map((el, i) => {
                        return (
                            <div className="inline-block p-2" key={"review" + i}>
                                <CardReview
                                    rating={el.rating}
                                    comment={el.comment}
                                    date={el.createdAt.slice(0, 10)}
                                    id={el.userId}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}