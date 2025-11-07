import React from "react";
import w1 from "../../../../assets/img/home/wrapper_1.jpg";
import w2 from "../../../../assets/img/home/wrapper_2.jpg";
// import "./up.css";
import "./test.css";

const UpcommingEvent = () => {
  return (
    <>
      <div className="upcomming-event">
        <div className="container">
          <div className="multiple-media-with-text">
            <div className="multiple-media-with-text_media_wrapper left-img">
              <div className="align-item-center">
                <img src={w1} alt="Wrapper 1" />
              </div>
              <div className="align-item-center">
                <img src={w2} alt="Wrapper 2" />
              </div>
            </div>
            <div className="right-text-info">
              <div className="prose">
                <div className="heading-prose">
                  <h3>upcomming event</h3>
                </div>
                <div className="title">
                  <h3>kate nixon in-conversation-with adelaide bragg</h3>
                </div>
                <div className="description">
                  <div className="text-description">
                    <p>
                      Join Kate for a special event to celebrate Adelaide's
                      beautiful new book<em> City, Coast &amp; Country</em> on
                      Wednesday 19 November at the KATE NIXON Store.
                    </p>
                  </div>
                  <div className="text-description">
                    <p>
                      Guests will enjoy canapes, drinks and receive a copy of
                      the book in their own coveted gift-bag.
                    </p>
                  </div>
                </div>
                <div class="button-group">
                  <a
                    class="link"
                    href="https://www.trybooking.com/events/landing/1483325"
                    target="_blank"
                  >
                    Limited tickets available to purchase
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcommingEvent;
