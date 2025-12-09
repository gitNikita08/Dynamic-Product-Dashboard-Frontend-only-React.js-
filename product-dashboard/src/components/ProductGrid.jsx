import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onOpenDetails }) {
  if (!products || products.length === 0) {
    return <div className="alert alert-info">No Products Found</div>;
  }
  return (
    <div className="row g-3">
      {products.map((p) => (
        <div className="col-12 col-sm-6 col-md-4" key={p.id}>
          <ProductCard product={p} onOpen={() => onOpenDetails(p)} />
        </div>
      ))}
    </div>
  );
}
