import React from "react";

export default function Pagination({ current, total, onChange }) {
  const pages = [];
  const windowSize = 5;
  let start = Math.max(1, current - Math.floor(windowSize / 2));
  let end = Math.min(total, start + windowSize - 1);
  if (end - start < windowSize - 1) start = Math.max(1, end - windowSize + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(1)}>
            First
          </button>
        </li>
        <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(current - 1)}>
            Prev
          </button>
        </li>

        {pages.map((p) => (
          <li className={`page-item ${p === current ? "active" : ""}`} key={p}>
            <button className="page-link" onClick={() => onChange(p)}>
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${current === total ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(current + 1)}>
            Next
          </button>
        </li>
        <li className={`page-item ${current === total ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(total)}>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
}
