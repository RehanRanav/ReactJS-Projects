import React, { useContext, useEffect, useState } from "react";
import Output from "./Output";
import Button from "./Button";
import memory_btn_json from "./memory_btn_data.json";
import btn_json from "./btn_data.json";
import Memory_functions from "../utils/Memory_functions";
import { ExpressionContext } from "../ExpressionContext";
import Handle_click from "../utils/Handle_click";

const Calc = () => {
  const [list, setList] = useState(true);
  const [trigonometryflag, setTrigonometryflag] = useState(false);
  const [functionflag, setFunctionflag] = useState(false);
  const [inverseflag, setInverseflag] = useState(false);
  const [hypflag, setHypflag] = useState(false);
  const [deg_rad_fag, setDeg_rad_fag] = useState(false);
  const { setExpression, expression } = useContext(ExpressionContext);

  const line1 = btn_json.slice(0, 4);
  const line2 = btn_json.slice(4, 8);
  const line3 = btn_json.slice(8, 12);
  const line4 = btn_json.slice(12, 16);
  const line5 = btn_json.slice(16, 20);
  const line6 = btn_json.slice(20, 24);
  const line7 = btn_json.slice(24, 28);

  function change_list() {
    console.log(!list);
    setList(!list);
  }
  function open_trigonometry() {
    setTrigonometryflag(!trigonometryflag);
    setFunctionflag(false);
  }
  function open_functions() {
    setFunctionflag(!functionflag);
    setTrigonometryflag(false);
  }
  function trigonometry_inverse() {
    setInverseflag(!inverseflag);
  }
  function trigonometry_hyp() {
    setHypflag(!hypflag);
  }

  const print_value = (val) => {
    val = expression + val;
    setExpression(val);
  };

  const find_degree_radian = () => {
    let result = expression;

    setDeg_rad_fag(!deg_rad_fag);

    try {
      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }
      if (deg_rad_fag) {
        let radian = (Number(result) * Math.PI) / 180;
        setExpression(radian);
      } else {
        let degree = (Number(result) * 180) / Math.PI;
        setExpression(degree);
      }
    } catch (e) {
      setExpression(`ERROR!`);
    }
  };

  //return statement
  return (
    <div
      className="p-1 items-center border border-solid border-1 border-blue-400 bg-slate-100 w-fit rounded"
      id="calculator"
    >
      <Output output={expression} />
      <div className="grid grid-cols-5" id="btn-container">
        <Button
          name={`${deg_rad_fag ? "DEG" : "RAD"}`}
          Click={find_degree_radian}
        />
        <Button name="F-E" Click={() => print_value(`+e0`)} />
      </div>
      <div className="grid grid-cols-5" id="btn-container">
        {memory_btn_json.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(Memory_functions(btn.Click_event, expression))
              }
            />
          );
        })}
      </div>

      <div
        className="flex flex-row justify-around items-center"
        id="option-container"
      >
        <div
          className="flex justify-center items-center gap-x-2 p-2 m-1 cursor-pointer relative"
          id="trigonometry"
        >
          <div
            onClick={open_trigonometry}
            className="flex justify-center items-center gap-1"
          >
            <span>⊿</span>
            <span>Trigonometry</span>
            <div className="w-0 h-0 border-x-4 border-solid border-transparent border-t-4 border-t-black"></div>
          </div>

          <div
            className={`${
              trigonometryflag ? "grid" : "hidden"
            } grid-cols-2 bg-slate-200 rounded absolute top-10 right-0 -left-2.5 z-10 p-1 border-2 border-solid border-slate-200 w-40`}
          >
            <Button name="2<sup>nd</sup>" Click={trigonometry_inverse} />
            <Button name="hyp" Click={trigonometry_hyp} />
            <Button
              name={`${
                inverseflag
                  ? hypflag
                    ? "Sinh<sup>-1</sup>"
                    : "Sin<sup>-1</sup>"
                  : hypflag
                  ? "Sinh"
                  : "Sin"
              }`}
            />
            <Button
              name={`${
                inverseflag
                  ? hypflag
                    ? "Csch<sup>-1</sup>"
                    : "Csc<sup>-1</sup>"
                  : hypflag
                  ? "Csch"
                  : "Csc"
              }`}
            />
            <Button
              name={`${
                inverseflag
                  ? hypflag
                    ? "Cosh<sup>-1</sup>"
                    : "Cos<sup>-1</sup>"
                  : hypflag
                  ? "Cosh"
                  : "Cos"
              }`}
            />
            <Button
              name={`${
                inverseflag
                  ? hypflag
                    ? "Sech<sup>-1</sup>"
                    : "Sec<sup>-1</sup>"
                  : hypflag
                  ? "Sech"
                  : "Sec"
              }`}
            />
            <Button
              name={`${
                inverseflag
                  ? hypflag
                    ? "Tanh<sup>-1</sup>"
                    : "Tan<sup>-1</sup>"
                  : hypflag
                  ? "Tanh"
                  : "Tan"
              }`}
            />
            <Button
              name={`${
                inverseflag
                  ? hypflag
                    ? "Coth<sup>-1</sup>"
                    : "Cot<sup>-1</sup>"
                  : hypflag
                  ? "Coth"
                  : "Cot"
              }`}
            />
          </div>
        </div>

        <div
          className="flex justify-center items-center gap-x-2 p-2 m-1 cursor-pointer relative"
          id="functions"
        >
          <div
            onClick={open_functions}
            className="flex justify-center items-center gap-1"
          >
            <i>f</i>
            <span>functions</span>
            <div className="w-0 h-0 border-x-4 border-solid border-transparent border-t-4 border-t-black"></div>
          </div>

          <div
            className={`${
              functionflag ? "grid" : "hidden"
            } grid-cols-2 bg-slate-200 rounded absolute top-10 -right-3 z-10 p-1 border-2 border-solid border-slate-200 w-28`}
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

        {line1.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
              flag={Boolean(btn.flag)}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button name="<i>x</i><sup>2</sup>" listbtn={!list} />
        <Button name="<i>x</i><sup>3</sup>" listbtn={list} />

        {line2.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
            />
          );
        })}
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button name="√x" listbtn={!list} />
        <Button name="<sup>3</sup>√x" listbtn={list} />

        {line3.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
            />
          );
        })}
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button
          name="x<sup>y</sup>"
          listbtn={!list}
          Click={() => print_value(`^`)}
        />
        <Button
          name="<sup>y</sup>√x"
          listbtn={list}
          Click={() => print_value(`√`)}
        />

        {line4.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
            />
          );
        })}
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button name="10<sup>x</sup>" listbtn={!list} />
        <Button name="2<sup>x</sup>" listbtn={list} />

        {line5.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
            />
          );
        })}
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button name="log" listbtn={!list} />
        <Button name="log<sub>y</sub>x" listbtn={list} />

        {line6.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
            />
          );
        })}
      </div>

      <div className="grid grid-cols-5" id="btn-container">
        <Button name="ln" listbtn={!list} />
        <Button name="e<sup>x</sup>" listbtn={list} />

        {line7.map((btn, index) => {
          return (
            <Button
              key={index}
              name={btn.name}
              Click={() =>
                setExpression(
                  Handle_click(btn.Click_event, expression, btn.value)
                )
              }
              flag={Boolean(btn.flag)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calc;
