import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
  name: "all_workspaces",
  initialState: {
    workspace_data: [],
  },
  reducers: {
    fetch_workspacedata: (state, action) => {
      state.workspace_data = action.payload.workspace_data;
    },
  },
});

export const { fetch_workspacedata } = workspaceSlice.actions;

export default workspaceSlice.reducer;
