// import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//   name: "user",
//   initialState: {
//     isAuthenticated: false,
//     userDetails: null,
//     token: null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.userDetails = action.payload.user;
//       state.token = action.payload.token;
//       localStorage.setItem("user", JSON.stringify(state.userDetails));
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("token", state.token);
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");

//       localStorage.removeItem("user");
//       localStorage.setItem("isAuthenticated", "false");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
  },

  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export const selectuser = (state) => state.user.user;
export const token = (state) => state.user.token;

export default authSlice.reducer;
