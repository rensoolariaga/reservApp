import Swal from "sweetalert2/dist/sweetalert2.js";
import {
  POST_USER,
  UPDATE_PROVINCE,
  UPDATE_DISTRICT,
  UPDATE_INFO,
  UPDATE_FIELD_RESERVATIONS,
  UPDATE_RESERVATION_DATA,
  SET_PROVINCE,
  SET_DISTRICT,
  LOGIN_ATTEMPT,
  LOGIN_USER,
  LOGOUT_USER,
  GET_FIELDS,
  UPDATE_FIELD,
  GET_INFO,
  GET_FIELD_TYPE,
  POST_COMPLEX,
  GET_CREATE_RESERVA,
  RESERVATION_MP,
  POST_FIELD,
  ORDER_BY_PRICE,
  FILTER_BY_TYPE,
  POST_RESERVATION,
  FILTER_BY_PROVINCE,
  FILTER_BY_DISTRICT,
  GET_COMPLEX_INFO,
  FILTER_BY_LOC,
  RESET_LOCATION,
  ARG_API_FLAG,
  G_REGISTRATION,
  LOGOUT_G,
  GET_COMPLEX_ALL,
  UPDATE_USER,
  DELETE_USER,
  DELETE_RESERVATION,
  UPDATE_COMPLEX,
  DELETE_COMPLEX,
  DELETE_FIELD,
  FAIL_MAIL,
  ACTIVE_SESSION_GOOGLE,
  GET_BY_NAME,
  GET_FIELDS_BY_COMPLEX,
  GET_USER_ALL,
  FILTER_COMPLEX_BY_DISTRICT,
  FILTER_COMPLEX_BY_PROVINCE,
  POST_REVIEW,
  GET_REVIEWS,
  UPDATE_OWNER_COMPLEXES,
  USER_MESSAGE,
  GET_FIELD_BY_NAME
} from "../Consts";

