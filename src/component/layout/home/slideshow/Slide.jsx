import React, { useState } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slide.css";

// Fix import paths
import bg1 from "../../../../assets/img/home/slide/bg1.jpg";
import bg2 from "../../../../assets/img/home/slide/bg2.jpg";
import bg3 from "../../../../assets/img/home/slide/bg3.jpg";

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideImages = [
    {
      url: bg1,
      caption: "terra by kate nixon",
    },
    {
      url: bg2,
      caption: "nomad by kate nixon",
    },
    {
      url: bg3,
      caption: "Kate Nixon",
    },
  ];

  const slideProperties = {
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    arrows: false,
    autoplay: true,
    indicators: false,
    scale: 1.0,
    pauseOnHover: false,
    onChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <div className="slide-container">
      <Fade {...slideProperties}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div
              style={{
                backgroundImage: `url(${slideImage.url})`,
                width: "100%",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="caption">{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Fade>

      {/* Custom Carousel Indicators */}
      <div className="carousel-indicators">
        {slideImages.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
