import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./panelComplex.module.css";
import ModificarUsuario from "../panelUser/ModificarUsuario.js";

//-------------------------------------------------------
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
//-------------------------------------------------------

export default function PanelComplex() {
    const userInfo = useSelector((state) => state.userInfo);
    const [openTab, setOpenTab] = useState(1);

    return (
        <div className={s.body}>
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
                            Mis Clubes
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
                            Mis Canchas
                        </TabItem>
                    </div>
                </div>

                {/* EN ESTE DIV DE ABAJO SE TIENE QUE RENDERIZAR LA INFORMACION */}
                <div className={s.div2}>
                    {/* PANEL DEL COMPLEJO */}
                    <TabContent>
                        <TabPane active={openTab === 1 ? true : false}>
                            <div className="pt-20">
                                <ModificarUsuario />
                            </div>
                        </TabPane>
                        <TabPane active={openTab === 2 ? true : false}>
                            <div className={s.buttonAgregarComplejo}>
                                <Link to="/agregarComplejo">
                                    <button className="bg-gray-700 text-gray-300 p-2 mb-5 rounded-md hover:bg-gray-400 hover:text-gray-900">
                                        Agregar Complejo
                                    </button>
                                </Link>
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
                                                            <th scope="col" className="relative px-6 py-3">
                                                                <span className="sr-only">Reservas</span>
                                                            </th>
                                                            <th scope="col" className="relative px-6 py-3">
                                                                <span className="sr-only">Editar</span>
                                                            </th>
                                                            <th scope="col" className="relative px-6 py-3">
                                                                <span className="sr-only">Espacio</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {userInfo.privileges?.map((el) => (
                                                            <tr key={el.complex.id}>
                                                                <td className="px-4 py-2 whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <div className="flex-shrink-0 h-10 w-10">
                                                                            <img
                                                                                className="h-10 w-10 rounded-full"
                                                                                src={el.complex.images[0]}
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div className="ml-2 align-center whitespace-nowrap">
                                                                            <div className="text-sm text-center font-medium text-gray-900">
                                                                                {el.complex.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-center text-gray-500">
                                                                        {el.complex.province}
                                                                    </div>
                                                                    <div className="text-sm text-gray-900">
                                                                        {el.complex.district}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-500">
                                                                        {el.complex.address}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">
                                                                        Abre: {el.complex.openfrom} hs
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        Cierra: {el.complex.opento} hs
                                                                    </div>
                                                                </td>
                                                                <td className=" py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    {/* AQUI ABAJO DEBERIA IR EL PATH PARA MODIFICAR EL COMPLEJO */}
                                                                    <Link
                                                                        to={`/complexReservationsDet/${el.complex.id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Ver Reservas  /
                                                                    </Link>
                                                                    </td>
                                                                <td className=" py-4 whitespace-nowrap text-rigth text-sm font-medium">
                                                                    {/* AQUI ABAJO DEBERIA IR EL PATH PARA MODIFICAR EL COMPLEJO */}
                                                                    <Link
                                                                        to={`/detailComplejo/${el.complex.id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                       Modificar
                                                                    </Link>
                                                                </td>
                                                                <td className=" py-4 whitespace-nowrap text-rigth text-sm font-medium">
                                                                </td>
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
                            <div className={s.buttonAgregarComplejo}>
                                <Link to="/agregarCancha">
                                    <button className="bg-gray-700 text-gray-300 p-2 mb-5 rounded-md hover:bg-gray-400 hover:text-gray-900">
                                        Agregar Cancha
                                    </button>
                                </Link>
                            </div>
                            {
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
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
                                                                Precio
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Tipo
                                                            </th>
                                                            <th scope="col" className="relative px-6 py-3">
                                                                <span className="sr-only">Reservas</span>
                                                            </th>
                                                            <th scope="col" className="relative px-6 py-3">
                                                                <span className="sr-only">Editar/Borrar</span>
                                                            </th>
                                                            <th scope="col" className="relative px-6 py-3">
                                                                <span className="sr-only">Espacio</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {userInfo.fields?.map((el) => (
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
                                                                    <div className="text-sm text-gray-900">
                                                                        ARS ${el.cost}
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">
                                                                        {el.fieldtype?.type}
                                                                    </div>
                                                                </td>
                                                                <td className="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <Link
                                                                        to={`/complexReservations?id=${el.id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Reservas  /
                                                                    </Link>
                                                                </td>
                                                                <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    {/* AQUI ABAJO DEBERIA IR EL PATH PARA PODER MODIFICAR LA CANCHA */}
                                                                    <Link
                                                                        to={`/detailCancha/${el.id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Modificar
                                                                    </Link>
                                                                </td>
                                                                <td className=" py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                </td>
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
        </div>
    );
}