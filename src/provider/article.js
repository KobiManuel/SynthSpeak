import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY_SYNTHSPEAK;

const ai21ApiKey = import.meta.env.VITE_A121_API_KEY;

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
    baseUrl: "https://api.ai21.com/studio/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `bearer ${ai21ApiKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    paraphraseText: builder.query({
      query: ({ text, style }) => ({
        url: "/v1/paraphrase",
        method: "POST",
        body: JSON.stringify({
          text: text,
          style: style,
          startIndex: 0,
          top_k: 1,
          threshold: 0.8,
        }),
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
