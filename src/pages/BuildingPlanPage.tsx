import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check } from "lucide-react";
import SEO from "@/components/SEO";
import { trackVirtualPageview } from "@/lib/tracking";

const STAGES = [
  "Analyzing Your Hormone & Energy Patterns",
  "Calculating Your Personal Reset Targets",
  "Personalizing Your Ideal Meal Rhythm",
  "Generating Your 28-Day Hormone Reset Plan",
];

const TESTIMONIALS = [
  {
    quote: "Lost 12 lbs in 3 weeks. So much easier than Weight Watchers.",
    name: "Theresa H.",
  },
  {
    quote: "The food is delicious and I never feel hungry. Down 18 lbs.",
    name: "Maria L.",
  },
  {
    quote: "First plan that actually fits my life. Energy is through the roof.",
    name: "Sandra K.",
  },
];

const STAGE_DURATION_MS = 4000;

const BuildingPlanPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
  const [activeStage, setActiveStage] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    trackVirtualPageview("/analyzing");
  }, []);

  // Sequentially advance progress bars
  useEffect(() => {
    if (activeStage >= STAGES.length) {
      const t = setTimeout(() => navigate("/email"), 600);
      return () => clearTimeout(t);
    }
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / STAGE_DURATION_MS) * 100);
      setProgress((prev) => {
        const next = [...prev];
        next[activeStage] = pct;
        return next;
      });
      if (pct >= 100) {
        clearInterval(interval);
        setActiveStage((s) => s + 1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [activeStage, navigate]);

  // Rotate testimonial every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const testimonial = TESTIMONIALS[testimonialIdx];

  return (
    <main>
      <SEO
        title="Building Your Plan"
        description="We're building your personalized Hormone Reset Diet plan."
        path="/analyzing"
      />
      <div className="min-h-dvh bg-gradient-sand flex flex-col items-center justify-start px-5 pt-20 md:pt-28 pb-10">
        <div className="w-full max-w-md mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2"
          >
            Building Your Hormone Reset Plan…
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted-foreground font-body text-center mb-8"
          >
            Hang tight — we're tailoring everything to your inputs.
          </motion.p>

          {/* Progress bars */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-6 space-y-5">
            {STAGES.map((label, i) => {
              const pct = Math.round(progress[i]);
              const done = pct >= 100;
              const isActive = i === activeStage;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-body font-medium ${
                        done || isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-body font-semibold text-primary tabular-nums">
                      {done ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          100%
                        </>
                      ) : (
                        `${pct}%`
                      )}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-hero rounded-full"
                      style={{ width: `${pct}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust + testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border shadow-card p-5"
          >
            <p className="text-center text-xs font-body text-muted-foreground mb-2">
              Trusted by over <span className="font-semibold text-foreground">150,000 women</span>
            </p>
            <div className="flex justify-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-sm font-body text-foreground italic mb-2">
                  "{testimonial.quote}"
                </p>
                <p className="text-xs font-body text-muted-foreground">
                  — {testimonial.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default BuildingPlanPage;
