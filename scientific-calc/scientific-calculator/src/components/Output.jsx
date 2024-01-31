import React, { useContext, useEffect, useRef } from "react";
import { ExpressionContext } from "../ExpressionContext";
import Handle_click from "../utils/Handle_click";

const Output = () => {
  const { setExpression, expression } = useContext(ExpressionContext);
  const output = useRef();

  useEffect(() => {
    output.current.addEventListener("input", function (event) {
      let inputValue = event.target.value;

      event.target.value = inputValue.replace(/[^0-9+\-^√*/%.e()log]/g, "");

      let selectionStart = event.target.selectionStart;
      let selectionEnd = event.target.selectionEnd;
      setExpression(event.target.value);
      event.target.setSelectionRange(selectionStart, selectionEnd);
    });
    output.current.addEventListener("click", function (event) {
      output.current.setSelectionRange(output.current.value.length, output.current.value.length);
    });
    output.current.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
    });
    document.addEventListener('keydown', function (event) {
      output.current.setSelectionRange(output.current.value.length, output.current.value.length);
      output.current.focus();
  })

  document.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        setExpression(
          Handle_click("show", expression)
        )
      }
  });
  });

  return (
    <div className="" id="result">
      <input
        ref={output}
        type="text"
        name="result"
        id="resultbar"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        className="w-full h-14 mb-4 border border-none rounded-md outline-none bg-sky-200 text-end caret-transparent overflow-scroll text-2xl"
      />
    </div>
  );
};

export default Output;
