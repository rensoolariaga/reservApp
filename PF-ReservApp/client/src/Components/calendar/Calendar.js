import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_RESERVATION_DATA } from "../../redux/Consts";
import { getField } from "../../redux/actions";

import "./calendar.css";

const Calendar = () => {
  const [res, setRes] = useState({ hours: [], firstSlot: {}, secondSlot: {} });
  const reservations = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  let currentTime = new Date();
  let dateArray = [];
  let hourArray = [];
  let greenArray = [];
  const greenClassName = "caldiv slotButton green";
  const redClassName = "caldiv slotButton red";
  const yellowClassName = "caldiv slotButton yellow";

  const queryString = window.location.search.split("?")[1];
  const queryParams = JSON.parse(
    '{"' + queryString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );

  useEffect(() => {
    if (queryParams.id !== reservations.id) {
      dispatch(getField({ id: queryParams.id }));
    } else {
      if (reservations.complex.name) {
        currentTimeFilter(currentTime);
        if (reservations.array.length !== 0) {
          fillReserved(reservations.array);
        }
      }
    }
  });

  if (!reservations.complex.name) return <p>ERRRORR</p>;

  const fillReserved = function (reservedArray) {
    reservedArray.forEach((element) => {
      let split = element.date.split("-");
      let dateID = split[2] + "/" + split[1];
      let index = 2 * element.startTime + (element.half ? 1 : 0);
      let indexButton = document.getElementById(getID(index, dateID));
      if (indexButton) indexButton.className = redClassName;
    });
  };

  const currentTimeFilter = function (current) {
    let cHour = current.getHours();
    let cMinute = current.getMinutes();
    let openFrom = reservations.complex.openfrom.split(":");
    let start = openFrom[0] * 2 + (openFrom[1] === "30" ? 1 : 0);
    let endIndex = cHour * 2 + (cMinute % 30 === 1 ? 1 : 0);

    if (!start > cHour) return;

    let dateID = current.getDate() + "/" + (current.getMonth() + 1);

    for (let index = start; index < endIndex + 3; index++) {
      let indexButton = document.getElementById(getID(index, dateID));
      if (indexButton) indexButton.className = redClassName;
    }
  };

  for (let index = 0; index < 7; index++) {
    let result = new Date();

    result.setDate(currentTime.getDate() + index);
    dateArray.push(result.getDate() + "/" + (result.getMonth() + 1));
  }

  const createTimeLabels = function () {
    // console.log("CREATIME TIME LABELS: ", reservations)
    let openFrom = reservations.complex.openfrom.split(":");
    let openTo = reservations.complex.opento.split(":");
    let start = openFrom[0] * 2 + (openFrom[1] === "30" ? 1 : 0);
    let end = openTo[0] * 2 + (openTo[1] === "30" ? 1 : 0);

    for (let index = start; index < end; index++) {
      hourArray.push(
        <label key={"timeLabel." + index} className="caldiv">
          {Math.floor(index / 2) + ":" + (index % 2 ? "30" : "00")}
          {" - "}
          {Math.floor((index + 1 === 48 ? 0 : index + 1) / 2) +
            ":" +
            ((index + 1) % 2 ? "30" : "00")}
        </label>
      );
    }
  };

  if (reservations.complex.name) createTimeLabels();

  const checkHours = function (res, date, hour, half) {
    /*
      Funcion que devuelve si se puede clickear para reservar un horario o no
      Solo green->red
    */

    if (res.hours.length === 0) {
      res.hours = [{ date, hour, half }];
      res.firstSlot = { date, hour, half };
      res.secondSlot = { date, hour, half };

      return true;
    }

    if (date !== res.firstSlot.date) return false;

    let index = 2 * hour + (half ? 1 : 0);
    let findex = 2 * res.firstSlot.hour + (res.firstSlot.half ? 1 : 0);
    let sindex = 2 * res.secondSlot.hour + (res.secondSlot.half ? 1 : 0);
    let ratio = index - findex;

    if (ratio === -1) {
      res.hours.push({ date, hour, half });
      res.firstSlot.date = date;
      res.firstSlot.hour = hour;
      res.firstSlot.half = half;
      return true;
    }

    ratio = index - sindex;

    if (ratio === 1) {
      res.hours.push({ date, hour, half });
      res.secondSlot.date = date;
      res.secondSlot.hour = hour;
      res.secondSlot.half = half;
      return true;
    }

    return false;
  };

  const checkRemoveHour = function (res, date, hour, half) {
    //Primero deberia chequear si es un horario que fue reservado por otro horario
    if (date !== res.firstSlot.date) return false;

    if (res.hours.length === 1) {
      if (
        JSON.stringify({ date, hour, half }) === JSON.stringify(res.firstSlot)
      ) {
        setRes({ hours: [], firstSlot: {}, secondSlot: {} });
        return true;
      }
    }

    if (
      JSON.stringify({ date, hour, half }) === JSON.stringify(res.firstSlot)
    ) {
      if (res.firstSlot.half) {
        res.firstSlot.half = 0;
        res.firstSlot.hour += 1;
        if (res.firstSlot.hour === 24) res.firstSlot.hour = 0;
      } else res.firstSlot.half = 1;
      res.hours.splice(res.hours.indexOf({ date, hour, half }));

      return true;
    }

    if (
      JSON.stringify({ date, hour, half }) === JSON.stringify(res.secondSlot)
    ) {
      if (res.secondSlot.half) {
        res.secondSlot.half = 0;
      } else {
        res.secondSlot.half = 1;
        res.secondSlot.hour -= 1;
      }
      res.hours.splice(res.hours.indexOf({ date, hour, half }));
      return true;
    }
  };

  const getID = function (index, date) {
    return index + "-" + date;
  };

  const onClickSlot = (event) => {
    let split = event.target.id.split("-");
    let index = parseInt(split[0]);
    let date = split[1];
    let hour = Math.floor(index / 2);
    let half = index % 2;

    // console.log(event.target.id)
    // console.log("RES: ", res)
    /*
      estado local: res => tiene first y second slot, 
                          correpsondientes a la hora de inicio y finalizacion de la reserva
      Agregar boton tipo submit, que al hacer onclick, lea los datos del estado local y los envie al action creator de post reservation
      
    */

    /* Para validar contra reservas ya hechas (nunca deberia poder pasarlo de rojo a verde)
    Cada vez que quiero hacer click en un rojo, valido contra todas las reservas a ver si hay match  
  */

    if (event.target.className === greenClassName) {
      if (checkHours(res, date, hour, half)) {
        event.target.className = yellowClassName;
      }
    } else {
      if (checkRemoveHour(res, date, hour, half)) {
        event.target.className = greenClassName;
      }
    }

    dispatch({ type: UPDATE_RESERVATION_DATA, payload: res });
  };

  const createGreenArray = function (date) {
    let openFrom = reservations.complex.openfrom.split(":");
    let openTo = reservations.complex.opento.split(":");
    let start = openFrom[0] * 2 + (openFrom[1] === "30" ? 1 : 0);
    let end = openTo[0] * 2 + (openTo[1] === "30" ? 1 : 0);

    for (let index = start; index < end; index++) {
      greenArray.push(
        <input
          type="button"
          key={"slotButton." + getID(index, date)}
          id={getID(index, date)}
          onClick={onClickSlot}
          className={greenClassName}
        />
      );
    }
  };

  const timeCol = (
    <div className="hourLabels">
      <div className="caldiv" />
      {hourArray.map((element) => {
        return element;
      })}
    </div>
  );

  const dayCol = function (date) {
    greenArray = [];
    createGreenArray(date);
    return (
      <div key={"dayLabel." + date} className="dayLabels">
        <div key={"dateLabel." + date} className="caldiv">
          {date}
        </div>
        <div key={"slotsContainer." + date} className="slotsContainer">
          {greenArray.map((element) => {
            return element;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mainCalendar">
      {timeCol}
      {dateArray.map((day) => dayCol(day))}
    </div>
  );
};

export default Calendar;