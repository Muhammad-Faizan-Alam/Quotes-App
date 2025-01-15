// // 'use client';
// // import { combineReducers, configureStore } from "@reduxjs/toolkit";
// // import storage from "redux-persist/lib/storage";
// // import fontaneliSlice from "./slice/FontaneliSlice";
// // import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";


// // const persistConfig = {
// //     key: 'root',
// //     storage
// // }

// // const rootReducer = combineReducers({
// //     fontaneliForm: fontaneliSlice.reducer
// // });

// // const persistedReducer = persistReducer( persistConfig, rootReducer);

// // export const store = configureStore({
// //     reducer: persistedReducer,
// //     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
// //         //non-serializable data like objects && dates
// //         serializableCheck: {
// //             ignoreActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
// //         }
// //     }),

// //     devTools: process.env.EXPO_PUBLIC_NODE_ENV !== 'development'
// // });

// // export const persistor = persistStore(store);


// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage"; // Local storage from redux-persist
// import authorsSlice from "./slice/FontaneliSlice"; // Your slice
// import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

// // Config for persistence
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// // Combine reducers (add more if needed)
// const rootReducer = combineReducers({
//   authors: authorsSlice,  // The key must match the name used in your components
// });

// // Add persistence to the combined reducers
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure store with middleware and persistence
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== 'production',  // DevTools enabled in development
// });

// // Set up the persistor for the store
// export const persistor = persistStore(store);




import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorsSlice from "./slice/FontaneliSlice"; // Your slice
import FontaneliSlice from "./slice/FontaneliSlice";

// Combine reducers (add more if needed)
const rootReducer = combineReducers({
  authors: FontaneliSlice,  // The key must match the name used in your components
});

// Configure store with middleware
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',  // DevTools enabled in development
});