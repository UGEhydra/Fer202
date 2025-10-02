import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

export default function Content() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const content = document.querySelector(".content-inner");
      if (content) {
        const h = content.scrollHeight;
        const available = window.innerHeight - 120; // trừ header+footer
        const newScale = h > available ? available / h : 1;
        setScale(newScale);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main>
      <div className="content-inner" style={{ "--scale": scale }}>
        {/* Cover */}
        <div className="text-center mb-2">
          <h2 className="mb-2">Welcome to Pizza House</h2>
          <img src="/cover.jpg" alt="Pizza Cover" className="cover-img" />
          <p className="mt-2 small">
            If you are looking for traditional Italian pizza,<br />
            the Neapolitan is the best option!
          </p>
        </div>

        {/* Menu */}
        <div className="menu-wrap mt-2 w-100">
          <div className="menu-grid">
            <MenuCard title="Margherita" oldPrice="40.00" price="24.00" badge="SALE" img="/pizza1.jpg" />
            <MenuCard title="Mushroom" price="25.00" img="/pizza2.jpg" />
            <MenuCard title="Hawaiian" price="30.00" badge="NEW" img="/pizza3.jpg" />
            <MenuCard title="Pesto" oldPrice="50.00" price="36.00" badge="SALE" img="/pizza4.jpg" />
          </div>
        </div>

        {/* Form */}
        <div className="form-wrap mt-3">
          <h3 className="text-center mb-3">Book Your Table</h3>
          <form>
            <div className="row mb-2">
              <div className="col-md-4 mb-2">
                <input type="text" className="form-control" placeholder="Your Name *" />
              </div>
              <div className="col-md-4 mb-2">
                <input type="email" className="form-control" placeholder="Your Email *" />
              </div>
              <div className="col-md-4 mb-2">
                <select className="form-control">
                  <option>Select a Service</option>
                  <option>Dine In</option>
                  <option>Take Away</option>
                </select>
              </div>
            </div>
            <div className="mb-2">
              <textarea className="form-control" rows="3" placeholder="Please write your comment"></textarea>
            </div>
            <button className="btn btn-warning">Send Message</button>
          </form>
        </div>
      </div>
    </main>
  );
}
