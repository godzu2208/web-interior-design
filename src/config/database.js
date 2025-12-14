import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

// ============================================
// SUPABASE CONNECTION
// ============================================

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables in .env");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// TEST CONNECTION
// ============================================

const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("✗ Database connection failed:", error.message);
      return;
    }

    console.log("✓ Supabase PostgreSQL connected successfully!");
    console.log(`  URL: ${supabaseUrl}`);
  } catch (error) {
    console.error("✗ Connection test error:", error.message);
  }
};

testConnection();

export default supabase;
