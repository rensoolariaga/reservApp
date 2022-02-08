import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateField,
    deleteField
} from "../../../redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router";

import Navbar from "../../nav/Nav.js";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import s from "./modificarcancha.module.css";

export default function ModificarCancha() {
    const dispatch = useDispatch();
    const history = useHistory();
    const User = useSelector((state) => state.userInfo);
    const types = useSelector((state) => state.fieldType);
    const { id } = useParams();

    let infoCancha = User.fields.filter((el) => el.id === id);

    const name = infoCancha[0].name;
    const cost = infoCancha[0].cost;
    const fieldtypeID = infoCancha[0].fieldtypeId;
    const complexID = infoCancha[0].complexId;

    let infoComplex = User.privileges.filter((el) => el.complexId === complexID);

    const [input, setInput] = useState({
        id: id,
        name: name,
        cost: cost,
        complexID: complexID,
        fieldtypeID: fieldtypeID,
    });

    const [errors, setErrors] = useState({});
    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Debe poner el nombre de su cancha.";
        } else if (!input.cost) {
            errors.cost = "Debe poner el Precio de la cancha.";
        } else if (!input.complexID) {
            errors.complexID = "Debe poner el Id de su complejo.";
        } else if (!input.fieldtypeID) {
            errors.fieldtypeID = "Debe Seleccionar una tipo de deporte.";
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
    function handleId(e) {
        setInput({
            ...input,
            complexID: e.target.value,
        });
    }

    function handleType(e) {
        setInput({
            ...input,
            fieldtypeID: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            // timerProgressBar: true,
            // didOpen: (toast) => {
            //   toast.addEventListener('mouseenter', Swal.stopTimer)
            //   toast.addEventListener('mouseleave', Swal.resumeTimer)
            // }
        })

        Toast.fire({
            icon: 'success',
            title: 'Tus datos se actualizaron correctamente'
        })

        dispatch(updateField(input));
        setInput({
            //   id: '',
            name: "",
            cost: "",
            //   complexID: "",
            fieldtypeID: "",
        });
        history.push("/home/panel");
    }

    function handleDelete(e) {
        e.preventDefault();

        Swal.fire({
            text: "¿Está seguro que desea eliminar toda la informacion de sú cancha?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteField(id));
                Swal.fire({
                    tittle: "Eliminada!",
                    text: "La cancha ha sido eliminada.",
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
            <button
    className="absolute left-5 top-28 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
    onClick={handleReturn}
  >
    Volver
  </button>
            <div>
                <h1 className={s.modificarCancha}>Modifica tu cancha</h1>
                {infoCancha ? (
                    <div className={s.containerModificarField}>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <div className="pt-4 pb-2">
                                        <label></label>
                                    </div>
                                    <div>
                                        <input
                                            className={s.inputs}
                                            onChange={handleChange}
                                            type="text"
                                            value={input.name}
                                            name="name"
                                            required="required"
                                            placeholder="Nombre"
                                        />
                                        {errors.name ? <p>{errors.name}</p> : null}
                                    </div>
                                </div>
                                <div>
                                    <div className="pt-4 pb-2">
                                        <label></label>
                                    </div>
                                    <div>
                                        <input
                                            className={s.inputs}
                                            onChange={handleChange}
                                            type="number"
                                            min="1"
                                            value={input.cost}
                                            name="cost"
                                            required="required"
                                            placeholder="Precio"
                                        />
                                        {errors.cost ? <p>{errors.cost}</p> : null}
                                    </div>
                                </div>
                                <div>
                                    <div className="pt-4 pb-2">
                                        <label></label>
                                    </div>
                                    <div>
                                        <select className={s.select} onChange={handleId}>
                                            <option className="disable">Id del club</option>
                                            {infoComplex?.map((el, i) => (
                                                <option
                                                    name="complexID"
                                                    key={"complex" + i}
                                                    value={el.complexId}
                                                >
                                                    {" "}
                                                    {el.complex.name}{" "}
                                                </option>
                                            ))}
                                            {errors.complexID ? <p>{errors.complexID}</p> : null}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="pt-4 pb-2">
                                        <label></label>
                                    </div>
                                    <select className={s.select} onChange={handleType}>
                                        <option className="disable"> Tipo de cancha </option>
                                        {types.map((el, i) => (
                                            <option
                                                name="fieldtypeID"
                                                key={"option" + i}
                                                value={el.id}
                                            >
                                                {el.type}
                                            </option>
                                        ))}

                                        {errors.fieldtypeID ? <p>{errors.fieldtypeID}</p> : null}
                                    </select>
                                    {errors.fieldtypeID ? <p>{errors.fieldtypeID}</p> : null}
                                </div>
                            </div>
                            <div className="pt-8">
                                <button className={s.btn} type="submit">
                                    Agregar
                                </button>
                            </div>
                        </form>
                    </div>
                ) : null}
                <div className={s.contentDelete}>
                    <div>
                        <button className={s.btnDelete} onClick={handleDelete}>Eliminar Cancha</button>
                    </div>
                </div>
            </div>
        </div>
    );
}