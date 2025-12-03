import React from "react";
import aboutImg from "../../../assets/img/home/about.jpg";
const AboutSmall = () => {
  return (
    <div className="about-small">
      <div className="about-small-pdlr">
        <div className="container-md">
          <div className="container-md-left">
            <div className="align-seft-item">
              <img style={{ width: "100%" }} src={aboutImg} alt="about-img" />
            </div>
          </div>
          <div className="container-md-right">
            <div className="prose">
              <div className="title">
                <h6>About</h6>
              </div>
              <div className="name-brand">KATE NIXON</div>
              <div className="text-des">
                <p>
                  With a career in interiors, food styling and writing spanning
                  two decades, and a fifteen year tenure as Houses Editor and
                  Interiors Editor at Australian House & Garden magazine, Kate
                  is the founder and director of her eponymous design studio and
                  iconic home boutique.
                  <br />A summer holiday to Italy in 2006 was the beginning of
                  an enduring love affair with Busatti – the eight generation
                  Italian artisan fabric house in Anghiari, Tuscany with Kate
                  opening the flagship Australian boutique in Transvaal Avenue,
                  Double Bay in 2007. She champions the brand today through her
                  store, custom soft furnishings and award-winning interiors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSmall;
