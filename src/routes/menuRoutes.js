import express from "express";
import { config } from "dotenv";
import pool from "../config/database.js";

// Initialize dotenv
config();

const router = express.Router();

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Build menu tree from flat data
 * @param {Array} flatData - Flat array of menu items
 * @param {Number|null} parentId - Parent ID to filter by
 * @returns {Array} Tree structure
 */
const buildMenuTree = (flatData, parentId = null) => {
  return flatData
    .filter((item) => item.parent_id === parentId)
    .map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      url: item.url,
      icon: item.icon,
      target: item.target,
      orderIndex: item.order_index,
      isActive: item.is_active,
      children: buildMenuTree(flatData, item.id),
    }))
    .sort((a, b) => a.orderIndex - b.orderIndex);
};

/**
 * Execute stored procedure safely
 * @param {String} procedureName - Name of stored procedure
 * @param {Array} params - Parameters for procedure
 * @returns {Promise<Array>} Query results
 */
const callProcedure = async (procedureName, params = []) => {
  try {
    const placeholders = params.map(() => "?").join(", ");
    const query = `CALL ${procedureName}(${placeholders})`;
    const [rows] = await pool.query(query, params);
    return rows[0] || [];
  } catch (error) {
    console.error(`Error calling procedure ${procedureName}:`, error);
    throw error;
  }
};


/**
 * @route   GET /api/menu
 * @desc    Get full menu tree structure
 * @access  Public
 * @returns {Object} { success: true, data: [...], total: number }
 */
