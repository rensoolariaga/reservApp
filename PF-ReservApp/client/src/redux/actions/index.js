import axios from "axios";

const {
  URL,
  POST_USER,
  LOGIN_ATTEMPT,
  UPDATE_PROVINCE,
  UPDATE_DISTRICT,
  UPDATE_FIELD_RESERVATIONS,
  UPDATE_INFO,
  GET_FIELDS,
  GET_INFO,
  GET_FIELD_TYPE,
  POST_COMPLEX,
  RESERVATION_MP,
  POST_FIELD,
  UPDATE_FIELD,
  ORDER_BY_PRICE,
  FILTER_BY_TYPE,
  POST_RESERVATION,
  FILTER_BY_PROVINCE,
  FILTER_BY_DISTRICT,
  GET_COMPLEX_INFO,
  FILTER_BY_LOC,
  G_REGISTRATION,
  LOGOUT_G,
  GET_COMPLEX_ALL,
  GET_FIELDS_BY_COMPLEX,
  UPDATE_USER,
  DELETE_USER,
  DELETE_RESERVATION,
  DELETE_COMPLEX,
  UPDATE_COMPLEX,
  DELETE_FIELD,
  FAIL_MAIL,
  ACTIVE_SESSION_GOOGLE,
  GET_BY_NAME,
  GET_USER_ALL,
  FILTER_COMPLEX_BY_DISTRICT,
  FILTER_COMPLEX_BY_PROVINCE,
  POST_REVIEW,
  GET_REVIEWS,
  UPDATE_OWNER_COMPLEXES,
  USER_MESSAGE,
  GET_FIELD_BY_NAME
} = require("../Consts.js");

//Registro de Usuario
export function registration(payload) {
  return async function (dispatch) {
    let register = await axios.post(URL + "user/", payload);
    if (register.data.type === "success") {
      return dispatch({
        type: POST_USER,
        payload: register.data,
      });
    } else return;
  };
}

export function logout() {
  return async function (dispatch) {
    let res = await axios.post(URL + "auth/logout");
    if (res.data.result === "success") {
      return dispatch({
        type: UPDATE_INFO,
      });
    }
  };
}

export function login(payload) {
  return async function (dispatch) {
    let response = await axios.post(URL + "auth/login", payload);
    if (response.data.result === "success") {
      await axios.get(URL + "user/info").then((res) => {
        return dispatch({ type: UPDATE_INFO, payload: res.data });
      });
    } else {
      return dispatch({
        type: LOGIN_ATTEMPT,
        payload: response.data.result,
      });
    }
  };
}

export function getProvince(payload) {
  if (payload.province.length <= 1) {
    return { type: UPDATE_PROVINCE, payload: "" };
  }
  return async function (dispatch) {
    let provinces = await axios.get(
      "https://apis.datos.gob.ar/georef/api/provincias",
      {
        params: {
          nombre: payload.province,
        },
      }
    );
    return dispatch({ type: UPDATE_PROVINCE, payload: provinces.data });
  };
}

export function getDistrict(payload) {
  if (payload.district.length < 1) {
    return { type: UPDATE_DISTRICT, payload: "" };
  }
  if (!payload.province) payload.province = null;
  return async function (dispatch) {
    let districts = await axios.get(
      "https://apis.datos.gob.ar/georef/api/localidades",
      {
        params: {
          nombre: payload.district,
          provincia: payload.province,
        },
      }
    );
    return dispatch({ type: UPDATE_DISTRICT, payload: districts.data });
  };
}

export function getFields(payload) {
  return async function (dispatch) {
    const arr = await axios.get(URL + "field/");
    return dispatch({
      type: GET_FIELDS,
      payload: arr.data,
    });
  };
}

export function getUserInfo() {
  return async function (dispatch) {
    const info = await axios.get(URL + "user/info");
    if (info.data.result === "success") {
      return dispatch({ type: UPDATE_INFO, payload: info.data.data });
    } else {
      return dispatch({
        type: GET_INFO,
        payload: info.data,
      });
    }
  };
}

export function getFieldType() {
  return async function (dispatch) {
    const type = await axios.get(URL + "fieldtype");
    return dispatch({
      type: GET_FIELD_TYPE,
      payload: type.data,
    });
  };
}

export function postComplex(payload) {
  return (dispatch) => {
    axios.post(URL + "complex/", payload).then((response) => {
      return dispatch({
        type: POST_COMPLEX,
      });
    });
  };
}

export function postField(payload) {
  return async function (dispatch) {
    await axios.post(`${URL}field/`, payload).then((response) => {
      return dispatch({
        type: POST_FIELD,
        payload: response.data,
      });
    });
  };
}

