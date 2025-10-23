import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { User, Search, ShoppingCart } from "lucide-react";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import SearchOverlay from "./SearchOverlay";
import "./Header.css";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState({ left: [] });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Fetch menu data
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);

    const fetchMenuData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/menu`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success) {
          console.log("Menu data received:", response.data);

          const transformedData = {
            left: response.data.data
              .filter((item) => item.isActive === 1)
              .map((item) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                icon: item.icon,
                items: item.children
                  ? item.children
                      .filter((section) => section.isActive === 1)
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((section) => ({
                        id: section.id,
                        name: section.title,
                        slug: section.slug,
                        subItems: section.children
                          ? section.children
                              .filter((subItem) => subItem.isActive === 1)
                              .sort((a, b) => a.orderIndex - b.orderIndex)
                              .map((subItem) => ({
                                id: subItem.id,
                                name: subItem.title,
                                href: subItem.url,
                                slug: subItem.slug,
                                target: subItem.target,
                              }))
                          : [],
                      }))
                  : [],
              })),
          };

          console.log("Transformed data:", transformedData);
          setMenuData(transformedData);
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <header style={getHeaderStyle()}>
        <div
          style={{
            maxWidth: "1920px",
            margin: windowWidth > 1024 ? "0px 40px" : "auto",
            padding: windowWidth < 300 ? "0" : "16px",
            // height: "120px",
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
            {/* Left Side: Mobile Menu Button OR Desktop Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              {/* Mobile Menu Component */}
              <MenuMobile
                menuData={menuData}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                windowWidth={windowWidth}
              />

              {/* Desktop Menu Component */}
              <MenuDesktop menuData={menuData} windowWidth={windowWidth} />
            </div>

            {/* Center: Logo - Always centered */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
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

            {/* Right Side: Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* Contact Button - Desktop Only */}
              <button
                style={{
                  display: windowWidth > 1024 ? "flex" : "none",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  padding: "8px 12px",
                  color: "#374151",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "10%",
                  opacity: 1, // Add default opacity
                }}
                className="menu-button"
                onClick={() => (window.location.href = "/contact")}
                onMouseEnter={(e) => (e.target.style.opacity = "0.6")} // Add hover effect
                onMouseLeave={(e) => (e.target.style.opacity = "1")} // Reset on mouse leave
              >
                CONTACT
              </button>

              {/* Login Button - Desktop Only */}
              <button
                style={{
                  display: windowWidth > 1024 ? "flex" : "none",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  padding: "8px 12px",
                  color: "#374151",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "10%",
                  opacity: 1, // Add default opacity
                }}
                className="menu-button"
                onClick={() => (window.location.href = "/login")}
                onMouseEnter={(e) => (e.target.style.opacity = "0.6")} // Add hover effect
                onMouseLeave={(e) => (e.target.style.opacity = "1")} // Reset on mouse leave
              >
                LOGIN
              </button>

              {/* Search Button */}
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

              {/* Cart Button */}
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
      </header>

      {/* Search Overlay Component */}
      <SearchOverlay
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        windowWidth={windowWidth}
      />
    </>
  );
};

export default Header;
