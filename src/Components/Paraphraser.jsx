import React, { useState, useEffect, useRef } from "react";
import { copy, tick } from "../assets";
import { useLazyParaphraseTextQuery } from "../provider/article";
import Loader from "./Loader";
const Paraphraser = () => {
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState({
    text: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [activeMode, setActiveMode] = useState(0);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
  };

  const [paraphraseText, { error, isFetching }] = useLazyParaphraseTextQuery();

  const paraphrasedTextRef = useRef(null);

  const buttons = ["General", "Casual", "Formal", "Long", "Short"];

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("paraphrasedText")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (count === 0) {
      setArticle({
        ...article,
        summary: "",
      });
    } else {
      setArticle({
        ...article,
        summary: "",
      });
      setChangesMade(true);
    }
  }, [count]);

  const style = buttons[activeMode].toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await paraphraseText({ text: article.text, style });

    if (data?.suggestions) {
      setChangesMade(false);
      setSuggestions(data.suggestions);
      const newArticle = {
        ...article,
        summary: data.suggestions[0]?.text,
      };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem(
        "paraphrasedText",
        JSON.stringify(updatedAllArticles)
      );
    }
  };
  const handleDelete = () => {
    setArticle({
      ...article,
      text: "",
      summary: "",
    });
    setCount(0);
  };

  const handleRephrase = () => {
    setIsLoading(true);
    setSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
  };

  useEffect(() => {
    const nextSuggestion = suggestions[suggestionIndex];
    if (nextSuggestion) {
      setArticle({ ...article, summary: nextSuggestion.text });
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      const updatedAllArticles = [
        { ...article, summary: nextSuggestion.text },
        ...allArticles.slice(1),
      ];
      localStorage.setItem(
        "paraphrasedText",
        JSON.stringify(updatedAllArticles)
      );
      setChangesMade(false);
    }

    return () => {};
  }, [suggestionIndex]);

  const handleCopyArticle = (event) => {
    const button = event.currentTarget;
    const div = button.parentNode;
    const text = div.querySelector(".paraphrased-text").textContent;
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleModeClick = (index) => {
    setActiveMode(index);
  };

  const handleInput = (e) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim().split(/\s+/).length || 0;
    const charCount = inputText.length;

    if (charCount <= 498) {
      setArticle({
        ...article,
        text: inputText,
      });
      setCount(wordCount);
    } else {
      setArticle({
        ...article,
        text: "⚠ Cannot render text, max character limit (500) exceeded",
      });
    }
    if (wordCount === 1) {
      setCount(0);
    }
  };

  return (
    <div className="px-6 pb-6 relative overflow-x-hidden">
      <div
        onClick={toggleDrawer}
        className={
          isDrawerOpen
            ? "absolute left-0 bg-transparent opacity-[.7] dark:bg-opacity-80 inset-0 z-20 w-[100%] ease-in-out duration-500"
            : "absolute bg-transparent opacity-[.7] dark:bg-opacity-80 inset-0 z-20 w-[100%] left-[-100%]"
        }
      ></div>
      <div
        className={
          isDrawerOpen
            ? " drawer absolute p-2 right-0 top-0 w-[306px] max-[420px]:w-[200px]  h-full border-r border-r-slate-200 bg-gray-50 ease-in-out duration-500 overflow-y-auto z-20"
            : "right-[-100%] p-2 absolute top-0 w-[306px] max-[420px]:w-[200px] h-full border-r border-r-slate-200 bg-gray-50 overflow-y-auto z-20"
        }
      >
        <h2>History</h2>
        <ul className="flex flex-col gap-2">
          {allArticles.length === 0 ? (
            <li className="loader-svg flex-1 text-blue-700 text-sm">
              Nothing to see here yet
            </li>
          ) : (
            allArticles.map((article, index) => (
              <li
                className="link_card"
                key={index}
                onClick={() => {
                  setArticle(article);
                  setIsDrawerOpen(false);
                  setChangesMade(true);
                }}
              >
                <p className="flex-1 font-poppins text-blue-700 font-medium text-sm truncate">
                  {article.text}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
      <div class="group relative">
        <button
          onClick={toggleDrawer}
          type="button"
          class="copy_btn !bg-black/5 !w-[30px] !h-[30px] text-[14px] absolute top-2 z-10 right-1"
        >
          ↺
        </button>
        <span class="hidden group-hover:inline-block absolute top-0 z-20 right-[3%] p-1 text-[12px]">
          History
        </span>
      </div>
      <span className="p-2 grid-btns">
        {" "}
        {buttons.map((label, index) => (
          <button
            key={index}
            className={`border border-gray-400 p-1 min-w-[100px] max-w-[100px] rounded-[100px] max-[420px]:max-w-[70px]  max-[420px]:min-w-[70px]  hover:bg-black hover:text-white  max-[772px]:self-center max-[772px]:justify-self-center ${
              index === activeMode ? "bg-black text-white" : "bg-transparent"
            }`}
            onClick={() => handleModeClick(index)}
            style={{
              transition: "background-color 0.2s ease-in-out",
            }}
          >
            {label}
          </button>
        ))}
      </span>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-6 max-[780px]:flex-col max-[780px]:items-center"
      >
        <div className="relative border border-gray-300 w-[50%] pt-6 px-2 pb-2 bg-white max-[780px]:w-[100%]">
          <span
            onClick={handleDelete}
            className="copy_btn absolute right-1 top-[1px] bg-white/5 !w-[30px] !h-[30px] text-red-500 font-semibold"
          >
            🗑
          </span>
          <textarea
            value={article.text}
            onChange={handleInput}
            required
            placeholder="Enter or paste text here to paraphrase (500 character limit)"
            className={`w-full h-72 font-serif outline-none border-none`}
          />
          <div className="flex items-center justify-between max-[349px]:flex-col max-[349px]:gap-4">
            <span className="flex w-fit px-2 max-h-[24px] rounded-[26px] border border-gray-300">
              <p className=" text-[14px]">
                Word Count: <span> {count}</span>{" "}
              </p>
            </span>
            {article.summary.length < 1 || changesMade ? (
              <button
                type="submit"
                className="bg-[#9747ff] text-base flex justify-center items-center text-white font-medium px-4 rounded-[26px] py-[2px] hover:bg-[#3f1e6b]"
              >
                Paraphrase ⟳
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRephrase}
                className="bg-[#9747ff] text-base flex justify-center items-center text-white font-medium px-4 rounded-[26px] py-[2px] hover:bg-[#3f1e6b]"
              >
                Rephrase ⟳
              </button>
            )}
          </div>
        </div>
        <div className="border border-gray-300 w-[50%] pt-6 px-2 bg-white max-[780px]:w-[100%]">
          <div className=" relative h-[18.2rem] max-w-full overflow-y-auto">
            {isFetching || isLoading ? (
              <div className="loader-svg">
                <Loader size={70} />
              </div>
            ) : error ? (
              <textarea
                value={"Sorry an error occurred. please try again"}
                readOnly
                placeholder="Enter or paste text here to paraphrase"
                className="paraphrased_text w-full h-72 font-serif outline-none border-none text-gray-600"
              />
            ) : (
              //   <p className="font-poppins font-bold text-black text-center">
              //     Houston, we have a problem...
              //     <br />
              //     <span className="font-poppins font-normal text-gray-700">
              //       {error?.data?.error}
              //     </span>
              //   </p>
              <p
                ref={paraphrasedTextRef}
                className="paraphrased-text font-serif whitespace-pre-wrap"
              >
                {article.summary ? (
                  article.summary
                ) : (
                  <span className=" font-serif text-gray-400">
                    Paraphrased text results will appear here
                  </span>
                )}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center w-fit px-2  rounded-[26px] max-h-[24px] border border-gray-300">
              <p className=" text-[14px]">
                Word Count:{" "}
                <span>
                  {article.summary ? article.summary.split(/\s+/).length : 0}
                </span>{" "}
              </p>
            </span>
            <button
              type="button"
              className="copy_btn bg-white/5 !w-[35px] !h-[35px]"
              onClick={() => handleCopyArticle(event)}
            >
              {copied && <span className="copy_float">Copied!</span>}
              <img src={copied ? tick : copy} alt="copy text" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Paraphraser;
