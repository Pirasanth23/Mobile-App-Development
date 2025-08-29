import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // States for editing
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State for delete confirmation
  const [deletingUser, setDeletingUser] = useState(null);

  // Fetch users
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

  // Search filter
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", deletingUser.id));
      setUsers(users.filter(user => user.id !== deletingUser.id));
      setDeletingUser(null);
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  };

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, phone } : u));
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Registered Users</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Users Table */}
      <table className="table table-bordered table-hover table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th onClick={() => sortBy("name")} style={{cursor: 'pointer'}}>Name</th>
            <th onClick={() => sortBy("email")} style={{cursor: 'pointer'}}>Email</th>
            <th onClick={() => sortBy("phone")} style={{cursor: 'pointer'}}>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button 
                  className="btn btn-primary btn-sm me-2"
                  data-bs-toggle="modal" 
                  data-bs-target="#editModal"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal" 
                  data-bs-target="#deleteModal"
                  onClick={() => setDeletingUser(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== Delete Confirmation Modal ===== */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {deletingUser && (
                <p>Are you sure you want to delete <strong>{deletingUser.name}</strong>?</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="button" 
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Edit Modal ===== */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Phone"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserList;
