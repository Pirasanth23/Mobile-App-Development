import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Registered Users</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-hover table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th onClick={() => sortBy("name")} style={{cursor: 'pointer'}}>Name</th>
            <th onClick={() => sortBy("email")} style={{cursor: 'pointer'}}>Email</th>
            <th onClick={() => sortBy("phone")} style={{cursor: 'pointer'}}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="d-block d-md-none">
        {filteredUsers.map(user => (
          <div className="card mb-3 shadow-sm" key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">Phone: {user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
