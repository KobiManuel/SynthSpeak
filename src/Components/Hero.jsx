import React from "react";
import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className=" w-full !flex flex-row justify-between items-center mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button className="black_btn" type="button">
          Twitter
        </button>
      </nav>
      <h1 className="head_text">
        Summarize articles with <br className=" max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with SynthSpeak, an open source article summarizer
        that transforms lengthy articlees into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
