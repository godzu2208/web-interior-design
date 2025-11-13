import React from "react";

const blogPostLists = [
  {
    id: 1,
    meta: "marie claire",
    title: "Creative Haven",
    slugs: "creative-heaven",
    img: "/assets/img/home/creative-heaven.jpg", // ✅ Thêm / ở đầu
    alt: "Creative Haven",
  },
  {
    id: 2,
    meta: "Home Beautiful",
    title: "Fine Print",
    slugs: "fine-print",
    img: "/assets/img/home/fine-print.jpg",
    alt: "Fine Print",
  },
  {
    id: 3,
    meta: "Better Homes & Gardens",
    title: "Feels Like Home",
    slugs: "feels-like-home",
    img: "/assets/img/home/feels-like-home.jpg",
    alt: "Feels Like Home",
  },
  // ... (thêm / cho tất cả)
  {
    id: 4,
    meta: "Home Beautiful",
    title: "Tastemakers",
    slugs: "tastemakers",
    img: "/assets/img/home/tastemakers.jpg",
    alt: "Tastemakers",
  },
  {
    id: 5,
    meta: "Home Beautiful",
    title: "Neo Classic",
    slugs: "neo-classic",
    img: "/assets/img/home/neo-classic.jpg",
    alt: "Neo Classic",
  },
  {
    id: 6,
    meta: "Paddolife",
    title: "Home Style",
    slugs: "home-style",
    img: "/assets/img/home/home-style.jpg",
    alt: "Home Style",
  },
  {
    id: 7,
    meta: "Belle Magazine",
    title: "Glory Days",
    slugs: "glory-days",
    img: "/assets/img/home/glory-days.jpg",
    alt: "Glory Days",
  },
  {
    id: 8,
    meta: "Belle Magazine",
    title: "Creative Spaces",
    slugs: "creative-spaces",
    img: "/assets/img/home/creative-spaces.jpg",
    alt: "Creative Spaces",
  },
  {
    id: 9,
    meta: "Belle Magazine",
    title: "Match Fit",
    slugs: "match-fit",
    img: "/assets/img/home/match-fit.jpg",
    alt: "Match Fit",
  },
  {
    id: 10,
    meta: "Home Beautiful",
    title: "Rock Solid",
    slugs: "rock-solid",
    img: "/assets/img/home/rock-solid.jpg",
    alt: "Rock Solid",
  },
  {
    id: 11,
    meta: "Belle Magazine",
    title: "House Proud",
    slugs: "house-proud",
    img: "/assets/img/home/house-proud.jpg",
    alt: "House Proud",
  },
  {
    id: 12,
    meta: "House & Garden",
    title: "Kate Nixon",
    slugs: "kate-nixon",
    img: "/assets/img/home/kate-nixon.jpg",
    alt: "Kate Nixon",
  },
  {
    id: 13,
    meta: "House & Garden",
    title: "Light Touch",
    slugs: "light-touch",
    img: "/assets/img/home/light-touch.jpg",
    alt: "Light Touch",
  },
];

const BlogPostList = ({ slug = "all" }) => {
  const getFilteredPosts = () => {
    if (slug === "all") {
      return blogPostLists;
    }

    const slugArray =
      typeof slug === "string" ? slug.split(",").map((s) => s.trim()) : slug;

    return blogPostLists.filter((post) => slugArray.includes(post.slugs));
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div
      className="blog-posts-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // ✅ Responsive
        gap: "3rem",
        width: "100%",
      }}
    >
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-item">
          <a
            href={`/blog/${post.slugs}`}
            className="card-img"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            <img
              src={post.img}
              alt={post.alt}
              loading="lazy"
              onError={(e) => {
                e.target.src = "/assets/img/placeholder.jpg"; // ✅ Fallback
              }}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </a>
          <div className="card-info">
            <div
              className="card-info-meta"
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <span>{post.meta}</span>
            </div>
            <p style={{ margin: 0 }}>
              <a
                href={`/blog/${post.slugs}`}
                className="card-info-des"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#000",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {post.title}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostList;
