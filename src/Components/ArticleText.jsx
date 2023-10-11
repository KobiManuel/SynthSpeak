import React, { useEffect, useRef, useState } from "react";
import { copy, tick } from "../assets";
import { useLazySummarizeTextQuery } from "../provider/article";
import Loader from "./Loader";
const ArticleText = () => {
  const [article, setArticle] = useState({
    text: "",
    summary: "",
  });
  const [copied, setCopied] = useState("");
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [textTrialLimit, setTextTrialLimit] = useState(false);

  const textInputRef = useRef(null);

  const [summarizeText, { error, isFetching }] = useLazySummarizeTextQuery();

  const textTrialAccessedFromStorage = localStorage.getItem(
    "synthspeakTextTrialAccessed"
  );

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("synthspeakTextArticles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  function autoResize() {
    const form = document.getElementById("form");
    const textarea = document.querySelector("textarea");
    const height = textarea.scrollHeight - textarea.scrollHeight * 0.5;
    console.log(textarea.scrollHeight);
    if (textarea.scrollHeight > 42) {
      textarea.style.height = `${textarea.scrollHeight - height}px`;
    }
    if (textarea.scrollHeight > 42) {
      form.classList.remove("items-center");
    }
  }
  const summarize = async (e) => {
    e.preventDefault();

    if (textTrialAccessedFromStorage) {
      setTextTrialLimit(true);
      textInputRef.current.value = "";
      return;
    }

    const { data } = await summarizeText(article.text);

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      if (textTrialLimit) {
        setTextTrialLimit(true);
      }

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem(
        "synthspeakTextArticles",
        JSON.stringify(updatedAllArticles)
      );
      localStorage.setItem("synthspeakTextTrialAccessed", "true");
      const textarea = document.querySelector("textarea");
      textInputRef.current.value = "";
      textarea.style = {};
    }
  };

  const handleCopy = (copyText) => {
    setCopied(copyText);
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleCopyArticle = (event) => {
    const button = event.currentTarget;
    const div = button.parentNode;
    const text = div.querySelector(".main_article").textContent;
    navigator.clipboard.writeText(text);
    setCopiedArticle(true);

    setTimeout(() => {
      setCopiedArticle(false);
    }, 3000);
  };

  return (
    <section className="mt-3 w-full max-w-xl mx-auto">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={summarize}
          id="form"
        >
          <span className=" absolute left-0 flex items-center justify-center my-2 ml-3 w-5 text-white rounded-full min-h-[20px] max-h-[20px] text-center text-[11px] bg-black ">
            ✎
          </span>
          <textarea
            placeholder="Enter Article"
            // value={article.text}
            ref={textInputRef}
            onChange={(e) => {
              setArticle({
                ...article,
                text: e.target.value,
              });
            }}
            onInput={autoResize}
            required
            className="url_input peer h-[42px] textarea"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-[#9747ff] peer-focus:text-black hover:border-[#9747ff]"
          >
            ➚
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-600 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => {
                if (textTrialLimit) {
                  setTextTrialLimit(false);
                }
                setArticle({ ...article, summary: item.summary });
              }}
              className="link_card"
            >
              <div
                className="copy_btn"
                onClick={() => {
                  handleCopy(item.text);
                }}
              >
                <img
                  src={copied === item.text ? tick : copy}
                  alt="/"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-poppins text-blue-700 font-medium text-sm truncate">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <Loader size={70} />
        ) : error ? (
          <p className="font-poppins font-bold text-black text-center">
            Houston, we have a problem...
            <br />
            <span className="font-poppins font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : article.summary ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-poppins font-bold text-gray-600 text-xl">
              Article <span className="blue_gradient"> Summary</span>
            </h2>
            <div className="summary_box">
              <div
                className="copy_btn absolute right-1 top-1"
                onClick={() => {
                  handleCopyArticle(event);
                }}
              >
                {copiedArticle && <span className="copy_float">Copied!</span>}
                <img
                  src={copiedArticle ? tick : copy}
                  alt="/"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="main_article font-poppins font-medium text-[16px] text-gray-700 leading-8 py-4">
                {article.summary}
              </p>
            </div>
          </div>
        ) : (
          textTrialLimit && (
            <p className="main_article font-poppins font-medium text-[16px] text-red-700 leading-8 py-4">
              ⚠ I'm sorry, requests for each feature are being limited to one
              trial per person to save costs
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default ArticleText;
