import React, { useContext, useEffect, useRef, useState } from "react";
import Output from "./Output";
import Button from "./Button";
import memory_btn_json from "../json/memory_btn_data.json";
import btn_json from "../json/btn_data.json";
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
  const trigonometry_menuref = useRef();
  const functions_menuref = useRef();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!trigonometry_menuref.current.contains(e.target)) {
        setTrigonometryflag(false);
      }
      if (!functions_menuref.current.contains(e.target)) {
        setFunctionflag(false);
      }
    });
  });

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

  const find_power = (val) => {
    try {
      let result = eval(expression);
      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }
      result = parseFloat(result);
      let ans = Math.pow(result, val);
      setExpression(ans.toString());
    } catch (e) {
      setExpression(`ERROR!`);
    }
  };

  const find_base = (val) => {
    try {
      let result = eval(expression);
      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }
      let ans = Math.pow(val, Number(result));
      setExpression(ans);
    } catch (e) {
      setExpression(`ERROR!`);
    }
  };

  const find_abs = () => {
    try {
      let result = eval(expression) || "";
      let ans = parseFloat(result);
      if (result) {
        ans = Math.abs(ans);
        setExpression(ans.toString());
      }
    } catch (e) {
      setExpression(`ERROR!`);
    }
  };

  const find_random = () => {
    setExpression(Math.random());
  };

  let find_floor = () => {
    try {
      let result = expression;
      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }
      setExpression(Math.floor(result));
    } catch (e) {
      setExpression(`ERROR!`);
    }
  };

  let find_ceil = () => {
    try {
      let result = expression;
      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }
      setExpression(Math.ceil(result));
    } catch (e) {
      setExpression(`ERROR!`);
    }
  };

  const trigonometry_operation = (val) => {
    try {
      let result = parseFloat(expression);

      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }

      if (inverseflag && hypflag) {
        switch (val) {
          case "sin":
            {
              let ans = Math.asinh(result);
              setExpression(ans);
            }
            break;
          case "cos":
            {
              let ans = Math.acosh(result);
              setExpression(ans);
            }
            break;
          case "tan":
            {
              let ans = Math.atanh(result);
              setExpression(ans);
            }
            break;
          case "csc":
            {
              let ans = 1 / Math.asinh(result);
              setExpression(ans);
            }
            break;
          case "sec":
            {
              let ans = 1 / Math.acosh(result);
              setExpression(ans);
            }
            break;
          case "cot":
            {
              let ans = 1 / Math.atanh(result);
              setExpression(ans);
            }
            break;
          default:
            setExpression(expression);
        }
      } else if (inverseflag) {
        switch (val) {
          case "sin":
            {
              let ans = Math.asin(result);
              setExpression(ans);
            }
            break;
          case "cos":
            {
              let ans = Math.acos(result);
              setExpression(ans);
            }
            break;
          case "tan":
            {
              let ans = Math.atan(result);
              setExpression(ans);
            }
            break;
          case "csc":
            {
              let ans = 1 / Math.asin(result);
              setExpression(ans);
            }
            break;
          case "sec":
            {
              let ans = 1 / Math.acos(result);
              setExpression(ans);
            }
            break;
          case "cot":
            {
              let ans = 1 / Math.atan(result);
              setExpression(ans);
            }
            break;
          default:
            setExpression(expression);
        }
      } else if (hypflag) {
        switch (val) {
          case "sin":
            {
              let ans = Math.sinh(result);
              setExpression(ans);
            }
            break;
          case "cos":
            {
              let ans = Math.cosh(result);
              setExpression(ans);
            }
            break;
          case "tan":
            {
              let ans = Math.tanh(result);
              setExpression(ans);
            }
            break;
          case "csc":
            {
              let ans = 1 / Math.sinh(result);
              setExpression(ans);
            }
            break;
          case "sec":
            {
              let ans = 1 / Math.cosh(result);
              setExpression(ans);
            }
            break;
          case "cot":
            {
              let ans = 1 / Math.tanh(result);
              setExpression(ans);
            }
            break;
          default:
            setExpression(expression);
        }
      } else {
        switch (val) {
          case "sin":
            {
              let ans = Math.sin(result);
              setExpression(ans);
            }
            break;
          case "cos":
            {
              let ans = Math.cos(result);
              setExpression(ans);
            }
            break;
          case "tan":
            {
              let ans = Math.tan(result);
              setExpression(ans);
            }
            break;
          case "csc":
            {
              let ans = 1 / Math.sin(result);
              setExpression(ans);
            }
            break;
          case "sec":
            {
              let ans = 1 / Math.cos(result);
              setExpression(ans);
            }
            break;
          case "cot":
            {
              let ans = 1 / Math.tan(result);
              setExpression(ans);
            }
            break;
          default:
            setExpression(expression);
        }
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
      <Output />
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
          ref={trigonometry_menuref}
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
              Click={() => trigonometry_operation(`sin`)}
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
              Click={() => trigonometry_operation(`csc`)}
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
              Click={() => trigonometry_operation(`cos`)}
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
              Click={() => trigonometry_operation(`sec`)}
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
              Click={() => trigonometry_operation(`tan`)}
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
              Click={() => trigonometry_operation(`cot`)}
            />
          </div>
        </div>

        <div
          className="flex justify-center items-center gap-x-2 p-2 m-1 cursor-pointer relative"
          id="functions"
          ref={functions_menuref}
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
            <Button name="|x|" Click={find_abs} />
            <Button name="⌊x⌋" Click={find_floor} />
            <Button name="⌈x⌉" Click={find_ceil} />
            <Button name="RAN" Click={find_random} />
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
        <Button
          name="<i>x</i><sup>2</sup>"
          listbtn={!list}
          Click={() => find_power(2)}
        />
        <Button
          name="<i>x</i><sup>3</sup>"
          listbtn={list}
          Click={() => find_power(3)}
        />

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
        <Button name="√x" listbtn={!list} Click={() => find_power(1 / 2)} />
        <Button
          name="<sup>3</sup>√x"
          listbtn={list}
          Click={() => find_power(1 / 3)}
        />

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
        <Button
          name="10<sup>x</sup>"
          listbtn={!list}
          Click={() => find_base(10)}
        />
        <Button
          name="2<sup>x</sup>"
          listbtn={list}
          Click={() => find_base(2)}
        />

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
        <Button
          name="log"
          listbtn={!list}
          Click={() => print_value(`log10(`)}
        />
        <Button
          name="log<sub>y</sub>x"
          listbtn={list}
          Click={() => print_value(`ylog`)}
        />

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
        <Button name="ln" listbtn={!list} Click={() => print_value(`ln`)} />
        <Button
          name="e<sup>x</sup>"
          listbtn={list}
          Click={() => print_value(`e^`)}
        />

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
