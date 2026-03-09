import React from "react";

function Loader() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <p className="mt-3">Loading Students...</p>
    </div>
  );
}

export default Loader;
