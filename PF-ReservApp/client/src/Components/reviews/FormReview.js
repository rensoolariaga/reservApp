import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ReactStars from "react-rating-stars-component";
import { IoIosFootball } from "react-icons/io"
import s from "./formreview.module.css";
import { postReview } from "../../redux/actions";

export default function FormReview({ id, duration, hora, fecha }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        complexID: id,
        comment: '',
    });

    const [errors, setErrors] = useState({});

    function validate(input) {
        let errors = {};
        if (!input.comment) {
            errors.complexID = "Deje un comentario sobre su experiencia.";
        }
        return errors;
    }

    function handleChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    const [stars, setStars] = useState(0);
    const ratingChanged = (stars) => { setStars(stars) }
    const [isPosted, setPosted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postReview({ ...input, stars }))
        setInput({
            complexID: "",
            comment: '',
        });
        setPosted(!isPosted)
        history.push('/home/panel')
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="pt-10 pl-72">
                    <ReactStars classNames=""
                        count={5}
                        onChange={ratingChanged}
                        size={48}
                        activeColor="white"
                        char={<IoIosFootball />}
                    />

                </div>

                <div className="pt-5">
                    <textarea className={s.inputDescription} onChange={handleChange} type="text"
                        value={input.comment} name="comment" required="required" placeholder="Puntúa el complejo de 1 a 5 balones y deja un breve comentario sobre tu experiencia . . ." />
                    {errors.comment ? <p>{errors.comment}</p> : null}
                </div>

                <div >
                    <button className={s.btn} type="Submit" disabled={isPosted} >
                        Enviar
                    </button>
                </div>
            </div>

        </form>
    )
}