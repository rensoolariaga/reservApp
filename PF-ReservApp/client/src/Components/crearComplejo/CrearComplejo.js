import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProvinceAPI from "../argAPI/Province";
import DistrictAPI from "../argAPI/District";
import Navbar from "../nav/Nav";
import { RESET_LOCATION } from "../../redux/Consts";
import s from "./crearcomplejo.module.css";

import { postComplex } from "../../redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function CrearComplejo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useSelector((state) => state.location);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    province: location.province,
    district: location.district,
    address: "",
    description: "",
    openfrom: "",
    opento: "",
    images: [],
  });

  useEffect(() => {
    // console.log(location);
  }, [location.province, location.district]);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Debe ingresar el nombre de su complejo.";
    } else if (!location.province) {
      errors.province = "Debe ingresar la provincia de su complejo.";
    } else if (!location.district) {
      errors.district = "Debe ingresar la localidad de su complejo.";
    } else if (!input.address) {
      errors.address = "Debe ingresar la direccion de su complejo.";
    } else if (!input.description) {
      errors.description = "Debe ingresar una descripción de su complejo.";
    } else if (!input.openfrom) {
      errors.openfrom = "Debe ingresar el horario de apertura.";
    } else if (!input.opento) {
      errors.opento = "Debe ingresar el horario de cierre.";
    } else if (!input.images) {
      errors.images = "Debe colocar al menos una imagen del complejo.";
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

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "htnah6yo");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djrddcab5/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!location.province) return alert("Se debe elegir una provincia");
    if (!location.district) return alert("Se debe elegir una localidad");

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
      // timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    });

    Toast.fire({
      icon: "success",
      title: "Tu complejo se creo correctamente",
    });

    dispatch(
      postComplex({
        ...input,
        province: location.province,
        district: location.district,
      })
    );
    dispatch({
      type: RESET_LOCATION,
    });
    setInput({
      name: "",
      address: "",
      description: "",
      openfrom: "",
      opento: "",
      images: [],
    });
    history.push("/agregarCancha");
  }

  function handleReturn(e) {
    e.preventDefault();
    history.push("/home/panel");
  }

  return (
    <div className={s.background}>
      <Navbar />
      <button
        className="absolute left-5 top-28 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
        onClick={handleReturn}
      >
        Volver
      </button>
      <div>
        <div className={s.containerFormClub}>
          <h1 className={s.tituloCrearComplejo}>
            {" "}
            AGREGA LA INFORMACIÓN DE TU CLUB{" "}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4  border-opacity-30 m-5 py-10">
              <div>
                <div className="pt-0 pb-2">
                  <label>Nombre</label>
                </div>
                <div>
                  <input
                    className={s.inputs}
                    onChange={handleChange}
                    type="text"
                    value={input.name}
                    name="name"
                    required="required"
                  />
                  {errors.name ? <p>{errors.name}</p> : null}
                </div>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Imagen</label>
                </div>
                <div>
                  <input
                    className={s.inputs}
                    onChange={uploadImage}
                    type="file"
                    name="images"
                    required="required"
                    accept="image/png,image/jpeg"
                  />
                  {errors.images ? <p>{errors.images}</p> : null}
                </div>
                <div value={(input.images = [image])}> </div>
                <label>
                  {loading ? (
                    <img
                      className={s.imagenSubida}
                      src={image}
                      alt="No hay imagen"
                    />
                  ) : (
                    <p>Aun no has subido una imagen</p>
                  )}
                </label>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Provincia</label>
                </div>
                <div className={s.ArgAPI}>
                  <ProvinceAPI />
                </div>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Hora de apertura</label>
                </div>
                <div>
                  <input
                    className={s.inputs}
                    onChange={handleChange}
                    type="number"
                    value={input.openfrom}
                    name="openfrom"
                    required="required"
                    min="0"
                    max="23"
                  />
                  {errors.openfrom ? <p>{errors.openfrom}</p> : null}
                </div>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Descripción</label>
                </div>
                <div>
                  <textarea
                    className={s.inputDescription}
                    onChange={handleChange}
                    type="text"
                    value={input.description}
                    name="description"
                    required="required"
                  />
                  {errors.description ? <p>{errors.description}</p> : null}
                </div>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Distrito</label>
                </div>
                <div className={s.ArgAPI}>
                  <DistrictAPI />
                </div>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Hora de cierre</label>
                </div>
                <div>
                  <input
                    className={s.inputs}
                    onChange={handleChange}
                    type="number"
                    value={input.opento}
                    name="opento"
                    required="required"
                    min={input.openfrom}
                    max="24"
                  />
                  {errors.opento ? <p>{errors.opento}</p> : null}
                </div>
              </div>
              <div>
                <button className={s.btn} type="Submit">
                  Agregar
                </button>
              </div>
              <div>
                <div className="pt-0 pb-2">
                  <label>Dirección</label>
                </div>
                <div>
                  <input
                    className={s.inputs}
                    onChange={handleChange}
                    type="text"
                    value={input.address}
                    name="address"
                    required="required"
                  />
                  {errors.address ? <p>{errors.address}</p> : null}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
