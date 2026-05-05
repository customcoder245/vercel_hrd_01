import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Heart, Leaf, Shield, Flame, Apple, TrendingDown, Sun, Brain, Activity, Users, Star, CheckCircle, Moon } from "lucide-react";

const CountUp = ({ to, duration = 0.8, delay = 0.1, decimals = 0 }: { to: number; duration?: number; delay?: number; decimals?: number }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));
  React.useEffect(() => {
    const controls = animate(mv, to, { duration, delay, ease: [0.23, 1, 0.32, 1] });
    return controls.stop;
  }, [to, duration, delay, mv]);
  return <motion.span>{rounded}</motion.span>;
};
import healthyFoodSpread from "@/assets/mediterranean-food-spread.webp";
import mediterraneanWhyImg from "@/assets/mediterranean-why.jpg";
import hormoneResetCardImg from "@/assets/hormone-reset-food-spread.jpg";
import trustedHandsImg from "@/assets/trusted-hands.webp";
import happyCouple from "@/assets/happy-couple.webp";
import ameliaBeforeAfter from "@/assets/amelia-before-after.webp";
import threeWomenFitness from "@/assets/three-women-fitness.webp";
import womanKitchenSalad from "@/assets/woman-kitchen-salad.webp";
import logoHarvard from "@/assets/logo-harvard.webp";
import logoJohnsHopkins from "@/assets/logo-johns-hopkins.webp";
import trustedWomen from "@/assets/trusted-women.webp";

import sammiBeforeAfter from "@/assets/sammi-before-after.webp";
import maleBeforeAfter from "@/assets/male-before-after.webp";
import profileFemaleOverweight from "@/assets/profile-female-overweight.jpg";
import profileMaleOverweight from "@/assets/profile-male-overweight.jpg";
import profileMaleLean from "@/assets/profile-male-lean.jpg";
import profileMaleOverweightMild from "@/assets/profile-male-overweight-mild.jpg";
import profileMaleObeseMid from "@/assets/profile-male-obese-mid.jpg";
import profileFemaleLean from "@/assets/profile-female-lean.jpg";
import profileFemaleOverweightMild from "@/assets/profile-female-overweight-mild.jpg";
import profileFemaleObeseMid from "@/assets/profile-female-obese-mid.jpg";

const getBodyImageForBmi = (bmi: number, isMale: boolean): string => {
  if (isMale) {
    if (bmi < 25) return profileMaleLean;
    if (bmi < 30) return profileMaleOverweightMild;
    if (bmi < 35) return profileMaleObeseMid;
    return profileMaleOverweight;
  }
  if (bmi < 25) return profileFemaleLean;
  if (bmi < 30) return profileFemaleOverweightMild;
  if (bmi < 35) return profileFemaleObeseMid;
  return profileFemaleOverweight;
};
import breakEightyPercent from "@/assets/break-eighty-percent.webp";
import eightyPercentMen from "@/assets/eighty-percent-men.webp";
import eightyPercentWomen from "@/assets/eighty-percent-women.webp";
import breakMediterraneanStabilises from "@/assets/break-mediterranean-stabilises.webp";
import mealThumbBreakfast from "@/assets/meal-thumb-breakfast.jpg";
import mealThumbLunch from "@/assets/meal-thumb-lunch.jpg";
import mealThumbSnack from "@/assets/meal-thumb-snack.jpg";
import mealThumbDinner from "@/assets/meal-thumb-dinner.jpg";
import avatarUserMale from "@/assets/avatar-user-male.jpg";
import avatarUserFemale from "@/assets/avatar-user-female.jpg";
import sleepInsightWoman from "@/assets/sleep-insight-woman.webp";

interface BreakScreenProps {
  breakType:
  | "bmi" | "mediterranean" | "validation" | "progress" | "social" | "biology"
  | "women40" | "notAlone" | "microInsight" | "mediterraneanMetabolism"
  | "uniqueMetabolism" | "almostDone" | "millionWomen" | "whatIsGlp1"
  | "beforeAfter" | "designedNaturally" | "comparisonGraph" | "trustedStudy"
  | "shapingPlan" | "tailorEating" | "buildPlan" | "trustedHands"
  | "behaviouralProfile" | "healthSnapshot" | "foodPreferences"
  | "analysingInputs" | "finalDetails"
  | "personalProfile" | "projectionInline" | "eightyPercent"
  | "mediterraneanStabilises" | "buildingPlan" | "weightLossBlockers"
  | "thanksForSharing" | "sleepGraphic" | "notAloneInThis";
  answers: Record<string, string | string[] | number>;
  onContinue: () => void;
}

// ── Break 1: Over 153,000 people (after Q1) ──
const BreakMillionWomen = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType"> & { answers?: Record<string, string | string[] | number> }) => {
  const isMale = (answers?.sex as string || answers?.gender as string) === "Male";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
        Over <span className="text-primary">153,000</span> {isMale ? "people" : "women"}
      </h2>
      <p className="text-muted-foreground font-body text-base mb-6">
        have chosen our plans
      </p>

      <div className="flex justify-center mb-8">
        <img
          src={threeWomenFitness}
          alt="Three confident women in fitness wear"
          className="max-h-[380px] md:max-h-[440px] object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break 2: What is GLP-1 diet? (after Q4) ──
const BreakWhatIsGlp1 = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType"> & { answers?: Record<string, string | string[] | number> }) => {
  const benefits = [
    "Helps your body burn fat instead of storing it",
    "Reduces cravings and constant hunger",
    "Supports faster, more efficient metabolism",
    "Improves energy, sleep, and focus",
    "Targets stubborn belly weight",
  ];

  const headline = (
    <>How does the <span className="text-primary">Hormone Reset Diet</span> work?</>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto will-change-transform"
    >
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="rounded-xl overflow-hidden mb-5">
          <img src={hormoneResetCardImg} alt="Hormone Reset Diet meals" loading="lazy" className="w-full h-32 md:h-40 object-cover rounded-xl" />
        </div>

        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
          {headline}
        </h2>
        <p className="text-sm font-body text-muted-foreground mb-5 leading-relaxed">
          The Hormone Reset Diet is a balanced, nutrient-focused approach designed to support the hormone signals that control fat storage, hunger, and metabolism.
        </p>

        <p className="text-sm font-body font-bold text-foreground mb-3">Benefits of the Hormone Reset Diet:</p>
        <div className="space-y-3 mb-2">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-body text-foreground">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue Building My Plan
      </motion.button>
    </motion.div>
  );
};

