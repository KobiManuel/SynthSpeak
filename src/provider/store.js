import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { articleApi, paraphraseApi } from "./article";

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [paraphraseApi.reducerPath]: paraphraseApi.reducer, // Add the paraphraseApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articleApi.middleware,
      paraphraseApi.middleware // Add the paraphraseApi middleware
    ),
});

// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { articleApi, paraphraseApi } from "./article";

// export const store = configureStore ({
//     reducer: {
//         [articleApi.reducerPath]: articleApi.reducer
//     },
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(articleApi.middleware)
// })
