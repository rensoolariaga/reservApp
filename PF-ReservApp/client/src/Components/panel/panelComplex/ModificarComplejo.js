import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserInfo,
    updateComplex,
    deleteComplex,
} from "../../../redux/actions";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Navbar from "../../nav/Nav";
import Avatar from "@mui/material/Avatar";
import ProvinceAPI from "../../argAPI/Province";
import DistrictAPI from "../../argAPI/District";
import s from "./modificarcomplejo.module.css";

export default function ModificarComplejo() {
    const dispatch = useDispatch();
    const history = useHistory();
    const User = useSelector((state) => state.userInfo);
    const { id } = useParams();

    // MAPEAR COMPLEX ALL PARA PODER HACERLO DESDE EL SUPER USER
    const filterComplex = User.privileges.filter((el) => el.complexId === id);
    const name = filterComplex[0].complex.name;
    const provincia = filterComplex[0].complex.province;
    const distrito = filterComplex[0].complex.district;
    const address = filterComplex[0].complex.address;
    const description = filterComplex[0].complex.description;
    const openfrom = filterComplex[0].complex.openfrom;
    const opento = filterComplex[0].complex.opento;
    const images = filterComplex[0].complex.images[0];

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const [input, setInput] = useState({
        id: id,
        name: name,
        province: provincia,
        district: distrito,
        address: address,
        description: description,
        openfrom: openfrom,
        opento: opento,
        images: [images],
    });

    const [errors, setErrors] = useState({});

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Debe ingresar el nombre de su complejo.";
        } else if (!input.province) {
            errors.province = "Debe ingresar la provincia de su complejo.";
        } else if (!input.district) {
            errors.district = "Debe ingresar el distrito de su complejo.";
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

        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
        })

        Toast.fire({
            icon: 'success',
            title: 'Tus datos se actualizaron correctamente'
        })

        dispatch(updateComplex(input));
        setInput({
            //   id: "",
            name: "",
            province: "",
            district: "",
            address: "",
            description: "",
            openfrom: "",
            opento: "",
            images: [],
        });
        history.push("/home/panel");
    }

    function handleDelete(e) {
        e.preventDefault();

        Swal.fire({
            title: '¿Está seguro que desea eliminar sú complejo?',
            text: "Ésta acción borrará toda la información asociada.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteComplex(id));
                Swal.fire({
                    tittle: "Eliminado!",
                    text: "El complejo ha sido eliminado.",
                    icon: "success",
                    confirmButtonColor: "#3085d6"
                });
            }
            history.push("/home/panel");
        })
    }
    function handleReturn(e) {
        e.preventDefault();
        history.push("/home/panel");
      }
    

    return (
        <div className={s.background}>
            <Navbar />
            <div>
                <h1 className={s.tuClub}> TU CLUB </h1>
                <div className={s.avatar}>
                    <Avatar src={images} sx={{ width: 150, height: 150 }} />
                </div>
                <button
            className="absolute left-10 top-25 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
            onClick={handleReturn}
          >
            Volver
          </button>
                <h1 className="pt-14 pb-18 text-xl text-white-500">
                    Modifica tus datos
                </h1>
                <div className={s.containerModificarClub}>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 gap-4 m-5 py-10">
                        <div>
                            <div className="pt-4 pb-2">
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
                            <div value={(input.images = [image])}></div>
                            <label>
                                {loading ? (
                                    <img className={s.imagenSubida} src={image} alt="imagen not found" />
                                ) : (
                                    <p>imagen not found</p>
                                )}
                            </label>
                        </div>
                        <div className={s.containerAPI}>
                            <div className="pt-4 pb-2">
                                <label>Provincia</label>
                            </div>
                            <div className={s.argAPI}>
                                <ProvinceAPI defaultValue={provincia} />
                            </div>
                        </div>
                        <div>
                            <div className="pt-12 pb-2">
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
                                />
                                {errors.openfrom ? <p>{errors.openfrom}</p> : null}
                            </div>
                        </div>
                        <div>
                            <div className="pt-4 pb-2">
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
                        <div className={s.containerAPI}>
                            <div className="pt-9 pb-3">
                                <label >Distrito</label>
                            </div>
                            <div className={s.argAPI}>
                                <DistrictAPI defaultValue={distrito}/>
                            </div>
                        </div>
                        <div>
                            <div className="pt-4 pb-2">
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
                                />
                                {errors.opento ? <p>{errors.opento}</p> : null}
                            </div>
                        </div>
                        <div>
                            <button className={s.btn} type="Submit">
                                Modificar
                            </button>
                        </div>
                        <div>
                            <div className="pt-4 pb-2">
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
                <div className={s.contentDelete}>
                    <div>
                        <button className={s.btnDelete} onClick={handleDelete}>Eliminar Complejo</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}