// ── Break 2: Now we look at your daily patterns ──
const BreakBehaviouralProfile = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const icons = [
    { emoji: "⚡", label: "Energy" },
    { emoji: "🍽", label: "Hunger" },
    { emoji: "🚶", label: "Activity" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center px-6 will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        Now we look at your daily patterns
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-8">
        So your meals match your energy, hunger, and routine
      </p>

      <div className="flex justify-center gap-8 mb-10">
        {icons.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center text-2xl">
              {item.emoji}
            </div>
            <span className="text-xs text-muted-foreground font-body">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};


const BreakBeforeAfter = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const gender = typeof answers?.gender === "string" ? answers.gender.toLowerCase() : "";
  const isMale = gender === "male" || gender === "man";

  const image = isMale ? maleBeforeAfter : sammiBeforeAfter;
  const headline = isMale ? "Lost 18 lbs in 7 weeks" : "Already lost 24 lbs!";
  const quote = isMale
    ? "\"I've tried a lot of diets over the years and usually give up after a couple of weeks. This felt different straight away. The meals were simple, filling, and didn't feel restrictive. I didn't follow it perfectly, but I still ended up losing 18 lbs over 7 weeks. My energy's better, and for once I feel like I can actually stick with it long term.\""
    : "\"I had tried everything to lose weight, but nothing worked, especially the stubborn belly fat. After following the Hormone Reset Diet, things finally started to change. I dropped 24 lbs quickly, my cravings settled down, my bloating improved, and my energy came back. The best part is it actually feels sustainable.\"";
  const attribution = isMale ? "— Jack T., 46" : "— Jennifer S., 53";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
        Get visible results in 6 weeks!
      </h2>

      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden mb-6">
        <div className="overflow-hidden">
          <img src={image} alt="Before and after transformation" loading="lazy" className="w-full h-auto object-cover" />
        </div>

        <div className="p-5 text-left">
          <h3 className="text-lg font-display font-bold text-foreground mb-3 text-center">
            {headline}
          </h3>
          <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4 italic">
            {quote}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-body font-semibold text-foreground">{attribution}</span>
              <CheckCircle className="w-4 h-4" style={{ color: "rgb(0, 183, 125)" }} />
              <span className="text-xs font-body font-medium" style={{ color: "rgb(0, 183, 125)" }}>Verified user</span>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4" style={{ fill: "rgb(0, 183, 125)", color: "rgb(0, 183, 125)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break 4: Designed to boost GLP-1 naturally (after Q11) ──
const BreakDesignedNaturally = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto will-change-transform"
    >
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
          The Hormone Reset Diet is designed to{" "}
          <span className="text-primary">rebalance your metabolism naturally</span>
        </h2>
        <p className="text-sm font-body text-muted-foreground mb-5 leading-relaxed">
          With a plan built around how your body responds to food, you can stabilize hormone signals, reduce cravings, support fat-burning, and make weight loss feel easier and more consistent.
        </p>

        <div className="rounded-xl overflow-hidden">
          <img src={happyCouple} alt="Happy couple enjoying life" loading="lazy" className="w-full h-48 object-cover rounded-xl" />
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break 5: Process Comparison (after Q16) ──
const BreakComparisonGraph = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const typicalPoints = [
    { icon: <TrendingDown className="w-4 h-4" />, text: "Focus on cutting calories" },
    { icon: <Apple className="w-4 h-4" />, text: "Ignore cravings and hunger" },
    { icon: <Brain className="w-4 h-4" />, text: "Rely on willpower" },
    { icon: <Activity className="w-4 h-4" />, text: "Results often inconsistent" },
  ];

  const hormonePoints = [
    { icon: <Flame className="w-4 h-4" />, text: "Supports metabolism signals" },
    { icon: <Leaf className="w-4 h-4" />, text: "Reduces cravings naturally" },
    { icon: <Heart className="w-4 h-4" />, text: "Works with your body" },
    { icon: <Sun className="w-4 h-4" />, text: "More consistent progress" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto will-change-transform"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Why most diets <span className="text-primary">stop working</span>
        </h2>
        <p className="text-sm font-body text-muted-foreground mt-1">
          (and this approach doesn't)
        </p>
      </div>

      {/* Desktop: side-by-side, Mobile: stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Typical Diets */}
        <div className="bg-muted/50 rounded-xl border border-border p-5">
          <p className="text-xs font-display font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Typical diets
          </p>
          <div className="space-y-3">
            {typicalPoints.map((point, i) => (
              <motion.div
                key={point.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                  {point.icon}
                </div>
                <span className="text-sm font-body text-muted-foreground">{point.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hormone Reset Diet Approach */}
        <div className="bg-secondary/10 rounded-xl border border-secondary/20 p-5">
          <p className="text-xs font-display font-bold text-secondary uppercase tracking-wider mb-4">
            Hormone Reset Diet approach
          </p>
          <div className="space-y-3">
            {hormonePoints.map((point, i) => (
              <motion.div
                key={point.text}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary flex-shrink-0">
                  {point.icon}
                </div>
                <span className="text-sm font-body font-medium text-foreground">{point.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs font-body text-muted-foreground text-center mb-6 italic px-4">
        When hormone signals are out of sync, traditional dieting often feels harder than it should.
      </p>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Existing breaks (BMI + Progress kept) ──

const BMIGauge = ({ bmi }: { bmi: number }) => {
  const clampedBmi = Math.max(15, Math.min(40, bmi));
  const percentage = ((clampedBmi - 15) / 25) * 100;

  const radius = 70;
  const cx = 90;
  const cy = 85;
  const startAngle = Math.PI;
  const arcLength = Math.PI;

  const gradientStops = [
    { offset: "0%", color: "#4ade80" },
    { offset: "35%", color: "#facc15" },
    { offset: "65%", color: "#fb923c" },
    { offset: "100%", color: "#ef4444" },
  ];

  // Generate keyframe positions along the arc so the dot follows the curve
  const steps = 20;
  const dotPositions = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const angle = startAngle - (t * percentage / 100) * arcLength;
    return { x: cx + radius * Math.cos(angle), y: cy - radius * Math.sin(angle) };
  });

  const arcPath = (r: number) => {
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy - r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(0);
    const y2 = cy - r * Math.sin(0);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 100" className="w-48 h-auto">
        <defs>
          <linearGradient id="bmiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientStops.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <path d={arcPath(radius)} fill="none" stroke="url(#bmiGrad)" strokeWidth="14" strokeLinecap="round" />
        <motion.circle
          initial={{ cx: dotPositions[0].x, cy: dotPositions[0].y }}
          animate={{
            cx: dotPositions.map(p => p.x),
            cy: dotPositions.map(p => p.y),
          }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          r="7"
          fill="white"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
        />
      </svg>
      <div className="-mt-4 text-center">
        <span className="text-3xl font-display font-bold text-foreground">{bmi}</span>
      </div>
    </div>
  );
};

const BreakBMI = ({ answers, onContinue }: Omit<BreakScreenProps, "breakType">) => {
  const heightInches = (answers.height as number) || 66;
  const weightLbs = (answers.weight as number) || 160;
  const goalWeightLbs = (answers.goalWeight as number) || 140;
  const age = (answers.age as string) || "30–39";
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));

  const heightM = heightInches * 0.0254;
  const weightKg = weightLbs * 0.4536;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  const heightFt = Math.floor(heightInches / 12);
  const heightIn = heightInches % 12;
  const weightToLose = toUnit(weightLbs) - toUnit(goalWeightLbs);

  const bmiLabel = bmi < 18.5 ? "Below optimal range" : bmi < 25 ? "Optimal range" : "Above optimal range";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto will-change-transform"
    >
      {/* HEADER */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-olive-muted text-primary text-sm font-body font-medium mb-4">
          <Activity className="w-4 h-4" />
          Personal Profile
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
          Here's what this tells us about you
        </h2>
        <p className="text-muted-foreground font-body text-sm">
          Based on your answers, we can tailor a plan that works for your body and routine
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5 sm:p-6 mb-5">
        <div className="flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6">
          {/* Left: BMI gauge */}
          <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
            <div className="text-xs font-body text-muted-foreground mb-1 flex items-center gap-1 text-center sm:text-left">
              <span>❤️</span> Body Mass Index (BMI)
            </div>
            <BMIGauge bmi={bmi} />
            <span className="text-xs font-body text-muted-foreground mt-1 text-center sm:text-left">{bmiLabel}</span>
            <div className="text-[10px] text-muted-foreground font-body mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Ideal = 21.5
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-2 sm:flex-1 sm:grid-cols-1 sm:gap-2 sm:pt-2">
            {[
              { icon: "👤", label: "Age", value: age },
              { icon: "📏", label: "Height", value: `${heightFt}'${heightIn}"` },
              { icon: "⚖️", label: "Weight", value: `${toUnit(weightLbs)} ${unit}` },
              { icon: "🎯", label: "Goal", value: weightToLose > 0 ? `Lose ${weightToLose} ${unit}` : "Maintain weight" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-muted/40 p-3 sm:bg-transparent sm:p-0 sm:rounded-none sm:border-b sm:border-border sm:last:border-0 sm:py-1.5">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-body text-muted-foreground mb-1 sm:mb-0">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <div className="text-sm sm:text-sm font-body font-semibold text-foreground leading-tight break-words">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT THIS MEANS FOR YOU */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5 mb-5">
        <h4 className="text-sm font-display font-bold text-foreground mb-3">
          What this means for you
        </h4>
        <ul className="space-y-2.5">
          {[
            "Your body may not be burning energy as efficiently as it could",
            "With the right food structure, this can shift quickly",
            "You don't need extreme dieting to start seeing progress",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm font-body text-muted-foreground">
              <span className="mt-0.5 text-primary">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* PERSONAL VALIDATION */}
      <div className="text-center mb-5">
        <p className="text-sm font-body font-semibold text-foreground">
          Based on your answers, the <span className="text-primary">Hormone Reset approach</span> is a strong fit for you
        </p>
      </div>

      {/* GREEN CONFIDENCE BOX */}
      <div className="rounded-xl p-4 border mb-6 text-center" style={{ backgroundColor: "hsl(140 40% 95%)", borderColor: "hsl(140 40% 85%)" }}>
        <p className="text-sm font-body text-foreground">
          Your plan will focus on steady fat loss, better energy, and simple meals you can stick to
        </p>
      </div>

      {/* TRANSITION LINE */}
      <p className="text-xs text-muted-foreground font-body text-center mb-3">
        Next: see your personalised plan →
      </p>

      {/* CTA */}
      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

const BreakProgress = ({ answers, onContinue }: Omit<BreakScreenProps, "breakType">) => {
  const currentLbs = (answers.weight as number) || 180;
  const goalLbs = (answers.goalWeight as number) || 150;
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
  const currentWeight = toUnit(currentLbs);
  const goalWeight = toUnit(goalLbs);

  const diff = currentWeight - goalWeight;
  const monthlyLoss = diff / 2;
  const month1 = Math.round(currentWeight - monthlyLoss);

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const m1 = months[(now.getMonth() + 1) % 12];
  const targetDateStr = `${months[targetDate.getMonth()]} ${targetDate.getDate()}`;

  const points = [
    { x: 50, y: 35, label: `${currentWeight}`, month: "Now" },
    { x: 195, y: 95, label: `${month1}`, month: m1 },
    { x: 340, y: 150, label: `${goalWeight}`, month: targetDateStr },
  ];

  const curvePath = `M ${points[0].x} ${points[0].y} C ${points[0].x + 50} ${points[0].y + 20}, ${points[1].x - 40} ${points[1].y - 10}, ${points[1].x} ${points[1].y} C ${points[1].x + 50} ${points[1].y + 20}, ${points[2].x - 40} ${points[2].y - 10}, ${points[2].x} ${points[2].y}`;
  const areaPath = `${curvePath} L 340 185 L 50 185 Z`;

  const dotColors = ["#E53E3E", "#ECC94B", "#38A169"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto will-change-transform"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-olive-muted text-primary text-sm font-body font-medium mb-4">
          <TrendingDown className="w-4 h-4" />
          Progress Projection
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
          Good news! Based on your answers
        </h2>
        <p className="text-muted-foreground font-body text-sm">
          We estimate you could reach <span className="font-semibold text-primary">{goalWeight} {unit}</span> by {targetDateStr}
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-4">
        <svg viewBox="0 0 400 210" className="w-full">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E53E3E" />
              <stop offset="35%" stopColor="#ED8936" />
              <stop offset="65%" stopColor="#ECC94B" />
              <stop offset="100%" stopColor="#38A169" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E53E3E" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#ECC94B" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#38A169" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#areaGrad)" />

          <motion.path
            d={curvePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          />

          {points.map((pt, i) => (
            <g key={i}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="7"
                fill={dotColors[i]}
                stroke="white"
                strokeWidth="3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.25, type: "spring" }}
              />
              <text x={pt.x} y={pt.y - 14} textAnchor="middle" className="text-[11px] font-bold" fill="currentColor">
                {pt.label} {unit}
              </text>
              <text x={pt.x} y={195} textAnchor="middle" className="text-[10px]" fill="#888">
                {pt.month}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break: Trusted Study (after Q1) ──
const BreakTrustedStudy = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType"> & { answers?: Record<string, string | string[] | number> }) => {
  const isMale = (answers?.sex as string || answers?.gender as string) === "Male";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center px-6 will-change-transform"
    >
      <img src={trustedWomen} alt="People who trust Hormone Reset Diet" className="w-full max-w-md mx-auto mb-6 rounded-2xl" loading="lazy" decoding="async" />

      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
        Trusted by over <span className="text-primary">153,000</span> {isMale ? "people" : "women"}
      </h2>

      <p className="text-sm text-muted-foreground font-body italic leading-relaxed mb-8 max-w-md mx-auto">
        *In a 6-month research study, 92% of our users achieved their ideal weight using our diet and successfully maintained it thereafter.
      </p>

      <div className="flex items-center justify-center gap-8 md:gap-12 mb-10 opacity-50 grayscale">
        <img src={logoHarvard} alt="Harvard Medical School" className="h-10 md:h-12 w-auto object-contain" loading="lazy" decoding="async" />
        <img src={logoJohnsHopkins} alt="Johns Hopkins University" className="h-10 md:h-12 w-auto object-contain" loading="lazy" decoding="async" />
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Decorative thin-line SVG elements for transitional breaks ──
const DecoLeaf = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto mb-6">
    <path d="M32 8C32 8 12 20 12 38C12 50 20 56 32 56C44 56 52 50 52 38C52 20 32 8 32 8Z" stroke="currentColor" strokeWidth="1.2" className="text-foreground/15" />
    <path d="M32 16V48" stroke="currentColor" strokeWidth="1" className="text-foreground/12" />
    <path d="M32 28C26 24 20 28 20 34" stroke="currentColor" strokeWidth="1" className="text-foreground/10" strokeLinecap="round" />
    <path d="M32 36C38 32 44 36 44 42" stroke="currentColor" strokeWidth="1" className="text-foreground/10" strokeLinecap="round" />
  </svg>
);

const DecoPlate = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto mb-6">
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.2" className="text-foreground/15" />
    <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="0.8" className="text-foreground/10" />
    <path d="M20 32C24 28 28 30 32 28C36 26 40 28 44 32" stroke="currentColor" strokeWidth="1" className="text-foreground/12" strokeLinecap="round" />
  </svg>
);

const DecoCheck = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto mb-6">
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.2" className="text-foreground/15" />
    <path d="M22 33L29 40L42 25" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Transitional Break: Shaping Plan ──
const BreakShapingPlan = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}>
        <DecoLeaf />
      </motion.div>
      <h2 className="text-2xl font-bold text-foreground mb-3">We're starting to shape your plan</h2>
      <p className="text-muted-foreground text-base mb-8">Your goals, energy and background help determine how your meals should be structured.</p>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue} className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2">
        Continue <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

// ── Transitional Break: Tailor Eating ──
const BreakTailorEating = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}>
        <DecoPlate />
      </motion.div>
      <h2 className="text-2xl font-bold text-foreground mb-3">Now we'll tailor this to how you like to eat</h2>
      <p className="text-muted-foreground text-base mb-8">Next, we'll personalise your plan based on your food preferences.</p>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onContinue} className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2">
        Continue <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

// ── Break: Hormone Reset Diet vs Diets Comparison Graph ──
const BreakBuildPlan = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const [animStage, setAnimStage] = React.useState(0);

  React.useEffect(() => {
    const t1 = setTimeout(() => setAnimStage(1), 250);   // Restrictive
    const t2 = setTimeout(() => setAnimStage(2), 800);  // GLP-1
    const t3 = setTimeout(() => setAnimStage(3), 1400);  // Hormone Reset Diet
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Hormone Reset Diet: steady, sustainable decline (ends lowest)
  const medPoints = [
    { x: 50, y: 30 }, { x: 183, y: 75 }, { x: 317, y: 130 }, { x: 450, y: 175 },
  ];
  // Restrictive diets: sharp drop → plateau → regain
  const restrictivePoints = [
    { x: 50, y: 30 }, { x: 183, y: 110 }, { x: 317, y: 120 }, { x: 450, y: 70 },
  ];
  // GLP-1 / Quick fix: very steep drop → sharp rebound
  const glp1Points = [
    { x: 50, y: 30 }, { x: 183, y: 140 }, { x: 317, y: 100 }, { x: 450, y: 45 },
  ];

  const toSmooth = (pts: { x: number; y: number }[]) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.45;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.55;
      d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const months = ["Month 1", "Month 2", "Month 3", "Month 4"];
  const lineLen = 600;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto px-5 py-8"
    >
      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2"
      >
        The Hormone Reset Diet creates lasting weight loss with foods you love, not restriction
      </motion.h2>


      {/* Graph Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-5 pb-4 shadow-sm border border-border/50 mb-4"
      >
        <p className="text-[11px] text-muted-foreground mb-4 text-center tracking-wide uppercase">Based on how your body responds over time</p>

        <svg viewBox="0 0 500 210" className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <style>{`
              .graph-line { fill: none; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease-out; }
            `}</style>
          </defs>

          {/* Grid lines */}
          {[55, 95, 135, 175].map((y) => (
            <line key={y} x1="50" y1={y} x2="450" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />
          ))}

          {/* Y axis label */}
          <text x="18" y="110" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle" transform="rotate(-90 18 110)" opacity="0.5" fontWeight="500">Weight</text>

          {/* 1. Restrictive line (draws first) */}
          <path
            className="graph-line"
            d={toSmooth(restrictivePoints)}
            stroke="#b0a899"
            strokeWidth="2.5"
            strokeDasharray={lineLen}
            strokeDashoffset={animStage >= 1 ? 0 : lineLen}
          />
          {animStage >= 1 && (
            <>
              <circle cx={restrictivePoints[3].x} cy={restrictivePoints[3].y} r="4" fill="#b0a899" opacity="0.8">
                <animate attributeName="opacity" from="0" to="0.8" dur="0.3s" fill="freeze" />
              </circle>
              <text x={restrictivePoints[3].x + 8} y={restrictivePoints[3].y - 6} fontSize="9" fill="#b0a899" fontWeight="500" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.2s" fill="freeze" />
                Restrictive
              </text>
            </>
          )}

          {/* 2. GLP-1 line (draws second) */}
          <path
            className="graph-line"
            d={toSmooth(glp1Points)}
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            opacity="0.6"
            strokeDasharray={lineLen}
            strokeDashoffset={animStage >= 2 ? 0 : lineLen}
          />
          {animStage >= 2 && (
            <>
              <circle cx={glp1Points[3].x} cy={glp1Points[3].y} r="4" fill="hsl(var(--primary))" opacity="0.6">
                <animate attributeName="opacity" from="0" to="0.6" dur="0.3s" fill="freeze" />
              </circle>
              <text x={glp1Points[3].x + 8} y={glp1Points[3].y - 6} fontSize="9" fill="hsl(var(--primary))" fontWeight="500" opacity="0">
                <animate attributeName="opacity" from="0" to="0.7" dur="0.3s" begin="0.2s" fill="freeze" />
                GLP-1
              </text>
            </>
          )}

          {/* 3. Hormone Reset Diet line (draws last, on top) */}
          <path
            className="graph-line"
            d={toSmooth(medPoints)}
            stroke="#4a7c59"
            strokeWidth="3"
            strokeDasharray={lineLen}
            strokeDashoffset={animStage >= 3 ? 0 : lineLen}
          />
          {animStage >= 3 && (
            <>
              <circle cx={medPoints[3].x} cy={medPoints[3].y} r="5" fill="#4a7c59">
                <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" />
              </circle>
              <text x={medPoints[3].x - 8} y={medPoints[3].y + 16} fontSize="10" fill="#4a7c59" fontWeight="600" textAnchor="end" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.2s" fill="freeze" />
                Hormone Reset Diet ✓
              </text>
            </>
          )}

          {/* X axis months */}
          {months.map((m, i) => (
            <text key={m} x={50 + i * 133.3} y="202" fontSize="9.5" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.65" fontWeight="400">{m}</text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[3px] rounded-full" style={{ backgroundColor: "#4a7c59" }} />
            <span className="text-[11px] text-foreground font-medium">Hormone Reset Diet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-[3px] rounded-full" style={{ backgroundColor: "#b0a899" }} />
            <span className="text-[11px] text-muted-foreground">Restrictive Diets</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-[3px] rounded-full bg-primary opacity-60" />
            <span className="text-[11px] text-muted-foreground">Short-term / GLP-1</span>
          </div>
        </div>
      </motion.div>

      {/* Micro caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[13px] text-muted-foreground text-center mb-8 leading-relaxed max-w-sm mx-auto"
      >
        Most approaches focus on short-term results. The Hormone Reset approach is designed for long-term consistency.
      </motion.p>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

// ── Break 1: Credibility Break ──
const BreakTrustedHands = ({ answers, onContinue }: Omit<BreakScreenProps, "breakType">) => {
  // SVG graph points — Hormone Reset Diet steadily drops; Restrictive dips then rebounds
  const medPoints = "M 30,28 C 80,38 140,55 200,72 260,88 320,102 380,112 440,120 500,125";
  const dietPoints = "M 30,28 C 70,48 120,72 170,88 220,92 270,88 320,78 380,65 440,50 500,38";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center px-6 will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        Trusted by 152,627 women worldwide
      </h2>
      {/* Graph + Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-card rounded-xl border border-border shadow-card overflow-hidden mb-4"
      >
        {/* Bar Chart Comparison */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-display font-bold text-foreground">Weight Lost</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-2xl font-display font-bold text-foreground"
            >
              2.3x 🎉
            </motion.p>
          </div>

          <div className="relative h-40 mb-3">
            {/* Horizontal grid lines */}
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute w-full border-t border-dashed"
                style={{ top: `${20 + i * 30}%`, borderColor: "hsl(var(--border))" }}
              />
            ))}

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-10 h-full">
              {/* Restrictive Diets bar */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 56 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  className="w-24 rounded-t-md flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--muted))" }}
                >
                  <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide leading-tight text-center px-1">
                    RESTRICTIVE<br />DIETS
                  </span>
                </motion.div>
              </div>

              {/* Hormone Reset Diet bar */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 140 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                  className="w-24 rounded-t-md flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--primary))" }}
                >
                  <span className="text-xs font-display font-semibold text-primary-foreground uppercase tracking-wide leading-tight text-center px-1">
                    HORMONE<br />RESET DIET
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground font-body">
            Based on a 12-month comparative study of diet adherence and weight outcomes.
          </p>
        </div>

        {/* Stats row */}
        <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
          {[
            { number: "152,627+", label: "Women helped" },
            { number: "5★", label: "Built around one of the world's most researched eating styles" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              className="py-4 px-2 text-center"
            >
              <p className="text-base font-display font-bold text-foreground">{stat.number}</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-xs text-muted-foreground font-body mb-6 flex items-center justify-center gap-1.5"
      >
        <span className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-honey fill-honey" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </span>
        4.85/5 average rating on Trustpilot
      </motion.p>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break: Health Snapshot (after Activity) ──
const BreakHealthSnapshot = ({ answers, onContinue }: Omit<BreakScreenProps, "breakType">) => {
  const activityAnswer = answers.activity as string || "";
  const sleepAnswer = answers.sleepQuality as string || "";
  const energyAnswer = answers.energyLevels as string || "";

  // Map activity to level
  const getActivityLevel = () => {
    if (activityAnswer.includes("several times")) return { label: "Very active", desc: "5+ workouts per week", position: 85, highlight: "High", insight: "Your activity gives you a strong advantage for results" };
    if (activityAnswer.includes("Moderate")) return { label: "Somewhat active", desc: "2-4 workouts per week or active job", position: 55, highlight: "Moderate", insight: "You've got a solid base for steady fat loss" };
    if (activityAnswer.includes("Light")) return { label: "Lightly active", desc: "Walking and light movement", position: 35, highlight: "Moderate", insight: "You've got a solid base for steady fat loss" };
    return { label: "Low activity", desc: "Mostly desk-based or sedentary", position: 15, highlight: "Low", insight: "Lower daily movement can slow fat loss without structure" };
  };

  const getSleepLevel = () => {
    if (sleepAnswer.includes("Consistent")) return { label: "Good sleep", desc: "Consistent and restful", position: 80, highlight: "High", insight: "Strong sleep supports steady fat loss and appetite control" };
    if (sleepAnswer.includes("okay")) return { label: "Fair sleep", desc: "Mostly okay but could improve", position: 55, highlight: "Moderate", insight: "Improving sleep will help accelerate your results" };
    if (sleepAnswer.includes("Broken")) return { label: "Disrupted sleep", desc: "Broken or inconsistent patterns", position: 30, highlight: "Low", insight: "Poor sleep can increase cravings and slow fat loss" };
    return { label: "Poor sleep", desc: "Affecting energy and recovery", position: 12, highlight: "Low", insight: "Poor sleep can increase cravings and slow fat loss" };
  };

  const getEnergyLevel = () => {
    if (energyAnswer.includes("High and steady")) return { label: "Steady energy", desc: "Consistent throughout the day", position: 80, highlight: "High", insight: "Stable energy makes it easier to stay consistent" };
    if (energyAnswer.includes("afternoon")) return { label: "Afternoon dip", desc: "Energy drops mid-day", position: 45, highlight: "Moderate", insight: "Fluctuating energy can make consistency harder" };
    if (energyAnswer.includes("before meals")) return { label: "Meal-dependent", desc: "Energy tied to eating patterns", position: 35, highlight: "Moderate", insight: "Fluctuating energy can make consistency harder" };
    return { label: "Low energy", desc: "Feeling drained most of the day", position: 15, highlight: "Low", insight: "Energy dips can lead to overeating later in the day" };
  };

  const activity = getActivityLevel();
  const sleep = getSleepLevel();
  const energy = getEnergyLevel();

  const metrics = [
    { icon: "🏃", title: "Daily activity level", ...activity },
    { icon: "😴", title: "Sleep quality", ...sleep },
    { icon: "⚡", title: "Energy levels", ...energy },
  ];

  // Dynamic bottom summary — 1 paragraph (max 2 sentences) reflecting the
  // combined profile across activity / sleep / energy.
  const getSummary = () => {
    const a = activity.highlight; // High | Moderate | Low
    const s = sleep.highlight;
    const e = energy.highlight;

    // Archetype 4 — High activity + Good sleep + Steady energy
    if (a === "High" && s === "High" && e === "High") {
      return "You're already doing a lot right, with strong movement, good sleep, and stable energy, so your results will mostly come down to aligning your meals properly to accelerate fat loss.";
    }
    // Archetype 5 — High activity + Poor sleep + Low/Mixed energy
    if (a === "High" && (s === "Low" || e !== "High")) {
      return "You're putting in the effort with your activity, but inconsistent sleep and energy can limit your results, which is why improving how your body is fuelled and recovered will make a noticeable difference.";
    }
    // Archetype 1 — Low activity + Good sleep + Steady energy
    if (a === "Low" && s === "High" && e === "High") {
      return "You've got a solid foundation with good sleep and steady energy, but lower daily movement is likely holding back faster progress, so your results will come down to how well your meals are structured.";
    }
    // Archetype 2 — Low activity + Poor sleep + Low/Mixed energy
    if (a === "Low" && s === "Low") {
      return "Right now your body is working against you a bit, with lower movement, inconsistent sleep, and fluctuating energy making fat loss harder than it should be, which is exactly where a more structured approach makes the biggest difference.";
    }
    // Archetype 6 — Low/Moderate activity + Good sleep + Mixed energy
    if ((a === "Low" || a === "Moderate") && s === "High" && e === "Moderate") {
      return "You've got a good base with your sleep, but fluctuating energy and lower movement can make consistency harder, so structuring your meals properly will help stabilise things and drive progress.";
    }
    // Archetype 3 — Moderate activity + Average sleep + Mixed energy (catch-all)
    return "You're in a decent position overall, but small inconsistencies in sleep and energy can make progress feel stop-start, so tightening up your structure will help turn this into steady results.";
  };

  const summary = getSummary();

  const highlightColor = (level: string) => {
    if (level === "High") return "text-green-600";
    if (level === "Moderate") return "text-amber-500";
    return "text-red-500";
  };

  const barColor = (level: string) => {
    if (level === "High") return "bg-green-500";
    if (level === "Moderate") return "bg-amber-400";
    return "bg-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center will-change-transform"
    >
      <p className="text-sm text-muted-foreground mb-1">Here's what we've learned so far:</p>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
        Your Health Score
      </h2>

      <div className="space-y-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="bg-white rounded-2xl border border-border/50 p-5 text-left shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{m.icon}</span>
              <span className="text-sm font-medium text-muted-foreground">{m.title}</span>
            </div>
            <div className="bg-muted/40 rounded-xl p-4">
              <p className="font-bold text-foreground text-lg">{m.label}</p>
              <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
              <div className="relative h-2 bg-muted rounded-full">
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-full ${barColor(m.highlight)}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${m.position}%` }}
                  transition={{ delay: 0.5 + i * 0.25, duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute top-1/2 w-3.5 h-3.5 bg-foreground rounded-full border-2 border-white shadow"
                  initial={{ left: "0%", x: "-50%", y: "-50%" }}
                  animate={{ left: `${m.position}%` }}
                  transition={{ delay: 0.5 + i * 0.25, duration: 0.8, ease: "easeOut" }}
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                <span>Low</span>
                <span className={`font-semibold ${highlightColor(m.highlight)}`}>{m.highlight}</span>
                <span>High</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3 mb-6 text-left"
      >
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-foreground font-medium">{summary}</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={onContinue}
        className="w-full max-w-xs mx-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all"
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break 3: Food Preferences Transition ──
const BreakFoodPreferences = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const foods = [
    { emoji: "🐟", label: "Fish + meat" },
    { emoji: "🍝", label: "Pasta + grains" },
    { emoji: "🥦", label: "Vegetables" },
    { emoji: "🥑", label: "Healthy fats" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center px-6 will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        Now let’s build this around the food you enjoy.
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-8">
        No restrictions. Just food that works for you
      </p>

      <div className="grid grid-cols-2 gap-3 mb-10 max-w-xs mx-auto">
        {foods.map((food, i) => (
          <motion.div
            key={food.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
            className="bg-card rounded-xl border border-border/50 p-4 flex flex-col items-center gap-2 shadow-sm"
          >
            <span className="text-3xl">{food.emoji}</span>
            <span className="text-xs text-muted-foreground font-body">{food.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break 4: We're analysing your inputs ──
const BreakAnalysingInputs = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const [progress, setProgress] = React.useState(0);
  const [autoAdvanced, setAutoAdvanced] = React.useState(false);

  const items = [
    { label: "Meal structure", delay: 0.3 },
    { label: "Energy balance", delay: 0.7 },
    { label: "Preferences", delay: 1.1 },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 200);
    const advance = setTimeout(() => {
      setAutoAdvanced(true);
      onContinue();
    }, 1800);
    return () => { clearTimeout(timer); clearTimeout(advance); };
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center px-6 will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        We're analysing your inputs
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-8">
        Balancing nutrition, energy, and lifestyle
      </p>

      <div className="w-20 h-20 mx-auto mb-8 relative">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <motion.circle
            cx="40" cy="40" r="34" fill="none"
            stroke="hsl(var(--primary))" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={213.6}
            initial={{ strokeDashoffset: 213.6 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      <div className="space-y-3 mb-8 max-w-xs mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: item.delay, duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-muted-foreground font-body">{item.label}</span>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: item.delay + 0.1, duration: 0.2 }}
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ── Break 5: Just a few final details ──
const BreakFinalDetails = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const checklist = [
    { label: "Goals", done: true },
    { label: "Preferences", done: true },
    { label: "Lifestyle", done: true },
    { label: "Final details…", done: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto text-center px-6 will-change-transform"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        Great! Your plan is nearly ready.
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-8">
        Just a couple of quick details to finish it off
      </p>

      <div className="bg-card rounded-xl border border-border shadow-card p-5 mb-8 max-w-xs mx-auto">
        <div className="space-y-3">
          {checklist.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {item.done ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0"
                  animate={{ borderColor: ["hsl(var(--muted-foreground) / 0.3)", "hsl(var(--primary))", "hsl(var(--muted-foreground) / 0.3)"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <span className={`text-sm font-body ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-8 flex items-start gap-3 max-w-sm mx-auto text-left"
      >
        <span className="text-xl flex-shrink-0 mt-0.5">👍</span>
        <p className="text-sm font-body text-green-900">
          Then we'll show your personalised Hormone Reset Diet
        </p>
      </motion.div>

      <motion.button
        onClick={onContinue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── NEW BREAK SCREENS ────────────────────────────────────────

// Personal Profile (replaces BMI screen with the "Here's what this tells us about you" mock)
const BreakPersonalProfile = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const heightIn = (answers.height as number) || 66;
  const weightLbs = (answers.weight as number) || 180;
  const goalLbs = (answers.goalWeight as number) || 150;
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
  const heightM = heightIn * 0.0254;
  const weightKg = weightLbs * 0.4536;
  const bmi = weightKg / (heightM * heightM);
  const bmiRounded = Math.round(bmi * 10) / 10;
  const bmiPct = Math.max(2, Math.min(98, ((bmi - 15) / (40 - 15)) * 100));
  const goalLossDisplay = Math.max(0, toUnit(weightLbs) - toUnit(goalLbs));
  const showRisks = bmi > 25;
  const isMale = ((answers.sex as string) || (answers.gender as string)) === "Male";
  const age = (answers.age as string) || "—";

  const heightFt = Math.floor(heightIn / 12);
  const heightInches = heightIn % 12;
  const heightDisplay = `${heightFt}'${heightInches}"`;

  const bmiStatus = bmi < 18.5 ? "Below optimal range"
    : bmi < 25 ? "Healthy range"
      : bmi < 30 ? "Above optimal range"
        : "Significantly above range";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-6 text-balance">
        Here's what this tells us about you
      </h2>

      {/* BMI card with portrait */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5 md:p-6 mb-4">
        <div className="grid grid-cols-[1fr_auto] gap-4 items-center mb-5">
          <div>
            <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Body Mass Index (BMI)
            </p>
            <div className="text-4xl font-display font-bold text-foreground leading-none">
              {bmiRounded}
            </div>
            <p className="text-sm font-body text-primary font-semibold mt-1">{bmiStatus}</p>
            <p className="text-xs font-body text-muted-foreground mt-0.5">Ideal &lt; 21.5</p>
          </div>
          <img
            src={getBodyImageForBmi(bmi, isMale)}
            alt="Body reference reflective of your current weight"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={512}
            height={768}
            className={`${isMale ? "w-36 sm:w-40 h-44 sm:h-48" : "w-28 sm:w-32 h-36 sm:h-40"} object-cover object-top rounded-xl border border-border`}
          />
        </div>

        {/* BMI gauge */}
        <div className="relative pt-8 pb-2">
          <motion.div
            className="absolute -top-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body font-bold shadow-medium whitespace-nowrap"
            initial={{ left: "0%", x: "-50%", opacity: 0 }}
            animate={{ left: `${bmiPct}%`, x: "-50%", opacity: 1 }}
            transition={{ left: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }, opacity: { duration: 0.2, delay: 0.2 } }}
          >
            You – <CountUp to={bmiRounded} duration={0.8} delay={0.2} decimals={1} />
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary" />
          </motion.div>
          <div
            className="h-3 w-full rounded-full"
            style={{
              background: "linear-gradient(to right, hsl(210 80% 60%), hsl(140 50% 55%) 25%, hsl(45 90% 60%) 55%, hsl(15 85% 55%) 100%)",
            }}
          />
          <div className="flex justify-between text-[10px] font-body text-muted-foreground mt-1.5 px-0.5">
            <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wide">Age</p>
            <p className="text-sm font-body font-bold text-foreground">{age}</p>
          </div>
          <div>
            <p className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wide">Height</p>
            <p className="text-sm font-body font-bold text-foreground">{heightDisplay}</p>
          </div>
          <div>
            <p className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wide">Weight</p>
            <p className="text-sm font-body font-bold text-foreground">{toUnit(weightLbs)} {unit}</p>
          </div>
          <div>
            <p className="text-[10px] font-body font-semibold text-muted-foreground uppercase tracking-wide">Goal</p>
            <p className="text-sm font-body font-bold text-foreground">
              {goalLossDisplay > 0 ? `Lose ${goalLossDisplay} ${unit}` : "Maintain"}
            </p>
          </div>
        </div>
      </div>

      {showRisks && (
        <div
          className="rounded-2xl border p-4 mb-4"
          style={{ backgroundColor: "hsl(25 90% 96%)", borderColor: "hsl(25 80% 85%)" }}
        >
          <p className="text-sm font-body font-bold text-foreground mb-2">What's likely happening</p>
          <p className="text-xs font-body text-foreground/80 leading-relaxed">
            Your body may be holding onto weight due to elevated cortisol, poor insulin response, and shifts in estrogen — making fat loss harder than it should be. This isn't just about calories or willpower.
          </p>
        </div>
      )}

      {/* What this means */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-6">
        <p className="text-sm font-body font-bold text-foreground mb-3">What this means</p>
        <ul className="space-y-2.5">
          {[
            "Your body may be resisting fat loss, not failing it",
            "Most diets don't address this",
            "Fix the signals, and weight starts to shift",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-xs font-body text-foreground/80 leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// Inline weight projection
const BreakProjectionInline = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const currentLbs = (answers.weight as number) || 180;
  const goalLbs = (answers.goalWeight as number) || 150;
  const unit = ((answers.weightUnit as string) === "kg" ? "kg" : "lbs") as "kg" | "lbs";
  const toDisplay = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
  const currentWeight = toDisplay(currentLbs);
  const goalWeight = toDisplay(goalLbs);
  const u = unit;

  const now = new Date();
  const target = new Date(now.getTime() + 85 * 24 * 60 * 60 * 1000);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ordinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const targetDateStr = `${months[target.getMonth()]} ${ordinal(target.getDate())}`;
  const diff = currentWeight - goalWeight;
  const m1 = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000);
  const m2 = new Date(now.getTime() + 56 * 24 * 60 * 60 * 1000);
  const w1 = Math.round(currentWeight - diff * 0.35);
  const w2 = Math.round(currentWeight - diff * 0.65);
  const monthLabels = ["Now", shortMonths[m1.getMonth()], shortMonths[m2.getMonth()], shortMonths[target.getMonth()]];

  const chartW = 360, chartH = 160;
  const padL = 40, padR = 40, padT = 30;
  const usableW = chartW - padL - padR;
  const usableH = chartH - padT - 30;
  const weights = [currentWeight, w1, w2, goalWeight];
  const minW = goalWeight;
  const range = currentWeight - minW || 1;

  const pts = weights.map((w, i) => ({
    x: padL + (i / 3) * usableW,
    y: padT + usableH - ((w - minW) / range) * usableH,
    w,
  }));

  const pathD = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");
  const fillD = `${pathD} L ${pts[3].x} ${padT + usableH + 5} L ${pts[0].x} ${padT + usableH + 5} Z`;
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];

  const userName = (answers.name as string) || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >

      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2">
        {userName ? `${userName}, here's your` : "Here's your"} projected reset path to {goalWeight}{u}
      </h2>
      <p className="text-sm text-muted-foreground font-body text-center mb-6 leading-relaxed">
        Based on your answers, your body is likely holding weight due to <span className="font-semibold text-foreground">hormonal resistance — not just calories.</span> This plan is designed to reverse that.
      </p>

      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full">
          <defs>
            <linearGradient id="lineGradInline" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="33%" stopColor="#f97316" />
              <stop offset="66%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="fillGradInline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path d={fillD} fill="url(#fillGradInline)" />
          <motion.path
            d={pathD} fill="none" stroke="url(#lineGradInline)" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
          {pts.map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x} cy={p.y} r={i === 3 ? 7 : 5} fill={colors[i]}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.3 }}
              />
              {i < 3 && (
                <text x={p.x} y={p.y - 12} textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">
                  {p.w}{u}
                </text>
              )}
              <text x={p.x} y={chartH + 12} textAnchor="middle" className="text-[11px]" fill="hsl(var(--muted-foreground))">
                {monthLabels[i]}
              </text>
            </g>
          ))}
          <g>
            <rect x={pts[3].x - 48} y={pts[3].y - 38} width="96" height="34" rx="8"
              fill="hsl(150 30% 94%)" stroke="hsl(150 30% 85%)" strokeWidth="1" />
            <text x={pts[3].x} y={pts[3].y - 24} textAnchor="middle" className="text-[9px]" fill="hsl(150 40% 35%)">
              Your reset target
            </text>
            <text x={pts[3].x} y={pts[3].y - 11} textAnchor="middle" className="text-[14px] font-bold" fill="hsl(150 40% 30%)">
              {goalWeight}{u}
            </text>
          </g>
        </svg>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Build My Hormone Reset Plan
      </motion.button>

      <div
        className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border"
        style={{ backgroundColor: "hsl(150 50% 96%)", borderColor: "hsl(150 40% 80%)" }}
      >
        <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(150 60% 35%)" }} />
        <p className="text-sm font-body font-semibold text-center" style={{ color: "hsl(150 60% 25%)" }}>
          You're not stuck — your body just needs the right signals.
        </p>
      </div>
    </motion.div>
  );
};

// 80% personalised
const BreakEightyPercent = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const sex = (answers.sex as string) || (answers.gender as string) || "Female";
  const age = (answers.age as string) || "40–49";
  const isMale = sex === "Male";
  const audience = isMale ? "men" : "women";
  let bucketCopy = "in their 40s and 50s";
  if (age === "Under 30") bucketCopy = "under 30";
  else if (age === "30–39" || age === "30-39") bucketCopy = "in their 30s";
  else if (age === "Under 40") bucketCopy = "under 40";
  else if (age === "40–49" || age === "40-49") bucketCopy = "in their 40s";
  else if (age === "50–59" || age === "50-59") bucketCopy = "in their 50s";
  else if (age === "60–69" || age === "60-69") bucketCopy = "in their 60s";
  else if (age === "70+") bucketCopy = "aged 70+";
  const name = (answers.name as string) || "";

  const avgLossLbs = 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      {/* Stat headline — inline 92% sized in line with copy */}
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-5 leading-tight">
        <span className="text-primary">92%</span> of our users {bucketCopy} have reduced their weight by fixing the root cause of their hormonal issues naturally.
      </h2>

      <div className="rounded-2xl overflow-hidden border border-border shadow-card mb-5">
        <img
          src={isMale ? eightyPercentMen : eightyPercentWomen}
          alt={isMale ? "Happy active couple in their 50s outdoors" : "Confident woman cooking a healthy Hormone Reset Diet meal"}
          loading="lazy"
          width={1024}
          height={640}
          className="w-full h-44 sm:h-52 object-cover"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-6 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-foreground">Average results</p>
            <p className="text-xs font-body text-muted-foreground">Based on plan participants</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <div className="text-xl font-display font-bold text-primary">-{avgLossLbs} lbs</div>
            <div className="text-[10px] font-body text-muted-foreground uppercase tracking-wide">in 6 weeks</div>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <div className="text-xl font-display font-bold text-primary">94%</div>
            <div className="text-[10px] font-body text-muted-foreground uppercase tracking-wide">felt more energy</div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// Hormone Reset Diet stabilises (transitional) — comparison weight chart (3-line: Hormone Reset Diet vs Restrictive vs GLP-1)
const BreakMediterraneanStabilises = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  const [animStage, setAnimStage] = React.useState(0);

  React.useEffect(() => {
    const t1 = setTimeout(() => setAnimStage(1), 400);   // Restrictive
    const t2 = setTimeout(() => setAnimStage(2), 1200);  // GLP-1
    const t3 = setTimeout(() => setAnimStage(3), 2000);  // Hormone Reset Diet
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Hormone Reset Diet: steady, sustainable decline (ends lowest)
  const medPoints = [
    { x: 50, y: 30 }, { x: 183, y: 75 }, { x: 317, y: 130 }, { x: 450, y: 175 },
  ];
  // Restrictive diets: sharp drop → plateau → regain
  const restrictivePoints = [
    { x: 50, y: 30 }, { x: 183, y: 110 }, { x: 317, y: 120 }, { x: 450, y: 70 },
  ];
  // GLP-1 / Quick fix: very steep drop → sharp rebound
  const glp1Points = [
    { x: 50, y: 30 }, { x: 183, y: 140 }, { x: 317, y: 100 }, { x: 450, y: 45 },
  ];

  const toSmooth = (pts: { x: number; y: number }[]) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.45;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.55;
      d += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const months = ["Month 1", "Month 2", "Month 3", "Month 4"];
  const lineLen = 600;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-5">
        A Smarter Way to Reset Weight Loss After 40
      </h2>

      <div className="bg-card rounded-2xl border border-border shadow-card p-5 pb-4 mb-5">
        <p className="text-[11px] text-muted-foreground mb-4 text-center tracking-wide uppercase">Based on how your body responds over time</p>

        <svg viewBox="0 0 500 210" className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <style>{`
              .med-stab-line { fill: none; stroke-linecap: round; transition: stroke-dashoffset 1.2s ease-out; }
            `}</style>
          </defs>

          {/* Grid lines */}
          {[55, 95, 135, 175].map((y) => (
            <line key={y} x1="50" y1={y} x2="450" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />
          ))}

          {/* Y axis label */}
          <text x="18" y="110" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle" transform="rotate(-90 18 110)" opacity="0.5" fontWeight="500">Weight</text>

          {/* 1. Restrictive line */}
          <path
            className="med-stab-line"
            d={toSmooth(restrictivePoints)}
            stroke="#b0a899"
            strokeWidth="2.5"
            strokeDasharray={lineLen}
            strokeDashoffset={animStage >= 1 ? 0 : lineLen}
          />
          {animStage >= 1 && (
            <>
              <circle cx={restrictivePoints[3].x} cy={restrictivePoints[3].y} r="4" fill="#b0a899" opacity="0.8">
                <animate attributeName="opacity" from="0" to="0.8" dur="0.3s" fill="freeze" />
              </circle>
              <text x={restrictivePoints[3].x + 8} y={restrictivePoints[3].y - 6} fontSize="9" fill="#b0a899" fontWeight="500" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.2s" fill="freeze" />
                Restrictive
              </text>
            </>
          )}

          {/* 2. GLP-1 line */}
          <path
            className="med-stab-line"
            d={toSmooth(glp1Points)}
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            opacity="0.6"
            strokeDasharray={lineLen}
            strokeDashoffset={animStage >= 2 ? 0 : lineLen}
          />
          {animStage >= 2 && (
            <>
              <circle cx={glp1Points[3].x} cy={glp1Points[3].y} r="4" fill="hsl(var(--primary))" opacity="0.6">
                <animate attributeName="opacity" from="0" to="0.6" dur="0.3s" fill="freeze" />
              </circle>
              <text x={glp1Points[3].x + 8} y={glp1Points[3].y - 6} fontSize="9" fill="hsl(var(--primary))" fontWeight="500" opacity="0">
                <animate attributeName="opacity" from="0" to="0.7" dur="0.3s" begin="0.2s" fill="freeze" />
                GLP-1
              </text>
            </>
          )}

          {/* 3. Hormone Reset Diet line */}
          <path
            className="med-stab-line"
            d={toSmooth(medPoints)}
            stroke="#4a7c59"
            strokeWidth="3"
            strokeDasharray={lineLen}
            strokeDashoffset={animStage >= 3 ? 0 : lineLen}
          />
          {animStage >= 3 && (
            <>
              <circle cx={medPoints[3].x} cy={medPoints[3].y} r="5" fill="#4a7c59">
                <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" />
              </circle>
              <text x={medPoints[3].x - 8} y={medPoints[3].y + 16} fontSize="10" fill="#4a7c59" fontWeight="600" textAnchor="end" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.2s" fill="freeze" />
                Hormone Reset Diet ✓
              </text>
            </>
          )}

          {/* X axis months */}
          {months.map((m, i) => (
            <text key={m} x={50 + i * 133.3} y="202" fontSize="9.5" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.65" fontWeight="400">{m}</text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[3px] rounded-full" style={{ backgroundColor: "#4a7c59" }} />
            <span className="text-[11px] text-foreground font-medium">Hormone Reset Diet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-[3px] rounded-full" style={{ backgroundColor: "#b0a899" }} />
            <span className="text-[11px] text-muted-foreground">Restrictive Diets</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-[3px] rounded-full bg-primary opacity-60" />
            <span className="text-[11px] text-muted-foreground">Short-term / GLP-1</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6 text-left">
        {[
          { icon: Leaf, text: "Foods that naturally reduce hunger signals" },
          { icon: Heart, text: "Fats that help stabilise blood sugar and insulin" },
          { icon: Sun, text: "Steady energy, without spikes and crashes" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-card rounded-xl border border-border p-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-body text-foreground pt-1.5">{item.text}</p>
          </div>
        ))}
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// Building plan transitional
const BreakBuildingPlanTransition = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const name = (answers?.name as string) || "";
  const age = (answers?.age as string) || "";
  const weightLbs = (answers?.weight as number) || 180;
  const goalLbs = (answers?.goalWeight as number) || 150;
  // Rough calorie target: maintenance ~ 13 cal/lb, subtract ~400 for steady loss, clamp.
  const targetCal = Math.max(1200, Math.min(2200, Math.round((weightLbs * 13 - 400) / 10) * 10));
  const meals = [
    { name: "Breakfast", img: mealThumbBreakfast, desc: "Greek yogurt & berries", kcal: Math.round(targetCal * 0.25) },
    { name: "Lunch", img: mealThumbLunch, desc: "Chicken & avocado salad", kcal: Math.round(targetCal * 0.32) },
    { name: "Snack", img: mealThumbSnack, desc: "Hummus & veggie sticks", kcal: Math.round(targetCal * 0.10) },
    { name: "Dinner", img: mealThumbDinner, desc: "Salmon & sweet potato", kcal: Math.round(targetCal * 0.29) },
  ];
  const proteinPct = 25;
  const carbsPct = 40;
  const fatsPct = 35;
  const MacroRing = ({ label, value, color }: { label: string; value: number; color: string }) => {
    const r = 13;
    const c = 2 * Math.PI * r;
    const offset = c - (value / 100) * c;
    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: 34, height: 34 }}>
          <svg width="34" height="34" viewBox="0 0 34 34" className="-rotate-90">
            <circle cx="17" cy="17" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
            <circle cx="17" cy="17" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[8px] font-display font-bold text-gray-900">
            {value}%
          </div>
        </div>
        <div className="text-[7px] text-gray-500 font-body mt-0.5">{label}</div>
      </div>
    );
  };
  const sex = (answers?.sex as string) || (answers?.gender as string) || "";
  const isMale = sex === "Male";
  const avatar = isMale ? avatarUserMale : avatarUserFemale;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 text-balance">
        {name ? `${name}, we're` : "We're"} building your Hormone Reset Plan
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-6 max-w-sm mx-auto">
        Built around your habits, body, and goals — to help restore your natural fat-burning rhythm.
      </p>

      {/* Realistic iPhone mockup */}
      <div className="relative mx-auto mb-6" style={{ width: 280 }}>
        <div
          className="relative rounded-[3rem] p-[3px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]"
          style={{
            background: "linear-gradient(145deg, #1f2937 0%, #4b5563 35%, #111827 70%, #374151 100%)",
            aspectRatio: "9 / 19.5",
          }}
        >
          <div className="relative h-full w-full rounded-[2.85rem] bg-black p-[6px]">
            <span className="absolute -left-[5px] top-[18%] h-[7%] w-[3px] rounded-l bg-gray-700" />
            <span className="absolute -left-[5px] top-[30%] h-[10%] w-[3px] rounded-l bg-gray-700" />
            <span className="absolute -left-[5px] top-[42%] h-[10%] w-[3px] rounded-l bg-gray-700" />
            <span className="absolute -right-[5px] top-[28%] h-[14%] w-[3px] rounded-r bg-gray-700" />

            <div className="relative h-full w-full rounded-[2.55rem] overflow-hidden flex flex-col" style={{ backgroundColor: "#f5f3ee" }}>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-[18px] w-[78px] rounded-full bg-black" />

              <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[8px] font-semibold text-gray-900">
                <span>9:41</span>
                <span className="opacity-0">•</span>
                <span className="flex items-center gap-1">
                  <span>•••</span>
                  <span>100%</span>
                </span>
              </div>

              {/* App content — fills remaining height */}
              <div className="flex-1 px-3 pt-3 pb-6 flex flex-col gap-2 overflow-hidden">
                {/* Profile header */}
                <div className="flex items-center gap-2 text-left">
                  <img
                    src={avatar}
                    alt={name ? `${name}'s avatar` : "Your avatar"}
                    loading="lazy"
                    width={64}
                    height={64}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="min-w-0">
                    <div className="text-[9px] font-body text-gray-500 leading-tight">Welcome back</div>
                    <div className="text-[11px] font-display font-bold text-gray-900 leading-tight truncate">
                      {name || "You"}{age ? `, ${age}` : ""}
                    </div>
                  </div>
                  <div className="ml-auto w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Leaf className="w-3.5 h-3.5 text-primary" />
                  </div>
                </div>

                {/* Calorie hero — LIGHT vibrant card with macro rings */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl p-3 shadow-md border border-white/60"
                  style={{ background: "linear-gradient(135deg, #ffffff 0%, #fff5f3 100%)" }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-left">
                      <div className="text-[7px] font-body text-gray-500 uppercase tracking-wider">Daily calories</div>
                      <div className="text-[18px] font-display font-bold text-gray-900 tabular-nums leading-tight">
                        {(targetCal - 100).toLocaleString()}–{(targetCal + 100).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[7px] font-body text-gray-500 uppercase tracking-wider">Goal</div>
                      <div className="text-[10px] font-display font-bold text-primary tabular-nums leading-tight">-{Math.max(0, weightLbs - goalLbs)} lbs</div>
                    </div>
                  </div>
                  <div className="flex justify-around pt-1 border-t border-gray-100">
                    <MacroRing label="Protein" value={proteinPct} color="hsl(340 85% 58%)" />
                    <MacroRing label="Carbs" value={carbsPct} color="hsl(38 90% 55%)" />
                    <MacroRing label="Fats" value={fatsPct} color="hsl(150 50% 45%)" />
                  </div>
                </motion.div>

                {/* Meal cards — taller, fill remaining vertical space evenly */}
                <div className="flex-1 flex flex-col gap-1.5 min-h-0">
                  {meals.map((m, i) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.12 }}
                      className="bg-white rounded-xl p-1.5 flex items-center gap-2 shadow-sm flex-1 min-h-0"
                    >
                      <img
                        src={m.img}
                        alt={m.desc}
                        className="h-full aspect-square rounded-lg object-cover flex-shrink-0"
                        loading="lazy"
                        width={64}
                        height={64}
                      />
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <div className="text-[10px] font-body font-semibold text-gray-900">{m.name}</div>
                          <div className="text-[9px] font-body font-semibold text-primary tabular-nums">{m.kcal} kcal</div>
                        </div>
                        <div className="text-[9px] font-body text-gray-500 truncate">{m.desc}</div>
                        <div className="h-0.5 mt-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-hero rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${60 + (m.kcal % 30)}%` }}
                            transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom tab bar */}
                <div className="flex items-center justify-around bg-white rounded-xl py-1.5 shadow-sm border border-gray-100">
                  <div className="flex flex-col items-center text-primary">
                    <Heart className="w-3 h-3" />
                    <span className="text-[6px] font-body font-semibold mt-0.5">Plan</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <Activity className="w-3 h-3" />
                    <span className="text-[6px] font-body mt-0.5">Activity</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <TrendingDown className="w-3 h-3" />
                    <span className="text-[6px] font-body mt-0.5">Progress</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-20 rounded-full bg-gray-900/80" />
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// Weight loss blockers
const BreakWeightLossBlockers = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const hunger = (answers.hungerPattern as string) || "";
  const sweet = (answers.sweetTooth as string) || "";
  const alcohol = (answers.alcohol as string) || "";
  const sleep = (answers.sleepQuality as string) || "";
  const energy = (answers.energyLevels as string) || "";
  const pastResults = (answers.pastResults as string) || "";
  const pastDiets = (answers.pastDiets as string[]) || [];

  let emotional = 20;
  if (hunger.includes("Grazing") || hunger.includes("Changes")) emotional += 25;
  if (sweet === "Yes") emotional += 18;
  if (alcohol.includes("few") || alcohol.includes("Most")) emotional += 12;

  let stress = 18;
  if (sleep.includes("Very poor") || sleep.includes("Broken")) stress += 25;
  if (energy.includes("Low")) stress += 18;
  if (alcohol.includes("Most")) stress += 10;

  // All-or-Nothing Dieting — driven by past restrictive diet attempts and "lose then regain"
  let allOrNothing = 15;
  if (pastResults.includes("never lasts")) allOrNothing += 22;
  if (pastResults.includes("multiple times")) allOrNothing += 18;
  if (pastDiets.some((d) => ["Keto", "Carnivore", "Low-carb", "Intermittent fasting"].includes(d))) allOrNothing += 12;

  // Inconsistent Habits — driven by irregular hunger/energy + sporadic activity history
  let inconsistent = 15;
  if (hunger.includes("Changes") || hunger.includes("Grazing")) inconsistent += 15;
  if (energy.includes("Drop") || energy.includes("Low before")) inconsistent += 15;
  if (pastResults.includes("struggle")) inconsistent += 12;
  if (pastDiets.length >= 2) inconsistent += 10;

  const raw = [
    { name: "Emotional Eating", score: emotional, color: "hsl(15 85% 55%)" },
    { name: "All-or-Nothing Dieting", score: allOrNothing, color: "hsl(280 60% 55%)" },
    { name: "Inconsistent Habits", score: inconsistent, color: "hsl(210 70% 55%)" },
    { name: "Stress & Overload", score: stress, color: "hsl(35 85% 55%)" },
  ];
  const total = raw.reduce((a, b) => a + b.score, 0);
  const blockers = raw
    .map(b => ({ ...b, pct: Math.round((b.score / total) * 100) }))
    .sort((a, b) => b.pct - a.pct);

  const top = blockers[0];
  const explanations: Record<string, string> = {
    "Emotional Eating": "You often eat in response to emotions or cravings rather than hunger. We'll structure your meals to keep blood sugar steady and reduce impulse eating.",
    "All-or-Nothing Dieting": "You go all-in on restrictive plans, then bounce back when life gets in the way. Your plan removes restriction and gives you flexible structure that holds up on busy weeks.",
    "Inconsistent Habits": "Your eating, energy and routine swing day to day, which makes results hard to lock in. Your plan builds simple, repeatable rhythms so progress compounds.",
    "Stress & Overload": "Stress and poor sleep elevate cortisol, which drives weight gain. Your plan focuses on calming foods and sustainable routines.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2">
        Your weight loss blockers
      </h2>
      <p className="text-sm text-muted-foreground font-body text-center mb-6">
        Here's what's been holding you back — ranked by impact.
      </p>

      <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-4 space-y-4">
        {blockers.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-body font-semibold text-foreground">{b.name}</span>
              <span className="text-sm font-body font-bold tabular-nums" style={{ color: b.color }}>{b.pct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: b.color }}
                initial={{ width: 0 }}
                animate={{ width: `${b.pct}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-green-50 rounded-2xl border border-green-200 shadow-card p-4 mb-6 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm font-body text-green-900 leading-relaxed">
          That's why Hormone Reset Diet focuses on calming the stress, hunger, and energy signals that keep the body stuck in storage mode.
        </p>
      </div>

      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// Thanks for sharing transitional
const BreakThanksForSharing = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const name = (answers?.name as string) || "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div
        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "hsl(150 60% 92%)" }}
      >
        <CheckCircle className="w-9 h-9" style={{ color: "hsl(150 60% 38%)" }} strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 text-balance">
        {name ? `Thanks for sharing, ${name}` : "Thanks for sharing"}
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-6 max-w-sm mx-auto">
        Just a few quick questions to help us understand how you feel right now — there are no wrong answers.
      </p>
      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

const BreakSleepGraphic = ({ onContinue, answers }: Omit<BreakScreenProps, "breakType">) => {
  const name = (answers?.name as string) || "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden mb-5 shadow-medium">
        <img src={sleepInsightWoman} alt="Calm woman by a lake" className="w-full h-auto object-cover" loading="lazy" />
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 text-balance">
        {name ? `${name}, sleep is the foundation of hormone balance` : "Sleep is the foundation of hormone balance"}
      </h2>
      <p className="text-sm text-muted-foreground font-body mb-6 max-w-sm mx-auto">
        Poor sleep raises cortisol, drives cravings, and slows fat loss. We'll factor your sleep pattern into your plan.
      </p>
      <motion.button
        onClick={onContinue}
        className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

// ── Break: You're not alone in this (after "how-long") ──
const BreakNotAloneInThis = ({ onContinue }: Omit<BreakScreenProps, "breakType" | "answers">) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-lg mx-auto will-change-transform"
    >
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="rounded-xl overflow-hidden mb-5">
          <img
            src={womanKitchenSalad}
            alt="Woman smiling in kitchen preparing a healthy salad"
            loading="lazy"
            className="w-full h-56 object-cover rounded-xl"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
          You're not alone <span className="text-primary">in this</span>
        </h2>
        <div className="space-y-3 text-sm font-body text-foreground/80 leading-relaxed">
          <p>
            Hormone Reset Diet is for women over 40 whose results have slowed or stalled.
          </p>
          <p>
            If weight won't shift and energy feels off, it's not willpower — your body is working differently now.
          </p>
          <p>
            We reset the system with simple structure and support that works.
          </p>
        </div>
      </div>

      <motion.button
        onClick={onContinue}
        className="mt-6 w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

const BreakScreens = ({ breakType, answers, onContinue }: BreakScreenProps) => {
  switch (breakType) {
    case "notAloneInThis":
      return <BreakNotAloneInThis onContinue={onContinue} />;
    case "trustedStudy":
      return <BreakTrustedStudy onContinue={onContinue} answers={answers} />;
    case "millionWomen":
      return <BreakMillionWomen onContinue={onContinue} answers={answers} />;
    case "whatIsGlp1":
      return <BreakWhatIsGlp1 onContinue={onContinue} answers={answers} />;
    case "beforeAfter":
      return <BreakBeforeAfter onContinue={onContinue} answers={answers} />;
    case "designedNaturally":
      return <BreakDesignedNaturally onContinue={onContinue} />;
    case "comparisonGraph":
      return <BreakComparisonGraph onContinue={onContinue} />;
    case "shapingPlan":
      return <BreakShapingPlan onContinue={onContinue} />;
    case "tailorEating":
      return <BreakTailorEating onContinue={onContinue} />;
    case "buildPlan":
      return <BreakBuildPlan onContinue={onContinue} />;
    case "bmi":
      return <BreakBMI answers={answers} onContinue={onContinue} />;
    case "progress":
      return <BreakProgress answers={answers} onContinue={onContinue} />;
    case "behaviouralProfile":
      return <BreakBehaviouralProfile onContinue={onContinue} />;
    case "healthSnapshot":
      return <BreakHealthSnapshot answers={answers} onContinue={onContinue} />;
    case "trustedHands":
      return <BreakTrustedHands answers={answers} onContinue={onContinue} />;
    case "foodPreferences":
      return <BreakFoodPreferences onContinue={onContinue} />;
    case "analysingInputs":
      return <BreakAnalysingInputs onContinue={onContinue} />;
    case "finalDetails":
      return <BreakFinalDetails onContinue={onContinue} />;
    case "personalProfile":
      return <BreakPersonalProfile answers={answers} onContinue={onContinue} />;
    case "projectionInline":
      return <BreakProjectionInline answers={answers} onContinue={onContinue} />;
    case "eightyPercent":
      return <BreakEightyPercent answers={answers} onContinue={onContinue} />;
    case "mediterraneanStabilises":
      return <BreakMediterraneanStabilises onContinue={onContinue} />;
    case "buildingPlan":
      return <BreakBuildingPlanTransition answers={answers} onContinue={onContinue} />;
    case "weightLossBlockers":
      return <BreakWeightLossBlockers answers={answers} onContinue={onContinue} />;
    case "thanksForSharing":
      return <BreakThanksForSharing answers={answers} onContinue={onContinue} />;
    case "sleepGraphic":
      return <BreakSleepGraphic answers={answers} onContinue={onContinue} />;
    default:
      return null;
  }
};

export default BreakScreens;