const initialState = {
  isLogged: false,
  initial: [],
  fields: [],
  fields2: [],
  uflag: false,
  userInfo: {},
  fieldType: [],
  mp: [],
  googleLogin: [],
  activeSessionG: [],
  complexDetails: {},
  complexAll: [],
  cflag: false,
  complexAll2: [],
  fieldsByComplex: [], // lo cambie, ahora es un array (antes un objeto)
  users: [],
  location: {
    results: [],
    rdistrict: [],
    reservas: [],
    canchas: [],
    search: "",
    searchd: "",
    province: "",
    district: "",
    flag: false,
  },
  reservations: {
    array: [],
    complex: {},
    id: "",
    name: "",
    type: "",
    cost: "",
    data: { hours: [], firstSlot: {}, secondSlot: {} },
  },
  userUpdate: [], // prueba
  userDeleted: [], // prueba
  reservationDelete: [], // prueba
  complexUpdate: [], // ANDA
  complexDelete: [], // ANDA
  fieldUpdate: [], // ANDA
  fieldDelete: [], // prueba
  reviews: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case POST_USER:
      return {
        ...state,
        isLogged: true,
        userInfo: payload.data,
      };

    case POST_COMPLEX:
      return {
        ...state,
        cflag: true,
      };
    case POST_FIELD:
      return {
        ...state,
        canchas: payload,
      };
    case UPDATE_PROVINCE:
      if (payload === "") {
        return {
          ...state,
          location: {
            ...state.location,
            results: [],
            search: payload,
          },
        };
      }
      return {
        ...state,
        location: {
          ...state.location,
          results: payload.provincias,
          search: payload.parametros.nombre,
        },
      };

    case UPDATE_DISTRICT:
      if (payload === "") {
        return {
          ...state,
          location: {
            ...state.location,
            rdistrict: [],
            searchd: payload,
          },
        };
      }
      return {
        ...state,
        location: {
          ...state.location,
          rdistrict: payload.localidades,
          searchd: payload.parametros.nombre,
        },
      };

    case SET_PROVINCE:
      return {
        ...state,
        location: {
          ...state.location,
          province: payload,
        },
      };

    case SET_DISTRICT:
      return {
        ...state,
        location: {
          ...state.location,
          district: payload,
        },
      };

    case LOGIN_ATTEMPT:
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Usuario o contraseña incorrectos.",
      });
      return {
        ...state,
        userInfo: {},
        isLogged: false,
      };

    case LOGIN_USER:
      // console.log(payload);
      return {
        ...state,
        isLogged: true,
      };

    case LOGOUT_USER:
      // console.log(payload);
      return {
        ...state,
        isLogged: false,
        userInfo: {},
      };

    case GET_FIELDS:
      return {
        ...state,
        fields: payload,
        fields2: payload,
      };

    case UPDATE_FIELD:
      return {
        ...state,
        fieldUpdate: payload,
      };

    case DELETE_FIELD:
      return {
        ...state,
        fieldDelete: payload,
      };

    case GET_INFO:
      return {
        ...state,
        isLogged: false,
        userInfo: {},
      };

    case UPDATE_INFO:
      if (payload?.result === "success") {
        const Toast1 = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast1.fire({
          icon: "success",
          title: "Has iniciado sesion.",
        });
      }
      return {
        ...state,
        isLogged: true,
        userInfo: payload,
      };

    case GET_FIELD_TYPE:
      return {
        ...state,
        fieldType: payload,
      };

    case GET_CREATE_RESERVA:
      return {
        ...state,
        reservas: payload,
      };

    case RESERVATION_MP:
      return {
        ...state,
        mp: payload[0].url,
      };
    case POST_RESERVATION:
      return {
        ...state,
        reservas: payload,
      };
    case ORDER_BY_PRICE:
      let sortedFields =
        payload === "menor"
          ? state.fields2.sort(function (a, b) {
            if (a.cost > b.cost) {
              return 1;
            } else if (b.cost > a.cost) {
              return -1;
            }
            return 0;
          })
          : state.fields2.sort(function (a, b) {
            if (a.cost > b.cost) {
              return -1;
            } else if (b.cost > a.cost) {
              return 1;
            }
            return 0;
          });
      // console.log("sortedFields", sortedFields);
      return {
        ...state,
        fields: sortedFields,
      };

    case FILTER_BY_TYPE:
      if (payload === "all") {
        const allFields = state.fields2;
        return {
          ...state,
          fields: allFields,
        };
      }
      const filter = state.fields2.filter(
        (el) => el.fieldtype.type === payload
      );
      return {
        ...state,
        fields: filter,
      };

    case FILTER_BY_PROVINCE:
      const filter2 = state.fields2.filter(
        (el) => el.complex.province === payload
      );
      return {
        ...state,
        fields: filter2,
      };

    case FILTER_BY_DISTRICT:
      const filter3 = state.fields2.filter(
        (el) => el.complex.district === payload
      );
      return {
        ...state,
        fields: filter3,
      };

    case FILTER_COMPLEX_BY_DISTRICT:
      const filterComplexDistrict = state.complexAll2.filter(
        (el) => el.district === payload
      );
      return {
        ...state,
        complexAll: filterComplexDistrict,
      };
    case FILTER_COMPLEX_BY_PROVINCE:
      const filterComplexProvince = state.complexAll.filter(
        (el) => el.province === payload
      );
      return {
        ...state,
        complexAll: filterComplexProvince,
      };

    case GET_COMPLEX_INFO:

      return {
        ...state,
        complexDetails: payload,
      };

    case FILTER_BY_LOC:
      const userProv = state.userInfo.userInfo.province;
      const userDist = state.userInfo.userInfo.district;
      const filterByProv = state.fields2.filter(
        (el) => el.complex.province === userProv
      );
      
      const filterByDist = filterByProv.filter(
        (el) => el.complex.district === userDist
      );
      

      if (filterByProv.length === 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1500,
        });
        Toast.fire({
          icon: 'error',
          title: 'No se encontraron canchas en tu Provincia'
        })
        // alert("No se encontraron canchas en tu Provincia.");
        return {
          ...state,
        };
      } else if (filterByDist.length === 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1500,
        })

        Toast.fire({
          icon: 'info',
          title: 'Estas son las canchas mas cercanas en tu provincia'
        })
        return {
          ...state,
          fields: filterByProv,
        };
      } else {
        return {
          ...state,
          fields: filterByDist,
        };
      }

    case UPDATE_FIELD_RESERVATIONS:
      if (!payload) {
        return {
          ...state,
          reservations: {
            ...state.reservations,
            array: [],
            complex: {},
            id: "",
            name: "",
            type: "",
            cost: "",
          },
        };
      } else {
        return {
          ...state,
          reservations: {
            ...state.reservations,
            array: payload.reservations,
            complex: payload.field[0].complex,
            id: payload.field[0].id,
            name: payload.field[0].name,
            type: payload.field[0].fieldtype.type,
            cost: payload.field[0].cost,
          },
        };
      }

    case RESET_LOCATION:
      return {
        ...state,
        location: {
          results: [],
          rdistrict: [],
          reservas: [],
          canchas: [],
          search: "",
          searchd: "",
          province: "",
          district: "",
          flag: true,
        },
      };

    case ARG_API_FLAG:
      return {
        ...state,
        location: {
          ...state.location,
          flag: false,
        },
      };

    case UPDATE_RESERVATION_DATA:
      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: payload,
        },
      };

    case G_REGISTRATION:
      return {
        ...state,
        isLogged: true,
        googleLogin: payload,
      };

    case LOGOUT_G:
      return {
        ...state,
        isLogged: false,
        googleLogin: payload,
      };

    case GET_COMPLEX_ALL:
      return {
        ...state,
        complexAll: payload,
        complexAll2: payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        userUpdate: payload,
        userInfo: { ...state.userInfo, userInfo: payload },
      };

    case GET_FIELDS_BY_COMPLEX:
      return {
        ...state,
        fieldsByComplex: payload,
      };

    case DELETE_USER:
      return {
        ...state,
        userDeleted: payload,
      };

    case DELETE_RESERVATION:
      return {
        ...state,
        reservationDelete: payload,
      };

    case UPDATE_COMPLEX:
      return {
        ...state,
        complexUpdate: payload,
      };
    case DELETE_COMPLEX:
      return {
        ...state,
        complexDelete: payload,
      };
    case FAIL_MAIL:
      return {
        ...state,
      };

    case ACTIVE_SESSION_GOOGLE:
      return {
        ...state,
        activeSessionG: payload,
      };

    case GET_BY_NAME:
      const FilterByName = state.complexAll2.filter(c => c.name.toLowerCase().includes(payload.toLowerCase()));
      return {
        ...state,
        complexAll: FilterByName
      }

      case GET_FIELD_BY_NAME:
        const FilterFieldByName = state.fields2.filter(c => c.complex.name.toLowerCase().includes(payload.toLowerCase()));
        return {
          ...state,
          fields: FilterFieldByName,
  
        }

    case GET_USER_ALL:
      return {
        ...state,
        users: payload,
      };

    case POST_REVIEW:
      return {
        ...state,
      };

    case GET_REVIEWS:
      // const filterReviewById = state.reviews.filter(r => r.complexId === payload)
      // console.log("get Review filtrado reducer", filterReviewById)
      return {
        ...state,
        reviews: payload,
      };

    case UPDATE_OWNER_COMPLEXES:
      return { ...state };

    case USER_MESSAGE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
export default rootReducer;