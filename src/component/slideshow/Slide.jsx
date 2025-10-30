import React from "react";
import { Fade } from "react-slideshow-image"; // Change from Slide to Fade
import "react-slideshow-image/dist/styles.css";
import "./Slide.css";

import bg1 from "../../assets/img/home/slide/bg1.jpg";
import bg2 from "../../assets/img/home/slide/bg2.jpg";
import bg3 from "../../assets/img/home/slide/bg3.jpg";

const slideProperties = {
  duration: 5000,
  transitionDuration: 1000, // Increased for smoother fade
  infinite: true,
  arrows: false,
  autoplay: true,
  indicators: true, // Change to true to enable indicators
  indicatorProps: {
    className: "indicator",
  },
  scale: 1.0,
  pauseOnHover: false,
  onChange: (oldIndex, newIndex) => {
    console.log(`Slide transition from ${oldIndex} to ${newIndex}`);
  },
};

const SlideShow = () => {
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
    </div>
  );
};

export default SlideShow;
