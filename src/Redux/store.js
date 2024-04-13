import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import workspaceReducer from "./Slices/workspaceSlices";
// import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["workspace"],
};

const rootReducer = combineReducers({
  user: authReducer,
  workspace: workspaceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
});
export const persistor = persistStore(store);
export default store;
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Slices/authSlice.js";

// export const store = configureStore({
//   reducer: authReducer,
// });
