import React from 'react';

import Navbar from '../nav/Nav';
import { BsLinkedin } from 'react-icons/bs';
import logoApp from "../landingPage/logoRecortado.png";
import s from './aboutUs.module.css';

export default function AboutUs() {
    return (
        <div className={s.body}>
            <Navbar />
            <div>
                <div className={s.container}>
                    <br />
                    <br />
                    <br />
                    <div>
                        <p className={s.text}>Llegaste al lugar correcto si pensabas compartir un partido con tus amigos</p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className={s.positionLogo}>
                        <img src={logoApp} alt="LogoApp" />
                    </div>
                    <br />
                    <br />
                    <div className={s.containerText}>
                        <p className={s.text}>Te ayuda a buscar la cancha que necesitas, de forma rapida y sencilla</p>
                        <p className={s.text}>Podras enterarte de todos los servicios extras que ofrecen los distintos complejos y realizar tu reserva</p>
                    </div>
                    <div>
                        <p className={s.gridTitle}>Nuestro Equipo</p>
                        <div className={s.parent}>
                            <div className={s.div1}>
                                <a href='https://www.linkedin.com/in/carlos-medina-code/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Carlos Medina</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div2}>
                                <a href='https://www.linkedin.com/in/derekdannevig/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Derek Dannevig</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div3}>
                                <a href='https://www.linkedin.com/in/ezequiel-camargo-dev/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Ezequiel Camargo</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div4}>
                                <a href='http://www.linkedin.com/in/ignaestiga' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Ignacio Estigarribia</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div5}>
                                <a href='https://www.linkedin.com/in/jairocolondeveloper/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Jairo Colón</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div6}>
                                <a href='https://www.linkedin.com/in/jero-caride-dev/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Jeronimo Caride</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div7}>
                                <a href='https://www.linkedin.com/in/rensoolariaga/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Renso Olariaga</p>
                                    </div>
                                </a>
                            </div>
                            <div className={s.div8}>
                                <a href='https://www.linkedin.com/in/sebastian-trx/' className={s.aTag}>
                                    <div className={s.contIcon}>
                                        <BsLinkedin />
                                    </div>
                                    <div className={s.contName}>
                                        <p className={s.p}>Sebastian Torres</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h5 className={s.derechosReservados}>Todos los derechos reservados ®️ReservApp</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}