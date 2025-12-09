import React from "react";

export default function ProductCard({ product, onOpen }) {
  return (
    <div className="card h-100 shadow-sm">
      <div
        style={{
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="text-muted small mb-2">{product.category}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹{product.price}</strong>
          <button className="btn btn-sm btn-primary" onClick={onOpen}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
