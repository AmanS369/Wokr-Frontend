import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ShowMembers = ({ workspaceId }) => {
  const [members, setMembers] = useState([]);
  const [admin, setadmin] = useState([]);
  const user_token = useSelector((state) => state.reducer.user.token);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`/api/v1/work/show-members/${workspaceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user_token,
          },
        });
        const data = await res.json(); // extract data from the response
        setadmin(data.data.admin);
        setMembers(data.data.members);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, [workspaceId]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Members</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Permission</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {admin && admin.name}
              </td>
              <td className="py-3 px-6 text-left">{admin && admin.email}</td>
              <td className="py-3 px-6 text-left">ADMIN</td>
            </tr>
            {members &&
              members.map((member) => (
                <tr
                  key={member._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {member.name}
                  </td>
                  <td className="py-3 px-6 text-left">{member.email}</td>
                  <td className="py-3 px-6 text-left">{member.permission}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowMembers;
