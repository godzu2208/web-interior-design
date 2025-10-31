import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import SlideShow from "../component/layout/home/slideshow/Slide";
import UpcommingEvent from "../component/layout/home/UpcommingEvent/UpcommingEvent";

const Home = () => {
  // Remove padding-top from body styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body, html {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        margin: 0,
        padding: 0,
        position: "absolute", // Change to absolute
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
      }}
    >
      <SlideShow />
      <UpcommingEvent />
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: " 0px 40px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Remove SlideShow from here */}

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "24px",
            }}
          >
            Welcome to Interior Design
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              marginBottom: "48px",
              maxWidth: "768px",
              margin: "0 auto 48px auto",
              lineHeight: "1.7",
            }}
          >
            Transform your space with our premium interior design services. From
            concept to completion, we create beautiful, functional spaces that
            reflect your style.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginTop: "64px",
            }}
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "2rem",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "16px",
                  }}
                >
                  Design Service {item}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.6",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>

          {/* More content for scrolling demonstration */}
          <div
            style={{
              marginTop: "128px",
              display: "flex",
              flexDirection: "column",
              gap: "64px",
            }}
          >
            {[1, 2, 3, 4, 5].map((section) => (
              <div
                key={section}
                style={{
                  background:
                    "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
                  padding: "48px",
                  // borderRadius: "24px",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "24px",
                  }}
                >
                  Section {section}
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "1.125rem",
                    lineHeight: "1.7",
                    maxWidth: "1920px",
                    margin: "0 auto",
                  }}
                >
                  This is demo content to show the scroll effect on the header.
                  Notice how the header background becomes more opaque and gains
                  a shadow as you scroll down. The transparent glass effect with
                  backdrop blur creates a modern, elegant look that works
                  perfectly with the white background of the page.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
