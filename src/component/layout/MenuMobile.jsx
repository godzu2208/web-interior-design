import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Plus, Minus } from "lucide-react";

const MenuMobile = ({
  menuData,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  windowWidth,
}) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
  }, [setIsMobileMenuOpen]);

  const handleMobileMenuToggle = (index) => {
    setActiveMobileSection((prevSection) =>
      prevSection === index ? null : index
    );
  };

  const getMobileSubmenuStyle = (isVisible) => ({
    paddingLeft: "16px",
    paddingTop: isVisible ? "8px" : "0",
    opacity: isVisible ? 1 : 0,
    maxHeight: isVisible ? "1000px" : "0",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  const getMobileSubItemsStyle = (isVisible) => ({
    paddingLeft: "16px",
    opacity: isVisible ? 1 : 0,
    maxHeight: isVisible ? "1000px" : "0",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <div style={{ display: windowWidth <= 1024 ? "block" : "none" }}>
        <button
          aria-label="Toggle mobile menu"
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          style={{
            background: "none",
            border: "none",
            padding: "8px",
            paddingLeft: "0px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          {isMobileMenuOpen ? (
            <X size={24} color="#374151" />
          ) : (
            <Menu size={24} color="#374151" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        data-mobile-menu
        style={{
          position: "fixed",
          top: windowWidth < 300 ? "80px" : "112px",
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
          visibility: isMobileMenuOpen ? "visible" : "hidden",
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          width: "100%",
          height: "calc(100vh - 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Menu Items Section - Top */}
          <div style={{ paddingTop: "16px" }}>
            {menuData.left.map((menu, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  marginBottom: "16px",
                }}
              >
                {/* Level 1: Main Menu Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMobileMenuToggle(index);
                  }}
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
                      transition: "transform 0.3s ease",
                      transform:
                        activeMobileSection === index
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      pointerEvents: "none",
                    }}
                  />
                </button>

                {/* Level 2: Sections */}
                <div
                  style={getMobileSubmenuStyle(activeMobileSection === index)}
                >
                  {menu.items.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      style={{
                        transform:
                          activeMobileSection === index
                            ? "translateY(0)"
                            : "translateY(-10px)",
                        opacity: activeMobileSection === index ? 1 : 0,
                        transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${
                          sectionIndex * 0.05
                        }s`,
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const sectionId = `${index}-${sectionIndex}`;
                          setExpandedSections((prev) =>
                            prev.includes(sectionId)
                              ? prev.filter((id) => id !== sectionId)
                              : [...prev, sectionId]
                          );
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "12px 0",
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
                        {expandedSections.includes(
                          `${index}-${sectionIndex}`
                        ) ? (
                          <Minus
                            size={14}
                            color="#374151"
                            style={{ pointerEvents: "none" }}
                          />
                        ) : (
                          <Plus
                            size={14}
                            color="#374151"
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </button>

                      {/* Level 3: Sub Items */}
                      <div
                        style={getMobileSubItemsStyle(
                          expandedSections.includes(`${index}-${sectionIndex}`)
                        )}
                      >
                        {section.subItems.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            style={{
                              display: "block",
                              padding: "8px 0",
                              color: "#6b7280",
                              textDecoration: "none",
                              fontSize: "14px",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              transform: expandedSections.includes(
                                `${index}-${sectionIndex}`
                              )
                                ? "translateX(0)"
                                : "translateX(-10px)",
                              opacity: expandedSections.includes(
                                `${index}-${sectionIndex}`
                              )
                                ? 1
                                : 0,
                              transitionDelay: `${itemIndex * 0.05}s`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact & Login Section - Bottom */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "16px",
            }}
          >
            <a
              href="/contact"
              style={{
                display: "block",
                lineHeight: "1.2",
                padding: "12px 0",
                color: "#374151",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
            >
              CONTACT
            </a>
            <a
              href="/login"
              style={{
                display: "block",
                lineHeight: "1.2",
                padding: "12px 0",
                color: "#374151",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
            >
              LOGIN
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
