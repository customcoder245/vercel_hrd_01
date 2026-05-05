export interface HormoneScores {
  insulin: number;
  cortisol: number;
  estrogen: number;
}

export type HormonePattern = "Insulin" | "Cortisol" | "Estrogen";

export interface HormoneResult {
  primary: HormonePattern;
  secondary: HormonePattern | null;
  scores: HormoneScores;
  signals: string[];
  radarData: { axis: string; value: number }[];
}

export function scoreHormonePatterns(
  answers: Record<string, string | string[] | number>
): HormoneResult {
  const scores: HormoneScores = { insulin: 0, cortisol: 0, estrogen: 0 };

  // --- Frustration (multi-select) ---
  const frustration = answers.frustration;
  const frustrations = Array.isArray(frustration) ? frustration : typeof frustration === "string" ? [frustration] : [];

  frustrations.forEach((f) => {
    if (f.includes("belly")) { scores.insulin += 2; scores.cortisol += 2; }
    if (f.includes("tired") || f.includes("Feeling tired")) { scores.cortisol += 1; scores.estrogen += 1; }
    if (f.includes("Cravings")) { scores.insulin += 2; }
    if (f.includes("Waking")) { scores.cortisol += 2; }
    if (f.includes("Brain fog")) { scores.estrogen += 1; scores.cortisol += 1; }
    if (f.includes("bloated")) { scores.estrogen += 1; }
  });

  // --- Sleep pattern ---
  const sleep = answers.sleepPattern as string || "";
  if (sleep.includes("2–4am")) { scores.cortisol += 3; }
  if (sleep.includes("several times")) { scores.cortisol += 2; scores.estrogen += 1; }
  if (sleep.includes("struggle to fall")) { scores.cortisol += 1; }
  if (sleep.includes("still wake tired")) { scores.estrogen += 2; }

  // --- 3am wake ---
  const threeAm = answers.threeAmWake as string || "";
  if (threeAm === "Often") { scores.cortisol += 3; }
  if (threeAm === "Sometimes") { scores.cortisol += 1; }

  // --- Energy drop ---
  const energy = answers.energyDrop as string || "";
  if (energy.includes("Afternoon")) { scores.cortisol += 2; scores.insulin += 1; }
  if (energy.includes("low most of the day")) { scores.cortisol += 2; scores.estrogen += 1; }
  if (energy.includes("Morning")) { scores.cortisol += 1; }

  // --- Cravings timing ---
  const cravings = answers.cravingsTiming as string || "";
  if (cravings.includes("Late at night")) { scores.insulin += 2; scores.cortisol += 1; }
  if (cravings.includes("Shortly after meals")) { scores.insulin += 3; }
  if (cravings.includes("stressed")) { scores.cortisol += 2; scores.insulin += 1; }
  if (cravings.includes("Afternoon")) { scores.insulin += 1; scores.cortisol += 1; }

  // --- Stress eating ---
  const stress = answers.stressEating as string || "";
  if (stress.includes("sugar") || stress.includes("carbs")) { scores.insulin += 2; scores.cortisol += 2; }
  if (stress.includes("snack")) { scores.insulin += 2; scores.cortisol += 1; }
  if (stress.includes("wired")) { scores.cortisol += 3; }

  // --- Recent symptoms (multi-select) ---
  const symptoms = answers.recentSymptoms;
  const symptomList = Array.isArray(symptoms) ? symptoms : typeof symptoms === "string" ? [symptoms] : [];

  symptomList.forEach((s) => {
    if (s.includes("belly")) { scores.insulin += 1; scores.cortisol += 1; }
    if (s.includes("Brain fog")) { scores.estrogen += 1; }
    if (s.includes("Bloating")) { scores.estrogen += 1; }
    if (s.includes("Mood swings")) { scores.estrogen += 2; }
    if (s.includes("sleep") || s.includes("waking")) { scores.cortisol += 1; }
    if (s.includes("Anxiety")) { scores.cortisol += 2; }
    if (s.includes("fatigue") || s.includes("motivation")) { scores.cortisol += 1; scores.estrogen += 1; }
  });

  // --- Metabolism feel ---
  const metab = answers.metabolismFeel as string || "";
  if (metab.includes("Much slower")) { scores.estrogen += 3; scores.insulin += 1; }
  if (metab.includes("Slightly slower")) { scores.estrogen += 1; }

  // --- Hormone stage ---
  const stage = answers.hormoneStage as string || "";
  if (stage.includes("perimenopause")) { scores.estrogen += 3; }
  if (stage.includes("menopause")) { scores.estrogen += 4; }
  if (stage.includes("unpredictable")) { scores.estrogen += 2; }

  // --- Body now ---
  const bodyNow = answers.bodyNow as string || "";
  if (bodyNow.includes("gain weight")) { scores.insulin += 1; scores.estrogen += 1; }
  if (bodyNow.includes("shape has changed")) { scores.estrogen += 2; }
  if (bodyNow.includes("bloated")) { scores.estrogen += 1; }
  if (bodyNow.includes("energy")) { scores.cortisol += 1; }
  if (bodyNow.includes("cravings")) { scores.insulin += 2; }

  // --- Body change area (multi-select) ---
  const areas = answers.bodyChangeArea;
  const areaList = Array.isArray(areas) ? areas : typeof areas === "string" ? [areas] : [];
  if (areaList.includes("Belly")) { scores.cortisol += 1; scores.insulin += 1; }

  // Determine primary & secondary
  const sorted = (Object.entries(scores) as [HormonePattern, number][])
    .map(([pattern, score]) => ({ pattern: pattern.charAt(0).toUpperCase() + pattern.slice(1) as HormonePattern, score }))
    .sort((a, b) => b.score - a.score);

  const primary = sorted[0].pattern;
  const secondary = sorted[1].score >= sorted[0].score * 0.6 ? sorted[1].pattern : null;

  // Build signals from answers
  const signals: string[] = [];
  if (sleep.includes("2–4am") || threeAm === "Often") signals.push("Night waking pattern detected");
  if (frustrations.some(f => f.includes("Cravings")) || cravings.includes("Shortly after meals")) signals.push("Strong craving signals");
  if (frustrations.some(f => f.includes("belly")) || areaList.includes("Belly")) signals.push("Midsection weight accumulation");
  if (energy.includes("Afternoon") || energy.includes("low most of the day")) signals.push("Energy instability detected");
  if (stage.includes("perimenopause") || stage.includes("menopause")) signals.push("Hormonal transition phase");
  if (metab.includes("slower")) signals.push("Metabolic slowdown indicators");
  if (stress.includes("sugar") || stress.includes("snack")) signals.push("Stress-driven eating pattern");
  if (symptomList.some(s => s.includes("Mood") || s.includes("Anxiety"))) signals.push("Mood regulation disruption");

  // Take top 4
  const topSignals = signals.slice(0, 4);
  if (topSignals.length < 3) {
    const fallbacks = ["Metabolic adaptation signals", "Hormonal rhythm disruption", "Nutrient timing sensitivity"];
    while (topSignals.length < 3) topSignals.push(fallbacks[topSignals.length - signals.length] || "Metabolic pattern detected");
  }

  // Radar data - normalized to 0-100 scale
  const maxScore = Math.max(scores.insulin, scores.cortisol, scores.estrogen, 1);
  const normalize = (v: number) => Math.round(Math.min((v / maxScore) * 85 + 15, 100));

  // Derive additional axes from answers
  const cravingScore = (frustrations.some(f => f.includes("Cravings")) ? 40 : 20)
    + (cravings.includes("Shortly after meals") ? 30 : cravings.includes("Late") ? 20 : 10)
    + (stress.includes("sugar") ? 20 : 0);

  const sleepScore = (sleep.includes("2–4am") ? 40 : sleep.includes("several") ? 30 : sleep.includes("tired") ? 25 : 10)
    + (threeAm === "Often" ? 35 : threeAm === "Sometimes" ? 15 : 0);

  const energyScore = (energy.includes("low most") ? 80 : energy.includes("Afternoon") ? 60 : energy.includes("Morning") ? 50 : 25);

  const fatStorageScore = (areaList.includes("Belly") ? 40 : 20)
    + (bodyNow.includes("gain weight") ? 30 : bodyNow.includes("shape") ? 25 : 10)
    + (metab.includes("Much slower") ? 20 : 10);

  const stressScore = (stress.includes("wired") ? 70 : stress.includes("sugar") ? 60 : stress.includes("snack") ? 50 : 20)
    + (symptomList.some(s => s.includes("Anxiety")) ? 20 : 0);

  const cap = (v: number) => Math.min(Math.max(v, 20), 95);

  const radarData = [
    { axis: "Cravings", value: cap(cravingScore) },
    { axis: "Sleep Disruption", value: cap(sleepScore) },
    { axis: "Energy Stability", value: cap(100 - energyScore) },
    { axis: "Fat Storage", value: cap(fatStorageScore) },
    { axis: "Stress Response", value: cap(stressScore) },
  ];

  return { primary, secondary, scores, signals: topSignals, radarData };
}

