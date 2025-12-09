import React from "react";

export default function ProductModal({ product, onClose }) {
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom">
        <div className="d-flex justify-content-between align-items-start">
          <h5>{product.title}</h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="my-3 d-flex gap-3">
          <div
            style={{
              flex: "0 0 240px",
              maxWidth: 240,
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <p className="mb-1">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-1">
              <strong>Price:</strong> {product.price}
            </p>
            <p className="mb-2">
              <strong>Description:</strong>
            </p>
            <p className="small text-muted ">
              <strong>{product.description}</strong> {product.category}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              alert("Pretend to add to cart");
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
