import React from "react";

const DateComponent = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.toLocaleString("default", { month: "short" }); // Using short month names
  const year = today.getFullYear();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      <div className="font-mono flex justify-start gap-1 px-28 pt-2">
        <span className="text-5xl">{date}</span>
        <div className="flex flex-col text-base justify-start items-start">
          <div>{month}</div>
          <div>{year}</div>
        </div>
      </div>
      <div className="flex justify-start text-2xl px-28">{day}</div>
    </>
  );
};

export default DateComponent;
