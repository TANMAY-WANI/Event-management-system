import React from "react";
import App from "./App";
import  ReactDOM  from "react-dom/client";
// import authReducer from "./state";
// import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {store} from "./store";
import {persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react"
// import {persistStore,
// persistReducer,
// FLUSH,
// REHYDRATE,
// PAUSE,
// PERSIST,
// PURGE,
// REGISTER} from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
// import {injectStore} from "./axios/authFetch";

// const persistConfig={key:"root",storage,version:1};
// const persistedReducer= persistReducer(persistConfig,authReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
const persistedStore=persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
// injectStore(store);
root.render(
  // <React.StrictMode>
  <Provider store={store} >
  <PersistGate loading={null} persistor={persistedStore}>
    <App />
  </PersistGate>
  </Provider>
  // </React.StrictMode>
);