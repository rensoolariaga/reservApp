import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "./MenuH";
import logoApp from "../landingPage/logoRecortado.png";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import s from "./nav.module.css";

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={s.background}>
      <nav className="flex justify-between items-center h-20  text-white">
        <Link to="/home" className="pl-7">
          <img src={logoApp} alt="LogoApp" className={s.imageLogo} />
        </Link>
        <div
          className="px-6 cursor-pointer md:hidden"
          onClick={() => setOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div className={s.font}>
          <div className="pr-7 hidden md:block">

            <Link to="/fields" className="px-2">
              <span>Ve por tu cancha</span>
            </Link>

            <Link to="/about" className="px-8">
              <span>Quienes somos</span>
            </Link>

            <DropdownMenu />

          </div>
        </div>
      </nav>

      <div>{isOpen ? <Menu /> : null}</div>
    </div>
  );
}

export default Navbar;