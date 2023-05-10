import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY_SYNTHSPEAK;

const { articleEndpoint = false } = getState()._persist;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: articleEndpoint
      ? "https://article-extractor-and-summarizer.p.rapidapi.com/"
      : "https://paraphrasing-tool1.p.rapidapi.com/api/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host",
        articleEndpoint
          ? "article-extractor-and-summarizer.p.rapidapi.com"
          : "paraphrasing-tool1.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
    summarizeText: builder.query({
      query: (text) => ({
        url: "/summarize-text",
        method: "POST",
        body: { text, length: 3 },
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    paraphraseText: builder.query({
      query: (text) => ({
          method: "POST",
          url: "/rewrite",
          headers: {
            "content-type": "application/json",
          },
          data: {
            sourceText: text,
          },
      }),
    }),
  }),
});

export const { useLazyGetSummaryQuery, useLazySummarizeTextQuery, useLazyParaphraseTextQuery } = articleApi;

// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY_SYNTHSPEAK;

// export const articleApi = createApi({
//   reducerPath: "articleApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
//     prepareHeaders: (headers) => {
//         headers.set("X-RapidAPI-Key", rapidApiKey);
//          headers.set(
//            "X-RapidAPI-Host",
//            "article-extractor-and-summarizer.p.rapidapi.com"
//          )
//          return headers
//     }
//   }),
//   endpoints: (builder) => ({
//     getSummary: builder.query({
//       query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=10`,
//     }),
//   }),
// });

// export const { useLazyGetSummaryQuery } = articleApi;
