import React, { useState } from "react";
import { useSelector } from "react-redux";

import ModificarUsuario from "./ModificarUsuario";
import CardReservas from "./CardReservas";
import s from "./panelUser.module.css";

//----------------------------------------------------
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
//----------------------------------------------------

function PanelUser() {
  const User = useSelector((state) => state.userInfo);
  const Reservas = User.reservations;

  const reservas = [];
  const createdArr = [];
  const arrCount = [];
  const repeCount = [];

  for (var i = 0; i < Reservas.length; i++) {
    let CreatedAtSlice = Reservas[i].createdAt.slice(0, 20);
    createdArr.push(CreatedAtSlice);
  }

  let count = 30;
  let repes = 1;

  for (var j = 0; j < createdArr.length; j++) {
    if (createdArr[j] === createdArr[j - 1]) {
      if (j === createdArr.length - 1) {
        count = count + 30;
        repes = repes + 1;
        arrCount.push(count);
        repeCount.push(repes);
      } else {
        count = count + 30;
        repes = repes + 1;
      }
    } else {
      reservas.push(Reservas[j]);
      if (count > 30) {
        arrCount.push(count);
        repeCount.push(repes);
        count = 30;
        repes = 1;
      }
    }
  }

  const [openTab, setOpenTab] = useState(1);

  return (
    <div className={s.parent}>
      <div className={s.div1}>
        <div class="bg-light-blue-500 w-full rounded-lg p-4 justify-start -mt-12 mb-6 list-none shadow-lg-light-blue z-10 undefined">
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
            Mis Reservas
          </TabItem>
        </div>
      </div>

      <div className={s.div2}>
        <TabContent>
          <TabPane active={openTab === 1 ? true : false}>
            <div className="pt-20">
              <ModificarUsuario />
            </div>
          </TabPane>
          <TabPane active={openTab === 2 ? true : false}>
            <div className="pt-20 pl-20">
              {reservas.length !== 0 ? (
                reservas.map((e, i) => {
                  let tiempo = arrCount.shift();
                  let repe = repeCount.shift();
                  return (
                    <div key={"Reservacard" + i} className=" pt-6 pb-40 ">
                      <CardReservas
                        hora={e.startTime}
                        fecha={e.date}
                        idCancha={e.fieldId}
                        idReserva={e.id}
                        tiempo={tiempo}
                        half={e.half}
                        duration={repe}
                      />
                    </div>
                  );
                })
              ) : (
                <h1>No hay reservas</h1>
              )}
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default PanelUser;
