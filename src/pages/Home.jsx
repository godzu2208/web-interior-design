import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import SlideShow from "../component/layout/home/slideshow/Slide";
import UpcommingEvent from "../component/layout/home/UpcommingEvent/UpcommingEvent";
import CollectionListWraps from "../component/layout/home/collection/collection";
import RichText from "../component/layout/home/richText";
import BlogPosts from "../component/layout/home/blogPosts";

const Home = () => {
  const windowWidth = window.innerWidth;
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
      <CollectionListWraps slugs={["design-studio", "shop"]} />
      <RichText />
      <CollectionListWraps slugs={["projects", "custom"]} />
      <CollectionListWraps slugs={["product-design", "in-the-press"]} />
      <CollectionListWraps slugs={["our-team", "about"]} />
      <BlogPosts />
    </main>
  );
};

export default Home;
