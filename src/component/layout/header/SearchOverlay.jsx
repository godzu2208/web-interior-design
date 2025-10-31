import React from "react";
import { Search, X } from "lucide-react";

const SearchOverlay = ({ isSearchOpen, setIsSearchOpen, windowWidth }) => {
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: windowWidth >= 1024 ? "112px" : "80px",
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
          maxWidth: "100%",
          margin: "0 auto",
          padding: windowWidth <= 1024 ? "8px" : "24px",
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
              padding: "16px 0px",
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
  );
};

export default SearchOverlay;