router.get("/", async (req, res) => {
  try {
    const flatMenu = await callProcedure("GetMenuFlat");

    if (!flatMenu || flatMenu.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found",
      });
    }

    // Build tree structure
    const menuTree = buildMenuTree(flatMenu);

    res.json({
      success: true,
      data: menuTree,
      total: flatMenu.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/flat
 * @desc    Get menu in flat structure (no nesting)
 * @access  Public
 * @returns {Object} { success: true, data: [...] }
 */
router.get("/flat", async (req, res) => {
  try {
    const flatMenu = await callProcedure("GetMenuFlat");

    res.json({
      success: true,
      data: flatMenu,
      total: flatMenu.length,
    });
  } catch (error) {
    console.error("Error fetching flat menu:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch flat menu",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/level/:level
 * @desc    Get menu items by level (1, 2, or 3)
 * @access  Public
 * @param   {Number} level - Menu level (1=sections, 2=categories, 3=items)
 * @returns {Object} { success: true, level: number, data: [...] }
 */
router.get("/level/:level", async (req, res) => {
  try {
    const level = parseInt(req.params.level);

    // Validate level
    if (isNaN(level) || level < 1 || level > 3) {
      return res.status(400).json({
        success: false,
        message: "Level must be 1, 2, or 3",
      });
    }

    const menuItems = await callProcedure("GetMenuByLevel", [level]);

    res.json({
      success: true,
      level: level,
      data: menuItems,
      total: menuItems.length,
    });
  } catch (error) {
    console.error("Error fetching menu by level:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu by level",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/:id/children
 * @desc    Get children of a specific menu item
 * @access  Public
 * @param   {Number} id - Parent menu item ID
 * @returns {Object} { success: true, parentId: number, data: [...] }
 */
router.get("/:id/children", async (req, res) => {
  try {
    const parentId = parseInt(req.params.id);

    if (isNaN(parentId) || parentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent ID",
      });
    }

    const children = await callProcedure("GetMenuChildren", [parentId]);

    res.json({
      success: true,
      parentId: parentId,
      data: children,
      total: children.length,
    });
  } catch (error) {
    console.error("Error fetching menu children:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu children",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/slug/:slug
 * @desc    Get menu item by slug
 * @access  Public
 * @param   {String} slug - Menu item slug
 * @returns {Object} { success: true, data: {...} }
 */
router.get("/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug || slug.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }

    const menuItems = await callProcedure("GetMenuBySlug", [slug]);

    if (menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Menu item with slug '${slug}' not found`,
      });
    }

    res.json({
      success: true,
      data: menuItems[0],
    });
  } catch (error) {
    console.error("Error fetching menu by slug:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu by slug",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/:id/breadcrumb
 * @desc    Get breadcrumb path for a menu item
 * @access  Public
 * @param   {Number} id - Menu item ID
 * @returns {Object} { success: true, data: [...] }
 */
router.get("/:id/breadcrumb", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);

    if (isNaN(itemId) || itemId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    const breadcrumb = await callProcedure("GetMenuBreadcrumb", [itemId]);

    if (breadcrumb.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${itemId} not found`,
      });
    }

    res.json({
      success: true,
      data: breadcrumb,
    });
  } catch (error) {
    console.error("Error fetching breadcrumb:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch breadcrumb",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/search
 * @desc    Search menu items by keyword
 * @access  Public
 * @query   {String} q - Search keyword (min 2 characters)
 * @returns {Object} { success: true, keyword: string, data: [...] }
 */
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q || "";

    if (keyword.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search keyword must be at least 2 characters",
      });
    }

    const results = await callProcedure("SearchMenu", [keyword]);

    res.json({
      success: true,
      keyword: keyword,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error("Error searching menu:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search menu",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/tree
 * @desc    Get full menu tree in old format (compatible with frontend)
 * @access  Public
 * @returns {Object} { success: true, data: { left: [...] } }
 */
router.get("/tree", async (req, res) => {
  try {
    const treeData = await callProcedure("GetMenuTree");

    // Transform to old format
    const sections = {};

    treeData.forEach((row) => {
      const sectionId = row.section_id;
      const categoryId = row.category_id;
      const itemId = row.item_id;

      // Create section if not exists
      if (!sections[sectionId]) {
        sections[sectionId] = {
          id: sectionId,
          title: row.section_title,
          slug: row.section_slug,
          url: row.section_url,
          icon: row.section_icon,
          items: [],
        };
      }

      // Find or create category
      if (categoryId) {
        let category = sections[sectionId].items.find(
          (c) => c.id === categoryId
        );
        if (!category) {
          category = {
            id: categoryId,
            name: row.category_title,
            slug: row.category_slug,
            url: row.category_url,
            subItems: [],
          };
          sections[sectionId].items.push(category);
        }

        // Add item to category
        if (itemId) {
          category.subItems.push({
            id: itemId,
            name: row.item_title,
            slug: row.item_slug,
            href: row.item_url,
          });
        }
      }
    });

    // Convert object to array
    const menuData = {
      left: Object.values(sections),
    };

    res.json({
      success: true,
      data: menuData,
    });
  } catch (error) {
    console.error("Error fetching menu tree:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu tree",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/:id
 * @desc    Get single menu item by ID
 * @access  Public
 * @param   {Number} id - Menu item ID
 * @returns {Object} { success: true, data: {...} }
 */
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const [rows] = await pool.query(
      "SELECT * FROM menu_items WHERE id = ? AND is_active = TRUE",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/stats
 * @desc    Get menu statistics
 * @access  Public
 * @returns {Object} { success: true, stats: {...} }
 */
router.get("/stats/summary", async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total_items,
        SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END) as level1_count,
        SUM(CASE WHEN parent_id IN (SELECT id FROM menu_items WHERE parent_id IS NULL) THEN 1 ELSE 0 END) as level2_count,
        SUM(CASE WHEN is_active = TRUE THEN 1 ELSE 0 END) as active_items,
        SUM(CASE WHEN is_active = FALSE THEN 1 ELSE 0 END) as inactive_items
      FROM menu_items
    `);

    res.json({
      success: true,
      stats: stats[0],
    });
  } catch (error) {
    console.error("Error fetching menu stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler for undefined routes
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ============================================
// EXPORT ROUTER
// ============================================

export default router;
