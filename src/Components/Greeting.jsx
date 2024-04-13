import React from "react";

const Greeting = ({ greeting, icon }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center text-5xl">
        <span className="ml-2 text-4.5xl">{icon}</span>
        <span className="ml-4">{greeting}</span>
      </div>
      <button className="bg-transparent text-black text-xl">+</button>
    </div>
  );
};

export default Greeting;
