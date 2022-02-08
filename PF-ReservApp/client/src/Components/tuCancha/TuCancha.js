import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card.js";
import Navbar from "../nav/Nav";
import ProvinceAPI from "../argAPI/Province.jsx";
import DistrictAPI from "../argAPI/District.jsx";
import Paginado from "../paginado/paginado";
import s from "./tuCancha.module.css";
import {
  getUserInfo,
  getFields,
  orderByPrice,
  filterByType,
  getFieldType,
  filterByProvince,
  filterByDistrict,
  filterByLoc,
  getByName
} from "../../redux/actions/index.js";

export default function TuCancha() {
  const dispatch = useDispatch();
  const allFields = useSelector((state) => state.fields);
  const province = useSelector((state) => state.location.province);
  const district = useSelector((state) => state.location.district);
  const fTypes = useSelector((state) => state.fieldType);

  const [, setOrder] = useState("");
  const [name, setName] = useState('');


  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [fieldsPerPage] = useState(6);

  //Ordenando canchas por página
  const indexOfLastField = currentPage * fieldsPerPage;
  const indexOfFirstField = indexOfLastField - fieldsPerPage;
  const currentFields = allFields.slice(indexOfFirstField, indexOfLastField);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFieldType());
  }, [dispatch]);

  function handleLocation(e) {
    e.preventDefault();
    dispatch(filterByLoc());
    setCurrentPage(1);
  }

  function handleProvince() {
    dispatch(filterByProvince(province));
    setCurrentPage(1);
  }

  function handleDistrict() {
    dispatch(filterByDistrict(district));
    setCurrentPage(1);
  }

  function handleType(e) {
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  }

  function handlePrice(e) {
    dispatch(orderByPrice(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleReset(e) {
    e.preventDefault();
    dispatch(getFields());
    setCurrentPage(1);
  }

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleName(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setName("");
  }

  function handleKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(getByName(name));
      setName("");
    }
  }

  return (
    <div className={s.body}>
      <Navbar />

      <div className={s.parent}>
        <div className={s.div1}>
          <div className={s.titulo}>
            <h1 className="text-xl pb-0">
              Filtrar <br /> por
            </h1>
          </div>
          <div>
            <button onClick={handleLocation} className={s.btn}>
              Cercania
            </button>
          </div>
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


          <div className="pt-4">
            <label className={s.titulo}>Complejo</label>
            <div>
              <input className={s.input} name="name" value={name} onChange={handleChange}
                onKeyDown={handleKey}></input>
            </div>
          </div>
          <div>
            <button onClick={handleName} className={s.btn}>
              Filtrar
            </button>
          </div>

          <div className="pt-4">
            <select className={s.input} onChange={handleType}>
              <option value="all"> Tipo de Deporte </option>
              {fTypes.map((p, i) => (
                <option key={"option" + i} value={p.type}>
                  {p.type}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4">
            <select className={s.input} onChange={handlePrice}>
              <option value="all"> Ordenar por Precio </option>
              <option value="menor"> Menor a Mayor </option>
              <option value="mayor"> Mayor a Menor </option>
            </select>
          </div>
          <button
            className={s.btn}
            onClick={handleReset}
          >
            Limpiar Filtros
          </button>
        </div>
        <div className={s.div2}>
          <div className={s.paginacion}>
            <Paginado
              fieldsPerPage={fieldsPerPage}
              allFields={allFields.length}
              paginado={paginado}
            />
          </div>
          <div className={s.gridFields}>
            {currentFields &&
              currentFields.map((el, i) => {
                return (
                  <div key={"card" + i} className="p-6">
                    <Card
                      // key={"card" + i}
                      img={el.complex.images[0]}
                      cname={el.complex.name}
                      name={el.name}
                      type={el.fieldtype.type}
                      location={
                        el.complex.district + ", " + el.complex.province
                      }
                      address={el.complex.address}
                      price={el.cost}
                      complexID={el.complex.id}
                      fieldID={el.id}
                    />
                  </div>
                );
              })}
            <div>
              {currentFields && currentFields.length === 0 ? (
                <div>
                  <img
                    className={s.loading}
                    src="https://media1.giphy.com/media/SA6tTtJAaBYaSs3h7R/giphy.gif?cid=6c09b9521ocmdijbvqrmp57txhse7ppvze8lwtznaokv6a4e&rid=giphy.gif&ct=s"
                    alt="No se encontraron canchas"
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}