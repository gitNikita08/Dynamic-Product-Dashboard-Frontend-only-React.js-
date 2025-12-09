import React, { useEffect, useMemo, useState } from "react";
import TopNav from "./components/TopNav";
import SidebarFilters from "./components/SidebarFilters";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import Pagination from "./components/Pagination";

/** public API used here; it's frontend-only. If the fetch fails we fallback to SAMPLE_PRODUCTS */
const PRODUCTS_API = "https://fakestoreapi.com/products";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Blue T-Shirt",
    price: 399,
    category: "clothing",
    description: "Comfortable cotton t-shirt",
    image: "https://picsum.photos/seed/p1/600/400",
  },
  {
    id: 2,
    title: "Running Shoes",
    price: 2499,
    category: "shoes",
    description: "Lightweight running shoes",
    image: "https://picsum.photos/seed/p2/600/400",
  },
  {
    id: 3,
    title: "Leather Wallet",
    price: 799,
    category: "accessories",
    description: "Genuine leather wallet",
    image: "https://picsum.photos/seed/p3/600/400",
  },
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI / filter states
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default"); // options: default, price-asc, price-desc, alpha
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sidebar visibility (small devices)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debug logs: mount + sidebarOpen changes
  useEffect(() => {
    console.log("App mounted. sidebarOpen =", sidebarOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("sidebarOpen changed ->", sidebarOpen);
  }, [sidebarOpen]);

  // fetch products
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(PRODUCTS_API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // Normalize categories (some APIs have varied names)
        const normalized = data.map((p) => ({
          ...p,
          category: p.category || "uncategorized",
        }));
        setProducts(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("API fetch failed, using sample data", err);
        if (mounted) {
          setProducts(SAMPLE_PRODUCTS);
          setError("Using sample data (API load failed).");
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, []);

  // derived: categories available
  const categories = useMemo(() => {
    const setCat = new Set(products.map((p) => p.category || "uncategorized"));
    return ["all", ...Array.from(setCat)];
  }, [products]);

  // filter + search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = products.slice();

    if (selectedCategory !== "all") {
      out = out.filter(
        (p) =>
          (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (q) {
      out = out.filter((p) =>
        (p.title || p.description || "").toLowerCase().includes(q)
      );
    }

    // sorting
    if (sortBy === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sortBy === "alpha")
      out.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

    return out;
  }, [products, query, selectedCategory, sortBy]);

  // pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  // reset filters
  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  // wrapped opener to show log when TopNav calls it
  const handleOpenSidebar = () => {
    console.log("App: handleOpenSidebar called");
    setSidebarOpen(true);
  };

  return (
    <div className="app-container">
      <TopNav onOpenSidebar={handleOpenSidebar} query={query} setQuery={setQuery} />

      <div className="d-flex">
        {/* sidebar area */}
        <aside className={`left-sidebar ${sidebarOpen ? "open" : ""}`}>
          <SidebarFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={() => {
              resetFilters();
              setSidebarOpen(false);
            }}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </aside>

        {/* optional backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="left-sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="content p-4 flex-grow-1">
          {loading ? (
            <div className="text-center py-5">Loading products…</div>
          ) : (
            <>
              {error && <div className="alert alert-warning">{error}</div>}

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>{filtered.length} items</div>
                <div>
                  <small className="text-muted">Sort:</small>{" "}
                  <select
                    className="form-select d-inline-block w-auto ms-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="alpha">Alphabetical</option>
                  </select>
                </div>
              </div>

              <ProductGrid
                products={paged}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
              <div className="mt-4 d-flex justify-content-center">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onChange={(p) => setCurrentPage(p)}
                />
              </div>
            </>
          )}
        </main>
      </div>

      {/* modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
