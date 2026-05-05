import { motion } from "framer-motion";
import {
  ArrowRight, User, CheckCircle2, AlertTriangle,
  Utensils, Heart, Clock, ShoppingCart, UtensilsCrossed, Gift, BookOpen, MessageCircle,
  Flame, BarChart3, Zap, Star, Activity, Leaf
} from "lucide-react";
import { HormoneResult } from "@/lib/hormonePatterns";

import productMockup from "@/assets/product-mockup-med.webp";
import bestDietBadge from "@/assets/badge-best-diets-2026.svg";
import coachKimberly from "@/assets/coach-kimberly.webp";
import mdLogoWhite from "@/assets/md-white-logo.webp";

// Profile photo imports
import profileF2029 from "@/assets/profile-female-20-29.webp";
import profileF3039 from "@/assets/profile-female-30-39.webp";
import profileF4049 from "@/assets/profile-female-40-49.webp";
import profileF5059 from "@/assets/profile-female-50-59.webp";
import profileF60 from "@/assets/profile-female-60.webp";
import profileM2029 from "@/assets/profile-male-20-29.webp";
import profileM3039 from "@/assets/profile-male-30-39.webp";
import profileM4049 from "@/assets/profile-male-40-49.webp";
import profileM5059 from "@/assets/profile-male-50-59.webp";
import profileM60 from "@/assets/profile-male-60.webp";

interface Props {
  answers: Record<string, string | string[] | number>;
  hormoneResult: HormoneResult;
  onContinue: () => void;
}

function getProfilePhoto(age: number, gender: string): string {
  const isMale = gender?.toLowerCase().includes("male") && !gender?.toLowerCase().includes("female");
  if (isMale) {
    if (age < 30) return profileM2029;
    if (age < 40) return profileM3039;
    if (age < 50) return profileM4049;
    if (age < 60) return profileM5059;
    return profileM60;
  }
  if (age < 30) return profileF2029;
  if (age < 40) return profileF3039;
  if (age < 50) return profileF4049;
  if (age < 60) return profileF5059;
  return profileF60;
}

function getMetabolismLabel(answers: Record<string, string | string[] | number>): string {
  const metab = (answers.metabolismFeel as string) || "";
  const stage = (answers.hormoneStage as string) || "";
  if (stage.includes("menopause") || stage.includes("perimenopause")) return "Hormone-Adjusted";
  if (metab.includes("Much slower")) return "Sedentary-Adjusted";
  if (metab.includes("Slightly slower")) return "Slowing";
  return "Adaptable";
}

function getBmiLabel(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

/* ─── Macro Ring ─── */
const MacroRing = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" strokeWidth="6" className="stroke-muted" />
          <motion.circle cx="40" cy="40" r="36" fill="none" strokeWidth="6" stroke={color} strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-display font-bold text-primary-foreground">{value}%</span>
      </div>
      <span className="mt-2 text-xs font-body font-medium text-primary-foreground/60">{label}</span>
    </div>
  );
};

const features = [
  { icon: Utensils, title: "Personalized Hormone Reset Diet meal plan", description: "Breakfasts, lunches, dinners, snacks, and desserts tailored to your goals, preferences, and lifestyle." },
  { icon: Zap, title: "AI-powered nutrition coaching", description: "Smart guidance that adapts to you, with access to registered dietitian support whenever you need it." },
  { icon: BookOpen, title: "Simple, dietitian-designed recipes", description: "Easy-to-follow meals made with everyday ingredients, plus clear guidance for eating out without stress." },
  { icon: Heart, title: "Beginner-friendly Hormone Reset Diet guide", description: "Step-by-step setup, realistic goals, and a clear structure to help you start and stay consistent." },
  { icon: Gift, title: "$200 chef-prepared meal bonus", description: "A credit toward ready-made Hormone Reset meals to help you jump-start your plan with zero overwhelm." },
  { icon: CheckCircle2, title: "60-day money-back guarantee", description: "Try the plan risk-free. If it's not right for you, get a full refund — no questions asked." },
];

