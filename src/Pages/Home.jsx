import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Greeting from "../Components/Greeting";
import Tabs from "../Components/Tabs";
import ContentCard from "../Components/ContentCard";
import { fetch_workspacedata } from "../Redux/Slices/workspaceSlices";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";

const notesData = [
  { id: 1, name: "Note 1", description: "Content for Note 1" },
  { id: 2, name: "Note 2", description: "Content for Note 2" },
  { id: 3, name: "Note 3", description: "Content for Note 3" },
  // Add more notes as needed
];

const Home = () => {
  const user_token = useSelector((state) => state.reducer.user.token);
  const [workspacesData, setWorkspaceData] = useState();

  const dispatch = useDispatch();
  const [greeting, setGreeting] = useState("Good Morning");
  const [icon, setIcon] = useState("☀️");
  const [selectedTab, setSelectedTab] = useState("Notes");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
      setIcon("☀️");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good Afternoon");
      setIcon("🌤️");
    } else {
      setGreeting("Good Evening");
      setIcon("🌙");
    }
  }, []);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch("/api/v1/work/all-workspace", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user_token,
          },
        });
        const data = await response.json();
        setWorkspaceData(data.workspaces);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    // Fetch workspaces only if it's not available in the Redux state
    if (!workspacesData) {
      fetchWorkspaces();
    }
  }, [user_token, workspacesData]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto my-8 p-8 ">
        <Greeting greeting={greeting} icon={icon} />
        <Tabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
        />
        {selectedTab === "Notes" && (
          <ContentCard viewMode={viewMode} datas={notesData} />
        )}
        {selectedTab === "Workspaces" && (
          <ContentCard viewMode={viewMode} datas={workspacesData || []} />
        )}
      </main>
    </div>
  );
};

export default Home;
