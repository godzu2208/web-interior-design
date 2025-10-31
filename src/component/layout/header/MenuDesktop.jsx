import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
const MenuDesktop = ({ menuData, windowWidth }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const getDropdownStyle = (isVisible) => ({
    position: "fixed",
    top: "112px",
    left: 0,
    right: 0,
    maxHeight: "calc(100vh - 80px)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    borderTop: "1px solid rgba(229, 231, 235, 0.5)",
    zIndex: 999,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transform: `translateY(${isVisible ? "0" : "-20px"})`, // Increased distance
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother easing
    pointerEvents: isVisible ? "auto" : "none",
    overflowY: "auto",
  });

  return (
    <nav
      style={{
        display: windowWidth > 1024 ? "flex" : "none",
        alignItems: "left",
        gap: "2rem",
      }}
    >
      {menuData.left.map((menu, index) => (
        <div
          key={index}
          style={{
            position: "relative",
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              padding: "8px 12px",
              position: "relative",
            }}
            className="menu-button"
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                background: "none",
                border: "none",
                fontWeight: "600",
                fontSize: "var(--header-font-size-base)",
                cursor: "pointer",
                transition: "color 0.2s ease",
                letterSpacing: "0.15em",
                padding: 0,
              }}
              className="menu-button-text"
            >
              {menu.title}
            </button>

            {/* Animated underline */}
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "12px",
                right: "12px",
                height: "2px",
                backgroundColor: "#000000",
                transform: activeDropdown === index ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          {/* Dropdown Menu */}
          {activeDropdown === index && (
            <div
              ref={dropdownRef}
              style={getDropdownStyle(true)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="dropdown-content"
            >
              <div
                style={{
                  maxWidth: "100%",
                  margin: "0px 0px 0px 40px",
                  display: "flex",
                  gap: "24px",
                  height: "100%",
                }}
              >
                {/* Left side: Regular menu items */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: index === 1 ? "flex-start" : "center", // Center container except for Shop
                    height: "100%",
                  }}
                >
                  {/* Grid container for menu items */}
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "12px",
                      alignItems: "stretch",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                  >
                    {menu.items.map((section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        style={{
                          padding: "16px",
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          height: "100%", // Force same height
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#111827",
                            marginBottom: "16px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {section.name}
                        </h3>
                        {section.subItems && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                              flex: 1,
                            }}
                          >
                            {section.subItems.map((item, itemIndex) => (
                              <a
                                key={itemIndex}
                                href={item.href}
                                style={{
                                  color: "#6b7280",
                                  textDecoration: "none",
                                  fontSize: "14px",
                                  transition: "all 0.2s ease",
                                  padding: "8px 12px",
                                  borderRadius: "4px",
                                  backgroundColor: "transparent",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.color = "#111827";
                                  e.target.style.backgroundColor =
                                    "rgba(243, 244, 246, 0.8)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = "#6b7280";
                                  e.target.style.backgroundColor =
                                    "transparent";
                                }}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured cards will now take full height */}
                {index === 0 && (
                  <div className="featured-container">
                    {/* Our Product Card */}
                    <a href="/our-product" className="featured-card">
                      <div className="featured-card-inner">
                        <div className="featured-image">
                          <span className="featured-placeholder">
                            Product Image
                          </span>
                        </div>
                        <div className="featured-content">
                          <h4 className="featured-title">Our Product</h4>
                          <p className="featured-description">
                            Discover our latest products
                          </p>
                          <span className="featured-read-more">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>

                    {/* Project Card */}
                    <a href="/project" className="featured-card">
                      <div className="featured-card-inner">
                        <div className="featured-image">
                          <span className="featured-placeholder">
                            Project Image
                          </span>
                        </div>
                        <div className="featured-content">
                          <h4 className="featured-title">Project</h4>
                          <p className="featured-description">
                            Explore our latest projects
                          </p>
                          <span className="featured-read-more">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {/* Shop menu featured cards */}
                {index === 1 && (
                  <div className="featured-container">
                    {/* Our Store Card */}
                    <a href="/our-store" className="featured-card">
                      <div className="featured-card-inner">
                        <div className="featured-image">
                          <span className="featured-placeholder">
                            Store Image
                          </span>
                        </div>
                        <div className="featured-content">
                          <h4 className="featured-title">Our Store</h4>
                          <p className="featured-description">
                            Visit our physical store
                          </p>
                          <span className="featured-read-more">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>

                    {/* Shop Online Card */}
                    <a href="/shop-online" className="featured-card">
                      <div className="featured-card-inner">
                        <div className="featured-image">
                          <span className="featured-placeholder">
                            Shop Image
                          </span>
                        </div>
                        <div className="featured-content">
                          <h4 className="featured-title">Shop Online</h4>
                          <p className="featured-description">
                            Browse our online collection
                          </p>
                          <span className="featured-read-more">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {/* About menu featured cards */}
                {index === 2 && (
                  <div className="featured-container">
                    {/* About Card */}
                    <a href="/about" className="featured-card">
                      <div className="featured-card-inner">
                        <div className="featured-image">
                          <span className="featured-placeholder">
                            About Image
                          </span>
                        </div>
                        <div className="featured-content">
                          <h4 className="featured-title">About</h4>
                          <p className="featured-description">
                            Learn more about us
                          </p>
                          <span className="featured-read-more">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>

                    {/* Our Team Card */}
                    <a href="/our-team" className="featured-card">
                      <div className="featured-card-inner">
                        <div className="featured-image">
                          <span className="featured-placeholder">
                            Team Image
                          </span>
                        </div>
                        <div className="featured-content">
                          <h4 className="featured-title">Our Team</h4>
                          <p className="featured-description">
                            Meet our talented team
                          </p>
                          <span className="featured-read-more">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MenuDesktop;
