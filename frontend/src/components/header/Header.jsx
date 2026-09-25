import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import ShippingMessage from "./ShippingMessage";
import NavUserButtons from "./NavUserButtons";
import CartButton from "../header/CartButton";
import HeaderSearch from "../header/HeaderSearch";
import SearchInput from "../product/SearchInput";
import { FiSearch } from "react-icons/fi";
import { CATEGORY_METADATA } from "../../constants";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  function hideSearchHandler() {
    setShowSearch(false);
  }

  function showSearchHandler() {
    setShowSearch(true);
  }

  const onClickSearchHandler = () => {
    const segments = location.pathname.split("/");
    const slicedPath = segments[1];
    if (slicedPath === "products" || slicedPath === "search") {
      return;
    }
    showSearchHandler();
  };

  const navCategories = [
    { key: "birds", ...CATEGORY_METADATA.birds },
    { key: "aquatics", ...CATEGORY_METADATA.aquatics },
    { key: "tanks", ...CATEGORY_METADATA.tanks },
    { key: "food", ...CATEGORY_METADATA.food },
    { key: "pets", ...CATEGORY_METADATA.pets },
    { key: "accessories", ...CATEGORY_METADATA.accessories },
  ];

  return (
    <header className="sticky-top bg-white startup-header shadow-xs">
      <ShippingMessage />

      {/* Main Brand & Action Bar */}
      <Navbar bg="white" expand="lg" className="py-2 border-bottom">
        <Container className="d-flex align-items-center justify-content-between">
          {/* Mobile Toggle */}
          <Navbar.Toggle
            aria-controls="startup-mobile-nav"
            className="d-lg-none border-0 p-1"
          />

          {/* Logo & Startup Identity */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 m-0">
            <img
              src={logo}
              alt="Petizen multi-pet logo"
              className="rounded-circle shadow-xs border"
              style={{ height: "44px", width: "44px", objectFit: "cover" }}
            />
            <div className="d-none d-sm-block">
              <span className="fw-extrabold fs-5 text-dark tracking-tight d-block leading-none">
                PETIZEN
              </span>
              <span className="xx-small text-muted text-uppercase tracking-wider fw-semibold">
                Modern Pet Care & Adoption
              </span>
            </div>
          </Navbar.Brand>

          {/* Center Search Input (Desktop) */}
          <div className="d-none d-lg-block flex-grow-1 mx-4" style={{ maxWidth: "480px" }}>
            <SearchInput />
          </div>

          {/* Right Action Icons: User Account, Search, Cart */}
          <div className="d-flex align-items-center gap-2">
            {/* Mobile Search Button */}
            <Button
              variant="light"
              className="rounded-circle d-lg-none p-2 text-muted"
              onClick={onClickSearchHandler}
              aria-label="Search"
            >
              <FiSearch className="fs-5" />
            </Button>

            <NavUserButtons />

            <Link to="/cart" className="text-decoration-none">
              <CartButton />
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Secondary Category Navigation Bar */}
      <div className="category-subnav bg-light border-bottom d-none d-lg-block py-2">
        <Container>
          <div className="d-flex align-items-center justify-content-between gap-3 overflow-x-auto no-scrollbar">
            <div className="d-flex align-items-center gap-1">
              <Link
                to="/products"
                className="category-nav-link text-decoration-none px-3 py-1 rounded-pill small fw-bold text-dark hover-pill"
              >
                ✨ All Products
              </Link>
              {navCategories.map((cat) => (
                <Link
                  key={cat.key}
                  to={`/products?category=${cat.key}`}
                  className="category-nav-link text-decoration-none px-3 py-1 rounded-pill small fw-semibold text-secondary hover-pill d-flex align-items-center gap-1"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">
              <Link
                to="/sales"
                className="badge bg-danger bg-opacity-10 text-danger text-decoration-none rounded-pill px-3 py-1 fw-bold small d-flex align-items-center gap-1"
              >
                <span>🔥 Flash Sales</span>
              </Link>
              <Link
                to="/about"
                className="text-muted text-decoration-none small fw-semibold px-2 hover-text"
              >
                About Us
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Collapse */}
      <Navbar.Collapse id="startup-mobile-nav" className="d-lg-none bg-white p-3 border-bottom">
        <Nav className="gap-2">
          <div className="mb-2">
            <SearchInput />
          </div>
          <Nav.Link as={Link} to="/" className="fw-bold">
            🏠 Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products" className="fw-bold">
            🛍️ All Products
          </Nav.Link>
          {navCategories.map((cat) => (
            <Nav.Link
              key={cat.key}
              as={Link}
              to={`/products?category=${cat.key}`}
              className="fw-semibold ps-3"
            >
              {cat.icon} {cat.label}
            </Nav.Link>
          ))}
          <Nav.Link as={Link} to="/sales" className="fw-bold text-danger">
            🔥 Deals & Sales
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="fw-semibold">
            ℹ️ About Petizen
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>

      {/* Pop-down Search for Mobile */}
      <HeaderSearch show={showSearch} onHide={hideSearchHandler} />
    </header>
  );
};

export default Header;