export const patternDescriptions: Record<HormonePattern, {
  title: string;
  mechanism: string;
  symptoms: string[];
}> = {
  Cortisol: {
    title: "Cortisol Pattern",
    mechanism: "Elevated cortisol signals can cause the body to store fat more easily, particularly around the midsection. It can also affect sleep, cravings, and energy levels — creating a cycle that makes traditional dieting feel ineffective.",
    symptoms: [
      "Waking between 2–4am",
      "Stubborn belly weight",
      "Afternoon fatigue",
      "Stronger cravings under stress",
    ],
  },
  Insulin: {
    title: "Insulin Pattern",
    mechanism: "When insulin signaling becomes disrupted, your body converts more of what you eat into stored fat instead of usable energy. This can trigger strong cravings, energy crashes, and make weight loss feel nearly impossible — even when you're eating well.",
    symptoms: [
      "Strong sugar or carb cravings",
      "Energy crashes after meals",
      "Hunger shortly after eating",
      "Weight gain around the midsection",
    ],
  },
  Estrogen: {
    title: "Estrogen Pattern",
    mechanism: "As estrogen levels shift during perimenopause and menopause, your metabolism naturally slows and fat distribution changes. This can lead to weight gain in new areas, disrupted sleep, and a feeling that your body no longer responds to diet the way it used to.",
    symptoms: [
      "Metabolism slower than before",
      "Body composition changes",
      "Disrupted sleep patterns",
      "Fat redistribution to new areas",
    ],
  },
};
