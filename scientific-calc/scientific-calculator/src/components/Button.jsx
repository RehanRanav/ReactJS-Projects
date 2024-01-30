import React, { useState } from "react";

const Button = ({ name, Click, flag, listbtn }) => {
  const btnClasses = `h-10 border-none ${
    flag ? "bg-neutral-400" : "bg-zinc-300"
  } 
  ${
    listbtn === true ? "hidden " : ""
  }text-black p-2 m-1 text-xs rounded text-center box-border cursor-pointer hover:bg-slate-500`;

  return (
      <button
        className={btnClasses}
        id="btn"
        onClick={Click}
        dangerouslySetInnerHTML={{ __html: name }}
      />
  );
};

export default Button;
