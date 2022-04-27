import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  );
}

export default Home;
