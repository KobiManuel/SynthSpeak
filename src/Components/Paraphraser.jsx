import React, { useState } from "react";
import { copy } from "../assets";

const Paraphraser = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <form className="flex justify-between gap-6">
        <div className="relative border border-gray-300 w-[50%] pt-6 px-2 pb-2 bg-white">
          <span className="copy_btn absolute right-1 top-1 bg-white/5 !w-[30px] !h-[30px] text-red-500 font-semibold">
            🗑
          </span>
          <textarea
            placeholder="Enter or paste text here to paraphrase"
            className="w-full h-72 font-serif outline-none border-none"
          />
          <div className="flex justify-between">
            <span className="flex w-fit px-2 max-h-[24px] rounded-[26px] border border-gray-300">
              <p className=" text-[14px]">
                Word Count: <span> {count}</span>{" "}
              </p>
            </span>
            <button
              type="submit"
              className="bg-[#9747ff]  text-base flex justify-center items-center text-white font-medium px-4 rounded-[26px] py-[2px] hover:bg-[#3f1e6b]"
            >
              Paraphrase ⟳
            </button>
          </div>
        </div>
        <div className="border border-gray-300 w-[50%] pt-6 px-2 bg-white">
          <input
            placeholder="Paraphrased text results will appear here"
            type="text"
            className="w-full h-72 font-serif outline-none border-none placeholder:absolute placeholder:top-1"
            readOnly
          />
          <div className="flex justify-between items-center">
            <span className="flex items-center w-fit px-2  rounded-[26px] max-h-[24px] border border-gray-300">
              <p className=" text-[14px]">
                Word Count: <span>{count}</span>{" "}
              </p>
            </span>
            <button
              type="button"
              className="copy_btn bg-white/5 !w-[35px] !h-[35px]"
            >
              <img src={copy} alt="copy text" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Paraphraser;
