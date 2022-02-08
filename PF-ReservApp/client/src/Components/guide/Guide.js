import loupe from "../guide/loupe.jpeg";
import booking from "../guide/booking.jpeg";
import futbol from "../guide/futbol.jpeg";
import styles from "./Guide.module.css";

export function Guide(params) {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Reserva tu cancha en 3 pasos</h1>
            <div className={styles.busca}>
                <img src={loupe} alt="busca" className={styles.image} />
                <h3 className={styles.subtitulo}>Busca</h3>
                <h6 className={styles.desBusca}>
                    Dale click en Ve por tu cancha y conoce la disponibilidad de tus canchas preferidas o filtra por
                    tipo de deporte, precios o ubicación.
                </h6>
            </div>
            <div className={styles.reserva}>
                <img src={booking} alt="reserva" className={styles.image} />
                <h3 className={styles.subtitulo}>Reserva</h3>
                <h6 className={styles.desBusca}>
                    Compara servicios de los clubes.
                    Tienes toda la información para
                    hacer tu reserva instantánea.
                </h6>
            </div>
            <div className={styles.juega}>
                <img src={futbol} alt="juega" className={styles.image} />
                <h3 className={styles.subtitulo}>Juega</h3>
                <h6 className={styles.desBusca}>
                    Despreocupate por el efectivo y paga en línea el turno y disfruta de
                    tu cancha y a jugar se dijo!!
                </h6>
            </div>
        </div>
    );
}