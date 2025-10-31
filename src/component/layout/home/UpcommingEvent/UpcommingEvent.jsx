import React from "react";
// Update image import paths
import w1 from "../../../../assets/img/home/wrapper_1.jpg";
import w2 from "../../../../assets/img/home/wrapper_2.jpg";
import "./up.css";

const UpcommingEvent = () => {
  return (
    <>
      <div className="upcomming-event">
        <div className="container">
          <div className="media-text">
            <div className="media-wrapper-left">
              <div
                className="wrapper"
                style={{ backgroundImage: `url(${w1})` }}
              ></div>
              <div
                className="wrapper"
                style={{ backgroundImage: `url(${w2})` }}
              ></div>
            </div>
            <div className="media-wrapper-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcommingEvent;
