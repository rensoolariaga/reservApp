import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/index.js";

import Swal from "sweetalert2";

import Avatar from "@mui/material/Avatar";
import s from "./modificarusuario.module.css";
import ProvinceAPI from "../../argAPI/Province.jsx";
import DistrictAPI from "../../argAPI/District.jsx";

export default function ModificarUsuario() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userInfo.userInfo);
  const Location = useSelector((state) => state.location);
  const id = User.id;
  const firstName = User.name;
  const lastName = User.surname;
  const birthdate = User.birthdate;

  const showAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
      // timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    });

    Toast.fire({
      icon: "success",
      title: "Tus datos se modificaron correctamente",
    });
  };

  const [input, setInput] = useState({
    id: id,
    name: firstName,
    surname: lastName,
    birthdate: birthdate,
  });

  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Debe ingresar el nombre de su usuario.";
    } else if (!input.province) {
      errors.province = "Debe ingresar la provincia de su usuario.";
    } else if (!input.district) {
      errors.district = "Debe ingresar el distrito de su usuario.";
    } else if (!input.surname) {
      errors.surname = "Debe ingresar el apellido de su usuario.";
    } else if (!input.id) {
      errors.id = "Debe ingresar el id del usuario.";
    } else if (!input.birthdate) {
      errors.birthdate = "Debe ingresar el horario de cierre.";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!Location.province && !User.province)
      return alert("Se debe introducir una provincia");
    if (!Location.district && !User.district)
      return alert("Se debe introducir una localidad");

    let userObj = {
      ...input,
      province: Location.province,
      district: Location.district,
    };
    dispatch(updateUser(userObj));
  }

  return (
    <div className={s.background}>
      <div>
        <div className={s.avatar}>
          <Avatar src="" sx={{ width: 56, height: 56 }} />
        </div>
        <h1 className={s.modificarUsuario}>Modifica tus datos</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.containerFModificarUsuario}>
            <div className="grid grid-rows-2 gap-0 text-black ">
              <h5 className={s.nombre}>Nombre</h5>
              <div className="pt-8 pb-8 row-start-1 row-span-2">
                <input
                  className={s.inputs}
                  onChange={handleChange}
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Nombre"
                />
                {errors.name ? <p>{errors.name}</p> : null}
              </div>
              <div className="pt-8 pb-8 row-end-3 row-span-2">
                <h5 className={s.apellido}>Apellido</h5>
                <input
                  className={s.inputs}
                  onChange={handleChange}
                  type="text"
                  value={input.surname}
                  name="surname"
                  placeholder="Apellido"
                />
                {errors.surname ? <p>{errors.surname}</p> : null}
              </div>
            </div>
            <div className="pt-4 pb-6">
<<<<<<< Updated upstream
              <h5 className={s.cumple}>Cumpleaños</h5>
=======
              <h5 className={s.cumple}>Fecha de nacimiento</h5>
>>>>>>> Stashed changes
              <input
                className={s.inputs}
                onChange={handleChange}
                type="date"
                value={input.birthdate}
                name="birthdate"
                placeholder="Fecha de nacimiento"
              />
              {errors.birthdate ? <p>{errors.birthdate}</p> : null}
            </div>
            <div className="grid grid-rows-2 gap-0 text-gray-800 bg">
              <div className="pt-4 pb-2 row-start-1 row-span-2">
                <h5 className={s.provin}>Provincia</h5>
                <ProvinceAPI defaultValue={User.province} />
                {errors.name ? <p>{errors.name}</p> : null}
              </div>
              <div className="pt-4 pb-2 row-end-3 row-span-2">
                <h5 className={s.distri}>Distrito</h5>
                <DistrictAPI defaultValue={User.district} />
              </div>
            </div>
            <div className="pt-8">
              <button onClick={showAlert} className={s.btn} type="submit">
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
