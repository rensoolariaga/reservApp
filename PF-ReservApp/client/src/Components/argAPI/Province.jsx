import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROVINCE, ARG_API_FLAG } from "../../redux/Consts.js";
import { useDetectClickOut } from "../../redux/Hooks.js";
import { getProvince } from "../../redux/actions/index.js";
import s from "../signUp/signUp.module.css";

export default function ProvinceAPI({ defaultValue }) {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state);
  const { triggerRef, nodeRef, show, setShow } = useDetectClickOut(false);
  const showValue = defaultValue || "";

  useEffect(() => {
    if (location.flag) {
      dispatch({ type: ARG_API_FLAG });
      setProvince(location.search);
    }
  }, [dispatch, location]);

  const [province, setProvince] = useState(showValue);

  const dropdownMenu = () => {
    return (
      <div className={s.dropdownMenuLocation}>
        {location.results.map((loc, index) => {
          return (
            <input
              type="button"
              key={"id.key.input.province." + index + loc}
              className={s.dropdownButtonLocation}
              value={loc.nombre}
              onClick={onClick_DDButton}
            />
          );
        })}
      </div>
    );
  };

  function handleProvinceChange(e) {
    if (e.target.value === "") {
      setShow(true);
    }
    setProvince(e.target.value);
    dispatch(
      getProvince({
        province: e.target.value,
      })
    );
  }

  const onClick_DDButton = (e) => {
    dispatch({
      type: SET_PROVINCE,
      payload: e.target.value,
    });
    setProvince(e.target.value);
    setShow(false);
  };

  return (
    <div ref={nodeRef}>
      <input
        className={s.inputs}
        type="search"
        value={province}
        name="province"
        required="required"
        onChange={handleProvinceChange}
        autoComplete="off"
        ref={triggerRef}
      ></input>
      {show ? dropdownMenu() : null}
    </div>
  );
}