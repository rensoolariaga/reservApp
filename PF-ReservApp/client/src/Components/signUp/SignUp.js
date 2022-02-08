import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration, login } from "../../redux/actions/index.js";
import { getUserInfo, gRegistration } from "../../redux/actions";
import { useGoogleLogin } from "react-google-login";
import ProvinceAPI from "../argAPI/Province";
import DistrictAPI from "../argAPI/District";
import { RESET_LOCATION } from "../../redux/Consts.js";
import { FaGoogle } from "react-icons/fa";

import s from "./signUp.module.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state);
  const [isRegistrado, setRegistrado] = useState(false);

  const [input, setInput] = useState({
    name: "",
    surname: "",
    birthdate: "",
    province: "",
    district: "",
    mail: "",
    password: "",
    rPassword: "",
  });

  const [errors, setErrors] = useState({});
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Debe ingresar su nombre.";
    } else if (!input.surname) {
      errors.surname = "Debe ingresar su apellido.";
    } else if (!input.birthdate) {
      errors.birthdate = "Debe ingresar su fecha de nacimiento.";
    } else if (!input.mail) {
      errors.mail = "Debe ingresar su correo deseado.";

    } else if (!input.password || input.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";

    } else if (!input.rPassword || input.rPassword !== input.password) {
      errors.rPassword = "Repita la misma contraseña.";

    }
    return errors;
  }

  const [inputLogIn, setInputLogIn] = useState({
    mail: "",
    password: "",
  });

  const toggle = () => {
    setRegistrado(!isRegistrado);
  };

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

  function handleChangeSignIn(e) {
    setInputLogIn({
      ...inputLogIn,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmitUserRegister = (e) => {
    e.preventDefault();
    if (location.province === "") return alert("Se debe completar la Provincia");
    if (location.district === "") return alert("Se debe completar la localidad");
    dispatch(
      registration({
        ...input,
        province: location.province,
        district: location.district,
      })
    );
    setInput({
      name: "",
      surname: "",
      birthdate: "",
      province: "",
      district: "",
      mail: "",
      password: "",
      rPassword: "",
    });
    dispatch(getUserInfo());
    dispatch({
      type: RESET_LOCATION,
    });
  };

  function handleSubmitLogIn(e) {
    e.preventDefault();
    // REVISAR EL MODEL PORQUE LEGUEE OK O NO, TIRA LA DE ERROR
    dispatch(login(inputLogIn));

    setInputLogIn({
      mail: "",
      password: "",
    });
  }

  // logeo con google
  let clientId =
    "466690440359-5vqeuq9phv2er29r0jcpmlq43240cg54.apps.googleusercontent.com";
  const onSuccess = (respuesta) => {
    const mail = respuesta.profileObj.email;
    const tokenId = respuesta.tokenId;
    const name = respuesta.profileObj.givenName;
    const surname = respuesta.profileObj.familyName;

    dispatch(
      gRegistration({
        mail: mail,
        tokenId: tokenId,
        name: name,
        surname: surname,
      })
    );
  };

  const { signIn } = useGoogleLogin({
    clientId,
    onSuccess,
  });

  return (
    <div>
      {!isRegistrado ? (
        <div className={s.color}>
          <div className={s.positionLogin}>
            <h6 className={s.haveAccount}>
              {" "}
              ¿Ya eres usuario?{" "}
              <button onClick={toggle} className={s.login}>
                {" "}
                Iniciar Sesión
              </button>
            </h6>
          </div>
          <div className={s.positionForm}>
            <h1 className={s.startFree}>Comienza totalmente gratis!</h1>
            <h3 className={s.sloganStart}>
              {" "}
              Ingresa la siguiente información para registrarte.
            </h3>
          </div>
          {/* <button className={s.gLogBtn}><IoLogoGoogle /></button> */}
          <button onClick={signIn} className={s.gLogBtn}>
            <FaGoogle className={s.gFont} />
          </button>
          <div className={s.positionHr}>
            <hr className={s.hr1} />
            <span className={s.span}>O</span>
            <hr className={s.hr2} />
          </div>
          <form onSubmit={handleSubmitUserRegister}>
            <div className="pl-32 flex flex-row">
              <div className={s.font}>
                <div className="grid grid-rows-2">
                  <div className="row-start-1 row-span-2 -mr-16">
                    <div className="mb-1 mt-2">
                      <label className={s.marginNomApe}>Nombre*</label>
                    </div>
                    <div className="mb-5 mt-1">
                      <input
                        className={s.inputs}
                        type="text"
                        value={input.name}
                        name="name"
                        required="required"
                        onChange={handleChange}
                        autoComplete="on"
                      ></input>
                      {errors.name ? <p>{errors.name}</p> : null}
                    </div>
                  </div>
                  <div className="row-end-3 row-span-2">
                    <div className="mb-1 mt-2">
                      <label>Apellido*</label>
                    </div>
                    <div>
                      <input
                        className={s.inputs}
                        type="text"
                        value={input.surname}
                        name="surname"
                        required="required"
                        onChange={handleChange}
                        autoComplete="on"
                      ></input>
                      {errors.surname ? <p>{errors.surname}</p> : null}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 mt-0">
                    <label className={s.marginCumpLoc}>Nacimiento*</label>
                  </div>

                  <input
                    className={s.inputs2}
                    type="date"
                    value={input.birthdate}
                    name="birthdate"
                    required="required"
                    onChange={handleChange}
                    autoComplete="on"
                  ></input>
                  {errors.birthdate ? <p>{errors.birthdate}</p> : null}
                </div>
                <div className="grid grid-rows-2">
                  <div className="row-start-1 row-span-2 -mr-5">
                    <div className="mb-1 mt-3">
                      <label>Provincia*</label>
                    </div>
                    <ProvinceAPI />
                  </div>

                  <div className="row-end-3 row-span-2">
                    <div className="mb-1  mt-3">
                      <label>Localidad*</label>
                    </div>
                    <DistrictAPI />
                  </div>
                </div>
                <div className="mb-1  mt-3">
                  <label>Correo electrónico*</label>
                </div>
                <div className="mb-5 mt-1">
                  <input
                    className={s.inputs2}
                    type="email"
                    value={input.mail}
                    name="mail"
                    required="required"
                    onChange={handleChange}
                    autoComplete="on"
                  ></input>
                  {errors.mail ? <p>{errors.mail}</p> : null}
                </div>
                <div className="grid grid-rows-2">
                  <div className="row-start-1 row-span-2 -mr-5">
                    <div>
                      <label>Contraseña*</label>
                    </div>
                    <div className="mb-5 mt-1">
                      <input
                        className={s.inputs}
                        placeholder="+8 caracteres"
                        type="password"
                        value={input.password}
                        name="password"
                        required="required"
                        onChange={handleChange}
                        autoComplete="on"
                      ></input>
                      {errors.password ? <p>{errors.password}</p> : null}
                    </div>
                  </div>
                  <div className="row-end-3 row-span-2">
                    <div>
                      <label>Repetir Contraseña*</label>
                    </div>
                    <div className="mb-5 mt-1">
                      <input
                        className={s.inputs}
                        placeholder="+8 caracteres"
                        type="password"
                        value={input.rPassword}
                        name="rPassword"
                        required="required"
                        onChange={handleChange}
                        autoComplete="on"
                      ></input>
                      {errors.rPassword ? <p>{errors.rPassword}</p> : null}
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    className={s.checkBox}
                    type="radio"
                    name="checkbox"
                  ></input>
                  <h6 className={s.checkText}>
                    Al seleccionar, significa que esta de acuerdo con nuestros
                    terminos
                    <br />
                    de servicios, politica de privacidad y nuestra configuracion
                    predeterminada.
                  </h6>
                </div>
                <button
                  className={s.btn}
                  type="submit"
                  value="submit"
                >
                  <h5 className={s.textCreate}>Crear una cuenta</h5>
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        // PAGINA DE SIGN IN ARRANCA ACA.
        <div className={s.color}>
          <div className={s.positionRegisterUser}>
            <h6 className={s.haveNotUser}>
              {" "}
              ¿No eres usuario?{" "}
              <button onClick={toggle} className={s.register}>
                {" "}
                Registrate
              </button>
            </h6>
          </div>

          <div className={s.positionFormUser}>
            <form>
              <div>
                <div className="mb-2">
                  <h1 className={s.welcome}>¡Bienvenido otra vez!</h1>
                  <h4 className={s.sloganWelcome}>
                    Hacer deporte ayuda a tener buena salud física y mental.
                  </h4>
                </div>
                <br />
                <div>
                  <label>Correo electrónico*</label>
                </div>

                <div className="mb-5 mt-1">
                  <input
                    name="mail"
                    value={inputLogIn.mail}
                    className={s.inputEmailRegister}
                    onChange={handleChangeSignIn}
                  ></input>
                </div>

                <br />
                <div>
                  <label>Contraseña*</label>
                </div>

                <div className="mb-5 mt-1">
                  <input
                    value={inputLogIn.password}
                    name="password"
                    onChange={handleChangeSignIn}
                    className={s.inputPassRegister}
                    type="password"
                    placeholder="+8 caracteres"
                  ></input>
                </div>

                <button
                  className={s.btnSingUp}
                  type="submit"
                  value="submit"
                  onClick={handleSubmitLogIn}
                >
                  <h5 className={s.singUp}>Iniciar Sesión</h5>
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}