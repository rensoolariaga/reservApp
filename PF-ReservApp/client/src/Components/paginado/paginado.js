import React from "react";
import j from "../paginado/paginado.module.css";

export default function Paginado({ fieldsPerPage, allFields, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allFields / fieldsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <button
            onClick={() => paginado(number)}
            key={number}
            className={j.button}
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
}