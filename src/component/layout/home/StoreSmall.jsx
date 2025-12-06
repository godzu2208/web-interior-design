import React from "react";
import { useState, useEffect } from "react";
import storeImg from "/assets/img/home/store-small.jpg";

const StoreSmall = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridColumns = windowWidth < 1024 ? "1fr" : "30% auto";
  const gridGap = windowWidth < 1600 ? "3rem" : "6rem";
  const padding = windowWidth < 1024 ? "1.25rem" : "2rem";
  const imageOrder = windowWidth < 1024 ? "1" : "2";
  const contentOrder = windowWidth < 1024 ? "2" : "1";

  return (
    <div
      className="store-small"
      style={{
        padding: windowWidth < 1025 ? "1.25rem" : "3rem",
        paddingTop: "6rem",
        width: "100%",
      }}
    >
      <div
        className="store-small-pdlr"
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
          {/* left: Content */}
          <div
            className="container-md-left"
            style={{
              alignSelf: windowWidth < 1024 ? "auto" : "center",
              order: contentOrder,
            }}
          >
            <div
              className="prose"
              style={{
                display: "grid",
                gap: windowWidth > 1920 ? "2rem" : "1.4vw",
              }}
            >
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
                  OUR SYDNEY STORE
                </p>
              </div>

              <div
                className="text-des"
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
                <p>Shop 1, 50 Bayswater Road </p>
                <p>Rushcutters Bay, Sydney</p>
                <p>NSW 2011, Australia</p>
              </div>

              <div className="button-group">
                <a
                  className="link"
                  href="https://maps.app.goo.gl/LPmNPpmw3cx4mXds7"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "1rem",

                    borderBottom: "1px solid #000",

                    display: "inline-block",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in maps
                </a>
              </div>

              <div
                className="text-des"
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
                <p>Tuesday-Friday: 10am-5pm</p>
                <p>Saturday: 9am-5pm</p>
                <p>Monday, Sunday and Public Holidays: Closed</p>
              </div>

              <div className="button-group">
                <a
                  className="link"
                  href="/store"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "1rem",

                    borderBottom: "1px solid #000",
                    paddingBottom: "0.2rem",
                    display: "inline-block",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Retail store
                </a>
              </div>
            </div>
          </div>

          {/* right: Image */}
          <div
            className="container-md-right"
            style={{
              maxWidth: windowWidth < 1024 ? "100%" : "auto",
              alignSelf: "center",
              order: imageOrder,
            }}
          >
            <div className="align-seft-item" style={{ alignSelf: "center" }}>
              <img
                style={{ width: "100%", display: "block" }}
                src={storeImg}
                alt="store-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSmall;
