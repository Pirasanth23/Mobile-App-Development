// src/components/About.js
import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">About This Project</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Project Overview</h5>
              <p className="card-text">
                This is a sample React & Firebase web/mobile app for managing users.
                It allows registration, viewing, editing, and deleting user data.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Features</h5>
              <ul className="card-text">
                <li>User registration with validation</li>
                <li>Search and sort users</li>
                <li>Edit & delete users with confirmation modals</li>
                <li>Responsive design for mobile & desktop</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Technologies Used</h5>
              <p className="card-text">
                React, Firebase Firestore, Bootstrap, React Router, and modern CSS.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
