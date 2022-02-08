import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getReservations } from "../../../redux/actions/index";

import { getUser } from "../../../redux/actions";

export const SearchUsers = () => {
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const onClick_Submit = (e) => {

        let searchParams = {};

        if (searchFilter === "nombre") searchParams.name = inputName;
        if (searchFilter === "apellido") searchParams.apellido = inputName;
        if (searchFilter === "mail") searchParams.mail = inputName;

        dispatch(getUser(searchParams));
    };

    const onChange_Filter = (e) => {
        setSearchFilter(e.target.value);
    };

    const onChange_Input = (e) => {
        setInputName(e.target.value);
    };

    return (
        <div>
            <label>Buscar: </label>
            <select onChange={onChange_Filter}>
                <option value="nombre">Nombre</option>
                <option value="apellido">Apellido</option>
                <option value="mail">Mail</option>
            </select>
            <input type="search" value={inputName} onChange={onChange_Input} />
            <input type="submit" onClick={onClick_Submit} />
        </div>
    );
};

export const SearchComplexes = () => {
    const dispatch = useDispatch();
    const [inputSearch, setinputSearch] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const onClick_Submit = (e) => {
        let searchParams = {};

        if (searchFilter === "nombre") searchParams.name = inputSearch;
        if (searchFilter === "apellido") searchParams.apellido = inputSearch;
        if (searchFilter === "mail") searchParams.mail = inputSearch;

        dispatch(getUser(searchParams));
    };

    return (
        <div>
            <label>Buscar: </label>
            <select>
                <option value="nombre">ID</option>
                <option value="apellido">Nombre</option>
                <option value="provincia">Provincia</option>
            </select>
            <input type="search" />
            <input type="submit" onClick={onClick_Submit} />
        </div>
    );
};

export const SearchReservations = () => {
    const dispatch = useDispatch();
    const [inputSearch, setInputSearch] = useState("");
    const [searchFilter, setSearchFilter] = useState("");

    const onClick_Submit = (e) => {


        let searchParams = {};

        if (searchFilter === "id") searchParams.ID = inputSearch;
        if (searchFilter === "userid") searchParams.userID = inputSearch;
        if (searchFilter === "complexid") searchParams.complexID = inputSearch;
        if (searchFilter === "mpid") searchParams.mpID = inputSearch;

        dispatch(getReservations(searchParams));
    };

    const onChange_Filter = (e) => {
        setSearchFilter(e.target.value);
    };

    const onChange_Input = (e) => {
        setInputSearch(e.target.value);
    };

    return (
        <div>
            <label>Buscar: </label>
            <select onChange={onChange_Filter}>
                <option value="id">ID</option>
                <option value="userid">User ID</option>
                <option value="complexid">Complex ID</option>
                <option value="mpid">MP ID</option>
            </select>
            <input type="search" value={inputSearch} onChange={onChange_Input} />
            <input type="submit" onClick={onClick_Submit} />
        </div>
    );
};