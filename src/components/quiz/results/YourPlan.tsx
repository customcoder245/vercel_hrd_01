import { motion } from "framer-motion";
import {
  ArrowRight, Flame, Target, Brain, TrendingDown, Zap, Ban, Salad, Sparkles, Leaf, Check,
} from "lucide-react";
import { HormoneResult, HormonePattern } from "@/lib/hormonePatterns";
import { generateResults } from "@/lib/quizResults";

interface Props {
  answers: Record<string, string | string[] | number>;
  hormoneResult: HormoneResult;
  onContinue: () => void;
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

// Brand tokens
const STEEL = "#274d67";
const STEEL_SOFT = "#eef3f7";
const CORAL = "hsl(356 48% 54%)";
const INK = "hsl(210 45% 18%)";

// Donut wheel for macros — animated arc + colored dot label
const MacroWheel = ({
  label, pct, grams, color, delay = 0,
}: { label: string; pct: number; grams: number; color: string; delay?: number }) => {
  const size = 76;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(210 20% 92%)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, delay, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-display font-bold" style={{ color: INK }}>{pct}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          <p className="text-[11px] font-display font-semibold leading-none" style={{ color: INK }}>{label}</p>
        </div>
        <p className="text-[10px] font-body text-muted-foreground mt-1">{grams}g</p>
      </div>
    </div>
  );
};

const patternContent: Record<HormonePattern, {
  badge: string;
  intro: JSX.Element;
  calorieSubtitle: string;
  patternStripTitle: string;
  patternStripItems: { icon: typeof Flame; label: string }[];
}> = {
  Cortisol: {
    badge: "Cortisol Pattern",
    intro: (
      <>
        Built for your <span className="font-bold text-foreground">Cortisol Pattern</span> — to lower your stress load, balance blood sugar, and help your body release stubborn weight.
      </>
    ),
    calorieSubtitle: "Support steady fat loss without stress-driven cravings.",
    patternStripTitle: "Built to calm the Cortisol Pattern",
    patternStripItems: [
      { icon: TrendingDown, label: "Lower stress load" },
      { icon: Ban, label: "Fewer cravings" },
      { icon: Zap, label: "Better energy" },
      { icon: Target, label: "Steady fat loss" },
    ],
  },
  Insulin: {
    badge: "Insulin Pattern",
    intro: (
      <>
        Built for your <span className="font-bold text-foreground">Insulin Pattern</span> — to stabilise blood sugar, calm cravings, and help your body release weight naturally.
      </>
    ),
    calorieSubtitle: "Stabilise blood sugar and unlock steady fat loss.",
    patternStripTitle: "Built to balance the Insulin Pattern",
    patternStripItems: [
      { icon: TrendingDown, label: "Stable blood sugar" },
      { icon: Ban, label: "Fewer cravings" },
      { icon: Zap, label: "No energy crashes" },
      { icon: Target, label: "Steady fat loss" },
    ],
  },
  Estrogen: {
    badge: "Estrogen Pattern",
    intro: (
      <>
        Built for your <span className="font-bold text-foreground">Estrogen Pattern</span> — to balance your hormones, reduce inflammation, and help your body release weight naturally.
      </>
    ),
    calorieSubtitle: "Support hormone balance and reignite your metabolism.",
    patternStripTitle: "Built to support the Estrogen Pattern",
    patternStripItems: [
      { icon: Brain, label: "Hormone balance" },
      { icon: TrendingDown, label: "Less bloating" },
      { icon: Zap, label: "More energy" },
      { icon: Target, label: "Steady fat loss" },
    ],
  },
};

