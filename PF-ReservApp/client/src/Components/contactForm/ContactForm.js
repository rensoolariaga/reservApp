import { useState } from "react";
import { useDispatch } from "react-redux";
import { userMessage } from "../../redux/actions";
import styles from "./ContactForm.module.css";

export function ContactForm() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        nombre: "",
        ciudad: "",
        telefono: "",
        correo: "",
        mensaje: "",
    });

    const [errors, setErrors] = useState({});

    function handleInput(e) {
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

    function validate(input) {
        let errors = {};

        if (!input.nombre) {
            errors.nombre = "Este campo es obligatorio";
        }

        if (!input.ciudad) {
            errors.ciudad = "Este campo es obligatorio";
        }

        if (!input.telefono) {
            errors.telefono = "Este campo es obligatorio";
        }

        if (!input.correo) {
            errors.correo = "Este campo es obligatorio";
        }

        if (!input.mensaje) {
            errors.mensaje = "Este campo es obligatorio";
        } else if (Object.entries(errors).length === 0) {
            errors.button = (
                <button type="submit" className={styles.button}>
                    Enviar mensaje
                </button>
            );
        }
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userMessage(input));
        setInput({
            nombre: "",
            ciudad: "",
            telefono: "",
            correo: "",
            mensaje: "",
        });
        e.target.reset();
    }

    return (
        <div className={styles.bgImagen}>
            <div className={styles.contenedorFrase}>
                <h1 className={styles.pregunta}>¿Quieres más información?</h1>
                <h2 className={styles.mensaje}>
                    Llena el siguiente formulario y al instante
                </h2>
                <h2 className={styles.mensaje}>
                    te llegará una respuesta vía correo electrónico.
                </h2>
            </div>
            <div className={styles.container}>
                <div className={styles.bc}>
                    <h1 className={styles.title}>Contacto </h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Tu nombre*"
                                value={input.nombre}
                                name="nombre"
                                onChange={handleInput}
                            />
                            {errors.nombre && <p>{errors.nombre}</p>}
                        </div>
                        {/* <br /> */}
                        <div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Ciudad*"
                                value={input.ciudad}
                                name="ciudad"
                                onChange={handleInput}
                            />
                            {errors.ciudad && <p>{errors.ciudad}</p>}
                        </div>
                        {/* <br /> */}
                        <div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Telefono*"
                                value={input.telefono}
                                name="telefono"
                                onChange={handleInput}
                            />
                            {errors.telefono && <p>{errors.telefono}</p>}
                        </div>
                        {/* <br /> */}
                        <div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Correo electronico*"
                                value={input.correo}
                                name="correo"
                                onChange={handleInput}
                            />
                            {errors.correo && <p>{errors.correo}</p>}
                        </div>
                        {/* <br /> */}
                        <div>
                            <textarea
                                type="text"
                                className={styles.input}
                                placeholder="Mensaje*"
                                value={input.mensaje}
                                name="mensaje"
                                onChange={handleInput}
                            />
                            {errors.mensaje && <p>{errors.mensaje}</p>}
                        </div>
                        {/* <br /> */}
                        {errors.button}
                    </form>
                </div>
            </div>
        </div>
    );
}