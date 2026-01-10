// ============================================================================
// Frontend API Service - Call Backend API
// File: fe/src/services/api.js
// ============================================================================

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://web-interior-design-897349070852.asia-east2.run.app/api"
    : "http://localhost:3001/api";
/**
 * Generic API call helper
 */
async function apiCall(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// ============================================================================
// PAGE API
// ============================================================================

/**
 * Fetch page with blocks by slug
 */
export async function getPageBySlug(slug) {
  try {
    const response = await apiCall(`/cms/pages/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

/**
 * Fetch all published pages
 */
export async function getAllPages(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/cms/pages${queryString ? `?${queryString}` : ""}`;
    const response = await apiCall(endpoint);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

// ============================================================================
// MENU API
// ============================================================================

/**
 * Fetch menu by location
 */
export async function getMenuByLocation(location = "primary") {
  try {
    const response = await apiCall(`/cms/menu/${location}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}

/**
 * Fetch flat menu structure
 */
export async function getMenuFlat(location = "primary") {
  try {
    const response = await apiCall(`/cms/menu/${location}`);
    return response.flat || [];
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}

// ============================================================================
// BLOG API
// ============================================================================

/**
 * Fetch blog posts with pagination
 */
export async function getBlogPosts(params = {}) {
  try {
    const queryString = new URLSearchParams({
      limit: 10,
      offset: 0,
      ...params,
    }).toString();

    const response = await apiCall(`/cms/blog?${queryString}`);

    return {
      posts: response.data || [],
      pagination: response.pagination || {},
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], pagination: {} };
  }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  try {
    const response = await apiCall(`/cms/blog/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

/**
 * Fetch featured blog posts
 */
export async function getFeaturedPosts(limit = 3) {
  try {
    const response = await apiCall(`/cms/blog?featured=true&limit=${limit}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

/**
 * Fetch posts by tag
 */
export async function getPostsByTag(tag, limit = 10) {
  try {
    const response = await apiCall(
      `/cms/blog?tag=${encodeURIComponent(tag)}&limit=${limit}`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    return [];
  }
}

// ============================================================================
// COMPONENT API
// ============================================================================

/**
 * Fetch available components (for admin panel)
 */
export async function getComponents(category = null) {
  try {
    const endpoint = category
      ? `/cms/components?category=${category}`
      : "/cms/components";
    const response = await apiCall(endpoint);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching components:", error);
    return [];
  }
}

// ============================================================================
// SEARCH API
// ============================================================================

/**
 * Search pages and content
 */
export async function search(query, type = "all") {
  try {
    if (!query || query.trim().length < 2) {
      return { pages: [], posts: [], total: 0 };
    }

    const response = await apiCall(
      `/cms/search?q=${encodeURIComponent(query)}&type=${type}`
    );

    return {
      ...response.data,
      total: response.total || 0,
    };
  } catch (error) {
    console.error("Error searching:", error);
    return { pages: [], posts: [], total: 0 };
  }
}

// ============================================================================
// SETTINGS API
// ============================================================================

/**
 * Fetch public site settings
 */
export async function getSiteSettings() {
  try {
    const response = await apiCall("/cms/settings");
    return response.data || {};
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

// ============================================================================
// STATS API
// ============================================================================

/**
 * Fetch site statistics
 */
export async function getSiteStats() {
  try {
    const response = await apiCall("/cms/stats");
    return response.data || {};
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check API health
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL.replace("/api", "")}/health`);
    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}

/**
 * Get API base URL (useful for debugging)
 */
export function getApiBaseUrl() {
  return API_BASE_URL;
}
