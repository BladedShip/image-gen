"use client";

import React, { useState } from "react";

type Props = {};

function PromptInput({}: Props) {
  const [input, setInput] = useState("");
  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-black/5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the image you want to generate"
          className="flex-1 p-4 outline-none rounded-md bg-[#2c2c2c] resize-none h-16"
        />
        <button
          type="submit"
          disabled={!input}
          className={`p-4 ${input ? "bg-[#dbbadd] text-[#2c2c2c] transition-colors duration-200" : "text-gray-400 cursor-not-allowed "}`}
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-[#dbbadd] text-[#2c2c2c] transition-colors duration-200 font-bold disabled:text-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-[#2c2c2c] text-[#dbbadd] transition-colors duration-200 font-bold disabled:text-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
