import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Leaf, Shield, MessageCircle, ArrowRight, TrendingDown, User, Utensils, Star, Heart, Zap, CheckCircle, Award, Sparkles } from "lucide-react";
import { QuizResults } from "@/types/quiz";
import testimonialEmma from "@/assets/testimonial-emma.webp";
import testimonialRachel from "@/assets/testimonial-rachel.webp";
import testimonialSophie from "@/assets/testimonial-sophie.webp";
import testimonialJames from "@/assets/testimonial-james.webp";
import testimonialMark from "@/assets/testimonial-mark.webp";
import testimonialDavid from "@/assets/testimonial-david.webp";
import coachKimberly from "@/assets/coach-kimberly.webp";
import mediterraneanFood from "@/assets/mediterranean-food.webp";

interface ResultsPageProps {
  results: QuizResults;
  answers: Record<string, string | string[] | number>;
  onContinue: () => void;
}

const MacroRing = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" strokeWidth="6" className="stroke-muted" />
          <motion.circle
            cx="40" cy="40" r="36" fill="none" strokeWidth="6"
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-display font-bold text-foreground">
          {value}%
        </span>
      </div>
      <span className="mt-2 text-xs font-body font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className="absolute w-2 h-3 rounded-sm"
    style={{ backgroundColor: color, left: `${x}%`, top: -10 }}
    initial={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
    animate={{
      opacity: [1, 1, 0],
      y: [0, 200, 400],
      rotate: [0, 180, 360 + Math.random() * 180],
      x: [0, (Math.random() - 0.5) * 100],
      scale: [1, 1, 0.5],
    }}
    transition={{
      duration: 2.5 + Math.random(),
      delay,
      ease: "easeOut",
    }}
  />
);

const ConfettiExplosion = () => {
  const colors = [
    "hsl(340, 80%, 58%)", "hsl(4, 80%, 55%)", "hsl(38, 85%, 55%)",
    "hsl(340, 60%, 70%)", "hsl(30, 25%, 70%)", "hsl(4, 72%, 50%)",
  ];
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.8,
    x: Math.random() * 100,
    color: colors[i % colors.length],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} delay={p.delay} x={p.x} color={p.color} />
      ))}
    </div>
  );
};

const femaleTestimonials = [
  {
    name: "Emma S.",
    age: 42,
    text: "I've tried so many diets but this was the first one that actually felt sustainable. I lost 18lbs in 6 weeks and my energy is through the roof.",
    result: "Lost 18lbs in 6 weeks",
    rating: 5,
    image: testimonialEmma,
  },
  {
    name: "Rachel M.",
    age: 35,
    text: "The meal plans are so simple and delicious. My husband didn't even realize we were 'on a diet'. We both feel better than we have in years.",
    result: "Family-friendly meals",
    rating: 5,
    image: testimonialRachel,
  },
  {
    name: "Sophie L.",
    age: 51,
    text: "After menopause, I thought weight loss was impossible. This plan proved me wrong. Down 2 dress sizes and sleeping better too.",
    result: "Down 2 dress sizes",
    rating: 5,
    image: testimonialSophie,
  },
];

const maleTestimonials = [
  {
    name: "James T.",
    age: 44,
    text: "I've dropped 22lbs in 8 weeks and my energy levels are the best they've been in years. The meals are genuinely enjoyable — nothing feels like a sacrifice.",
    result: "Lost 22lbs in 8 weeks",
    rating: 5,
    image: testimonialJames,
  },
  {
    name: "Mark R.",
    age: 33,
    text: "I was skeptical but the structure made it easy to follow. My wife and I both do it now. My cholesterol numbers improved significantly.",
    result: "Improved cholesterol",
    rating: 5,
    image: testimonialMark,
  },
  {
    name: "David H.",
    age: 55,
    text: "At my age I didn't think I could shift the belly fat. This plan proved me wrong — down 15lbs and my doctor is impressed with my blood work.",
    result: "Lost 15lbs at 55",
    rating: 5,
    image: testimonialDavid,
  },
];

