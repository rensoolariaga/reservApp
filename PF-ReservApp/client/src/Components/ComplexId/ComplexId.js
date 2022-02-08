import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getFieldsByComplex } from '../../redux/actions/index.js'
import CardId from './CardId'
import { useHistory } from "react-router";
import s from './ComplexId.module.css';

export default function ComplexId() {
    const dispatch = useDispatch();
    const [state, setState] = useState({});
    const history = useHistory();
    const fieldsByComplex = useSelector(state => state.fielsByComplex);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getFieldsByComplex(id))
    }, [dispatch, id])

    useEffect(() => {
        setState(fieldsByComplex); // modifique
    }, [fieldsByComplex])

    function handleReturn(e) {
        e.preventDefault();
        history.push("/home/panel");
    }

    return (
        <div className={s.body}>
            <button className="absolute left-10 top-25 bg-gray-700 text-xs text-gray-50 p-2 rounded-full hover:bg-gray-500"
                onClick={handleReturn}>Volver</button>
            <h1>Complejo</h1>
            <div>
                {
                    !state ? <span className={s.alerta}>Por favor Espere..</span>
                        :
                        <>
                            <h1>{fieldsByComplex.fieldsInfo.name}</h1>
                            <h1>{fieldsByComplex.fieldsInfo.district}</h1>
                            <h1>{fieldsByComplex.fieldsInfo.province}</h1>
                            <div className={s.img}>
                                <img src={fieldsByComplex.fieldsInfo.images} alt="img" />
                            </div>
                        </>
                }
            </div>
            <div>
                <h1>Canchas Asociadas:</h1>
                {
                    fieldsByComplex && fieldsByComplex.fieldsInfo.length === 0 ?
                        <div>
                            <h1>Cargando</h1>
                        </div>
                        :
                        fieldsByComplex.fieldsInfo.map((el, i) => {
                            return (
                                <>
                                    < CardId name={el.name}
                                        cost={el.cost}
                                        type={el.fieldtype.type} />
                                </>
                            )
                        })
                }
            </div>
        </div>
    )
}