import React, { useEffect, useState } from "react";

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_Token"); // Retrieve token from localStorage
        if (!token) {
          setError("Access token is missing. Please log in again.");
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the access token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errData = await response.json();
          setError(errData.msg || "Failed to fetch users.");
        }
      } catch (err) {
        setError("An error occurred while fetching users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default GetUsers;