const YourPlan = ({ answers, hormoneResult, onContinue }: Props) => {
  const pattern = hormoneResult.primary;
  const content = patternContent[pattern];

  const results = generateResults(answers);
  const { protein: pPct, carbs: cPct, fat: fPct } = results.macros;
  const [minCalStr, maxCalStr] = results.calorieRange.split("–");
  const midCal = (parseInt(minCalStr) + parseInt(maxCalStr)) / 2;
  const proteinG = Math.round((midCal * (pPct / 100)) / 4 / 5) * 5;
  const carbsG = Math.round((midCal * (cPct / 100)) / 4 / 5) * 5;
  const fatG = Math.round((midCal * (fPct / 100)) / 9 / 5) * 5;

  const currentDiet = (answers.currentDiet as string) || "No restrictions";
  const eatingStyleLabel =
    currentDiet === "No restrictions" ? "Balanced Mediterranean" : currentDiet;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-xl mx-auto px-5 py-8 md:py-12 space-y-8">

        {/* ─── HEADER ─── */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: STEEL_SOFT }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: CORAL }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: CORAL }} />
            </span>
            <Leaf className="w-3.5 h-3.5" style={{ color: STEEL }} />
            <span className="text-xs font-display font-semibold tracking-wider uppercase" style={{ color: STEEL }}>
              {content.badge}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight tracking-tight">
            Everything you need to<br className="hidden md:block" /> reset your hormones.
          </h1>
          <p className="text-sm md:text-base font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {content.intro}
          </p>
        </motion.div>

        {/* ─── HERO: Calories + Macro Wheels ─── */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-4">
          <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden bg-card border border-border shadow-medium">

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 md:gap-8 relative">
              {/* Calories block */}
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight" style={{ color: CORAL }}>
                  {results.calorieRange}
                </p>
                <p className="text-xs md:text-sm font-display font-semibold tracking-[0.18em] uppercase mt-2" style={{ color: STEEL }}>
                  Daily Calories
                </p>
                <div className="mt-4 flex items-start gap-2 max-w-xs">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: STEEL }} />
                  <p className="text-xs font-body text-muted-foreground leading-snug">
                    {content.calorieSubtitle}
                  </p>
                </div>
              </div>

              {/* Macro wheels */}
              <div className="flex gap-5 md:gap-7 justify-center md:justify-end">
                {[
                  { label: "Protein", pct: pPct, grams: proteinG, color: "#e85d75" },
                  { label: "Carbs", pct: cPct, grams: carbsG, color: "#f5a623" },
                  { label: "Fats", pct: fPct, grams: fatG, color: "#9aa5b1" },
                ].map((m, i) => (
                  <MacroWheel key={m.label} {...m} delay={0.3 + i * 0.12} />
                ))}
              </div>
            </div>
          </div>

          {/* Eating Style */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <div
              className="rounded-2xl border border-border p-4 md:p-5 flex items-center gap-4 shadow-soft"
              style={{
                background: "linear-gradient(135deg, hsl(150 45% 97%) 0%, #ffffff 70%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft"
                style={{ backgroundColor: "hsl(150 45% 92%)" }}
              >
                <Salad className="w-5 h-5" style={{ color: "hsl(150 50% 35%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-display font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                  Your eating style
                </p>
                <p className="text-lg md:text-xl font-display font-bold text-foreground leading-tight">
                  {eatingStyleLabel}
                </p>
              </div>
              <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(150 50% 45%)" }} />
            </div>
          </motion.div>

          {/* Pattern strip — steel blue, chips upgraded to mini-cards */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
            <div
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: STEEL_SOFT, borderColor: "#d3e0e9" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft"
                  style={{ backgroundColor: STEEL }}
                >
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-display font-bold tracking-tight" style={{ color: INK }}>
                  {content.patternStripTitle}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {content.patternStripItems.map((it, i) => (
                  <motion.div
                    key={it.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex flex-col items-start gap-2 bg-white rounded-xl px-3 py-3 shadow-soft border border-white relative"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: STEEL_SOFT }}
                    >
                      <it.icon className="w-3.5 h-3.5" style={{ color: STEEL }} />
                    </div>
                    <p className="text-xs font-body font-semibold text-foreground leading-tight">{it.label}</p>
                    <Check className="w-3 h-3 absolute top-2 right-2" style={{ color: "hsl(150 50% 45%)" }} strokeWidth={3} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>


        {/* ─── CTA ─── */}
        <motion.div {...fadeUp} transition={{ delay: 0.6 }} className="flex flex-col items-center pt-2 gap-3">
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md px-6 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base flex items-center justify-center gap-2 shadow-medium"
            style={{ boxShadow: "0 12px 30px -8px hsl(356 48% 54% / 0.45)" }}
          >
            Get my custom plan
            <ArrowRight className="w-4 h-4" />
          </motion.button>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default YourPlan;
