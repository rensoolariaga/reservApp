import React from "react";
import s from './CardId.module.css';

export default function CardId({
    name,
    cost,
    type,


}) {
    cost = cost * 2;

    return (
        <div className={s.bodyCard}>
            <div className={s.title}>
                <div className={s.footerCard}>
                    <h1>{name}</h1>
                </div>
                <div className={s.footerCard}>
                    <div>
                        <div className={s.fontDesc}>
                            <p>{cost}</p>
                        </div>

                        <div className={s.types}>
                            <h4>{type}
                            </h4>

                        </div>
                    </div>
                    <div>

                        <button className={s.btnEditar}>
                            EDITAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}