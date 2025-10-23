import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  User,
  Search,
  ShoppingCart,
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Global styles injection
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        background-color: #ffffff;
        font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding-top: 80px;
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  const menuData = {
    left: [
      {
        title: "DESIGN STUDIO",
        items: [
          {
            name: "Our Studio",
            subItems: [
              { name: "Design Studio", href: "/design-studio/our-studio" },
              { name: "Projects", href: "/design-studio/projects" },
              { name: "Product Design", href: "/design-studio/product-design" },
              { name: "Our Team", href: "/design-studio/our-team" },
              { name: "Awards", href: "/design-studio/awards" },
            ],
          },
          {
            name: "Services",
            subItems: [
              {
                name: "Full-Service Interior Design",
                href: "/services/full-service",
              },
              {
                name: "Furniture & Decorating",
                href: "/services/furniture-decorating",
              },
              { name: "Room-by-Room Styling", href: "/services/room-styling" },
              {
                name: "Custom Curtains & Upholstery",
                href: "/services/custom-curtains",
              },
            ],
          },
          {
            name: "Journals",
            subItems: [
              { name: "The Latest", href: "/journals/latest" },
              { name: "Kate's Journal", href: "/journals/kates-journal" },
              { name: "In the Press", href: "/journals/in-the-press" },
              { name: "Projects", href: "/journals/projects" },
            ],
          },
        ],
      },
      {
        title: "SHOP",
        items: [
          {
            name: "Shop",
            subItems: [
              { name: "Furniture", href: "/shop/furniture" },
              { name: "Outdoor", href: "/shop/outdoor" },
              { name: "Lighting", href: "/shop/lighting" },
              { name: "Vintage", href: "/shop/vintage" },
              { name: "Fashion", href: "/shop/fashion" },
              { name: "Sale", href: "/shop/sale" },
              { name: "All Products", href: "/shop/all-products" },
            ],
          },
          {
            name: "Art",
            subItems: [
              { name: "Wall Art", href: "/shop/art/wall-art" },
              { name: "Sculpture", href: "/shop/art/sculpture" },
              {
                name: "Nicholas Bryan-Brown",
                href: "/shop/art/nicholas-bryan-brown",
              },
              { name: "Vintage Art", href: "/shop/art/vintage-art" },
              { name: "All Art", href: "/shop/art/all-art" },
            ],
          },
          {
            name: "Décor",
            subItems: [
              { name: "Barware", href: "/shop/decor/barware" },
              { name: "Bed & Bath", href: "/shop/decor/bed-bath" },
              { name: "Bowls", href: "/shop/decor/bowls" },
              {
                name: "Boxes & Catch-Alls",
                href: "/shop/decor/boxes-catch-alls",
              },
              {
                name: "Candles & Room Fragrance",
                href: "/shop/decor/candles-room-fragrance",
              },
              { name: "Clocks & Mirrors", href: "/shop/decor/clocks-mirrors" },
              {
                name: "Cushions & Throws",
                href: "/shop/decor/cushions-throws",
              },
              {
                name: "Decorative Objects",
                href: "/shop/decor/decorative-objects",
              },
              { name: "Hooks & Hardware", href: "/shop/decor/hooks-hardware" },
              { name: "Kitchen & Table", href: "/shop/decor/kitchen-table" },
              { name: "Photo Frames", href: "/shop/decor/photo-frames" },
              { name: "Trays & Platters", href: "/shop/decor/trays-platters" },
              { name: "Vases & Vessels", href: "/shop/decor/vases-vessels" },
              {
                name: "Baskets & Storage",
                href: "/shop/decor/baskets-storage",
              },
              { name: "All Décor", href: "/shop/decor/all-decor" },
            ],
          },
          {
            name: "Gifts",
            subItems: [
              { name: "Jewelry", href: "/shop/gifts/jewelry" },
              { name: "Books", href: "/shop/gifts/books" },
              {
                name: "Cards & Stationary",
                href: "/shop/gifts/cards-stationary",
              },
              { name: "Sweets & Treats", href: "/shop/gifts/sweets-treats" },
              { name: "Games", href: "/shop/gifts/games" },
              { name: "For Her", href: "/shop/gifts/for-her" },
              { name: "For Him", href: "/shop/gifts/for-him" },
              { name: "For the Housewarmer", href: "/shop/gifts/housewarmer" },
              { name: "Under $50", href: "/shop/gifts/under-50" },
              { name: "Under $100", href: "/shop/gifts/under-100" },
              { name: "Under $200", href: "/shop/gifts/under-200" },
              { name: "Gift Cards", href: "/shop/gifts/gift-cards" },
              { name: "All Gifts", href: "/shop/gifts/all-gifts" },
            ],
          },
          {
            name: "Body Care",
            subItems: [
              { name: "Soap", href: "/shop/body-care/soap" },
              {
                name: "Hand & Body Lotion",
                href: "/shop/body-care/hand-body-lotion",
              },
              {
                name: "Body Fragrance",
                href: "/shop/body-care/body-fragrance",
              },
              { name: "Skincare", href: "/shop/body-care/skincare" },
              { name: "All Body Care", href: "/shop/body-care/all-body-care" },
            ],
          },
        ],
      },
      {
        title: "ABOUT",
        items: [
          {
            name: "ABOUT",
            subItems: [
              { name: "About Us", href: "/about" },
              { name: "Our Team", href: "/about" },
              { name: "FAQ", href: "/faq" },
            ],
          },
          {
            name: "CONTACT",
            subItems: [
              { name: "Contact Us", href: "/contact" },
              { name: "Our Sydney", href: "/contact" },
              { name: "Carrers", href: "/contact" },
            ],
          },
        ],
      },
    ],
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleMobileMenuToggle = (index) => {
    setActiveMobileSection(activeMobileSection === index ? null : index);
  };

  // Style functions
  const getHeaderStyle = () => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: "center",
    textAlign: "left",
    backgroundColor: isScrolled
      ? "rgba(243, 244, 246, 0.95)"
      : "rgba(243, 244, 246, 0.8)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "all 0.3s ease",
    boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
  });

  const getDropdownButtonStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    gap: "4px",
    padding: "8px 12px",
    background: "none",
    border: "none",
    borderBottom: `1px solid ${isActive ? "#000000ff" : "transparent"}`,
    color: isActive ? "#111827" : "#374151",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "10%",
  });

  const getDropdownStyle = (isVisible) => ({
    position: "fixed",
    top: "112px",
    left: 0,
    right: 0,
    maxHeight: "calc(100vh - 80px)", // Add this - viewport height minus header height
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    borderTop: "1px solid rgba(229, 231, 235, 0.5)",
    zIndex: 999,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transform: isVisible ? "translateY(0)" : "translateY(-10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: isVisible ? "auto" : "none",
    overflowY: "auto", // Add this
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }

      // Check if click is outside mobile menu and not on menu button
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle mobile menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header style={getHeaderStyle()}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: windowWidth < 300 ? "0" : "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "80px",
            }}
          >
            {/* Mobile Menu Button */}
            <div style={{ display: windowWidth <= 1024 ? "block" : "none" }}>
              <button
                aria-label="Toggle mobile menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  // borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                {isMobileMenuOpen ? (
                  <X size={24} color="#374151" />
                ) : (
                  <Menu size={24} color="#374151" />
                )}
              </button>
            </div>

            {/* Left Navigation - Desktop */}
            <nav
              style={{
                display: windowWidth > 1024 ? "flex" : "none",
                alignItems: "left",
                gap: "2rem",
              }}
            >
              {menuData.left.map((menu, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <button
                    style={getDropdownButtonStyle(
                      activeDropdown === `left-${index}`
                    )}
                    onMouseEnter={() => setActiveDropdown(`left-${index}`)}
                  >
                    <span>{menu.title}</span>
                  </button>

                  {/* Dropdown */}
                  <div
                    ref={dropdownRef}
                    style={getDropdownStyle(activeDropdown === `left-${index}`)}
                    onMouseEnter={() => setActiveDropdown(`left-${index}`)}
                    onMouseLeave={closeDropdown}
                  >
                    <div
                      style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        padding: "24px 1rem",
                        gap: "4px",
                        justifyContent: "flex-start",
                        textAlign: "left",
                        maxHeight: "100%", // Add this
                        overflowY: "auto", // Add this
                        scrollBehavior: "smooth",
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                        // Hide scrollbar for IE/Edge/Firefox
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "1280px",
                          margin: "0 auto",
                          padding: "24px 1rem",
                          display: "flex",
                          flexDirection: "row",
                          gap: "48px",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                        }}
                      >
                        {menu.items ? (
                          // Multi-section dropdown (Design Studio)
                          menu.items.map((section, sectionIndex) => (
                            <div
                              key={sectionIndex}
                              style={{ minWidth: "200px" }}
                            >
                              <h4
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  color: "#374151",
                                  marginBottom: "12px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {section.name}
                              </h4>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "4px",
                                }}
                              >
                                {section.subItems &&
                                  section.subItems.map((item, itemIndex) => (
                                    <a
                                      key={itemIndex}
                                      href={item.href}
                                      style={{
                                        display: "block",
                                        padding: "8px 0px",
                                        color: "#6b7280",
                                        textDecoration: "none",
                                        fontSize: "14px",

                                        borderLeft: "1px solid transparent",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.color = "#111827";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.color = "#6b7280";
                                      }}
                                    >
                                      {item.name}
                                    </a>
                                  ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          // Single-section dropdown (fallback)
                          <div style={{ minWidth: "200px" }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              {menu.items.map((item, itemIndex) => (
                                <a
                                  key={itemIndex}
                                  href={item.href}
                                  style={{
                                    display: "block",
                                    padding: "12px 24px",
                                    color: "#6b7280",
                                    textDecoration: "none",
                                    transition: "all 0.15s ease",
                                    fontSize: "12px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.color = "#111827";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.color = "#6b7280";
                                  }}
                                >
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Logo - Center */}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a
                href="/"
                style={{
                  fontSize: windowWidth > 1024 ? "32px" : "24px",
                  fontWeight: "700",
                  color: "#1f2937",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                BEE.STUDIO
              </a>
            </div>

            {/* Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <nav
                style={{
                  display: windowWidth > 1024 ? "flex" : "none",
                  alignItems: "center",
                  gap: "2rem",
                  color: "#374151",
                }}
              >
                <a className="contact left-btn" href="/contact">
                  CONTACT
                </a>
              </nav>
              <nav
                style={{
                  display: windowWidth > 1024 ? "flex" : "none",
                  alignItems: "center",
                  gap: "2rem",
                  color: "#374151",
                }}
              >
                <a className="login left-btn" href="/login">
                  LOGIN
                </a>
              </nav>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  position: "relative",
                  display: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <User size={20} color="#6b7280" />
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  paddingRight: windowWidth > 1024 ? "8px" : "0px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  position: "relative",
                }}
                onClick={() => setIsSearchOpen(true)}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(141, 141, 141, 0.5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <Search size={20} color="#6b7280" />
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  position: "relative",
                  display: windowWidth > 1024 ? "flex" : "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(141, 141, 141, 0.5)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <ShoppingCart size={20} color="#6b7280" />
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(229, 231, 235, 0.5)",
            transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 998,
            overflowY: "auto",
            visibility: isMobileMenuOpen ? "visible" : "hidden", // Add this
            pointerEvents: isMobileMenuOpen ? "auto" : "none", // Add this
            width: "100%", // Add explicit width
            height: "calc(100vh - 80px)", // Calculate remaining height
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "16px",
              height: "100%",
            }}
          >
            <div style={{ paddingTop: "16px" }}>
              {/* Menu items */}
              {[...menuData.left].map((menu, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom:
                      index < menuData.left.length - 1
                        ? "1px solid rgba(0, 0, 0, 0.1)"
                        : "none",
                    paddingBottom: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <button
                    onClick={() => handleMobileMenuToggle(index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "8px 0",
                      background: "none",
                      border: "none",
                      color: "#374151",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transition:
                          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform:
                          activeMobileSection === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {activeMobileSection === index && (
                    <div
                      style={{
                        paddingLeft: "16px",
                        paddingTop: "8px",
                        opacity: 1,
                        height: "auto",
                        visibility: "visible",
                        transform: "translateY(0)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {menu.items.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          style={{
                            opacity: 1,
                            transform: "translateY(0)",
                            transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                              sectionIndex * 0.05
                            }s`,
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const sectionId = `${index}-${sectionIndex}`;
                              setExpandedSections(
                                expandedSections.includes(sectionId)
                                  ? expandedSections.filter(
                                      (id) => id !== sectionId
                                    )
                                  : [...expandedSections, sectionId]
                              );
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                              padding: "12px 0 8px 0",
                              background: "none",
                              border: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#374151",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            <span>{section.name}</span>
                            {/* Bỏ div wrapper và onClick handler riêng biệt */}
                            {expandedSections.includes(
                              `${index}-${sectionIndex}`
                            ) ? (
                              <Minus size={14} color="#374151" />
                            ) : (
                              <Plus size={14} color="#374151" />
                            )}
                          </button>

                          <div
                            style={{
                              paddingLeft: "8px",
                              maxHeight: expandedSections.includes(
                                `${index}-${sectionIndex}`
                              )
                                ? "1000px"
                                : "0",
                              opacity: expandedSections.includes(
                                `${index}-${sectionIndex}`
                              )
                                ? 1
                                : 0,
                              visibility: expandedSections.includes(
                                `${index}-${sectionIndex}`
                              )
                                ? "visible"
                                : "hidden",
                              overflow: "hidden",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              transform: expandedSections.includes(
                                `${index}-${sectionIndex}`
                              )
                                ? "translateY(0)"
                                : "translateY(-10px)",
                            }}
                          >
                            {section.subItems &&
                              section.subItems.map((item, itemIndex) => (
                                <a
                                  key={itemIndex}
                                  href={item.href}
                                  style={{
                                    display: "block",
                                    padding: "8px 0",
                                    color: "#6b7280",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    opacity: expandedSections.includes(
                                      `${index}-${sectionIndex}`
                                    )
                                      ? 1
                                      : 0,
                                    transform: expandedSections.includes(
                                      `${index}-${sectionIndex}`
                                    )
                                      ? "translateY(0)"
                                      : "translateY(-5px)",
                                    transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                                      itemIndex * 0.05
                                    }s`,
                                  }}
                                >
                                  {item.name}
                                </a>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Single Contact link outside the loop */}
              <div
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                }}
              >
                <a
                  href="/contact"
                  style={{
                    display: "block",
                    lineHeight: "1.2",
                    padding: "8px 0px",
                    marginBottom: "16px",
                    color: "#374151",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </a>
              </div>
              {/* Single Login link outside the loop */}
              <div
                style={{
                  margin: "16px 0px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                }}
              >
                <a
                  href="/login"
                  style={{
                    display: "block",
                    lineHeight: "1.2",
                    padding: "8px 0px",
                    marginBottom: "16px",
                    color: "#374151",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  LOGIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <div
        style={{
          position: "fixed",
          top: windowWidth < 300 ? "80px" : "112px",
          left: 0,
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderTop: "1px solid rgba(229, 231, 235, 0.5)",
          transform: isSearchOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: isSearchOpen ? 1 : 0,
          transition: "all 0.3s ease",
          zIndex: 999,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: windowWidth <= 768 ? "16px" : "24px",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "100%",
            }}
          >
            <Search size={windowWidth <= 768 ? 16 : 20} color="#6b7280" />
            <input
              type="text"
              placeholder="Search for..."
              style={{
                flex: 1,
                border: "none",
                background: "none",
                fontSize: windowWidth <= 768 ? "16px" : "18px",
                color: "#374151",
                outline: "none",
                padding: "8px 0",
                width: "100%",
              }}
              autoFocus={isSearchOpen}
            />
            <button
              onClick={closeSearch}
              style={{
                background: "none",
                border: "none",
                padding: windowWidth <= 768 ? "6px" : "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={windowWidth <= 768 ? 16 : 20} color="#6b7280" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
