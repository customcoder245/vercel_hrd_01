import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  // Q1 — Biggest goal right now
  {
    id: "biggestDifference",
    slug: "difference",
    type: "single",
    title: "What's your biggest goal right now?",
    subtitle: "Choose the one that matters most to you",
    options: [
      { label: "Lose weight", description: "Reach your healthy weight", icon: "⚖️" },
      { label: "Look better", description: "Transform your appearance", icon: "✨" },
      { label: "Improve my health", description: "Better overall wellness", icon: "❤️" },
      { label: "Balance hormones naturally", description: "Restore hormonal harmony", icon: "🌿" },
      { label: "Increase energy", description: "Power through your day", icon: "⚡" },
    ],
  },
  // BREAK — Trusted Hands ("XX women have joined")
  {
    id: "break_trustedHands",
    slug: "trusted",
    type: "break",
    breakType: "trustedHands",
    title: "You're in trusted hands",
  },
  // Q2 — Age
  {
    id: "age",
    slug: "age",
    type: "single",
    title: "How old are you?",
    subtitle: "Your metabolism shifts with age — we'll tailor your plan to your stage of life.",
    options: [
      { label: "Under 40" },
      { label: "40–49" },
      { label: "50–59" },
      { label: "60–69" },
      { label: "70+" },
    ],
  },
  // Q3 — Height
  {
    id: "height",
    slug: "height",
    type: "height",
    title: "What is your height?",
  },
  // Q4 — Current Weight
  {
    id: "weight",
    slug: "weight",
    type: "weight",
    title: "What is your current weight?",
    sliderConfig: { min: 80, max: 400, step: 1, unit: "lbs", defaultValue: 180 },
  },
  // Q5 — Goal Weight
  {
    id: "goalWeight",
    slug: "target",
    type: "weight",
    title: "What is your goal weight?",
    sliderConfig: { min: 80, max: 400, step: 1, unit: "lbs", defaultValue: 150 },
  },
  // Q6 — Activity
  {
    id: "activity",
    slug: "activity",
    type: "single",
    title: "How active are you right now?",
    options: [
      { label: "Exercise several times per week", icon: "🏋️" },
      { label: "Moderate activity", icon: "🚶" },
      { label: "Light activity (walking etc.)", icon: "🌳" },
      { label: "Mostly sedentary", icon: "🪑" },
    ],
  },
  // BREAK — Personal Profile (BMI starting point)
  {
    id: "break_personalProfile",
    slug: "profile",
    type: "break",
    breakType: "personalProfile",
    title: "Your starting point",
  },
  // Q7 — Hormonal journey
  {
    id: "hormoneStage",
    slug: "hormone-stage",
    type: "single",
    title: "Where are you in your hormonal journey?",
    subtitle: "This helps us tailor your plan to your body's current needs",
    options: [
      { label: "My cycles are still regular", icon: "🌸" },
      { label: "My cycles have become unpredictable", icon: "🔄" },
      { label: "I believe I'm in perimenopause", icon: "🌗" },
      { label: "I believe I'm in menopause", icon: "🌑" },
      { label: "I'm not sure", icon: "❔" },
    ],
  },
  // Q8 — Recent changes
  {
    id: "recentSymptoms",
    slug: "recent-changes",
    type: "multi-select",
    title: "What changes have you noticed most recently?",
    subtitle: "Select all that apply",
    options: [
      { label: "Weight collecting around my belly", icon: "🔻" },
      { label: "Feeling tired even after sleeping", icon: "😴" },
      { label: "Cravings feel harder to control", icon: "🍫" },
      { label: "Waking during the night", icon: "🌙" },
      { label: "Brain fog or trouble focusing", icon: "🧠" },
      { label: "Feeling bloated more often", icon: "🫧" },
    ],
  },
  // Q9 — When changes started
  {
    id: "livingLikeThis",
    slug: "how-long",
    type: "single",
    title: "When did you first notice these changes?",
    subtitle: "This helps us understand your journey so far",
    options: [
      { label: "Within the last 6 months", icon: "🗓️" },
      { label: "About 1–2 years ago", icon: "📆" },
      { label: "Gradually over several years", icon: "⏳" },
      { label: "After a stressful life period", icon: "😣" },
      { label: "After a major life change", icon: "🔄" },
    ],
  },
  // BREAK — You're not alone in this
  {
    id: "break_notAloneInThis",
    slug: "not-alone-in-this",
    type: "break",
    breakType: "notAloneInThis",
    title: "You're not alone in this",
  },
  // Q9b — Body description right now
  {
    id: "bodyNow",
    slug: "body-now",
    type: "multi-select",
    title: "Which best describes your body right now?",
    subtitle: "This helps us personalise your plan",
    options: [
      { label: "I gain weight more easily now", icon: "📈" },
      { label: "My body shape has changed", icon: "💎" },
      { label: "I feel bloated more often", icon: "🫧" },
      { label: "My energy feels much lower", icon: "🔋" },
      { label: "My cravings feel stronger", icon: "🍫" },
    ],
  },
  // Q11 — Familiar with hormone balancing
  {
    id: "hormoneFamiliarity",
    slug: "familiar",
    type: "single",
    title: "How familiar are you with balancing your hormones naturally?",
    options: [
      { label: "Very familiar — I've tried it before", icon: "🌟" },
      { label: "Somewhat — I've read about it", icon: "📖" },
      { label: "A little — I've heard of it", icon: "👂" },
      { label: "Not at all — this is new to me", icon: "🆕" },
    ],
  },
  // Q11b — What have you already tried
  {
    id: "triedBefore",
    slug: "tried-before",
    type: "multi-select",
    title: "What have you already tried?",
    subtitle: "Select all that apply",
    options: [
      { label: "Calorie counting", icon: "🔢" },
      { label: "Keto or low-carb", icon: "🥩" },
      { label: "Intermittent fasting", icon: "⏰" },
      { label: "Weight Watchers / similar", icon: "📋" },
      { label: "Exercise programs", icon: "🏃‍♀️" },
      { label: "Supplements", icon: "💊" },
      { label: "GLP-1s", icon: "💉" },
      { label: "Nothing yet", icon: "🤷‍♀️" },
    ],
  },
  // BREAK — What is the Hormone Reset Diet?
  {
    id: "break_whatIsGlp1",
    slug: "glp1",
    type: "break",
    breakType: "whatIsGlp1",
    title: "How does the Hormone Reset Diet work?",
  },
  // Q12 — Name
  {
    id: "name",
    slug: "name",
    type: "text-input",
    title: "What is your name?",
    placeholder: "Enter your first name",
  },
  // BREAK — Weight Projection
  {
    id: "break_projection",
    slug: "projection-preview",
    type: "break",
    breakType: "projectionInline",
    title: "Your 3-Month Weight Projection",
  },
  // Q13 — Target zones
  {
    id: "targetZones",
    slug: "zones",
    type: "body-image-select",
    title: "What are your target zones?",
    subtitle: "Select all that apply",
    options: [
      { label: "Legs", icon: "🦵" },
      { label: "Belly", icon: "🔻" },
      { label: "Arms", icon: "💪" },
      { label: "Butt", icon: "🍑" },
      { label: "Face and neck", icon: "😊" },
    ],
  },
  // BREAK — 92% / You're not alone
  {
    id: "break_eightyPercent",
    slug: "not-alone",
    type: "break",
    breakType: "eightyPercent",
    title: "You're not alone",
  },
  // Q14 — Wake feeling
  {
    id: "wakeFeeling",
    slug: "wake-feeling",
    type: "single",
    title: "How do you feel when you wake up in the morning?",
    options: [
      { label: "I usually wake up tired", icon: "😴" },
      { label: "It varies from day to day", icon: "🔄" },
      { label: "I usually wake up feeling rested", icon: "🌅" },
    ],
  },
  // Q15 — Sleep hours
  {
    id: "sleepHours",
    slug: "sleep-hours",
    type: "single",
    title: "How many hours do you sleep each night?",
    options: [
      { label: "Less than 6 hours", icon: "🕕" },
      { label: "6–7 hours", icon: "🕖" },
      { label: "7–8 hours", icon: "🕗" },
      { label: "More than 8 hours", icon: "🕘" },
    ],
  },
  // Q16 — Wake at night
  {
    id: "threeAmWake",
    slug: "three-am",
    type: "single",
    title: "How often do you wake up in the middle of the night?",
    options: [
      { label: "Rarely or never", icon: "✅" },
      { label: "Occasionally", icon: "🟡" },
      { label: "Several times most nights", icon: "🔴" },
    ],
  },
  // BREAK — Sleep importance
  {
    id: "break_sleepGraphic",
    slug: "sleep-insight",
    type: "break",
    breakType: "sleepGraphic",
    title: "Sleep & your hormones",
  },
  // Q17 — Dietary preferences
  {
    id: "currentDiet",
    slug: "diet",
    type: "single",
    title: "Any dietary preferences or restrictions?",
    options: [
      { label: "No restrictions", icon: "🍽️" },
      { label: "Vegetarian", icon: "🥕" },
      { label: "Vegan", icon: "🌱" },
      { label: "Gluten-free", icon: "📦" },
      { label: "Dairy-free", icon: "🥛" },
      { label: "Pescatarian", icon: "🐟" },
      { label: "Low-carb preference", icon: "🥩" },
    ],
  },
  // Q18 — Meals per day
  {
    id: "mealsPerDay",
    slug: "meals",
    type: "single",
    title: "How many meals a day do you prefer?",
    options: [
      { label: "2 meals", icon: "🍽️" },
      { label: "3 meals", icon: "🍴" },
      { label: "4 meals", icon: "🥄" },
      { label: "5 meals", icon: "🥗" },
    ],
  },
  // Q20 — Eat out
  {
    id: "eatOut",
    slug: "eat-out",
    type: "single",
    title: "How often do you eat out?",
    options: [
      { label: "Rarely", icon: "🏠" },
      { label: "1–2 times per week", icon: "🍽️" },
      { label: "3–5 times per week", icon: "🍴" },
      { label: "Frequently", icon: "🍔" },
    ],
  },
  // Q21 — Water
  {
    id: "waterIntake",
    slug: "water",
    type: "single",
    title: "How much water do you drink a day?",
    options: [
      { label: "Less than 32 oz", icon: "💧" },
      { label: "32–64 oz", icon: "💦" },
      { label: "64–96 oz", icon: "🚰" },
      { label: "100 oz+", icon: "🌊" },
    ],
  },
  // BREAK — Building plan preview
  {
    id: "break_buildingPlan",
    slug: "building-preview",
    type: "break",
    breakType: "buildingPlan",
    title: "We're building you the perfect plan",
  },
  // Q22 — Energy levels
  {
    id: "energyLevels",
    slug: "energy",
    type: "single",
    title: "What are your energy levels throughout the day?",
    options: [
      { label: "Low most of the day", icon: "📉" },
      { label: "Drop in the afternoon", icon: "☀️" },
      { label: "Low before meals", icon: "🍽️" },
      { label: "High and steady", icon: "⚡" },
    ],
  },
  // Q23 — Cravings timing
  {
    id: "cravingsTiming",
    slug: "cravings-timing",
    type: "single",
    title: "When do cravings usually show up?",
    options: [
      { label: "Late at night", icon: "🌙" },
      { label: "Afternoon", icon: "☀️" },
      { label: "Shortly after meals", icon: "🍽️" },
      { label: "When I feel stressed", icon: "😰" },
      { label: "I rarely have cravings", icon: "✅" },
    ],
  },
  // BREAK — Mediterranean stabilises (3-diet comparison)
  {
    id: "break_mediterraneanStabilises",
    slug: "stabilises",
    type: "break",
    breakType: "mediterraneanStabilises",
    title: "A smarter way to support weight loss after 40",
  },
  // Q24 — Confidence
  {
    id: "agreeConfidence",
    slug: "confidence",
    type: "agree-disagree",
    title: "My weight is affecting my confidence",
  },
  // Q25 — Stuck
  {
    id: "agreeStuck",
    slug: "stuck",
    type: "agree-disagree",
    title: "I feel stuck and don't know what works anymore",
  },
  // Q26 — Ready
  {
    id: "agreeReady",
    slug: "ready",
    type: "agree-disagree",
    title: "I'm ready to make a real change",
  },
  // Q27 — Follow likelihood (final)
  {
    id: "followLikelihood",
    slug: "follow-likelihood",
    type: "scale-1-5",
    title: "How likely are you to follow a simple, personalized plan designed for you?",
    subtitle: "Tap the number that best describes you",
  },
];

// Helper to get slug-to-index map
export const slugToIndex = new Map(quizQuestions.map((q, i) => [q.slug, i]));

export const analysisQuestions = [
  {
    id: "commitment",
    title: "How likely are you to finish what you start when it comes to health goals?",
    options: [
      "Very likely — I follow through",
      "I start strong but lose momentum",
      "I struggle to stay consistent",
      "I usually stop once life gets busy",
    ],
  },
  {
    id: "blocker",
    title: "What usually gets in the way when things don't stick?",
    options: [
      "Plans are too complicated",
      "I don't see results quickly enough",
      "My routine changes week to week",
      "I lose motivation over time",
    ],
  },
];