export function postReservation(payload) {
  return async function (dispatch) {
    await axios
      .post(`${URL}reservation/`, payload)
      .then((response) => {
        dispatch({
          type: POST_RESERVATION,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function filterByProvince(payload) {
  // console.log(payload, "payload");
  return {
    type: FILTER_BY_PROVINCE,
    payload,
  };
}

export function filterByDistrict(payload) {
  // console.log(payload, "payload");
  return {
    type: FILTER_BY_DISTRICT,
    payload,
  };
}

export function filterComplexByDistrict(payload) {
  return {
    type: FILTER_COMPLEX_BY_DISTRICT,
    payload,
  };
}

export function filterComplexByProvince(payload) {
  return {
    type: FILTER_COMPLEX_BY_PROVINCE,
    payload,
  };
}

export function getComplex(id) {
  // console.log("id", id);
  return async function (dispatch) {
    let res = await axios.get(URL + "complex" + id);
    res = res.data;
    // console.log("res", res);
    return dispatch({
      type: GET_COMPLEX_INFO,
      payload: res,
    });
  };
}

export function filterByLoc(payload) {
  return {
    type: FILTER_BY_LOC,
    payload,
  };
}

export function getField(payload) {
  return async function (dispatch) {
    let res = await axios.get(URL + "field", {
      params: { id: payload.id },
    });
    return dispatch({
      type: UPDATE_FIELD_RESERVATIONS,
      payload: res.data,
    });
  };
}

// registro por google
export function gRegistration(payload) {
  return async function (dispatch) {
    let response = await axios.post("http://localhost:3001/session", payload);

    return dispatch({
      type: G_REGISTRATION,
      payload: response.data,
    });
  };
}

export function logoutG(payload) {
  return async function (dispatch) {
    let response = await axios.post("http://localhost:3001/session1", payload);

    return dispatch({
      type: LOGOUT_G,
      payload: response.data,
    });
  };
}

export function getComplexAll() {
  return async function (dispatch) {
    let res = await axios.get(URL + "complex/all");
    res = res.data;
    return dispatch({
      type: GET_COMPLEX_ALL,
      payload: res,
    });
  };
}
// MercadoPago
export function postReservationMP(payload) {
  return async function (dispatch) {
    let response = await axios.post(
      "http://localhost:3001/mercadoPagoPost",
      payload
    );
    return dispatch({
      type: RESERVATION_MP,
      payload: response.data,
    });
  };
}

export function updateUser(payload) {
  return async function (dispatch) {
    await axios
      .put(`${URL}user`, payload)
      .then((response) => {
        dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getFieldsByComplex(id) {
  return async (dispatch) => {
    try {
      let urlId = await axios.get(URL + "complex/", {
        params: { id: id },
      });
      dispatch({
        type: GET_FIELDS_BY_COMPLEX,
        payload: urlId.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateComplex(payload) {
  return async function (dispatch) {
    await axios
      .put(`${URL}complex`, payload)
      .then((response) => {
        dispatch({
          type: UPDATE_COMPLEX,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function updateField(payload) {
  return async function (dispatch) {
    await axios
      .put(`${URL}field`, payload)
      .then((response) => {
        dispatch({
          type: UPDATE_FIELD,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteUser(payload) {
  return async function (dispatch) {
    axios.delete(`${URL}user?id=${payload}`).then((response) => {
      dispatch({
        type: DELETE_USER,
        payload: response.data,
      })
    }).catch((error) => console.log(error));
  };
}

export function deleteReservation(payload) {
  return async function (dispatch) {
    axios
      .delete(`${URL}reservation/delete?id=${payload}`)
      .then((response) => {
        dispatch({
          type: DELETE_RESERVATION,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getUserAll() {
  return async function (dispatch) {
    let res = await axios.get(URL + "user");

    const resInfo = res.data;
    return dispatch({
      type: GET_USER_ALL,
      payload: resInfo,
    });
  };
}

export function deleteComplex(payload) {
  return async function (dispatch) {
    axios.delete(`${URL}complex?id=${payload}`).then((response) => {
      dispatch({
        type: DELETE_COMPLEX,
        payload: response.data,
      });
    });
  };
}

export function deleteField(payload) {
  return async function (dispatch) {
    axios.delete(`${URL}field?id=${payload}`).then((response) => {
      dispatch({
        type: DELETE_FIELD,
        payload: response.data,
      });
    });
  };
}

export function failMail(payload) {
  return async function (dispatch) {
    await axios
      .post(`${URL}failMail/`, payload)
      .then((response) => {
        dispatch({
          type: FAIL_MAIL,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function activeSessionGoogle() {
  return async function (dispatch) {
    let res = await axios.get(URL + "activeSessionGoogle");
    res = res.data;
    return dispatch({
      type: ACTIVE_SESSION_GOOGLE,
      payload: res,
    });
  };
}

export function getByName(name) {
  return {
    type: GET_BY_NAME,
    payload: name,
  };
}

export function getFieldByName(name) {
  return {
    type: GET_FIELD_BY_NAME,
    payload: name,
  };
}


export function postReview(payload) {
  payload.rating = payload.stars;
  return async function (dispatch) {
    let res = await axios.post(URL + "reviews", payload);
    return {
      type: POST_REVIEW,
      payload: res,
    };
  };
}

export function getReviews(payload) {
  return async function (dispatch) {
    let res = await axios.get(URL + "reviews", {
      params: payload,
    });
    const comments = res.data;

    return dispatch({
      type: GET_REVIEWS,
      payload: comments,
    });
  };
}

export function getComplexesInfo(arrID) {

  let arrRes = [];
  let flag = 0;
  return async function (dispatch) {
    arrID.forEach(async (elID) => {
      await axios
        .get(URL + "complex/", {
          params: { id: elID },
        })
        .then((res) => {
          arrRes.push(res.data);
          flag = flag + 1;
          if (flag >= arrID.length) {
            return dispatch({
              type: UPDATE_OWNER_COMPLEXES,
              payload: arrRes,
            });
          }
        });
    });
  };
}

export function userMessage(payload) {
  return async function (dispatch) {

    await axios
      .post(`${URL}userMessage/`, payload)
      .then((response) => {

        dispatch({
          type: USER_MESSAGE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}