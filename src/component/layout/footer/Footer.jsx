import React from "react";
import "./footer.css"
import ListLogo from "./ListLogo";
import FooterBottom from "./FooterBottom";
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <ListLogo />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
