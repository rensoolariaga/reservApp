import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./panelSuperUs.module.css";
import {
    getComplexAll,
    getFields,
    filterByType,
    filterByProvince,
    filterByDistrict,
    filterComplexByDistrict,
    filterComplexByProvince,
    getByName,
    getFieldByName
} from "../../../redux/actions/index";
import DistrictAPI from "../../argAPI/District";
import ProvinceAPI from "../../argAPI/Province.jsx";

import ModificarUsuario from "../panelUser/ModificarUsuario.js";
import { Link } from "react-router-dom";

//-------------------------------------------------------
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
//-------------------------------------------------------

export default function PanelSuperUs() {
    const dispatch = useDispatch();

    const complex = useSelector((state) => state.complexAll);
    const fields = useSelector((state) => state.fields);
    const [openTab, setOpenTab] = useState(1);
    const users = useSelector((state) => state.users);
    const filterUs = users.filter((el) => el.superuser === false);
    const fTypes = useSelector((state) => state.fieldType);
    const district = useSelector((state) => state.location.district);
    const province = useSelector((state) => state.location.province);
    const [nameComp, setNameComp] = useState('');
    const [nameCancha, setNameCancha] = useState('');

    //FILTROS DE CANCHAS-----------------------
    function handleType(e) {
        dispatch(filterByType(e.target.value));
    }

    //ok
    function handleDistrict() {
        dispatch(filterByDistrict(district));
    }

    // ok
    function handleProvince() {
        dispatch(filterByProvince(province));
    }

    function handleReset(e) {
        e.preventDefault();
        dispatch(getFields());
    }


    function handleChange(e) {
        e.preventDefault();
        setNameComp(e.target.value);
    }
    function handleChange2(e) {
        e.preventDefault();
        setNameCancha(e.target.value);
    }

    function handleName(e) {
        e.preventDefault();
        dispatch(getByName(nameComp));
        setNameComp("");
    }
    function handleName2(e) {
        e.preventDefault();
        dispatch(getFieldByName(nameCancha));
        setNameCancha("");
    }


    function handleKey(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(getByName(nameComp));
            setNameComp("");
        }
    }
    function handleKey2(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(getByName(nameCancha));
            setNameCancha("");
        }
    }

    // -------------------------------------------

    // FILTROS DE COMPLEJOS--------------------------
    function handleComplexDistrict() {
        dispatch(filterComplexByDistrict(district));
    }

    function handleComplexProvince() {
        dispatch(filterComplexByProvince(province));
    }

    function handleResetComplex(e) {
        e.preventDefault();
        dispatch(getComplexAll());
    }
    // -------------------------------------------

    return (
        <div className={s.parent}>
            <div className={s.div1}>
                <div className="bg-light-blue-500 w-full rounded-lg p-4 justify-start -mt-12 mb-6 list-none shadow-lg-light-blue z-10 undefined">
                    <TabItem
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(1);
                        }}
                        ripple="light"
                        active={openTab === 1 ? true : false}
                        href="tabItem"
                    >
                        Mis Datos
                    </TabItem>
                    <TabItem
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(2);
                        }}
                        ripple="light"
                        active={openTab === 2 ? true : false}
                        href="tabItem"
                    >
                        Usuarios
                    </TabItem>
                    <TabItem
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(3);
                        }}
                        ripple="light"
                        active={openTab === 3 ? true : false}
                        href="tabItem"
                    >
                        Complejos
                    </TabItem>
                    <TabItem
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(4);
                        }}
                        ripple="light"
                        active={openTab === 4 ? true : false}
                        href="tabItem"
                    >
                        Canchas
                    </TabItem>
                </div>
            </div>
            {/* EN ESTE DIV DE ABAJO SE TIENE QUE RENDERIZAR LA INFORMACION */}
            <div className={s.div2}>
                <TabContent>
                    <TabPane active={openTab === 1 ? true : false}>
                        <div className="pt-20">
                            <ModificarUsuario />
                        </div>
                    </TabPane>
                    <TabPane active={openTab === 2 ? true : false}>
                        {
                            /* This example requires Tailwind CSS v2.0+ */
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200 z-index-30">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Nombre
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Mail
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Provincia
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Localidad
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Fec. Nac.
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Mpdificar</span>
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Espacio</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filterUs?.map((el) => (
                                                        <tr key={el.mail}>
                                                            <td className="px-4 py-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-2 align-center whitespace-nowrap">
                                                                        <div className="text-sm text-center font-medium text-gray-900">
                                                                            {el.name} {el.surname}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-center text-gray-500">
                                                                    {el.mail}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {el.province}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-500">
                                                                    {el.district}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-500">
                                                                    {el.birthdate}
                                                                </div>
                                                            </td>
                                                            <td className=" py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                {/* AQUI ABAJO DEBERIA IR EL PATH PARA MODIFICAR EL COMPLEJO */}
                                                                <Link
                                                                    to={`/detailSUPUsuario/${el.id}`}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Modificar
                                                                </Link>
                                                            </td>
                                                            <td className="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TabPane>
                    <TabPane active={openTab === 3 ? true : false}>
                        <div>
                            <div className={s.Filtros}>
                                <div className={s.Filtro0}>
                                    <label className={s.titulo}>Provincia</label>
                                    <div>
                                        <ProvinceAPI />
                                    </div>
                                    <div>
                                        <button onClick={handleComplexProvince} className={s.btn}>
                                            Filtrar
                                        </button>
                                    </div>
                                </div>
                                <div className={s.Filtro1}>
                                    <label className={s.titulo}>Localidad</label>
                                    <div>
                                        <DistrictAPI />
                                    </div>
                                    <div>
                                        <button onClick={handleComplexDistrict} className={s.btn}>
                                            Filtrar
                                        </button>
                                    </div>
                                </div>
                                <div className={s.Filtro2}>
                                    <label className={s.titulo}>Complejo</label>
                                    <div>
                                        <input className={s.input} name="name" value={nameComp} onChange={handleChange}
                                            onKeyDown={handleKey}></input>
                                    </div>
                                    <div>
                                        <button onClick={handleName} className={s.btn}>
                                            Filtrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className={s.btn} onClick={handleResetComplex}>
                                Limpiar Filtros
                            </button>
                        </div>
                        {
                            /* This example requires Tailwind CSS v2.0+ */
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200 z-index-30">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Nombre
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Provincia / Localidad
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Dirección
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Horario
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="relativ/Borrare px-6 py-3"
                                                        >
                                                            <span className="sr-only">Editar/Borrar</span>
                                                        </th>
                                                        <th scope="col" className="rEspacioe px-6 py-3">
                                                            <span className="sr-only">Espacio</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {complex?.map((el) => (
                                                        <tr key={el.id}>
                                                            <td className="px-4 py-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img
                                                                            className="h-10 w-10 rounded-full"
                                                                            src={el.images[0]}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="ml-2 align-center whitespace-nowrap">
                                                                        <div className="text-sm text-center font-medium text-gray-900">
                                                                            {el.name}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-center text-gray-500">
                                                                    {el.province}
                                                                </div>
                                                                <div className="text-sm text-gray-900">
                                                                    {el.district}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-500">
                                                                    {el.address}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    Abre: {el.openfrom} hs
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    Cierra: {el.opento} hs
                                                                </div>
                                                            </td>
                                                            <td className=" py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                {/* AQUI ABAJO DEBERIA IR EL PATH PARA MODIFICAR EL COMPLEJO */}
                                                                <Link
                                                                    to={`/detailSUPComplejo/${el.id}`}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Modificar
                                                                </Link>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TabPane>
                    <TabPane active={openTab === 4 ? true : false}>
                        <div>
                            <div className="pt-4">
                                <div className={s.buttonAgregarComplejo}>
                                    <Link to="/agregarCancha">
                                        <button className="bg-gray-600 text-gray-300 p-2 rounded-md hover:bg-gray-300 hover:text-gray-900">
                                            Agregar Cancha
                                        </button>
                                    </Link>
                                    <div className="pb-5">
                                        <div className={s.filtros}>
                                            <div className={s.filtro1}>
                                                <select className={s.inputSelect} onChange={handleType}>
                                                    <option value="all"> Tipo de Deporte </option>
                                                    <option value="all"> Actualizar </option>
                                                    {fTypes.map((p, i) => (
                                                        <option key={"option" + i} value={p.type}>
                                                            {p.type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={s.filtro2}>
                                                <div className="pt-4">
                                                    <label className={s.titulo}>Provincia</label>
                                                    <div>
                                                        <ProvinceAPI />
                                                    </div>
                                                </div>
                                                <div>
                                                    <button onClick={handleProvince} className={s.btn}>
                                                        Filtrar
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={s.filtro3}>
                                                <div className="pt-4">
                                                    <label className={s.titulo}>Localidad</label>
                                                    <div>
                                                        <DistrictAPI />
                                                    </div>
                                                </div>
                                                <div>
                                                    <button onClick={handleDistrict} className={s.btn}>
                                                        Filtrar
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={s.filtro4}>
                                                <div className="pt-4">
                                                    <label className={s.titulo}>Complejo</label>
                                                    <div>
                                                        <input className={s.input} name="name" value={nameCancha} onChange={handleChange2}
                                                            onKeyDown={handleKey2}></input>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button onClick={handleName2} className={s.btn}>
                                                        Filtrar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className={s.btn} onClick={handleReset}>
                                            Limpiar Filtros
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200 z-index-30">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Nombre
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Complejo
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Direccion
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Precio
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Tipo de Cancha
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Modificar</span>
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-3">
                                                            <span className="sr-only">Espacio</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {fields?.map((el) => (
                                                        <tr key={el.id}>
                                                            <td className="px-4 py-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-2 align-center whitespace-nowrap">
                                                                        <div className="text-sm text-center font-medium text-gray-900">
                                                                            {el.name}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-center text-gray-500">
                                                                    {el.complex?.name}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-500">
                                                                    {el.complex?.district}, {el.complex?.address}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    ${el.cost}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {el.fieldtype.type}
                                                                </div>
                                                            </td>
                                                            <td className=" py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                {/* AQUI ABAJO DEBERIA IR EL PATH PARA MODIFICAR EL COMPLEJO */}
                                                                <Link
                                                                    to={`/detailSUPCancha/${el.id}`}
                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    Modificar
                                                                </Link>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
}