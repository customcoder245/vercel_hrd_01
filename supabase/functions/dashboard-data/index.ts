import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, dateRange } = await req.json();

    // Validate password server-side
    const expectedPassword = Deno.env.get("DASHBOARD_PASSWORD");
    if (!expectedPassword || password !== expectedPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let query = supabase
      .from("quiz_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (dateRange > 0) {
      // Calculate boundary in Australian Eastern time (AEST UTC+10 / AEDT UTC+11)
      const nowUtc = Date.now();
      // Format current time in Australia/Sydney to find local midnight
      const sydneyDate = new Date(nowUtc).toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" }); // YYYY-MM-DD
      // sydneyDate is today in Sydney; subtract (dateRange-1) days
      const sinceLocal = new Date(sydneyDate + "T00:00:00");
      sinceLocal.setDate(sinceLocal.getDate() - (dateRange - 1));
      const sinceStr = sinceLocal.toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
      // Convert Sydney midnight to UTC
      // Parse as Sydney midnight: we need the UTC equivalent
      // Sydney is UTC+10 (AEST) or UTC+11 (AEDT)
      // Use Intl to get the offset
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Australia/Sydney",
        timeZoneName: "shortOffset",
      });
      const parts = formatter.formatToParts(new Date());
      const tzPart = parts.find((p) => p.type === "timeZoneName")?.value || "+10";
      const offsetMatch = tzPart.match(/([+-]?\d+)/);
      const offsetHours = offsetMatch ? parseInt(offsetMatch[1]) : 10;
      // Sydney midnight = sinceStr T00:00:00+offset
      const sinceUtc = new Date(`${sinceStr}T00:00:00.000+${String(offsetHours).padStart(2, "0")}:00`);
      query = query.gte("created_at", sinceUtc.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
