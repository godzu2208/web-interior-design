import supabase from "../config/database.js";

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
      isActive: item.is_active ? 1 : 0,
      orderIndex: item.order_index,
      children: buildMenuTree(flatData, item.id), // Recursive
    }))
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
};

export async function getMenuItems(req, res) {
  try {
    console.log("🔄 Fetching menu items from Supabase...");

    const { data: flatMenu, error } = await supabase
      .from("menu_items")
      .select("*")
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

    // Build tree structure với root items (parent_id = null)
    const menuTree = buildMenuTree(flatMenu);
    console.log("✅ Menu tree built:", menuTree.length, "root items");

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
}

export async function getMenuItemById(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: error.message,
    });
  }
}

export async function createMenuItem(req, res) {
  try {
    const { name, description, price, category } = req.body;

    const { data, error } = await supabase
      .from("menu_items")
      .insert([{ name, description, price, category }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message,
    });
  }
}

export async function updateMenuItem(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from("menu_items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: "Menu item updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update menu item",
      error: error.message,
    });
  }
}

export async function deleteMenuItem(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete menu item",
      error: error.message,
    });
  }
}
