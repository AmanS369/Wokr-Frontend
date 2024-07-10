import React, { useState } from "react";
import { useSelector } from "react-redux";

const Greeting = ({ greeting, icon }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user_token = useSelector((state) => state.reducer.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/work/create-workspace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_token,
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          window.location.reload();
          alert(data.message);
        } else {
          alert(data.message);
        }
        setShowModal(false);
      } else {
        alert("Something went wrong while creating new Content");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while creating new Content");
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center text-5xl">
        <span className="ml-2 text-4.5xl">{icon}</span>
        <span className="ml-4">{greeting}</span>
      </div>
      <button
        className="bg-transparent text-black text-xl"
        onClick={() => setShowModal(true)}
      >
        +
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Content</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Greeting;
