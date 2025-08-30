import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: serverTimestamp(),
      });

      // 🔹 Add console.log here to debug
      console.log("User added with ID:", docRef.id);

      setSuccess("User registered successfully!");
      setName("");
      setEmail("");
      setPhone("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error adding document:", err); // 🔹 Add this too
      setSuccess("Error registering user. Try again!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">User Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      {success && (
        <div className="alert alert-success text-center mt-3">{success}</div>
      )}
    </div>
  );
}

export default Registration;
