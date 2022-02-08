import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Navbar from "../nav/Nav";
import Calendar from "../calendar/Calendar.js";
import { getField, getReviews, postReservationMP } from "../../redux/actions";
import CardReview from "../reviews/CardReview";
import { IoIosFootball } from "react-icons/io";
import s from "./createReserva.module.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function CreateReserva(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);
  const Reviews = useSelector((state) => state.reviews);
  const mp = useSelector((state) => state.mp);
  const isLogged = useSelector((state) => state.isLogged);
  let currentTime = new Date();
  let refContainer = useRef("");

  let complexId = reservations.complex.id;

  let reviews = Reviews.filter((r) => r.complexId === complexId);

  let puntajes = 0;
  for (var i = 0; i < reviews.length; i++) {
    puntajes = puntajes + reviews[i].rating;
  }
  let promedios = 1;

  if (reviews.length > 0) {
    promedios = puntajes / reviews.length;
  } else promedios = 1;
  let promedio = Math.round(promedios);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
  });

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  useEffect(() => {
    refContainer.current = props.location.search.split("=");
    if (!reservations.id) {
      dispatch(getField({ id: refContainer.current[1] }));
    }
  });

  useEffect(() => {
    if (mp.length >= 10) {
      window.location.assign(mp);
    }
  }, [mp]);

  function handleReturn(e) {
    e.preventDefault();
    history.push("/fields");
  }

  const onClick_CreateReservation = (e) => {
    if (!isLogged) {
      Toast.fire({
        icon: "warning",
        title: "Debes iniciar sesión para proceder",
      });
      return history.push("/");
    }
    if (reservations.data.hours.length <= 1) return alert("Minimo 1 hora");

    let auxDate = reservations.data.firstSlot.date.split("/");
    let objMP = {
      title:
        "Alquiler cancha " +
        reservations.type +
        " del complejo " +
        reservations.complex.name,
      unit_price: reservations.data.hours.length * reservations.cost,
      reservation: {
        date: currentTime.getFullYear() + "-" + auxDate[1] + "-" + auxDate[0],
        startTime: reservations.data.firstSlot.hour,
        startHalf: reservations.data.firstSlot.half === 1 ? true : false,
        endTime: reservations.data.secondSlot.hour,
        endHalf: reservations.data.secondSlot.half === 1 ? true : false,
        cost: reservations.cost,
        fieldID: refContainer.current[1],
      },
    };
    dispatch(postReservationMP(objMP));
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
          <div className={s.containerCrearReserva}>
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

            <h3 className={s.precios}>
              Precio x media hora: {reservations.cost}$
            </h3>
            <button
              className={s.buttonCreateReserva}
              onClick={onClick_CreateReservation}
            >
              RESERVAR
            </button>
            <div>
              {Object.keys(reservations.complex).length === 0 ? (
                <div className={s.loading}>
                  <span> CARGANDO...</span>
                </div>
              ) : (
                <div className={s.posicion}>
                  <div className={s.detalleComplex}>
                    <h1 className="text-lg pb-2">
                      {reservations.complex.address}
                    </h1>
                    <h1 className="text-lg ">
                      {reservations.complex.district},{" "}
                      {reservations.complex.province}
                    </h1>
                    <h1 className="text-m pt-4">
                      {reservations.complex.description}
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
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
