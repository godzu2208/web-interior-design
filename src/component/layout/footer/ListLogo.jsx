import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import "./footer.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListLogo = () => {
  const logos = [
    {
      id: 1,
      src: "/assets/img/footer/belle-magazine.png",
      alt: "Belle Magazine",
    },
    {
      id: 2,
      src: "/assets/img/footer/country-style.png",
      alt: "Country Style",
    },
    {
      id: 3,
      src: "/assets/img/footer/hom-beautiful.svg",
      alt: "Home Beautiful",
    },
    { id: 4, src: "/assets/img/footer/house-garden.svg", alt: "House Garden" },
    { id: 5, src: "/assets/img/footer/vogue-living.png", alt: "Vogue Living" },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && sliderRef.current) {
          sliderRef.current.slickPlay();
        } else if (!entry.isIntersecting && sliderRef.current) {
          sliderRef.current.slickPause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const isSlideshow = windowWidth < 700;
  const isTablet = windowWidth >= 700 && windowWidth < 1024;

  const gridColumns =
    windowWidth >= 1024
      ? "repeat(5, 1fr)"
      : windowWidth >= 700
      ? "repeat(3, 1fr)"
      : "repeat(1, 1fr)";

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const squareStyle = isTablet
    ? {
        width: "200px",
        height: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxSizing: "border-box",
      }
    : {
        width: "100%",
        aspectRatio: "272 / 244",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxSizing: "border-box",
      };

  const imageStyle = {
    maxWidth: "60%",
    maxHeight: "60%",
    objectFit: "contain",
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        margin: "0 auto",
        backgroundColor: "#B5AEA4",
      }}
    >
      {isSlideshow ? (
        <div
          style={{
            width: "100%",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <Slider ref={sliderRef} {...sliderSettings}>
            {logos.map((item) => (
              <div
                key={item.id}
                style={{
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  boxSizing: "border-box",
                }}
              >
                <div style={squareStyle}>
                  <img src={item.src} alt={item.alt} style={imageStyle} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridColumns,
              maxWidth: "70%",
              margin: "0 auto",
              justifyItems: isTablet ? "center" : "stretch",
            }}
          >
            {logos.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={squareStyle}>
                  <img src={item.src} alt={item.alt} style={imageStyle} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListLogo;
