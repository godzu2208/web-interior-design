import express from "express";
import supabase from "../config/database.js";

const router = express.Router();

/**
 * Build menu tree from flat data
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
 * @route   GET /api/menu
 * @desc    Get full menu tree structure
 */
router.get("/", async (req, res) => {
  try {
    console.log("🔄 Fetching menu from Supabase...");

    const { data: flatMenu, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    if (!flatMenu || flatMenu.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found",
      });
    }

    const menuTree = buildMenuTree(flatMenu);
    console.log("✅ Menu fetched successfully:", menuTree.length, "items");

    res.json({
      success: true,
      data: menuTree,
      total: flatMenu.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Error fetching menu:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/**
 * @route   GET /api/menu/flat
 * @desc    Get menu in flat structure
 */
router.get("/flat", async (req, res) => {
  try {
    const { data: flatMenu, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) throw error;

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
 * @desc    Get menu items by level
 */
router.get("/level/:level", async (req, res) => {
  try {
    const level = parseInt(req.params.level);

    if (isNaN(level) || level < 1 || level > 3) {
      return res.status(400).json({
        success: false,
        message: "Level must be 1, 2, or 3",
      });
    }

    // For Supabase: level 1 = no parent, level 2 = has parent but no children, etc
    let query = supabase
      .from("menu_items")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (level === 1) {
      query = query.is("parent_id", null);
    }

    const { data: menuItems, error } = await query;

    if (error) throw error;

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

    const { data: children, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("parent_id", parentId)
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) throw error;

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
 * @route   GET /api/menu/:id
 * @desc    Get single menu item by ID
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

    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: data,
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
 * @route   GET /api/menu/stats/summary
 * @desc    Get menu statistics
 */
router.get("/stats/summary", async (req, res) => {
  try {
    const { data: allItems, error } = await supabase
      .from("menu_items")
      .select("*");

    if (error) throw error;

    const stats = {
      total_items: allItems.length,
      active_items: allItems.filter((i) => i.is_active).length,
      inactive_items: allItems.filter((i) => !i.is_active).length,
      level1_count: allItems.filter((i) => !i.parent_id).length,
    };

    res.json({
      success: true,
      stats: stats,
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

export default router;
