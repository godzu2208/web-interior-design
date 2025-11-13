import React from "react";

const RichText = () => {
  return (
    <div className="rich-text">
      <div
        className="section-spacing"
        style={{
          paddingBottom: "4rem",
          color: "#000",
        }}
      >
        <div
          className="container"
          style={{
            padding: "2rem 1.25rem",

            margin: "0 auto",
            fontSize: "18px !important",
            maxWidth: "61.25rem",
          }}
        >
          <div
            className="prose-text"
            style={{
              textAlign: "center",
              overflowWrap: "anywhere",
            }}
          >
            <h3
              style={{
                textTransform: "uppercase",
                fontSize: "24px",
                letterSpacing: "4px",
                fontFamily: "'Josefin Sans', sans-serif",
                opacity: "0.9",
                fontWeight: "bold",
              }}
            >
              We believe in
              <em> EVERYDAY JOY !</em>
            </h3>
            <div
              className="text-des"
              style={{
                fontFamily: "'Figtree',sans-serif",
                marginTop: "2rem",
                fontSize: "18px",
                fontStyle: "italic",
                letterSpacing: "1px",
                opacity: "0.8",
                lineHeight: "1.5",
              }}
            >
              <p>
                We believe in layered interiors and attention to detail. In the
                beauty of gathered pieces found with love. We believe in food,
                music, family and friends. We believe in HOME.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichText;
