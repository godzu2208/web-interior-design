import React from "react";
import { useState, useEffect } from "react";
import aboutImg from "/assets/img/home/about-small.jpg";

const AboutSmall = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridColumns = windowWidth < 1024 ? "1fr" : "auto 30%";
  const gridGap = windowWidth < 1600 ? "3rem" : "6rem";
  const padding = windowWidth < 1024 ? "1.25rem" : "2rem";

  return (
    <div
      className="about-small"
      style={{
        padding: windowWidth < 1025 ? "1.25rem" : "3rem",
        paddingTop: "4rem",
        width: "100%",
      }}
    >
      <div
        className="about-small-pdlr"
        style={{
          maxWidth: windowWidth < 1600 ? "80%" : "70%",
          margin: "0 auto",
        }}
      >
        <div
          className="container-md"
          style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            gap: gridGap,
          }}
        >
          {/* Left: Image */}
          <div
            className="container-md-left"
            style={{
              maxWidth: windowWidth < 1024 ? "100%" : "auto",
              alignSelf: "center",
            }}
          >
            <div className="align-seft-item" style={{ alignSelf: "center" }}>
              <img
                style={{ width: "100%", display: "block" }}
                src={aboutImg}
                alt="about-img"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div
            className="container-md-right"
            style={{
              alignSelf: windowWidth < 1024 ? "auto" : "center",
            }}
          >
            <div
              className="prose"
              style={{
                display: "grid",
                gap: windowWidth > 1920 ? "2rem" : "1.4vw",
              }}
            >
              <div className="title">
                <h6
                  style={{
                    fontSize: "0.85rem",
                    color: "#000",
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: "700",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  About
                </h6>
              </div>

              <div className="name-brand">
                <p
                  style={{
                    fontSize: windowWidth < 1024 ? "1.25rem" : "1.5rem",
                    color: "#000",
                    fontFamily: "'Josefin Sans', sans-serif",
                    lineHeight: "1.5",
                    fontWeight: "700",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  KATE NIXON
                </p>
              </div>

              <div className="text-des">
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontFamily: "Figtree, sans-serif",
                    lineHeight: "1.6",
                    opacity: "0.8",
                    fontWeight: "400",
                    margin: 0,
                  }}
                >
                  Kate Nixon is an Australian designer, stylist and
                  long-standing interiors editor of Australian House & Garden
                  magazine.
                </p>
              </div>

              <div className="text-des">
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontFamily: "Figtree, sans-serif",
                    lineHeight: "1.6",
                    opacity: "0.8",
                    fontWeight: "400",
                    margin: 0,
                  }}
                >
                  Our full-service, multi-award winning interior design studio
                  creates dream homes with decorating and styling through to
                  large-scale renovations and new build designs.
                </p>
              </div>

              <div className="text-des">
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    fontFamily: "Figtree, sans-serif",
                    lineHeight: "1.6",
                    opacity: "0.8",
                    fontWeight: "400",
                    margin: 0,
                  }}
                >
                  Our iconic homewares boutique offers a curated collection of
                  our latest ideas, custom made products and hand-picked finds.
                  We champion local and international brands, makers and
                  artists.
                </p>
              </div>

              <div className="button-group">
                <a
                  className="link"
                  href="/about"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    borderBottom: "1px solid #000",
                    paddingBottom: "0.25rem",
                    display: "inline-block",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSmall;
