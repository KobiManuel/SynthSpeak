import React from "react";
import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className=" w-full !flex flex-row justify-between items-center mb-10 pt-3">
        <img src={logo} alt="logo" className=" w-40 object-cover" />
        <button className="black_btn" type="button">
          Twitter
        </button>
      </nav>
      <h1 className="head_text">
        Effortless Article Summaries <br className=" max-md:hidden" />
        <span className="orange_gradient"> with SynthSpeak</span>
      </h1>
      <h2 className="desc">
        Get article summaries with SynthSpeak, anarticle summarization tool that utilizes OpenAI GPT-4 to condense
        extensive articles into brief and comprehensible summaries, making
        reading a breeze.
      </h2>
    </header>
  );
};

export default Hero;
