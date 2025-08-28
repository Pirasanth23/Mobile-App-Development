import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2>About This Project</h2>
        <p className="lead">This app demonstrates React & Firebase skills for managing user data in real-time.</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Technologies Used</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">React.js</li>
                <li className="list-group-item">Firebase Firestore</li>
                <li className="list-group-item">Bootstrap 5</li>
                <li className="list-group-item">React Router</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Project Goals</h5>
              <p className="card-text">
                Build a dynamic registration app where users can submit their information, view all
                entries, search and sort data, and experience responsive design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
