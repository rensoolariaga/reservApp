import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SignUp from "../signUp/SignUp.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions";
import logoApp from "../landingPage/logoRecortado.png";
import r from "../landingPage/LandingPage.module.css";

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    if (isLogged) history.push("/home");
    dispatch(getUserInfo());
  }, [dispatch, isLogged, history]);

  return (
    <div className={r.body}>
      <div className={r.groupLeftBg}>
        <div className={r.blurbox}>
          <h3 className={r.slogan}>Una cancha en tu bolsillo</h3>
          <div className={r.containerLeft}>
            <img src={logoApp} alt="LogoApp" className={r.imageLogo} />
          </div>
        </div>
      </div>
      <div className={r.groupRightBg}>
        <SignUp />
      </div>
    </div>
  );
}

export default LandingPage;