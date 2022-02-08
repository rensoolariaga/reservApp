import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../../../redux/actions/index.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router";

import Swal from "sweetalert2/dist/sweetalert2.js";
import Navbar from "../../nav/Nav";
import Avatar from "@mui/material/Avatar";
import s from "./modificarusuarioSUP.module.css";
import ProvinceAPI from "../../argAPI/Province.jsx";
import DistrictAPI from "../../argAPI/District.jsx";

export default function ModificarUsuario() {
  const history = useHistory();
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.users);
  const Location = useSelector((state) => state.location);
  const { id } = useParams();
<<<<<<< Updated upstream


  const User = Users.filter((el) => el.id === id);

=======
  console.log("id", id);
  console.log("users", Users);

  const User = Users.filter((el) => el.id === id);
  console.log("User", User);
>>>>>>> Stashed changes

  const firstName = User[0].name;
  const lastName = User[0].surname;
  const birthdate = User[0].birthdate;

  const [input, setInput] = useState({
    id: User[0].id,
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

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1500,
    });

    Toast.fire({
      icon: "success",
      title: "Los datos se actualizaron correctamente",
    });
    dispatch(updateUser(userObj));
  }

<<<<<<< Updated upstream
  function handleReturn(e) {
    e.preventDefault();
    history.push("/home/panel");
  }

=======
>>>>>>> Stashed changes
  function handleDelete(e) {
    e.preventDefault();

    Swal.fire({
      title: "¿Está seguro que desea eliminar éste usuario?",
      text: "Ésta acción borrará toda la información asociada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire({
          tittle: "Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
      history.push("/home/panel");
    });
  }
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
  return (
    <div className={s.background}>
      <Navbar />
      <div>
        <div className={s.avatar}>
          <Avatar src="" sx={{ width: 56, height: 56 }} />
        </div>
        <h1 className="pt-14 pb-10 text-xl text-white-500">
          Modifica tus datos
        </h1>
<<<<<<< Updated upstream
          <button
            className="absolute left-10 top-25 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
            onClick={handleReturn}
          >
            Volver
          </button>
=======
>>>>>>> Stashed changes
        <div className={s.containerModificarUsuario}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-rows-2 gap-0">
              <h5 className={s.nombre}>Nombre</h5>
              <div className="pt-16 pb-2 row-start-1 row-span-2">
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
              <div className="pt-2 pb-2 row-end-3 row-span-2">
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
            <div className="pt-4 pb-2">
              <h5 className={s.cumple}>Fecha de nacimiento</h5>
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
            <div className="grid grid-rows-2 gap-0 text-gray-400">
              <div className="pt-4 pb-2 row-start-1 row-span-2">
                <h5 className={s.provin}>Provincia</h5>
<<<<<<< Updated upstream
                <div className={s.argAPI}>
                <ProvinceAPI defaultValue={User[0].province} />
                </div>
=======
                <ProvinceAPI defaultValue={User.province} />
>>>>>>> Stashed changes
                {errors.name ? <p>{errors.name}</p> : null}
              </div>
              <div className="pt-4 pb-2 row-end-3 row-span-2">
                <h5 className={s.distri}>Distrito</h5>
<<<<<<< Updated upstream
                <div className={s.argAPI}>
                <DistrictAPI defaultValue={User[0].district} />
                </div>
=======
                <DistrictAPI defaultValue={User.district} />
>>>>>>> Stashed changes
              </div>
            </div>
            <div className="pt-8">
              <button className={s.btn} type="submit">
                Actualizar
              </button>
<<<<<<< Updated upstream
            </div>
          </form>
          <div className={s.contentDelete}>
            <div>
              <button className={s.btnDelete} onClick={handleDelete}>
                Eliminar Usuario
              </button>
            </div>
=======
            </div>
          </form>
          <div className={s.contentDelete}>
            <div>
              <button className={s.btnDelete} onClick={handleDelete}>
                Eliminar Usuario
              </button>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </div>
  );
}
