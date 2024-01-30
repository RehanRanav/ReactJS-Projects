import React from "react";

const Output = ({ output }) => {
  return (
    <div className="" id="result">
      <input
        type="text"
        name="result"
        id="resultbar"
        defaultValue={output}
        className="w-full h-14 mb-4 border border-none rounded-md outline-none bg-sky-200 text-end caret-transparent overflow-scroll text-2xl"
      />
    </div>
  );
};

export default Output;
