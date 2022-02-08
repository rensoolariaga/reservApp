import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DISTRICT, ARG_API_FLAG } from "../../redux/Consts.js";
import { useDetectClickOut } from "../../redux/Hooks.js";
import { getDistrict } from "../../redux/actions/index.js";
import s from "../signUp/signUp.module.css";

export default function DistrictAPI({ defaultValue }) {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state);
  const { triggerRef, nodeRef, show, setShow } = useDetectClickOut(false);
  const showValue = defaultValue || "";

  useEffect(() => {
    if (location.flag) {
      dispatch({ type: ARG_API_FLAG });
      setDistrict(location.search);
    }
  }, [dispatch, location]);

  const [district, setDistrict] = useState(showValue);

  const dropdownMenu = () => {
    return (
      <div className={s.dropdownMenuLocation}>
        {location.rdistrict.map((loc, index) => {
          return (
            <input
              type="button"
              key={"id.key.input.district." + index + loc}
              className={s.dropdownButtonLocation}
              value={loc.nombre
                .toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              onClick={onClick_DDButton}
            />
          );
        })}
      </div>
    );
  };

  function handleDistrictChange(e) {
    if (e.target.value === "") {
      setShow(true);
    }
    setDistrict(e.target.value);
    dispatch(
      getDistrict({
        province: location.province,
        district: e.target.value,
      })
    );
  }

  const onClick_DDButton = (e) => {
    dispatch({
      type: SET_DISTRICT,
      payload: e.target.value,
    });
    setDistrict(e.target.value);
    setShow(false);
  };

  return (
    <div ref={nodeRef}>
      <input
        className={s.inputs}
        type="search"
        value={district}
        name="district"
        required="required"
        onChange={handleDistrictChange}
        autoComplete="off"
        ref={triggerRef}
      ></input>
      {show ? dropdownMenu() : null}
    </div>
  );
}