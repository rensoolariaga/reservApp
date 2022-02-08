import { useEffect, useRef, useState } from "react";

export function useDetectClickOut(initState) {
  const triggerRef = useRef(null); // optional
  const nodeRef = useRef(null); // required

  const [show, setShow] = useState(initState);
  const handleClickOutside = (event) => {
    //if click is on trigger element, toggle modal
    if (triggerRef.current && triggerRef.current.contains(event.target)) {
      return setShow(!show);
    }

    //if modal is open and click is outside modal, close it
    if (nodeRef.current && !nodeRef.current.contains(event.target)) {
      return setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    triggerRef,
    nodeRef,
    show,
    setShow,
  };
}

export function ReviewChecker({ date, hour, duration }) {
  let cDate = new Date();
  const cObj = {
    year: cDate.getFullYear(),
    month: cDate.getMonth() + 1,
    day: cDate.getDate(),
    hour: cDate.getHours(),
    minute: cDate.getMinutes(),
  };
  let dSplit = [date.split("-")[0], date.split("-")[1], date.split("-")[2]];

  let rObj = {
    date: date,
    hour: parseInt(hour) + Math.floor(duration / 2),
    half: duration % 2 === 1 ? 30 : 0,
    year: parseInt(dSplit[0]),
    month: parseInt(dSplit[1]),
    day: parseInt(dSplit[2]),
  };

  if (rObj.year < cObj.year) return true;
  if (rObj.year > cObj.year) return false;
  if (rObj.month < cObj.month) return true;
  if (rObj.month > cObj.month) return false;
  if (rObj.day < cObj.day) return true;
  if (rObj.day > cObj.day) return false;
  if (rObj.hour < cObj.hour) return true;
  if (rObj.hour > cObj.hour) return false;
  if (rObj.half <= cObj.minute) return true;
  else return false;
}