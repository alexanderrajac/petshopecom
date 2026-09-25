import { useState } from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const PetMatcherWidget = () => {
  const [petType, setPetType] = useState("dog");
  const [focusArea, setFocusArea] = useState("food");

  const petOptions = [
    { id: "dog", label: "Dogs & Puppies", icon: "🐕" },
    { id: "cat", label: "Cats & Kittens", icon: "🐈" },
    { id: "bird", label: "Birds & Parrots", icon: "🦜" },
    { id: "fish", label: "Fish & Aquariums", icon: "🐠" },
    { id: "small", label: "Small Pets & Bunnies", icon: "🐰" },
  ];

  const focusOptions = [
    {
      id: "food",
      category: "food",
      label: "Specialized Nutrition & Seeds",
      icon: "🍖",
      desc: "Top nutrition for birds, fish, dogs and cats.",
    },
    {
      id: "tanks",
      category: "tanks",
      label: "Tanks, Cages & Habitats",
      icon: "🫧",
      desc: "Rimless glass aquariums, filters and luxury bird cages.",
    },
    {
      id: "pets",
      category: "pets",
      label: "Adopt a Loving Companion",
      icon: "🐾",
      desc: "Certified healthy birds, fish, kittens and puppies.",
    },
    {
      id: "accessories",
      category: "accessories",
      label: "A to Z Accessories & Gear",
      icon: "🦮",
      desc: "Aquarium pumps, perches, toys, beds and grooming.",
    },
  ];

  const currentFocus = focusOptions.find((f) => f.id === focusArea) || focusOptions[0];

  return (
    <Card className="pet-matcher-card border-0 shadow-md rounded-4 my-5 overflow-hidden position-relative">
      <div className="matcher-glow position-absolute top-0 start-0 w-100 h-100 pointer-events-none"></div>

      <Card.Body className="p-4 p-lg-5 position-relative z-1">
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="primary" className="rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-1">
                <span>✨</span>
                <span>Petizen AI Matcher</span>
              </Badge>
              <span className="text-muted small">Personalized for your pet</span>
            </div>

            <h3 className="fw-extrabold text-dark mb-3">
              Find Exactly What Your Pet Needs in 10 Seconds
            </h3>
            <p className="text-secondary small mb-4">
              Tell us a little about your pet, and we'll instantly match you with vet-formulated recipes,
              adoptable pets, or play gear suited to their life stage.
            </p>

            {/* Step 1: Pet Type */}
            <div className="mb-3">
              <label className="fw-bold x-small text-uppercase text-muted mb-2 d-block">
                1. Select Pet Type:
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {petOptions.map((opt) => (
                  <Button
                    key={opt.id}
                    variant={petType === opt.id ? "primary" : "outline-secondary"}
                    className="rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-2 matcher-btn"
                    onClick={() => setPetType(opt.id)}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                    {petType === opt.id && <FiCheck className="ms-1" />}
                  </Button>
                ))}
              </div>
            </div>

            {/* Step 2: What are you looking for */}
            <div className="mb-4">
              <label className="fw-bold x-small text-uppercase text-muted mb-2 d-block">
                2. What do you need today?
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {focusOptions.map((opt) => (
                  <Button
                    key={opt.id}
                    variant={focusArea === opt.id ? "dark" : "outline-secondary"}
                    className="rounded-pill px-3 py-2 fw-medium d-flex align-items-center gap-2 matcher-btn"
                    onClick={() => setFocusArea(opt.id)}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </Col>

          {/* Result Card Preview */}
          <Col lg={5}>
            <div className="matcher-result-box bg-white p-4 rounded-4 shadow-sm border border-2 border-primary border-opacity-25">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-bold small">
                  ✓ Tailored Recommendation
                </span>
                <span className="fs-3">{currentFocus.icon}</span>
              </div>

              <h5 className="fw-bold text-dark mb-2">
                {currentFocus.label} for {petType === "dog" ? "Dogs" : petType === "cat" ? "Cats" : "Small Pets"}
              </h5>
              <p className="text-secondary small mb-4">
                {currentFocus.desc}
              </p>

              <div className="feature-checkmarks mb-4">
                <div className="d-flex align-items-center gap-2 text-dark small mb-1">
                  <FiCheck className="text-primary fw-bold" />
                  <span>Verified 100% safe & veterinarian approved</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-dark small mb-1">
                  <FiCheck className="text-primary fw-bold" />
                  <span>Eligible for 15% Autoship subscription discount</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-dark small">
                  <FiCheck className="text-primary fw-bold" />
                  <span>Backed by 30-Day Money-Back Happiness Guarantee</span>
                </div>
              </div>

              <Link
                to={`/products?category=${currentFocus.category}`}
                className="text-decoration-none"
              >
                <Button
                  variant="primary"
                  className="w-100 rounded-pill py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Explore Matched Products</span>
                  <FiArrowRight />
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PetMatcherWidget;
