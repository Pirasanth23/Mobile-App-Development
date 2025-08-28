import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Welcome to Your Project Title</h1>
        <p className="lead mb-4">Manage your data efficiently using our React & Firebase mobile app.</p>
        <Link to="/registration" className="btn btn-primary btn-lg me-2">Register</Link>
        <Link to="/users" className="btn btn-outline-secondary btn-lg">View Users</Link>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Register Users</h5>
              <p className="card-text">Fill in the registration form to add a new user to the database.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">View Users</h5>
              <p className="card-text">See all registered users with search and sorting functionality.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">About Project</h5>
              <p className="card-text">Learn more about the project, technologies used, and goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
