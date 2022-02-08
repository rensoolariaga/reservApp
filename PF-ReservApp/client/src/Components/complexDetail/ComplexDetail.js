import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComplex } from '../../redux/actions/index.js';


import s from "./complexdetail.module.css";
import Navbar from "../nav/Nav";

export default function ComplexDetail(props) {

    let id = props.location.search

    const dispatch = useDispatch();
    const complex = useSelector((state) => state.complexDetails);

    useEffect(() => {
        dispatch(getComplex(id));
    }, [dispatch, id]);


    return (
        <div className={s.background}>
            {complex.complexInfo && complex.complexInfo ?
                <div className="">
                    <Navbar />
                    <div >
                        <div>
                            <h1 className="text-4xl pt-8 pb-5">{complex.complexInfo.name}</h1>
                        </div>
                        <div className="px-96">
                            {<img src={complex.complexInfo.images[0]} height="400px" width="800px" alt="" />}
                        </div>
                        <div>
                            <h3 className="pt-8 text-xl">{complex.complexInfo.address}</h3>
                            <h5 className="pt-4 text-lg">{complex.complexInfo.district}  {", "}  {complex.complexInfo.province}</h5>
                        </div>
                        <div>
                            <div className="pt-4 text-lg">
                                <h4>Horarios</h4>
                                <h4>{complex.complexInfo.openfrom} {"--"}  {complex.complexInfo.opento}</h4>
                                <p className="text-sm py-8">{complex.complexInfo.description}</p>
                            </div>
                            <div className="pt-4 text-lg">
                                <h6 className="pb-4"> Deportes </h6>
                                {complex.fieldsInfo.map(f => <li>{f.fieldtype.type}</li>)}
                            </div>
                            <div className="pt-8 text-lg">
                                <h6 className="pb-4"> Canchas </h6>
                                {complex.fieldsInfo.map(f => <li>{f.name}</li>)}
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
}