import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getUserInfo,
    getUserAll,
    getFields,
    getFieldType,
    getComplexAll
} from "../../redux/actions";

import PanelUser from "./panelUser/PanelUser.js";
import PanelComplex from "./panelComplex/PanelComplex.js";
import PanelSuperUs from "./PanelSuperUser/PanelSuperUs.js";

import Navbar from "../nav/Nav";
import s from "./panel.module.css";

function Panel() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userInfo);
    const userUpdate = useSelector((state) => state.userUpdate);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch, userUpdate]);

    useEffect(() => {
        dispatch(getUserAll());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getFields());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getFieldType());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getComplexAll());
    }, [dispatch]);

    let flagSupUser =
        user.userInfo === undefined ? false : user.userInfo.superuser;
    let flagComplex = user.userInfo === undefined ? false : user.privileges;

    return (
        <div className={s.body}>
            <Navbar />
            {flagSupUser && flagSupUser === true ? <PanelSuperUs /> :
                flagComplex && flagSupUser === false && flagComplex.length !== 0 ? <PanelComplex /> :
                    flagComplex && flagSupUser === false && flagComplex.length === 0 ? <PanelUser /> : null}
        </div>
    );
}

export default Panel;