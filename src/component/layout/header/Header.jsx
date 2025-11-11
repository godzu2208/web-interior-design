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

  useEffect(() => {
    // console.log("API URL:", import.meta.env.VITE_API_URL);

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
          console.log("Menu data received!", response.data.data);

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

          // console.log("Transformed data:", transformedData);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
  });

  return (
    <>
      <div className={`header-wrapper ${isScrolled ? "scrolled" : ""}`}>
        <header style={getHeaderStyle()}>
          <div
            style={{
              width: "100%",
              padding: windowWidth < 1024 ? "0px 8px" : "16px 40px",
              boxSizing: "border-box",
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
                    textDecoration: "none",
                    transition: "all 0.3s ease",
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
                  gap: windowWidth > 1920 ? "1.5vw" : "24px",
                }}
              >
                {/* Contact Button - Desktop Only */}
                <button
                  style={{
                    display: windowWidth > 1024 ? "flex" : "none",
                  }}
                  className="menu-button"
                  onClick={() => (window.location.href = "/contact")}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.6")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  CONTACT
                </button>

                {/* Login Button - Desktop Only */}
                <button
                  style={{
                    display: windowWidth > 1024 ? "flex" : "none",
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
                    paddingRight: windowWidth > 1024 ? "8px" : "0px",
                  }}
                  onClick={() => setIsSearchOpen(true)}
                  className="icon-button"
                >
                  <Search
                    style={{
                      height: windowWidth >= 1024 ? "1.5vw" : "24px",
                      width: windowWidth >= 1024 ? "1.5vw" : "24px",
                    }}
                  />
                </button>

                {/* Cart Button */}
                <button
                  style={{
                    display: windowWidth > 1024 ? "flex" : "none",
                  }}
                  className="icon-button"
                >
                  <ShoppingCart
                    style={{
                      height: windowWidth >= 1024 ? "1.2vw" : "24px",
                      width: windowWidth >= 1024 ? "1.2vw" : "24px",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: windowWidth <= 1920 ? "0px" : "-12px",
                      right: windowWidth <= 1920 ? "0px" : "-12px",
                      width: "1vw",
                      height: "1vw",
                      backgroundColor: "#ef4444",
                      color: "white",
                      fontSize: "14px",
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
      </div>
    </>
  );
};

export default Header;
