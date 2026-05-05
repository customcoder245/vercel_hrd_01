// Generate a personalized before/after AI image for a woman
// based on her age range and current/goal weight from the quiz.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { age, currentWeight, goalWeight, unit } = await req.json();

    const ageDesc = (() => {
      const a = String(age || "").toLowerCase();
      if (a.includes("under") || a.includes("30")) return "in her late 20s to early 30s";
      if (a.includes("40")) return "in her 40s";
      if (a.includes("50")) return "in her 50s";
      if (a.includes("60")) return "in her 60s";
      if (a.includes("70")) return "in her early 70s";
      return "in her 40s";
    })();

    const u = unit === "kg" ? "kg" : "lbs";
    const cw = currentWeight ? `${Math.round(currentWeight)} ${u}` : "her current weight";
    const gw = goalWeight ? `${Math.round(goalWeight)} ${u}` : "her goal weight";

    const prompt = `Create a single photorealistic before-and-after weight loss comparison image of the SAME woman ${ageDesc}, shown as two separate full-body photos placed next to each other with a small clean gap of plain background between them. ABSOLUTELY NO dividing line, NO vertical bar, NO border, NO split-screen seam, NO frame between the two photos — just two standalone photos side by side on the same continuous light-gray studio background.
LEFT photo: she weighs about ${cw}, slightly heavier with a softer midsection, wearing simple neutral activewear (gray sports bra and leggings), neutral expression.
RIGHT photo: the same woman after losing weight to about ${gw}, visibly slimmer and more toned but still natural and realistic (not extreme), clearly thinner waist and arms than the left photo, wearing the same outfit, smiling lightly, same hair, same face, same lighting.
Realistic skin and proportions. Soft even studio lighting, full-body shot from head to mid-thigh, both photos perfectly aligned in height. ABSOLUTELY NO TEXT of any kind anywhere in the image — no "BEFORE", no "AFTER", no "NOW", no "GOAL", no labels, no captions, no watermarks, no numbers, no logos, no dividing line. Pure photographic content only. Photorealistic, magazine quality.`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return new Response(JSON.stringify({ error: "AI gateway error", detail: txt }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const imageUrl = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "No image returned" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
