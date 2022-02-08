import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderByPrice, filterByType } from '../../redux/actions/index.js'
import s from "./filtros.module.css";
import { getFields, getFieldType } from "../../redux/actions/index.js";

export default function Filtros() {
    const dispatch = useDispatch();
    const fTypes = useSelector((state) => state.fieldType)

    const [, setOrder] = useState('');

    useEffect(() => {
        dispatch(getFields());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getFieldType());
    }, [dispatch]);


    function handlePrice(e) {
        dispatch(orderByPrice(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleType(e) {
        dispatch(filterByType(e.target.value));
    }


    return (

        <div className={s.body}>
            <div className={s.titulo}>

                <h1 className="text-xl pb-3">

                    Filtrar <br />
                </h1>
            </div>

            <div className="m-4">
                <select className={s.input} onChange>
                    <option value="all">Provincia</option>
                </select>
            </div>

            <div className="m-4">
                <select className={s.input} onChange>
                    <option value="all">Localidad</option>
                </select>
            </div>

            <div className="m-4">
                <select className={s.input} onChange={handleType} >
                    <option value="all"> Tipo de Deporte </option>
                    {
                        fTypes.map((p, i) => (
                            <option key={i} value={p.type}>{p.type}</option>
                        ))
                    }
                </select>
            </div>

            <div className="m-4">
                <select className={s.input} onChange={handlePrice}>
                    <option value='all'> Ordenar por Precio </option>
                    <option value='menor'> Menor a Mayor </option>
                    <option value='mayor'> Mayor a Menor </option>
                </select>
            </div>

        </div>
    );
}