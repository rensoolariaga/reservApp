import React, { useEffect } from "react";
import Navbar from "../nav/Nav.js";
import styles from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFields } from "../../redux/actions/index.js";


export default function Detail(props) {

  const id = props.match.params.id;
  const dispatch = useDispatch();
  const { fields } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getFields({}));
  }, [dispatch]);

  let filter = fields.filter((el) => el.id === id);

  return (
    <div className={styles.color}>
      <Navbar />
      {fields.length > 0 && (
        <div>
          <div>{filter[0].name}</div>
          <div className={styles.imgPosition}>
            <img src={filter[0].complex.images[0]} className={styles.cancha} alt="" />
          </div>
          <div>{filter[0].complex.province}</div>
          <div>{filter[0].complex.district}</div>
          <div>${filter[0].cost}</div>
        </div>
      )}
    </div>
  );
}