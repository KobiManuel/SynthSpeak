import React, { useState, useEffect } from "react";
import { copy, tick } from "../assets";
import { useLazyParaphraseTextQuery } from "../provider/article"; 
import Loader from "./Loader";
const Paraphraser = () => {
    const [count, setCount] = useState(0);
    const [copied, setCopied] = useState(false)
    const [paraphrasedCount, setparaphrasedCount] = useState(0);
  const [article, setArticle] = useState({
    text: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);

  const [paraphraseText, { error, isFetching }] = useLazyParaphraseTextQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("paraphrasedText")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await paraphraseText(article.text);

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("paraphrasedText", JSON.stringify(updatedAllArticles));
    }
  };
  const handleDelete = () => {
    setArticle({
      ...article,
      text: "",
      summary: ""
    });
    setCount(0);
    setparaphrasedCount(0);
  };
   
  const handleCopy = (event) => {
     const button = event.currentTarget;
     const div = button.parentNode;
     const text = div.querySelector(".paraphrased_text").textContent;
     navigator.clipboard.writeText(text);
     setCopied(true);

     setTimeout(() => {
       setCopied(false);
     }, 3000);
  }

  return (
    <div>
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
            onChange={(e) => {
              const wordCount = e.target.value.trim().split(/\s+/).length || 0;
              setArticle({
                ...article,
                text: e.target.value,
              });
              setCount(wordCount);
              if (wordCount === 1) {
                setCount(0);
              }
            }}
            required
            placeholder="Enter or paste text here to paraphrase"
            className="w-full h-72 font-serif outline-none border-none"
          />
          <div className="flex items-center justify-between">
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
        <div className="border border-gray-300 w-[50%] pt-6 px-2 bg-white max-[780px]:w-[100%]">
          <div className=" h-[18.2rem] max-w-full">
            {isFetching ? (
              <Loader size={70} />
            ) : error ? (
              <textarea
                value={article.text}
                onLoad={(e) => {
                  const wordCount =
                    e.target.value.trim().split(/\s+/).length || 0;
                  setparaphrasedCount(wordCount);
                  if (wordCount === 1) {
                    setparaphrasedCount(0);
                  }
                }}
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
              article.summary && (
                <input
                  placeholder="Paraphrased text results will appear here"
                  type="text"
                  className="w-full h-72 font-serif outline-none border-none placeholder:absolute placeholder:top-1"
                  readOnly
                  value={article.summary}
                />
              )
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center w-fit px-2  rounded-[26px] max-h-[24px] border border-gray-300">
              <p className=" text-[14px]">
                Word Count: <span>{paraphrasedCount}</span>{" "}
              </p>
            </span>
            <button
              type="button"
              className="copy_btn bg-white/5 !w-[35px] !h-[35px]"
              onClick={() => handleCopy(event)}
            >
              <img src={copied ? tick : copy} alt="copy text" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Paraphraser;
