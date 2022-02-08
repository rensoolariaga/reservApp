import React from "react";

import { IoIosFootball } from "react-icons/io"
import s from "./cardreview.module.css";

export default function CardReview({ id, rating, comment, date }) {

    let r = 0; let a = 0; let t = 0; let i = 0; let n = 0;
    if (rating === 1) {
        r = <IoIosFootball />;
        a = null;
        t = null;
        i = null;
        n = null;
    }
    if (rating === 2) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = null;
        i = null;
        n = null;
    }
    if (rating === 3) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = <IoIosFootball />;
        i = null;
        n = null;
    }
    if (rating === 4) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = <IoIosFootball />;
        i = <IoIosFootball />;
        n = null;
    }
    if (rating === 5) {
        r = <IoIosFootball />;
        a = <IoIosFootball />;
        t = <IoIosFootball />;
        i = <IoIosFootball />;
        n = <IoIosFootball />;
    }

    return (
        <div className={s.card}>
            <div className="shadow-lg ring-2 ring-white ring-opacity-10">
                <h1 className="text-2xl  py-6 inline-block">{r}</h1>
                <h1 className="text-2xl pl-10 py-6 inline-block">{a}</h1>
                <h1 className="text-2xl pl-10 py-6 inline-block">{t}</h1>
                <h1 className="text-2xl pl-10 py-6 inline-block">{i}</h1>
                <h1 className="text-2xl pl-10 py-6 inline-block">{n}</h1>
                <h3 className="text-m pb-6"> "{comment}"</h3>
                <h5 className="text-lg pb-6">{date}</h5>
            </div>
        </div>
    )
}