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
