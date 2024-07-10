import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AcceptInvite() {
  const [error, setError] = useState(null);
  const user_token = useSelector((state) => state.reducer.user.token);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Missing token in URL");
      return;
    }

    // Make API call using the token
    fetch("/api/v1/work/accept-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user_token,
      },
      body: JSON.stringify({ accept_token: token }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("API error");
        }
        return response.json();
      })
      .then((data) => {
        // API call successful, redirect to homepage
        navigate("/user/home");
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [token, user_token, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Accepting invite...</div>;
}

export default AcceptInvite;
