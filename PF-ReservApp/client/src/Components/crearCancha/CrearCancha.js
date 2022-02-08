import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../nav/Nav";
import { postField, getFieldType, getUserInfo } from "../../redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
<<<<<<< Updated upstream
import Swal from 'sweetalert2/dist/sweetalert2.js';
=======
import Swal from "sweetalert2/dist/sweetalert2.js";
import s from "./crearcancha.module.css";
>>>>>>> Stashed changes

export default function CrearCancha() {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userInfo);
    const types = useSelector((state) => state.fieldType);
    const flag = useSelector((state) => state.cflag);
    const allComplex = useSelector((state) => state.complexAll);

    useEffect(() => {
        if (flag) dispatch(getUserInfo());
    }, [dispatch, flag]);

    useEffect(() => {
        dispatch(getFieldType());
    }, [dispatch]);


    let supFlag = user.userInfo.superuser;
    let infoComplejos = user.privileges;

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        cost: "",
        complexID: "",
        fieldtypeID: "",
    });

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
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            // timerProgressBar: true,
            // didOpen: (toast) => {
            //   toast.addEventListener('mouseenter', Swal.stopTimer)
            //   toast.addEventListener('mouseleave', Swal.resumeTimer)
            // }
        })

        Toast.fire({
            icon: 'success',
            title: 'Tu cancha se creo correctamente'
        })

        dispatch(postField(input));
        setInput({
            name: "",
            cost: "",
            complexID: "",
            fieldtypeID: "",
        });
        history.push("/home/panel");
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
            <div className={s.containerFormField}>
                <div>
                    {infoComplejos ? (
                        <div>
                            <h1 className={s.tituloCrearCancha}>
                                Agrega la información de tu cancha
                            </h1>
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
                                                {supFlag === false ?
                                                    infoComplejos?.map((el, i) => (
                                                        <option
                                                            name="complexID"
                                                            key={"complex" + i}
                                                            value={el.complexId}
                                                        >
                                                            {" "}
                                                            {el.complex.name}{" "}
                                                        </option>
                                                    ))
                                                    :
                                                    allComplex?.map((el, i) => (
                                                        <option
                                                            name="complexID"
                                                            key={"complex" + i}
                                                            value={el.id}
                                                        >
                                                            {" "}
                                                            {el.name}{" "}
                                                        </option>
                                                    ))
                                                }
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
                </div>
            </div>
        </div>
    );
}