import React from "react";
import BlogPostList from "../common/BlogPostList";
const BlogPosts = () => {
  return (
    <div className="blog-posts" style={{ padding: "3rem", width: "100%" }}>
      <div
        className="container-lg"
        style={{
          display: "grid",
          gap: "3rem",
          gridAutoColumns: " minmax(0, 1fr)",
        }}
      >
        <div
          className="title"
          style={{ justifySelf: "center", textAlign: "center" }}
        >
          <div className="prose">
            <h2
              style={{
                fontSize: "1.75rem",
                color: "#000",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: "700",
                letterSpacing: "4px",
                textTransform: "uppercase",
                lineHeight: "1.4",
              }}
            >
              THE LASTEST
            </h2>
          </div>
        </div>
        <BlogPostList slug="creative-heaven,fine-print,feels-like-home" />

        {/* VIEW ALL */}
        <div
          className="btn-view"
          style={{ justifySelf: "center", opacity: "0.76" }}
        >
          <a
            href="/blog/in-the-press"
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#ffffff",
              fontSize: "1rem",
              fontFamily: "'Figtree',sans-serif",
              fontWeight: "600",
              backgroundColor: "#000000",
              cursor: "pointer",
              padding: "1rem 2rem",
              alignItems: "center",
              display: "inline-block",
              borderRadius: "0px",
              border: "1px solid #666666",
            }}
          >
            VIEW ALL
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
