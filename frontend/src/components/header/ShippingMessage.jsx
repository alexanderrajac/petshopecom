import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShippingMessage = () => {
  const perks = [
    "🚚 FREE FAST DELIVERY ON ORDERS OVER ₹499",
    "🥩 15% OFF YOUR FIRST AUTOSHIP SUBSCRIPTION • CODE: PETSTARTUP15",
    "🐾 1,200+ HEALTHY PETS SUCCESSFULLY ADOPTED & REHOMED",
    "🩺 24/7 ON-DEMAND LICENSED VET ADVICE INCLUDED",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % perks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [perks.length]);

  return (
    <div className="startup-top-announcement py-2 px-3 text-white text-center">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-none d-md-block xx-small text-white-50">
          📍 Fast Delivery Across India • GPay & UPI Accepted
        </div>
        <div className="mx-auto xx-small fw-bold tracking-wider announcement-fade">
          {perks[currentIdx]}
        </div>
        <div className="d-none d-md-flex align-items-center gap-3 xx-small">
          <Link to="/about" className="text-white-50 text-decoration-none hover-white">
            Vet Hotline
          </Link>
          <span className="text-white-50">•</span>
          <Link to="/about" className="text-white-50 text-decoration-none hover-white">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingMessage;
