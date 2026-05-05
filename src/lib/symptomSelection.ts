/**
 * Dynamic symptom selection based on quiz answers.
 * Returns 3–4 symptoms for the diagnosis section.
 */

const FALLBACK_SYMPTOMS = [
  "Stubborn weight around the midsection",
  "Energy crashes during the day",
  "Broken sleep or frequent 3am wake-ups",
  "Slow metabolism compared to before",
];

export function selectSymptoms(answers: Record<string, string | string[] | number>): string[] {
  const symptomCounts = new Map<string, number>();

  const add = (symptom: string) => {
    symptomCounts.set(symptom, (symptomCounts.get(symptom) || 0) + 1);
  };

  // frustration (Q1)
  const frustration = answers.frustration as string;
  if (frustration?.includes("Weight collecting")) {
    add("Stubborn weight around the midsection");
    add("Increased belly fat despite dieting");
  } else if (frustration?.includes("tired even after")) {
    add("Low daily energy or fatigue");
  } else if (frustration?.includes("Cravings")) {
    add("Strong sugar cravings");
  } else if (frustration?.includes("Waking during")) {
    add("Broken sleep or frequent 3am wake-ups");
  } else if (frustration?.includes("Brain fog")) {
    add("Brain fog or poor concentration");
  } else if (frustration?.includes("bloated")) {
    add("Feeling bloated or inflamed");
  }

  // bodyNow (Q3)
  const bodyNow = answers.bodyNow as string;
  if (bodyNow?.includes("gain weight more easily")) {
    add("Slow metabolism compared to before");
    add("Increased belly fat despite dieting");
  } else if (bodyNow?.includes("bloated")) {
    add("Feeling bloated or inflamed");
  } else if (bodyNow?.includes("energy feels much lower")) {
    add("Low daily energy or fatigue");
  } else if (bodyNow?.includes("cravings feel stronger")) {
    add("Strong sugar cravings");
  }

  // sleepPattern (Q5)
  const sleepPattern = answers.sleepPattern as string;
  if (sleepPattern?.includes("2–4am") || sleepPattern?.includes("several times")) {
    add("Broken sleep or frequent 3am wake-ups");
  } else if (sleepPattern?.includes("wake tired")) {
    add("Low daily energy or fatigue");
  }

  // threeAmWake (Q6)
  const threeAmWake = answers.threeAmWake as string;
  if (threeAmWake === "Often" || threeAmWake === "Sometimes") {
    add("Broken sleep or frequent 3am wake-ups");
  }

  // energyDrop (Q7)
  const energyDrop = answers.energyDrop as string;
  if (energyDrop?.includes("Afternoon") || energyDrop?.includes("Morning")) {
    add("Energy crashes during the day");
  } else if (energyDrop?.includes("low most of the day")) {
    add("Low daily energy or fatigue");
    add("Slow metabolism compared to before");
  }

  // cravingsTiming (Q8)
  const cravings = answers.cravingsTiming as string;
  if (cravings?.includes("Late at night") || cravings?.includes("after meals")) {
    add("Strong sugar cravings");
    add("Blood sugar swings after meals");
  } else if (cravings?.includes("stressed")) {
    add("Mood swings or irritability");
  }

  // stressEating (Q9)
  const stress = answers.stressEating as string;
  if (stress?.includes("sugar or carbs")) {
    add("Strong sugar cravings");
  } else if (stress?.includes("snack more")) {
    add("Blood sugar swings after meals");
  } else if (stress?.includes("wired but exhausted")) {
    add("Low daily energy or fatigue");
    add("Mood swings or irritability");
  }

  // recentSymptoms (Q10 multi-select)
  const symptoms = answers.recentSymptoms as string[];
  if (Array.isArray(symptoms)) {
    if (symptoms.some(s => s.includes("Brain fog"))) add("Brain fog or poor concentration");
    if (symptoms.some(s => s.includes("Bloating"))) add("Feeling bloated or inflamed");
    if (symptoms.some(s => s.includes("Mood swings"))) add("Mood swings or irritability");
    if (symptoms.some(s => s.includes("Poor sleep"))) add("Broken sleep or frequent 3am wake-ups");
    if (symptoms.some(s => s.includes("Anxiety"))) add("Anxiety or feeling on edge");
    if (symptoms.some(s => s.includes("Low motivation"))) add("Low daily energy or fatigue");
  }

  // metabolismFeel (Q11)
  const metabolism = answers.metabolismFeel as string;
  if (metabolism?.includes("Much slower")) {
    add("Slow metabolism compared to before");
    add("Increased belly fat despite dieting");
  } else if (metabolism?.includes("Slightly slower")) {
    add("Slow metabolism compared to before");
  }

  // Sort by frequency, pick top 4
  const sorted = [...symptomCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([symptom]) => symptom);

  if (sorted.length >= 4) return sorted.slice(0, 4);

  for (const fallback of FALLBACK_SYMPTOMS) {
    if (!sorted.includes(fallback)) {
      sorted.push(fallback);
    }
    if (sorted.length >= 4) break;
  }

  return sorted.slice(0, 4);
}