const MetabolicProfile = ({ answers, hormoneResult, onContinue }: Props) => {
  const weight = (answers.weight as number) || 180;
  const goalWeight = (answers.goalWeight as number) || 150;
  const heightInches = (answers.height as number) || 66;
  const ageRaw = (answers.age as string) || "40–49";
  const age = ageRaw.includes("Under") ? 35 : ageRaw.includes("70") ? 72 : parseInt(ageRaw) + 4 || 45;
  const gender = (answers.gender as string) || "Female";
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));

  const heightCm = Math.round(heightInches * 2.54);
  const weightKg = Math.round(weight * 0.4536);
  const goalWeightKg = Math.round(goalWeight * 0.4536);
  const weightToLose = weight - goalWeight;
  const weightToLoseDisplay = toUnit(weight) - toUnit(goalWeight);
  const weightToLoseKg = weightKg - goalWeightKg;
  const heightM = heightInches * 0.0254;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  const heightFeet = Math.floor(heightInches / 12);
  const heightRemInches = Math.round(heightInches % 12);

  const metabolismLabel = getMetabolismLabel(answers);
  const profilePhoto = getProfilePhoto(age, gender);

  // Calorie estimates
  const bmr = gender?.toLowerCase().includes("male") && !gender?.toLowerCase().includes("female")
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const dailyCal = Math.round(bmr * 1.2);
  const calLow = Math.round(dailyCal * 0.8 / 50) * 50;
  const calHigh = Math.round(dailyCal * 0.95 / 50) * 50;
  const proteinMin = Math.round(weightKg * 1.2);

  // Estimated results
  const weeksToLose = Math.max(6, Math.round(weightToLoseKg / 0.7));
  const lbsIn6Weeks = Math.min(weightToLoseKg, Math.round(0.7 * 6));

  // Macros
  const frustration = (answers.frustration as string) || "";
  const macros = frustration.includes("energy") || frustration.includes("Energy")
    ? { protein: 25, carbs: 45, fat: 30 }
    : frustration.includes("Weight") || frustration.includes("belly")
    ? { protein: 30, carbs: 35, fat: 35 }
    : { protein: 25, carbs: 40, fat: 35 };

  // Dynamic meals based on quiz selections
  const dietary = (answers.dietary as string) || "Everything";
  const proteins = (answers.proteins as string[]) || [];
  const vegetables = (answers.vegetables as string[]) || [];

  const getMealSuggestions = () => {
    const hasProtein = (keyword: string) => proteins.some((p) => p.toLowerCase().includes(keyword));
    const hasVeg = (keyword: string) => vegetables.some((v) => v.toLowerCase().includes(keyword));
    const isVegan = dietary === "Vegan";
    const isVegetarian = dietary === "Vegetarian" || isVegan;
    const isPescatarian = dietary === "Pescatarian";
    const isGlutenFree = dietary === "Gluten Free";
    const isDairyFree = dietary === "Dairy Free";

    // --- Breakfast ---
    let breakfast = "Greek yogurt bowl with honey, walnuts & berries";
    if (isVegan) breakfast = "Overnight oats with almond butter, chia seeds & berries";
    else if (isDairyFree) breakfast = "Overnight oats with coconut yogurt, honey & mixed berries";
    else if (hasProtein("egg")) breakfast = "Shakshuka with crusty whole grain bread";
    else if (isGlutenFree && hasProtein("yogurt")) breakfast = "Greek yogurt parfait with honey, walnuts & mixed berries";
    else if (isVegetarian) breakfast = "Shakshuka with crusty whole grain bread";

    // --- Lunch ---
    let lunch = "Mediterranean chickpea salad with feta & lemon dressing";
    if (isVegan) {
      lunch = hasVeg("spinach") ? "Roasted chickpea & spinach quinoa bowl with tahini dressing" : "Roasted chickpea & quinoa bowl with tahini dressing";
    } else if (isVegetarian) {
      lunch = hasVeg("eggplant") ? "Grilled eggplant & farro bowl with roasted vegetables & feta" : "Mediterranean farro bowl with roasted vegetables & feta";
    } else if (hasProtein("chicken")) {
      lunch = hasVeg("spinach") ? "Grilled chicken souvlaki bowl with spinach, tzatziki & fresh greens" : "Grilled chicken souvlaki bowl with tzatziki & fresh greens";
    } else if (hasProtein("fish") || isPescatarian) {
      lunch = "Tuna niçoise salad with olives, eggs & lemon vinaigrette";
    } else if (hasProtein("beef")) {
      lunch = "Hormone Reset Diet-style beef kofta bowl with hummus & fresh greens";
    } else if (hasProtein("beans") || hasProtein("lentil")) {
      lunch = "Mediterranean lentil salad with roasted peppers & lemon dressing";
    }
    if (isGlutenFree && lunch.includes("farro")) lunch = lunch.replace("farro", "quinoa");

    // --- Snack ---
    let snack = "Hummus with cucumber & bell pepper sticks";
    if (hasVeg("carrot")) snack = "Hummus with carrot sticks & bell pepper";
    else if (isVegan) snack = "Marinated olives with sun-dried tomatoes & almonds";
    else if (hasProtein("cheese") && !isDairyFree) snack = "Sliced cucumber with feta, olives & a drizzle of olive oil";

    // --- Dinner ---
    let dinner = "Grilled sea bass with olive tapenade & roasted vegetables";
    if (isVegan) {
      dinner = hasVeg("eggplant") ? "Stuffed eggplant with lentils, rice & Mediterranean spices" : "Stuffed bell peppers with lentils, rice & Mediterranean spices";
    } else if (isVegetarian) {
      dinner = hasVeg("eggplant") ? "Eggplant parmigiana with fresh basil & side salad" : "Stuffed peppers with feta, rice & Mediterranean herbs";
    } else if (hasProtein("fish") || isPescatarian) {
      const vegSide = hasVeg("zucchini") ? "grilled zucchini" : hasVeg("broccoli") ? "roasted broccoli" : "roasted vegetables";
      dinner = `Herb-crusted salmon with ${vegSide} & quinoa`;
    } else if (hasProtein("chicken")) {
      const vegSide = hasVeg("spinach") ? "sautéed spinach" : hasVeg("zucchini") ? "grilled zucchini" : "roasted vegetables";
      dinner = `Lemon herb chicken with ${vegSide} & sweet potatoes`;
    } else if (hasProtein("lamb")) {
      dinner = "Slow-roasted lamb with Mediterranean herbs & roasted vegetables";
    } else if (hasProtein("beef")) {
      dinner = "Hormone Reset Diet-style beef meatballs with tomato sauce & roasted peppers";
    }

    // Sweet tooth → swap snack for a Hormone Reset Diet-style dessert
    const sweetTooth = answers.sweetTooth as string | undefined;
    if (sweetTooth === "Yes" || sweetTooth === "Occasionally") {
      snack = "Greek yogurt with honey, pistachios & dark chocolate shavings";
    }
    // Alcohol → pair dinner with a glass of red wine
    const alcohol = answers.alcohol as string | undefined;
    if (alcohol && alcohol !== "Rarely or never") {
      dinner = `${dinner} + a glass of red wine 🍷`;
    }

    return [
      { meal: "Breakfast", description: breakfast },
      { meal: "Lunch", description: lunch },
      { meal: "Snack", description: snack },
      { meal: "Dinner", description: dinner },
    ];
  };
  const dynamicMeals = getMealSuggestions();

  const todayFormatted = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const profileRows = [
    { icon: "👤", label: "Age:", value: `${age} years old` },
    { icon: "⚥", label: "Sex:", value: gender },
    { icon: "⚖️", label: "Current BMI:", value: `${bmi}` },
    { icon: "📏", label: "Height:", value: `${heightFeet}'${heightRemInches}"` },
    { icon: "🏋️", label: "Weight:", value: `${toUnit(weight)} ${unit}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* ═══ STICKY TOP BAR ═══ */}
      <header className="sticky top-0 z-50 bg-foreground text-primary-foreground py-3.5 px-4 flex items-center justify-between">
        <img src={mdLogoWhite} alt="Hormone Reset Diet" className="h-8" loading="lazy" decoding="async" />
        <button
          onClick={onContinue}
          className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity">
          Get My Plan
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* ═══ HERO HEADING ═══ */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="text-center">
          <h1 className="text-xl md:text-[1.75rem] font-display font-bold text-foreground mb-1.5 tracking-tight md:whitespace-nowrap">
            Your Personalized Hormone Reset Diet is Ready
          </h1>
          <p className="text-sm font-body text-muted-foreground">
            Built around your goal to lose <span className="font-bold text-foreground">{weightToLoseDisplay} {unit}</span> in a simple and sustainable way.
          </p>
        </motion.div>

        {/* ═══ PROFILE SUMMARY ═══ */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-card rounded-2xl border border-border shadow-card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="text-base font-display font-bold text-foreground">Your profile summary</h2>
          </div>

          <div className="flex flex-row gap-4">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-24 h-32 sm:w-36 sm:h-48 object-cover rounded-xl flex-shrink-0"
              width={144} height={192} loading="eager" decoding="async"
            />
            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
              {profileRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-border/40 pb-1.5 sm:pb-2 last:border-0">
                  <span className="text-xs sm:text-[13px] font-body text-muted-foreground whitespace-nowrap">{row.icon} {row.label}</span>
                  <span className="text-xs sm:text-[13px] font-display font-bold text-foreground text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goal + Outcome Bullets */}
          {(() => {
            const energyDrop = (answers.energyDrop as string) || "";
            const stressEating = (answers.stressEating as string) || "";
            const timeline = (answers.timeline as string) || "";
            const pastDiets = (answers.pastDiets as string) || "";
            const activity = (answers.activity as string) || "";

            const staticBullets = [
              { text: <>Lose <strong>{weightToLose} lbs</strong> in a healthy, sustainable way</> },
              { text: <>Drop <strong>1–2 clothing sizes</strong></> },
            ];

            const dynamicPool: { text: React.ReactNode; score: number }[] = [
              { text: <>Feel more <strong>consistent energy</strong> throughout the day</>, score: energyDrop.includes("Afternoon") || energyDrop.includes("Morning") || energyDrop.includes("unstable") ? 3 : 1 },
              { text: <>Reduce <strong>cravings</strong> without strict dieting</>, score: stressEating.includes("sugar") || stressEating.includes("snack") || stressEating.includes("Sweet") ? 3 : 1 },
              { text: <>Simple meals that take <strong>minimal time</strong> to prepare</>, score: activity.includes("Mostly") || timeline.includes("As soon") ? 3 : 1 },
              { text: <>A plan that's <strong>easy to stick to</strong> long-term</>, score: pastDiets.includes("lost") || pastDiets.includes("tried") || pastDiets.includes("Yes") ? 3 : 1 },
              { text: <>Clear <strong>daily structure</strong> with no guesswork</>, score: 1 },
            ];

            const dynamicBullets = dynamicPool
              .sort((a, b) => b.score - a.score)
              .slice(0, 3);

            const allBullets = [...staticBullets, ...dynamicBullets];

            return (
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <h3 className="text-sm font-display font-bold text-foreground mb-3">What you can expect</h3>
                <div className="space-y-2.5">
                  {allBullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-[18px] h-[18px] text-emerald-600 flex-shrink-0" />
                      <p className="text-[13px] font-body text-foreground leading-snug">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* ═══ YOUR PLAN ═══ */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="bg-foreground rounded-2xl p-5 md:p-6 text-primary-foreground overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-display font-bold">Your plan</h2>
          </div>

          {/* Estimated results */}
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 mb-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-white/60">Estimated results</p>
              <p className="text-sm font-display font-bold">{weightToLose} lbs in 8 weeks</p>
            </div>
            <div className="bg-emerald-500/20 text-emerald-300 text-xs font-display font-bold rounded-lg px-2 py-1">
              +1-2 dress sizes smaller
            </div>
          </div>

          <p className="text-sm font-body text-primary-foreground/70 mb-4">We've used your answers to organise your daily meals and portions for you.</p>

          {/* Calories + Macro Rings */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="text-center">
              <span className="text-3xl font-display font-bold text-primary">{calLow}–{calHigh}</span>
              <p className="text-xs text-primary-foreground/60 font-body mt-1">Daily Calories</p>
            </div>
            <div className="flex gap-6">
              <MacroRing label="Protein" value={macros.protein} color="hsl(340, 80%, 58%)" />
              <MacroRing label="Carbs" value={macros.carbs} color="hsl(38, 85%, 55%)" />
              <MacroRing label="Fats" value={macros.fat} color="hsl(30, 25%, 70%)" />
            </div>
          </div>

          {/* Custom Meal Plan */}
          <div className="border-t border-primary-foreground/10 pt-5 mt-2">
            <div className="flex items-center gap-2 mb-1">
              <Utensils className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-display font-bold text-primary-foreground">Your Custom Meal Plan</h3>
            </div>
            <p className="text-xs text-primary-foreground/60 font-body mb-1">
              Example for <span className="font-semibold text-primary-foreground">{todayFormatted}</span> only
            </p>
            <p className="text-xs text-primary font-body font-semibold mb-4">
              + 1,000+ meal plan combinations
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dynamicMeals.map((item) => (
                <div key={item.meal} className="bg-primary-foreground/10 rounded-lg p-3">
                  <span className="text-[10px] font-body font-semibold text-primary block mb-1">{item.meal}</span>
                  <span className="text-xs font-body text-primary-foreground/70">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutritionist Credibility */}
          <div className="border-t border-primary-foreground/10 pt-5 mt-5">
            <div className="flex items-center gap-4">
              <img src={coachKimberly} alt="Kimberly, Registered Dietitian" className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 flex-shrink-0" width={56} height={56} loading="lazy" decoding="async" />
              <div>
                <p className="text-sm font-display font-bold text-primary-foreground">Created by Kimberly R., RDN</p>
                <p className="text-xs font-body text-primary-foreground/70">Registered Dietitian Nutritionist with 12+ years of experience in hormone-balancing nutrition and weight management.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ CTA ═══ */}
        <motion.button
          {...fadeUp}
          transition={{ delay: 0.45 }}
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View My Results
          <ArrowRight className="w-5 h-5" />
        </motion.button>


        {/* ═══ WHAT'S INCLUDED ═══ */}
        <motion.div {...fadeUp} transition={{ delay: 0.55 }} className="bg-card rounded-2xl border border-border shadow-card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">What's included?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Utensils, title: "Complete 30-Day meal plan", lines: ["Breakfast, lunch, dinner and snacks, fully mapped out for you.", "Built around your goals, preferences, and daily routine"] },
              { icon: BookOpen, title: "Step-by-step recipes", lines: ["Simple recipes using everyday ingredients", "No complicated prep or hard-to-find foods"] },
              { icon: ShoppingCart, title: "Weekly grocery lists", lines: ["Know exactly what to buy each week", "Organised, repeatable, and easy to follow"] },
              { icon: Clock, title: "Flexible meal structure", lines: ["Choose 2, 3 or 4 meals per day", "Adapt your plan to your appetite and lifestyle"] },
              { icon: UtensilsCrossed, title: "Mix-and-match meals", lines: ["Swap meals without breaking your progress", "Keep things interesting while staying on track"] },
              { icon: Heart, title: "Eating out guide", lines: ["Stay consistent even at restaurants or on weekends", "Simple rules to help you make better choices anywhere"] },
              { icon: Activity, title: "Built-in progress structure", lines: ["Know what to expect each week", "A clear path to steady, realistic weight loss"] },
              { icon: MessageCircle, title: "On-demand support", lines: ["Get help anytime you need it", "Answers for meals, swaps, and staying on track"] },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border p-4">
                <f.icon className="w-5 h-5 text-primary mb-2" />
                <h3 className="text-sm font-display font-bold text-foreground mb-1">{f.title}</h3>
                {f.lines.map((line) => (
                  <p key={line} className="text-xs text-muted-foreground font-body leading-relaxed">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ VOTED BEST DIET ═══ */}
        <motion.div {...fadeUp} transition={{ delay: 0.6 }} className="bg-emerald-50 rounded-2xl p-5 md:p-6 flex items-center gap-4">
          <img src={bestDietBadge} alt="U.S. News Best Diet 2026" className="w-16 h-auto flex-shrink-0" width={64} height={66} loading="lazy" decoding="async" />
          <div>
            <h3 className="text-base md:text-lg font-display font-bold text-foreground leading-snug">
              Our Hormone Reset Diet has been voted the World's Best Diet 8 years in a row
            </h3>
            <p className="text-xs text-muted-foreground font-body mt-1">Based on rankings by leading global health publications</p>
          </div>
        </motion.div>

        {/* ═══ FINALLY A PLAN YOU CAN STICK TO ═══ */}
        <motion.div {...fadeUp} transition={{ delay: 0.65 }} className="text-center py-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Finally, a <span className="text-primary">Hormone Reset Diet</span> you can stick to
          </h2>
          <p className="text-sm text-muted-foreground font-body mb-6">
            No calorie counting. No extremes. Just simple daily structure.
          </p>
          <img
            src={productMockup}
            alt="Hormone Reset Diet app screens"
            className="w-full max-w-sm mx-auto h-auto object-contain"
            width={400} height={200} loading="lazy" decoding="async"
          />
        </motion.div>

        <motion.button
          {...fadeUp}
          transition={{ delay: 0.7 }}
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View My Results
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MetabolicProfile;
