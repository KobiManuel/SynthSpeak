import React, { useEffect, useRef, useState } from "react";
import { copy, loader, tick } from "../assets";
import link from "../assets/link.png";
import { useLazyGetSummaryQuery } from "../provider/article";
import Loader from "./Loader";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [copied, setCopied] = useState("");
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [trialLimit, setTrialLimit] = useState(false);

  const urlInputRef = useRef(null);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const trialAccessedFromStorage = localStorage.getItem(
    "synthspeakTrialAccessed"
  );

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("synthspeakUrlArticles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (trialAccessedFromStorage) {
      setTrialLimit(true);
      urlInputRef.current.value = "";
      return;
    }

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      if (trialLimit) {
        setTrialLimit(false);
      }

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem(
        "synthspeakUrlArticles",
        JSON.stringify(updatedAllArticles)
      );
      localStorage.setItem("synthspeakTrialAccessed", "true");
      urlInputRef.current.value = "";
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleCopyArticle = (event) => {
    const button = event.currentTarget;
    const div = button.parentNode;
    const copiedSpan = `<span class="copy_float">Copied!</span>`;
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
          onSubmit={handleSubmit}
        >
          <img
            src={link}
            alt="linkIcon"
            className="absolute left-0 my-2 ml-3 w-5 "
          />
          <input
            type="url"
            ref={urlInputRef}
            placeholder="Enter Url"
            // value={article.url}
            onChange={(e) => {
              setArticle({
                ...article,
                url: e.target.value,
              });
            }}
            required
            className="url_input peer"
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
                if (trialLimit) {
                  setTrialLimit(false);
                }
                setArticle(item);
              }}
              className="link_card"
            >
              <div
                className="copy_btn"
                onClick={() => {
                  handleCopy(item.url);
                }}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="/"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-poppins text-blue-700 font-medium text-sm truncate">
                {item.url}
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
          trialLimit && (
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

export default Demo;