const ResultsPage = ({ results, answers, onContinue }: ResultsPageProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const gender = (answers.gender as string) || "Female";
  const isMale = gender === "Male";
  const testimonials = isMale ? maleTestimonials : femaleTestimonials;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = useCallback(() => {
    onContinue();
    setTimeout(() => window.scrollTo(0, 0), 50);
  }, [onContinue]);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const currentWeightLbs = (answers.weight as number) || 180;
  const goalWeightLbs = (answers.goalWeight as number) || 150;
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
  const currentWeight = toUnit(currentWeightLbs);
  const goalWeight = toUnit(goalWeightLbs);
  const weightDiff = currentWeight - goalWeight;
  const now = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const targetMonth = months[(now.getMonth() + 3) % 12];
  const targetDay = now.getDate();

  // 3-month projection data in user's display unit
  const monthlyLoss = Math.min(weightDiff / 3, unit === "kg" ? 4 : 8);
  const month1Weight = Math.round(currentWeight - monthlyLoss);
  const month2Weight = Math.round(currentWeight - monthlyLoss * 2);
  const m1 = months[(now.getMonth() + 1) % 12];
  const m2 = months[(now.getMonth() + 2) % 12];
  const m3 = months[(now.getMonth() + 3) % 12];

  // Hormone Reset Diet diet points (smoother curve with gentle variation)
  const graphPoints = [
    { x: 40, y: 30, label: `${currentWeight}`, month: "Now" },
    { x: 100, y: 52, label: "", month: "" },
    { x: 140, y: 70, label: `${month1Weight}`, month: m1 },
    { x: 180, y: 82, label: "", month: "" },
    { x: 240, y: 110, label: `${month2Weight}`, month: m2 },
    { x: 280, y: 128, label: "", month: "" },
    { x: 340, y: 150, label: `${goalWeight}`, month: m3 },
  ];
  const keyIndices = [0, 2, 4, 6];
  // Smooth cubic bezier path for Hormone Reset Diet line
  const pathD = `M 40 30 C 60 35, 85 48, 100 52 C 115 56, 125 64, 140 70 C 155 75, 165 79, 180 82 C 200 87, 220 100, 240 110 C 255 117, 265 123, 280 128 C 300 135, 320 143, 340 150`;

  // GLP-1 comparison line (moderate drop then gentle rebound, smoother)
  const glp1Points = [
    { x: 40, y: 30 },
    { x: 340, y: 70 },
  ];
  // Smooth cubic bezier: drops to ~105 area then rebounds gently to ~70
  const glp1Path = `M 40 30 C 70 40, 100 75, 140 90 C 170 100, 190 105, 220 100 C 250 95, 290 80, 340 70`;

  // Dynamic meal suggestions based on quiz answers
  const dietary = (answers.dietary as string) || "Everything";
  const proteins = (answers.proteins as string[]) || [];
  const vegetables = (answers.vegetables as string[]) || [];

  const getMealSuggestions = () => {
    let breakfast = "Greek yogurt bowl with honey, walnuts & berries";
    let lunch = "Mediterranean chickpea salad with feta & lemon dressing";
    let snack = "Hummus with cucumber & bell pepper sticks";
    let dinner = "Lemon herb salmon with roasted vegetables";
    if (dietary === "Vegan") {
      breakfast = "Overnight oats with almond butter, chia seeds & berries";
      lunch = "Roasted chickpea & quinoa bowl with tahini dressing";
      snack = "Marinated olives with sun-dried tomatoes & almonds";
      dinner = "Stuffed bell peppers with lentils, rice & Mediterranean spices";
    } else if (dietary === "Vegetarian") {
      breakfast = "Shakshuka with crusty whole grain bread";
      lunch = "Mediterranean farro bowl with roasted vegetables & feta";
      dinner = "Eggplant parmigiana with fresh basil & side salad";
    } else if (dietary === "Pescatarian") {
      dinner = "Grilled sea bass with olive tapenade & roasted vegetables";
    } else if (dietary === "Gluten Free") {
      breakfast = "Greek yogurt bowl with honey, walnuts & berries";
      lunch = "Grilled chicken & avocado salad with lemon olive oil dressing";
      dinner = "Herb-crusted salmon with roasted sweet potatoes & greens";
    } else if (dietary === "Dairy Free") {
      breakfast = "Overnight oats with coconut yogurt, honey & mixed berries";
      lunch = "Mediterranean chickpea salad with avocado & lemon dressing";
      dinner = "Lemon herb salmon with roasted vegetables & quinoa";
    }
    if (proteins.some(p => p.includes("Chicken")) && dietary !== "Vegan" && dietary !== "Vegetarian") {
      lunch = "Grilled chicken souvlaki bowl with tzatziki & fresh greens";
    }
    if (vegetables.some(v => v.includes("Leafy"))) {
      lunch = lunch.includes("salad") ? lunch : lunch + " with leafy greens";
    }
    return [
      { meal: "Breakfast", description: breakfast },
      { meal: "Lunch", description: lunch },
      { meal: "Snack", description: snack },
      { meal: "Dinner", description: dinner },
    ];
  };

  const dynamicMeals = getMealSuggestions();

  return (
    <div className="min-h-screen bg-gradient-sand">
      {/* Hero with confetti */}
      <div className="bg-gradient-hero py-8 md:py-10 px-6 relative overflow-hidden">
        {showConfetti && <ConfettiExplosion />}
        <div className="container mx-auto max-w-3xl text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground font-body font-semibold text-sm mb-4 border border-primary-foreground/15"
            >
              <Award className="w-4 h-4" />
              92% Match
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
              {results.headline}
            </h1>
            <p className="text-primary-foreground/80 font-body text-sm max-w-xl mx-auto">
              Based on your unique profile and health factors, here's your tailored plan.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 mt-6">
        {/* Profile Summary */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-bold text-foreground">Your Profile Snapshot</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {results.profileSummary.map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                <span className="text-xs text-muted-foreground font-body block">{item.label}</span>
                <span className="text-sm font-body font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3-Month Weight Projection Graph */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-bold text-foreground">Your 3-Month Weight Projection</h3>
          </div>
          <p className="text-sm text-muted-foreground font-body mb-4">
            We estimate you could reach <span className="font-semibold text-primary">{goalWeight} {unit}</span> by {targetMonth} {targetDay}th
          </p>
          <div className="bg-muted/30 rounded-lg p-4">
            <svg viewBox="0 0 380 190" className="w-full">
              <line x1="40" y1="170" x2="340" y2="170" stroke="hsl(var(--border))" strokeWidth="1" />
              <defs>
                <linearGradient id="resultsProgressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(340, 80%, 58%)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(4, 80%, 55%)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={`${pathD} L 340 170 L 40 170 Z`} fill="url(#resultsProgressGrad)" />
              <motion.path
                d={pathD}
                fill="none"
                stroke="hsl(340, 80%, 58%)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
              {/* GLP-1 comparison line */}
              <motion.path
                d={glp1Path}
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
              />
              {graphPoints.map((p, i) => {
                if (!keyIndices.includes(i)) return null;
                return (
                  <g key={i}>
                    <motion.circle
                      cx={p.x} cy={p.y} r="5"
                      fill={i === graphPoints.length - 1 ? "hsl(340, 80%, 58%)" : "hsl(var(--card))"}
                      stroke="hsl(340, 80%, 58%)" strokeWidth="2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
                    />
                    <text x={p.x} y={p.y - 14} textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">
                      {p.label} {unit}
                    </text>
                    <text x={p.x} y={185} textAnchor="middle" className="text-[10px]" fill="hsl(var(--muted-foreground))">
                      {p.month}
                    </text>
                  </g>
                );
              })}
              {/* GLP-1 end label */}
              <text x={345} y={glp1Points[glp1Points.length - 1].y - 10} textAnchor="start" className="text-[9px] font-semibold" fill="hsl(var(--muted-foreground))">
                GLP-1
              </text>
              <line x1="340" y1={150} x2="350" y2={150} stroke="hsl(340, 80%, 58%)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="355" y={154} className="text-[9px]" fill="hsl(var(--muted-foreground))">Target</text>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-primary rounded" />
              <span className="text-[10px] text-muted-foreground font-body">Hormone Reset Diet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 border-t-2 border-dashed border-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-body">GLP-1 (Ozempic)</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground font-body mt-2 text-center">
            GLP-1 users often regain weight after stopping. Hormone Reset Diet diet results tend to be more sustainable.
          </p>
        </motion.div>

        {/* Metabolic Profile */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-honey" />
            <h3 className="text-lg font-display font-bold text-foreground">
              Metabolic Profile: {results.metabolicProfile}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground font-body">{results.metabolicDescription}</p>
        </motion.div>

        {/* Estimated Results */}
        <motion.div {...fadeUp} className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
            <span className="text-2xl font-display font-bold text-primary">{results.calorieRange}</span>
            <p className="text-xs text-muted-foreground font-body mt-1">Daily Calories</p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
            <span className="text-2xl font-display font-bold text-secondary">30</span>
            <p className="text-xs text-muted-foreground font-body mt-1">Day Plan</p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
            <span className="text-2xl font-display font-bold text-honey">1000+</span>
            <p className="text-xs text-muted-foreground font-body mt-1">Recipe Combos</p>
          </div>
        </motion.div>

        {/* Macro Breakdown */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <h3 className="text-lg font-display font-bold text-foreground mb-5 text-center">
            Your Ideal Macro Balance
          </h3>
          <div className="flex justify-center gap-8">
            <MacroRing label="Protein" value={results.macros.protein} color="hsl(340, 80%, 58%)" />
            <MacroRing label="Carbs" value={results.macros.carbs} color="hsl(38, 85%, 55%)" />
            <MacroRing label="Healthy Fats" value={results.macros.fat} color="hsl(220, 15%, 40%)" />
          </div>
        </motion.div>

        {/* Progress Timeline */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <h3 className="text-lg font-display font-bold text-foreground mb-4 text-center">
            Your 30-Day Progress Timeline
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {results.progressTimeline.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-lg bg-olive-muted border border-primary/10"
              >
                <span className="text-xs font-body font-semibold text-primary block">{phase.phase}</span>
                <span className="text-[10px] text-muted-foreground font-body block mb-2">{phase.days}</span>
                {phase.results.map((r) => (
                  <span key={r} className="text-xs font-body text-foreground block">• {r}</span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meal Snapshot */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-bold text-foreground">
              Hormone Reset Diet Recipe Combinations
            </h3>
          </div>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Unlock 1,000+ recipe combinations, flexible, mix and match — crafted for lasting fat loss.
          </p>
          <div className="rounded-xl overflow-hidden mb-4">
            <img src={mediterraneanFood} alt="Hormone Reset Diet dishes" className="w-full h-36 object-cover" />
          </div>
          <div className="space-y-3">
            {dynamicMeals.map((item) => (
              <div key={item.meal} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <span className="text-xs font-body font-semibold text-primary min-w-[70px]">
                  {item.meal}
                </span>
                <span className="font-body text-foreground text-sm">{item.description}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Before / After Timeline */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
              <h4 className="font-display font-bold text-foreground text-sm mb-2">NOW</h4>
              <ul className="space-y-1 text-xs font-body text-muted-foreground">
                <li>• Frustration from short-term diets</li>
                <li>• Inconsistent energy and hunger</li>
                <li>• Difficulty maintaining results</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-olive-muted border border-primary/10">
              <h4 className="font-display font-bold text-primary text-sm mb-2">IN 7–10 DAYS</h4>
              <ul className="space-y-1 text-xs font-body text-foreground">
                <li>• Clear daily eating rhythm</li>
                <li>• Reduced decision fatigue around food</li>
                <li>• Improved energy consistency</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-honey/5 border border-honey/10">
              <h4 className="font-display font-bold text-honey text-sm mb-2">IN 30 DAYS</h4>
              <ul className="space-y-1 text-xs font-body text-foreground">
                <li>• Noticeable progress toward your target</li>
                <li>• Greater confidence in food choices</li>
                <li>• Habits that feel realistic long-term</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div {...fadeUp} className="mb-8">
          <h3 className="text-lg font-display font-bold text-foreground mb-4 text-center">
            {isMale ? "What men like you are saying" : "What women like you are saying"}
          </h3>
          <div className="space-y-4">
            {testimonials.map((review) => (
              <div key={review.name} className="bg-card rounded-xl p-5 shadow-card border border-border">
                <div className="flex items-start gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-honey text-honey" />
                      ))}
                    </div>
                    <p className="font-body text-foreground text-sm mb-2 italic">"{review.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-body font-semibold text-muted-foreground">
                        {review.name}, age {review.age}
                      </span>
                      <span className="text-[10px] font-body text-primary font-semibold bg-olive-muted px-2 py-0.5 rounded-full">
                        {review.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nutrition Coach */}
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-honey" />
            <h3 className="text-lg font-display font-bold text-foreground">Your Nutrition Coach</h3>
          </div>
          <div className="bg-olive-muted rounded-xl p-5 border border-primary/10">
            <div className="flex items-start gap-3">
              <img src={coachKimberly} alt="Kimberly Clarke" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              <div>
                <div className="font-body text-foreground leading-relaxed whitespace-pre-line text-sm">
                  {results.coachMessage}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-3 font-semibold">
                  — Kimberly Clarke, Nutritionist & Hormone Reset Diet Plan Founder
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div {...fadeUp} className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Shield, label: "Dietitian-Backed", desc: "Plans reviewed by registered dietitians" },
            { icon: Heart, label: "Science-Based", desc: "Backed by 50+ clinical studies" },
            { icon: CheckCircle, label: "Real Food Only", desc: "No supplements or meal replacements" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-card rounded-xl p-4 shadow-card border border-border text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-xs font-display font-bold text-foreground block">{label}</span>
              <span className="text-[10px] text-muted-foreground font-body">{desc}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center pb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Ready to start your transformation?
          </h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto text-sm">
            Continue to your personalized plan. Takes less than a minute.
          </p>
          <motion.button
            onClick={handleContinue}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-warm text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate Your 30-Day Plan
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;