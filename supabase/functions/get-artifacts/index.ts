// Deno edge function
// Returns the caller's artifacts with RLS enforcing owner scope.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify JWT (Authorization: Bearer <token>)
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!token) return new Response(JSON.stringify({ error: "Missing bearer token" }), { status: 401 });

    const supa = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    // Get run_id from query params
    const url = new URL(req.url);
    const runId = url.searchParams.get("run_id");
    
    if (!runId) {
      return new Response(JSON.stringify({ error: "Missing run_id parameter" }), { status: 400 });
    }

    // RLS ensures we only see the caller's artifacts
    const { data, error } = await supa
      .from("artifacts")
      .select("*")
      .eq("run_id", runId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ artifacts: data }), { 
      headers: { "content-type": "application/json" } 
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e.message || e) }), { status: 400 });
  }
});
