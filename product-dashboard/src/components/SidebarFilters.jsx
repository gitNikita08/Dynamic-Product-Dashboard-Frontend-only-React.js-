import React from "react";

export default function SidebarFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  resetFilters,
  closeSidebar,
}) {
  return (
    <div className="p-3 sidebar-filters">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Filters</h6>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={closeSidebar}
        >
          ✕
        </button>
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Sort</label>
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price Low - High</option>
          <option value="price-desc">Price High - Low</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-sm btn-outline-secondary me-2"
          onClick={() => {
            resetFilters();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
