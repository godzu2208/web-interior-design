import React, { useState, useEffect } from "react";

const blogPostLists = [
  {
    id: 1,
    meta: "marie claire",
    title: "Creative Haven",
    slugs: "creative-heaven",
    img: "/assets/img/home/creative-heaven.jpg",
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFilteredPosts = () => {
    if (slug === "all") {
      return blogPostLists;
    }

    const slugArray =
      typeof slug === "string" ? slug.split(",").map((s) => s.trim()) : slug;

    return blogPostLists.filter((post) => slugArray.includes(post.slugs));
  };

  const filteredPosts = getFilteredPosts();
  const isMobile = windowWidth < 700;

  // Auto slide mỗi 5 giây
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, filteredPosts.length]);

  // Xử lý swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Vuốt sang trái → tiếp theo
        setCurrentSlide((prev) => (prev + 1) % filteredPosts.length);
      } else {
        // Vuốt sang phải → trước
        setCurrentSlide((prev) =>
          prev === 0 ? filteredPosts.length - 1 : prev - 1
        );
      }
    }
  };

  // Render Slideshow cho Mobile
  if (isMobile) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "96vw",
            overflow: "hidden",
            touchAction: "pan-y",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={filteredPosts[currentSlide]?.img}
            alt={filteredPosts[currentSlide]?.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
              userSelect: "none",
            }}
            draggable="false"
          />
        </div>

        <div
          className="mobile-slide-info"
          style={{
            padding: "1.5rem 0",
            backgroundColor: "#fff",
          }}
        >
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
            {filteredPosts[currentSlide]?.meta}
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#000",
              margin: "0.5rem 0 0 0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {filteredPosts[currentSlide]?.title}
          </h3>
        </div>

        <div
          className="mobile-indicators"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            padding: "1.5rem 0",
            backgroundColor: "#fff",
          }}
        >
          {filteredPosts.map((_, index) => (
            <div
              key={index}
              style={{
                width: currentSlide === index ? "24px" : "16px",
                height: "2px",
                backgroundColor:
                  currentSlide === index ? "#000" : "rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render Grid cho Desktop (3 columns)
  return (
    <div
      className="blog-posts-list"
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(calc(33.333% - 4vw), 1fr))",
        gap: "4vw",
        width: "100%",
      }}
    >
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="post-item"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <a
            href={`/blog/${post.slugs}`}
            className="card-img-wrapper"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              overflow: "hidden",
              marginBottom: "1.5rem",
              width: "100%",
              height: "33vw",
              flexShrink: 0,
            }}
            onMouseEnter={() => setHoveredId(post.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={post.img}
              alt={post.alt}
              loading="lazy"
              onError={(e) => {
                e.target.src = "/assets/img/placeholder.jpg";
              }}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: hoveredId === post.id ? "scale(1.05)" : "scale(1)",
              }}
            />
          </a>
          <div
            className="card-info"
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <div
              className="card-info-meta"
              style={{
                fontSize: windowWidth > 1920 ? "0.8rem" : "0.4rem",
                color: "#666",
                fontWeight: "700",
                marginBottom: "0.8rem",
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
                  fontSize: windowWidth > 1920 ? "1.25rem" : "0.8rem",
                  fontWeight: "700",
                  color: "#000",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.185em",
                  transition: "color 0.3s ease",
                  cursor: "pointer",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#666")}
                onMouseLeave={(e) => (e.target.style.color = "#000")}
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
