import React from "react";
import "./collection.css";

const COLLECTIONS_DATA = [
  {
    id: 1,
    slug: "design-studio",
    title: "Design Studio",
    image: "/assets/img/home/design-studio.jpg",
    url: "/collections/design-studio",
  },
  {
    id: 2,
    slug: "shop",
    title: "Shop",
    image: "/assets/img/home/shop.jpg",
    url: "/collections/shop",
  },
  {
    id: 3,
    slug: "projects",
    title: "Projects",
    image: "/assets/img/home/projects.jpg",
    url: "/collections/projects",
  },
  {
    id: 4,
    slug: "custom",
    title: "Custom",
    image: "/assets/img/home/custom.jpg",
    url: "/collections/custom",
  },
  {
    id: 5,
    slug: "product-design",
    title: "Product Design",
    image: "/assets/img/home/product-design.jpg",
    url: "/collections/product-design",
  },
  {
    id: 6,
    slug: "in-the-press",
    title: "In The Press",
    image: "/assets/img/home/in-the-press.jpg",
    url: "/collections/in-the-press",
  },
  {
    id: 7,
    slug: "our-team",
    title: "Our Team",
    image: "/assets/img/home/our-team.jpg",
    url: "/collections/our-team",
  },
  {
    id: 8,
    slug: "about",
    title: "About",
    image: "/assets/img/home/about.jpg",
    url: "/collections/about",
  },
];

const CollectionListWraps = ({ slugs }) => {
  const selectedCollections = COLLECTIONS_DATA.filter((item) =>
    slugs.includes(item.slug)
  );

  return (
    <div className="collection-component-wrapper">
      <div className="collection-container">
        <div className="section-stack">
          <div className="collection-lists">
            {selectedCollections.map((item) => (
              <a key={item.id} href={item.url} className="collection-card">
                <div className="content-over-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="item-title">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionListWraps;

// <CollectionListWraps slugs={["fashion-collection", "accessories"]} />
