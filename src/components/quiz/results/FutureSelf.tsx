import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { HormoneResult, patternDescriptions } from "@/lib/hormonePatterns";
import calmWomanImg from "@/assets/calm-woman-pattern.webp";
import { useMemo } from "react";

interface Props {
  answers: Record<string, string | string[] | number>;
  hormoneResult: HormoneResult;
  onContinue: () => void;
}

const patternColors: Record<string, { bg: string; text: string; accent: string }> = {
  Cortisol: {
    bg: "hsl(35 60% 95%)",
    text: "hsl(35 50% 30%)",
    accent: "hsl(35 50% 45%)",
  },
  Insulin: {
    bg: "hsl(200 50% 95%)",
    text: "hsl(200 45% 25%)",
    accent: "hsl(200 45% 40%)",
  },
  Estrogen: {
    bg: "hsl(280 35% 95%)",
    text: "hsl(280 30% 30%)",
    accent: "hsl(280 30% 45%)",
  },
};

const FutureSelf = ({ hormoneResult, onContinue }: Props) => {
  const { primary, secondary } = hormoneResult;
  const pattern = patternDescriptions[primary];
  const colors = patternColors[primary];

  const matchPercent = useMemo(() => Math.floor(Math.random() * 11) + 85, []);
  const circumference = 2 * Math.PI * 54;
  const strokeOffset = circumference - (matchPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col items-center justify-start px-6 py-10"
    >
      <div className="w-full max-w-xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-body font-medium"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            <AlertCircle className="w-4 h-4" />
            Pattern Identified
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2"
        >
          Your primary hormone pattern
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-sm font-body text-muted-foreground text-center mb-4"
        >
          This is why nothing you've tried has worked consistently.
        </motion.p>

        {/* Match circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col items-center mb-5"
        >
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="54" fill="none"
                stroke={colors.accent} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl font-display font-extrabold"
                style={{ color: colors.accent }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              >
                {matchPercent}%
              </motion.span>
              <motion.span
                className="text-xs font-body text-muted-foreground"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              >
                match
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Pattern name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="text-center mb-2"
        >
          <span className="text-3xl md:text-4xl font-display font-extrabold" style={{ color: colors.accent }}>
            {pattern.title}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-body text-muted-foreground text-center mb-5"
        >
          Your body isn't broken. It's responding to stress in a way that makes fat loss harder.
        </motion.p>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 rounded-xl overflow-hidden"
        >
          <img
            src={calmWomanImg}
            alt="Woman feeling calm and in control"
            className="w-full h-[200px] object-cover rounded-xl"
            width={600} height={200} loading="eager" decoding="async"
          />
        </motion.div>

        {/* Symptoms */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl border border-border shadow-card p-5 mb-6"
          style={{ backgroundColor: colors.bg }}
        >
          <h3 className="text-xs font-display font-semibold uppercase tracking-wide mb-4"
            style={{ color: colors.accent }}
          >
            What usually shows up day-to-day
          </h3>
          <div className="space-y-3">
            {pattern.symptoms.map((symptom, i) => (
              <motion.div
                key={symptom}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
                <span className="text-sm font-body" style={{ color: colors.text }}>{symptom}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="rounded-xl p-4 mb-6 text-center"
          style={{ backgroundColor: colors.bg }}
        >
          <p className="text-sm font-body font-medium" style={{ color: colors.text }}>
            The good news: this pattern is highly responsive when you target it correctly. Most people notice changes in energy and cravings within 10–14 days.
          </p>
        </motion.div>

        {/* Secondary */}
        {secondary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-card rounded-lg border border-border p-3 mb-6 text-center"
          >
            <p className="text-xs font-body text-muted-foreground">
              Secondary signals detected:{" "}
              <span className="font-semibold text-foreground">{secondary} response</span>
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-lg shadow-medium transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          See my personalised plan
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FutureSelf;
