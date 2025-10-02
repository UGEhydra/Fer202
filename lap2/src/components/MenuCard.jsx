import React from "react";

export default function MenuCard({ title, price, oldPrice, img, badge }) {
  return (
    <div className="menu-card">
      <div className="card h-100 position-relative">
        {badge && <span className="badge bg-warning text-dark badge-pos">{badge}</span>}
        <img src={img} className="card-img-top" alt={title} style={{ height: 100, objectFit: "cover" }} />
        <div className="card-body p-2 text-center">
          <h6 className="card-title mb-1" style={{ fontSize: "0.9rem" }}>{title}</h6>
          {oldPrice ? (
            <p className="card-text mb-1 small">
              <del>${oldPrice}</del> <span className="text-danger">${price}</span>
            </p>
          ) : (
            <p className="card-text mb-1 small">${price}</p>
          )}
          <button className="btn btn-sm btn-dark">Buy</button>
        </div>
      </div>
    </div>
  );
}
