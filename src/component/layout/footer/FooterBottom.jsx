import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

const AccordionDisclosure = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBlock: "1rem",
      }}
    >
      <details
        open={isOpen}
        style={{ border: "none", outline: "none", boxShadow: "none" }}
      >
        <summary
          style={{ cursor: "pointer", listStyle: "none", border: "none" }}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#FFFFFF",
              fontFamily: "Josefin Sans, sans-serif",
            }}
          >
            <span>{title}</span>
            <span
              style={{
                display: "inline-block",
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
                fontSize: "1.5rem",
                color: "#FFFFFFA6",
              }}
            >
              +
            </span>
          </span>
        </summary>

        <div
          style={{
            opacity: isOpen ? 1 : 0,
            maxHeight: isOpen ? "500px" : "0",
            overflow: "hidden",
            transition: "all 0.3s ease",
            paddingTop: isOpen ? "1rem" : "0",
          }}
        >
          {children}
        </div>
      </details>
    </div>
  );
};

const FooterLinksBlock = ({ title, links, style }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={style}>
      {!isMobile && (
        <div>
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "1rem",
              fontFamily: "Josefin Sans, sans-serif",
              color: "#FFFFFF",
            }}
          >
            {title}
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    color: "#FFFFFFA6",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.target.style.color = "#FFFFFFA6")}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isMobile && (
        <AccordionDisclosure title={title}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  style={{
                    color: "#FFFFFFA6",
                    textDecoration: "none",
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "0.9375rem",
                  }}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </AccordionDisclosure>
      )}
    </div>
  );
};

