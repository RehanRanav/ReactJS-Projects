import React, { useEffect, useState } from "react";
import Output from "./Output";
import Button from "./Button";

const Calc = () => {
  const [list, setList] = useState(true);
  const [trigonometryflag, setTrigonometryflag] = useState(false);
  const [functionflag, setFunctionflag] = useState(false);
  const [inverseflag, setInverseflag] = useState(false);

  function change_list() {
    console.log(!list);
    setList(!list);
  }
  function open_trigonometry(event) {
      setTrigonometryflag(!trigonometryflag);
      setFunctionflag(false);
      event.stopPropagation();
  }
  function open_functions() {
    setFunctionflag(!functionflag);
    setTrigonometryflag(false);
  }
  function trigonometry_inverse() {
    setInverseflag(true);
  }

  return (
    <div
      className="p-1 items-center border border-solid border-1 border-blue-400 bg-slate-100 w-fit rounded"
      id="calculator"
    >
      <Output />
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="DEG" />
        <Button name="RAD" />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="MC" />
        <Button name="MR" />
        <Button name="M+" />
        <Button name="M-" />
        <Button name="MS" />
      </div>

      <div
        className="flex flex-row justify-around items-center"
        id="option-container"
      >
        <div
          className="flex justify-center items-center gap-x-2 p-2 m-1 cursor-pointer relative"
          id="trigonometry"
          onClick={(e)=> open_trigonometry(e)}
        >
          <span>⊿</span>
          <span>Trigonometry</span>
          <div className="w-0 h-0 border-x-4 border-solid border-transparent border-t-4 border-t-black"></div>

          <div
            className={`${
              trigonometryflag ? "grid" : "hidden"
            } grid-cols-4 bg-slate-200 rounded absolute top-10 right-0 -left-2.5 z-10 p-1 border-2 border-solid border-slate-200 w-48`}
          >
            <Button name="2<sup>nd</sup>" onClick={trigonometry_inverse} />
            <Button name="hyp" />
            <Button name={`${inverseflag ? "Sin<sup>-1<sup>" : "Sin"}`} />
            <Button name="Csc" />
            <Button name="Cos" />
            <Button name="Sec" />
            <Button name="Tan" />
            <Button name="Cot" />
          </div>
        </div>

        <div
          className="flex justify-center items-center gap-x-2 p-2 m-1 cursor-pointer relative"
          id="functions"
          onClick={open_functions}
        >
          <i>f</i>
          <span>functions</span>
          <div className="w-0 h-0 border-x-4 border-solid border-transparent border-t-4 border-t-black"></div>

          <div
            className={`${
              functionflag ? "grid" : "hidden"
            } grid-cols-2 bg-slate-200 rounded absolute top-10 right-0 -left-2.5 z-10 p-1 border-2 border-solid border-slate-200 w-32`}
          >
            <Button name="|x|" />
            <Button name="⌊x⌋" />
            <Button name="⌈x⌉" />
            <Button name="RAN" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button name="2<sup>nd</sup>" Click={change_list} />
        <Button name="&Pi;" />
        <Button name="e" />
        <Button name="C" flag={true} />
        <Button name="&#8592;" flag={true} />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="<i>x</i><sup>2</sup>" listbtn={!list} />
        <Button name="<i>x</i><sup>3</sup>" listbtn={list} />
        <Button name="<sup>1</sup>/<sub>x</sub>" />
        <Button name="|x|" />
        <Button name="exp" />
        <Button name="mod" />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="√x" listbtn={!list} />
        <Button name="<sup>3</sup>√x" listbtn={list} />
        <Button name="(" />
        <Button name=")" />
        <Button name="n!" />
        <Button name="&#xF7;" />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="x<sup>y</sup>" listbtn={!list} />
        <Button name="<sup>y</sup>√x" listbtn={list} />
        <Button name="7" />
        <Button name="8" />
        <Button name="9" />
        <Button name="x" />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="10<sup>x</sup>" listbtn={!list} />
        <Button name="2<sup>x</sup>" listbtn={list} />
        <Button name="4" />
        <Button name="5" />
        <Button name="6" />
        <Button name="-" />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="log" listbtn={!list} />
        <Button name="log<sub>y</sub>x" listbtn={list} />
        <Button name="1" />
        <Button name="2" />
        <Button name="3" />
        <Button name="+" />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        <Button name="ln" listbtn={!list} />
        <Button name="e<sup>x</sup>" listbtn={list} />
        <Button name="<sup>+</sup>/<sub>-</sub>" />
        <Button name="0" />
        <Button name="." />
        <Button name="=" flag={true} />
      </div>
    </div>
  );
};

export default Calc;
