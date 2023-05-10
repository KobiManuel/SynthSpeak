import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY_SYNTHSPEAK;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
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
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLazyGetSummaryQuery, useLazySummarizeTextQuery } = articleApi;



export const paraphraseApi = createApi({
  reducerPath: "paraphraseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://paraphrasing-tool1.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", "paraphrasing-tool1.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    paraphraseText: builder.query({
      query: (text) => ({
        url: "/api/rewrite",
        method: "POST",
        body: {
          sourceText: text,
          length: 3,
        },
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLazyParaphraseTextQuery } = paraphraseApi;

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
