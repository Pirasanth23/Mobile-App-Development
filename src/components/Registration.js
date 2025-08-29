import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false); // ✅ for submit state
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if(name.trim().length < 3){
      alert("Name must be at least 3 characters");
      return;
    }
    if(!email.includes("@")){
      alert("Invalid email");
      return;
    }
    if(phone.length !== 10 || isNaN(phone)){
      alert("Phone must be 10 digits");
      return;
    }

    setLoading(true); // show loading

    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: serverTimestamp() // ensures ordering works
      });

      // Clear form immediately
      setName('');
      setEmail('');
      setPhone('');
      setSuccess(true);

      // Hide success after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Error submitting form. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>

      {success && (
        <div className="alert alert-success" role="alert">
          Registration successful!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10-digit phone number"
            required
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Registration;
