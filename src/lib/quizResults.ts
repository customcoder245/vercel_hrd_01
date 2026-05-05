import { QuizResults } from "@/types/quiz";

export function generateResults(answers: Record<string, string | string[] | number>): QuizResults {
  const frustration = answers.frustration as string || "Weight collecting around my belly";
  const currentDiet = answers.currentDiet as string || "No specific diet";
  const activity = answers.activity as string || "Light activity (occasional walks etc.)";
  const gender = answers.gender as string || "Female";
  const weight = answers.weight as number || 160;
  const goalWeight = answers.goalWeight as number || 140;
  const heightInches = answers.height as number || 66;
  const ageRaw = answers.age as string || "40–49";
  const age = ageRaw;
  const stressEating = answers.stressEating as string || "Stress doesn't affect my eating much";
  const energyDrop = answers.energyDrop as string || "Afternoon";
  const metabolismFeel = answers.metabolismFeel as string || "Slightly slower";

  // BMI calculation
  const heightM = heightInches * 0.0254;
  const weightKg = weight * 0.4536;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  const bmiCategory = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";

  // Plan name based on primary frustration
  const planNames: Record<string, string> = {
    "Weight collecting around my belly": "Belly Fat Reset Plan",
    "Low energy even when I sleep": "Energy Reset Plan",
    "Cravings that feel harder to control": "Cravings Reset Plan",
    "Poor sleep or waking during the night": "Sleep & Recovery Plan",
    "Brain fog or trouble focusing": "Mental Clarity Reset Plan",
    "Feeling bloated or inflamed": "Anti-Inflammation Reset Plan",
  };

  // Calories
  const baseCalories = gender === "Male" ? 1800 : 1500;
  const activityMultiplier: Record<string, number> = {
    "Exercise several times per week": 1.4,
    "Moderate activity some weeks": 1.25,
    "Light activity like walking": 1.1,
    "Mostly sedentary": 1,
  };
  const mult = activityMultiplier[activity] || 1.1;
  const calories = Math.round(baseCalories * mult);
  const calorieRange = `${calories - 100}–${calories + 100}`;

  // Macros
  const macros = frustration.includes("energy") || frustration.includes("Energy")
    ? { protein: 25, carbs: 45, fat: 30 }
    : frustration.includes("Weight") || frustration.includes("belly")
    ? { protein: 30, carbs: 35, fat: 35 }
    : { protein: 25, carbs: 40, fat: 35 };

  // Metabolic profile
  const ageNum = age.includes("50") || age.includes("60") ? 55 : age.includes("40") ? 45 : 35;
  const metabolicProfile = ageNum >= 45
    ? "Age-Related Hormonal Shift"
    : stressEating.includes("sugar") || stressEating.includes("snack")
    ? "Stress-Driven Hormonal Pattern"
    : metabolismFeel.includes("Much slower")
    ? "Metabolic Slowdown Pattern"
    : "Standard Metabolic Profile";

  const metabolicDescription = "Based on the analysis of your profile, your metabolism may benefit from a more balanced approach to eating. The Hormone Reset Diet works with your body's natural rhythms, making it easier to lose weight sustainably. This plan includes whole foods, clear portions and a daily format built specifically for fat loss and long-term health.";

  // Weight loss estimate (in lbs)
  const weightDiff = weight - goalWeight;
  const estimatedWeightLoss = `${Math.min(weightDiff, 14)}–${Math.min(weightDiff, 20)} lbs in 8 weeks`;

  // Eating style
  const eatingStyle = currentDiet === "Hormone Reset Diet style" ? "Hormone Reset Plan"
    : currentDiet === "Vegetarian" || currentDiet === "Vegan" ? "Plant-Forward Hormone Reset"
    : currentDiet === "Low-carb / Keto" ? "Low-Carb Hormone Reset"
    : "Balanced Hormone Reset";

  // Guidance style
  const guidanceStyle = activity.includes("regularly") || activity.includes("Moderate")
    ? "Structured Support"
    : stressEating.includes("sugar") || stressEating.includes("snack")
    ? "Gentle Guidance"
    : energyDrop.includes("unstable")
    ? "Flexible Routine"
    : "Simple Daily Structure";

  const profileSummary = [
    { label: "Age Group", value: age },
    { label: "Weight Goal", value: `Lose ${weightDiff > 0 ? weightDiff : 0} lbs` },
    { label: "Main Focus", value: frustration },
    { label: "Current BMI", value: `${bmi} (${bmiCategory})` },
    { label: "Eating Style", value: eatingStyle },
    { label: "Guidance Style", value: guidanceStyle },
  ];

  // Progress timeline
  const progressTimeline = [
    { phase: "Phase 1", days: "Days 1–7", results: ["Water flushed out", "Stabilized hunger"] },
    { phase: "Phase 2", days: "Days 8–14", results: ["Waist reduction", "Boosted energy"] },
    { phase: "Phase 3", days: "Days 15–21", results: ["Visible fat loss", "Healthier metabolism"] },
    { phase: "Phase 4", days: "Days 22–30", results: ["Sustainable fat loss", "Improved hormone balance"] },
  ];

  // Recommendations
  const recs: string[] = [];
  recs.push(`Focus on addressing ${frustration.toLowerCase()} with hormone-supportive foods`);
  if (currentDiet !== "No specific diet") recs.push(`All meals adapted for your ${currentDiet.toLowerCase()} preferences`);
  if (frustration.includes("bloated")) recs.push("Include gut-friendly fermented foods and reduce bloating triggers");
  if (energyDrop.includes("unstable") || energyDrop.includes("Morning")) recs.push("Prioritize complex carbs and iron-rich greens for sustained energy");
  recs.push("Hydrate with lemon water and herbal teas throughout the day");

  // Meals
  const meals = [
    { meal: "Breakfast", description: "Hormone-balancing smoothie bowl with flaxseed, berries & protein" },
    { meal: "Lunch", description: "Anti-inflammatory salad with leafy greens, salmon & avocado" },
    { meal: "Snack", description: "Hummus with cucumber & bell pepper sticks" },
    { meal: "Dinner", description: "Herb-crusted chicken with roasted cruciferous vegetables" },
  ];

  // Lifestyle tips
  const lifestyleTips = [
    "Walk 20–30 minutes after your largest meal to improve digestion",
    "Reduce alcohol to support hormone balance and sleep quality",
    "Prioritize 7–8 hours of sleep for optimal hormone regulation",
    "Build habits gradually — consistency beats perfection",
  ];

  // Coach message
  const coachMessage = `Based on your profile, your personalized plan focuses on addressing ${frustration.toLowerCase()} through real-food, hormone-balancing meals.\n\nYour metabolic profile (${metabolicProfile}) means we've tailored your nutrient timing and food choices for maximum impact.\n\nMost people notice a difference in energy within 5–7 days. You've got this — the Hormone Reset Diet isn't about restriction, it's about eating the right foods to support your body's natural balance. 🌿`;

  return {
    planName: planNames[frustration] || "Custom Hormone Reset Diet Plan",
    headline: `We've Built Your Perfect Hormone Reset Diet Plan`,
    calorieRange,
    macros,
    recommendations: recs,
    mealSnapshot: meals,
    lifestyleTips,
    coachMessage,
    bmi,
    bmiCategory,
    metabolicProfile,
    metabolicDescription,
    progressTimeline,
    estimatedWeightLoss,
    profileSummary,
  };
}
