import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import Demo from "./Demo";
import ArticleText from "./ArticleText";
import Paraphraser from "./Paraphraser";

const Hero = () => {

function Tab({ title, active, onClick, className }) {
  const activeClasses = active
    ? "bg-gray-100 text-gray-900"
    : "text-gray-500 hover:text-gray-700";
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer px-3 py-2 rounded-md text-sm font-semibold ${activeClasses} ${className}`}
    >
      {title}
    </li>
  );
}

function Slider({ activeTab, numTabs, onClick }) {
  const [sliderPos, setSliderPos] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const titles = ["Summarize (with link)", "Summarize (text)", "Paraphrase"];

   useEffect(() => {
     const firstChild = document.querySelector(".tab-item:first-child");
     setSliderWidth(firstChild.offsetWidth);
     setSliderPos(firstChild.offsetLeft)
   }, []);

  const handleClick = (index, el) => {
    const tabPos = el.offsetLeft;
     const width = el.clientWidth;
     setSliderWidth(width)
    setSliderPos(tabPos);
    onClick(index);
  };

  return (
    <div className="relative mt-1">
      <div
        className="absolute bottom-0 left-0 h-1 bg-[#9747ff] transition-all duration-700"
        style={{
          width: `${sliderWidth}px`,
          transform: `translateX(${sliderPos}px)`,
        }}
      ></div>
      <ul className="flex gap-4 mx-auto w-fit after:absolute after:block after:content-[''] after:w-full after:h-[1px] after:left-0 after:bottom-0 after:bg-gray-300 ">
        {Array.from(Array(numTabs).keys()).map((index) => (
          <Tab
            key={index}
            title={titles[index]}
            active={index === activeTab}
            onClick={(e) => handleClick(index, e.currentTarget)}
            className="tab-item"
          />
        ))}
      </ul>
    </div>
  );
}


// function Slider({ activeTab, numTabs, onClick }) {
//   const [sliderPos, setSliderPos] = useState(0);
//   const [sliderWidth, setSliderWidth] = useState(0);

//   const handleClick = (index) => {
//     setSliderPos(index * sliderWidth);
//     onClick(index);
//   };

//   return (
//     <div className="relative mt-1">
//       <div
//         className="absolute bottom-0 left-0 h-1 bg-blue-500"
//         style={{
//           width: `${sliderWidth}px`,
//           transform: `translateX(${sliderPos}px)`,
//         }}
//       ></div>
//       <ul
//         className="flex border-b border-gray-200"
//         ref={(el) => setSliderWidth(el?.firstElementChild?.offsetWidth)}
//       >
//         {Array.from(Array(numTabs).keys()).map((index) => (
//           <Tab
//             key={index}
//             title={`Tab ${index + 1}`}
//             active={index === activeTab}
//             onClick={() => handleClick(index)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function Slider({ activeTab, numTabs, onClick }) {
//   const [sliderPos, setSliderPos] = useState(0);

//   const handleClick = (index) => {
//     setSliderPos((index / (numTabs - 1)) * 100);
//     onClick(index);
//   };

//   return (
//     <div className="relative mt-1">
//       <div
//         className="absolute bottom-0 left-0 h-1 bg-blue-500"
//         style={{
//           width: `${100 / numTabs}%`,
//           transform: `translateX(${sliderPos}%)`,
//         }}
//       ></div>
//       <ul className="flex border-b border-gray-200">
//         {Array.from(Array(numTabs).keys()).map((index) => (
//           <Tab
//             key={index}
//             title={`Tab ${index + 1}`}
//             active={index === activeTab}
//             onClick={() => handleClick(index)}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = React.Children.toArray(children);

  return (
    <div className="border border-gray-300 rounded-md">
      <Slider
        activeTab={activeTab}
        numTabs={tabs.length}
        onClick={(index) => setActiveTab(index)}
      />
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`p-6 ${index === activeTab ? "block" : "hidden"}`}
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
}


  // function Tab({ title, active, onClick }) {
  //   const activeClasses = active
  //     ? "bg-gray-100 text-gray-900"
  //     : "text-gray-500 hover:text-gray-700";
  //   return (
  //     <li
  //       onClick={onClick}
  //       className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${activeClasses}`}
  //     >
  //       {title}
  //     </li>
  //   );
  // }

  // function Tabs({ children }) {
  //   const [activeTab, setActiveTab] = useState(0);
  //   const tabs = React.Children.toArray(children);
  //   const sliderRef = useRef(null);

  //   useEffect(() => {
  //     const slider = sliderRef.current;
  //     const activeTabElement = slider.children[activeTab];
  //     const sliderWidth = slider.offsetWidth;
  //     const activeTabLeft = activeTabElement.offsetLeft;
  //     const activeTabWidth = activeTabElement.offsetWidth;
  //     const left = activeTabLeft + activeTabWidth / 2 - sliderWidth / 2;
  //     slider.style.transform = `translateX(-${left}px)`;
  //   }, [activeTab]);

  //   return (
  //     <div className="border border-gray-200 rounded-md relative">
  //       <ul className="flex border-b border-gray-200" ref={sliderRef}>
  //         {tabs.map((tab, index) => (
  //           <Tab
  //             key={index}
  //             title={tab.props.title}
  //             active={index === activeTab}
  //             onClick={() => setActiveTab(index)}
  //           />
  //         ))}
  //       </ul>
  //       <div
  //         className="absolute bottom-0 left-0 h-1 bg-blue-500"
  //         style={{
  //           width: `${100 / tabs.length}%`,
  //           transform: `translateX(${activeTab * 100}%)`,
  //         }}
  //       ></div>
  //       {tabs.map((tab, index) => (
  //         <div
  //           key={index}
  //           className={`p-6 ${index === activeTab ? "block" : "hidden"}`}
  //         >
  //           {tab.props.children}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <>
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
          Get article summaries with SynthSpeak, an article summarization tool
          that utilizes OpenAI GPT-4 to condense extensive articles into brief
          and comprehensible summaries, making reading a breeze.
        </h2>
      </header>
      <div className="container mx-auto py-8">
        <Tabs>
          <div title="Tab 1">
            <Demo />
          </div>
          <div title="Tab 2">
           <ArticleText />
          </div>
          <div title="Tab 3">
           <Paraphraser />
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Hero;
