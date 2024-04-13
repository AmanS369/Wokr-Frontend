// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetch_workspacedata } from "../Redux/Slices/workspaceSlices"; // Adjust the path

// const AllWorkspaces = ({ user_token }) => {
//   const dispatch = useDispatch();
//   const workspaces = useSelector((state) => state.reducer.all_workspaces);

//   useEffect(() => {
//     const fetchWorkspaces = async () => {
//       const responseShared = await fetch("api/v1/work/shared-workspace", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: user_token,
//         },
//       });
//       const dataShared = await responseShared.json();

//       const responseAll = await fetch("api/v1/work/all-workspace", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: user_token,
//         },
//       });
//       const dataAll = await responseAll.json();

//       const sharedWorkspacesWithFlag = dataShared.map((workspace) => ({
//         ...workspace,
//         isShared: 1,
//       }));

//       const allWorkspacesWithFlag = dataAll.map((workspace) => ({
//         ...workspace,
//         isShared: 0,
//       }));

//       const allWorkspaces = [
//         ...sharedWorkspacesWithFlag,
//         ...allWorkspacesWithFlag,
//       ];

//       dispatch(fetch_workspacedata(allWorkspaces));
//     };

//     fetchWorkspaces();
//   }, [user_token, dispatch]);

//   return null;
// };

// export default AllWorkspaces;

import React from "react";

const AllWorkspaces = () => {
  return <div>AllWorkspaces</div>;
};

export default AllWorkspaces;