const FooterBottom = () => {
  const [email, setEmail] = useState("");

  const aboutLinks = [
    { text: "About us", url: "/pages/about" },
    { text: "Design Studio", url: "/pages/design-studio" },
    { text: "Projects", url: "/blogs/projects" },
    { text: "Our Team", url: "/pages/our-team" },
    { text: "Kate's Journal", url: "/blogs/journal" },
  ];

  const contactLinks = [
    { text: "Contact us", url: "/pages/contact" },
    { text: "Our Store", url: "/pages/our-sydney-store" },
    { text: "The Latest", url: "/pages/the-latest" },
    { text: "Careers", url: "/pages/careers" },
    { text: "FAQ", url: "/pages/faq" },
  ];

  const supportLinks = [
    { text: "Privacy Policy", url: "/policies/privacy-policy" },
    { text: "Refund Policy", url: "/policies/refund-policy" },
    { text: "Shipping Policy", url: "/policies/shipping-policy" },
    { text: "Terms of Service", url: "/policies/terms-of-service" },
    { text: "Terms & Conditions", url: "/pages/terms-conditions" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return ( 
    <footer
      style={{
        backgroundColor: "#424242",
        padding: "3rem 2rem",
      }}
    >
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        {/* Desktop Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(130px, 150px) minmax(300px, 1fr) repeat(3, minmax(150px, 200px)) minmax(250px, 300px)",
            gap: "3rem 6rem",
            alignItems: "start",
          }}
          className="footer-grid-desktop"
        >
          {/* Logo */}
          <div>
            <img
              src="//katenixon.com/cdn/shop/files/KN-Small-Stacked-Logo-Warm-Grey.svg?v=1726027218&width=130"
              alt="Kate Nixon Logo"
              style={{ width: "100%", maxWidth: "130px", height: "auto" }}
            />
          </div>

          {/* Description & Social */}
          <div>
            <div
              style={{
                fontFamily: "Figtree, sans-serif",
                color: "#FFFFFFA6",
                fontSize: "0.9375rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ marginBottom: "0.75rem", margin: 0 }}>
                We wake up each morning to bring you EVERYDAY JOY.
              </p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.75rem" }}>
                We acknowledge the traditional custodians of the lands on which
                we live and work. We pay respect to Elders past, present and
                emerging and honour their sacred connection to culture,
                community and Country.
              </p>
            </div>
            <ul
              style={{
                display: "flex",
                gap: "1.5rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <a
                  href="https://www.facebook.com/katenixonstore"
                  target="_blank"
                  rel="noopener"
                  aria-label="Follow on Facebook"
                  style={{
                    color: "#FFFFFFA6",
                    display: "flex",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#FFFFFFA6")
                  }
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ fontSize: "20px" }}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/katenixon_official"
                  target="_blank"
                  rel="noopener"
                  aria-label="Follow on Instagram"
                  style={{
                    color: "#FFFFFFA6",
                    display: "flex",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#FFFFFFA6")
                  }
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ fontSize: "20px" }}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.pinterest.com.au/katenixonofficial/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Follow on Pinterest"
                  style={{
                    color: "#FFFFFFA6",
                    display: "flex",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#FFFFFFA6")
                  }
                >
                  <FontAwesomeIcon
                    icon={faPinterest}
                    style={{ fontSize: "20px" }}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@katenixon"
                  target="_blank"
                  rel="noopener"
                  aria-label="Follow on YouTube"
                  style={{
                    color: "#FFFFFFA6",
                    display: "flex",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#FFFFFFA6")
                  }
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    style={{ fontSize: "20px" }}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@katenixon_official"
                  target="_blank"
                  rel="noopener"
                  aria-label="Follow on TikTok"
                  style={{
                    color: "#FFFFFFA6",
                    display: "flex",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#FFFFFFA6")
                  }
                >
                  <FontAwesomeIcon
                    icon={faTiktok}
                    style={{ fontSize: "20px" }}
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Links Columns */}
          <FooterLinksBlock title="About" links={aboutLinks} />
          <FooterLinksBlock title="Contact" links={contactLinks} />
          <FooterLinksBlock
            style={{ marginBottom: "1rem" }}
            title="Support"
            links={supportLinks}
          />

          {/* Newsletter */}
          <div>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",

                color: "#FFFFFF",
                fontFamily: "Josefin Sans, sans-serif",
              }}
            >
              Join Us
            </p>
            <p
              style={{
                padding: "1rem 0",
                fontFamily: "Figtree, sans-serif",
                color: "#FFFFFFA6",
                fontSize: "0.9375rem",
                marginBottom: "1rem",
                lineHeight: "1.5",
              }}
            >
              Subscribe to enjoy special offers, product launches, and insider
              exclusives.
            </p>
            <div style={{ position: "relative" }}>
              <input
                id="footer-email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  paddingRight: "3rem",
                  color: "#ffffff",
                  fontSize: "1rem",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFFA6",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#FFFFFF")}
                onBlur={(e) => (e.target.style.borderColor = "#FFFFFFA6")}
              />
              <button
                onClick={handleSubmit}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "0 0.7rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#FFFFFFA6",
                  transition: "color 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#FFFFFFA6")
                }
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "3rem",
            marginTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "#FFFFFFA6",
            fontSize: "0.7rem",
            fontFamily: "Josefin Sans, sans-serif",
            fontWeight: "800",
            letterSpacing: "0.5px",
          }}
        >
          <p style={{ margin: 0 }}>
            © 2025 - Bee Studio -{" "}
            <a
              href="https://dacdesign.au/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.7rem",
                fontFamily: "Josefin Sans, sans-serif",
                color: "#FFFFFFA6",
                textDecoration: "none",
                fontWeight: "800",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.target.style.color = "#FFFFFFA6")}
            >
              Site by linhlh
            </a>
          </p>
        </div>

        {/* Mobile/Tablet Responsive Styles */}
        <style>{`
          @media (max-width: 1200px) {
            .footer-grid-desktop {
              grid-template-columns: 180px 1fr !important;
              gap: 2rem 1.5rem !important;
            }
            .footer-grid-desktop > div:nth-child(1) {
              grid-column: 1;
            }
            .footer-grid-desktop > div:nth-child(2) {
              grid-column: 2;
            }
            .footer-grid-desktop > div:nth-child(3),
            .footer-grid-desktop > div:nth-child(4),
            .footer-grid-desktop > div:nth-child(5) {
              grid-column: 1 / -1;
            }
            .footer-grid-desktop > div:nth-child(6) {
              grid-column: 1 / -1;
            }
          }

          @media (max-width: 768px) {
            .footer-grid-desktop {
              grid-template-columns: 1fr !important;
              gap: 0 !important;
            }
            .footer-grid-desktop > div {
              grid-column: 1 / -1 !important;
            }
            .footer-grid-desktop > div:nth-child(1) {
              text-align: center;
              margin-bottom: 1.5rem;
            }
            .footer-grid-desktop > div:nth-child(2) {
              text-align: center;
              margin-bottom: 1rem;
            }
            .footer-grid-desktop > div:nth-child(2) ul {
              justify-content: center;
            }
          }
        `}</style>
      </div>
    </footer>
  );
};

export default FooterBottom;
