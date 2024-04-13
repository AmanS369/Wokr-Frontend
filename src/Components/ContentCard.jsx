import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Card = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/user/workspace/${data._id}`);
      }}
      className="text-decoration-none"
    >
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
        <p className="text-gray-600">{data.description}</p>
      </div>
    </div>
  );
};

const ContentCard = ({ viewMode, datas }) => {
  return (
    <div
      className={
        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : ""
      }
    >
      {datas.map((data) => (
        <Card key={data._id} data={data} />
      ))}
    </div>
  );
};

export default ContentCard;
