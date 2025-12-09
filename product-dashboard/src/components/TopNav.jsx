import React from "react";

export default function TopNav({ onOpenSidebar, query, setQuery }) {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-3">
      <div className="container-fluid d-flex align-items-center">
        <button
          className="btn btn-outline-primary me-3"
          onClick={() => {
            console.log("TopNav click");
            onOpenSidebar();
          }}
        >
          ☰
        </button>
        <h5 className="mb-0 me-3">Product Dashboard</h5>
        <div className="flex-grow-1">
          <input
            type="search"
            className="form-control"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}
