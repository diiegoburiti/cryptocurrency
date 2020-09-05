import React from "react";
import style from "./Button.module.css";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={style.btn}>
      {children}{" "}
    </button>
  );
};

export default Button;
