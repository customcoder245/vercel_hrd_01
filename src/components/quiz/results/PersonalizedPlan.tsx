import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield, Lock, Check, Users, Star, ChevronDown, RefreshCw, ArrowRight, Sparkles, Leaf, CheckCircle2, Scale, Activity
} from "lucide-react";
import { HormoneResult, patternDescriptions } from "@/lib/hormonePatterns";
import { track } from "@/lib/tracking";
import mdLogoWhite from "@/assets/hormone-reset-white.webp";
import productMockup from "@/assets/hrd-product-mockup.webp";
import baFeatured from "@/assets/ba-featured.webp";
import logoNYT from "@/assets/logo-nyt.webp";
import logoWomensHealth from "@/assets/logo-womens-health.webp";
import logoHealthline from "@/assets/logo-healthline.png";
import sammiBA from "@/assets/before-after-new.webp";
import jasmineBA from "@/assets/testimonial-jasmine.webp";
import tiffanyBA from "@/assets/testimonial-tiffany.webp";
import destinyBA from "@/assets/testimonial-destiny.webp";
import femaleBA2 from "@/assets/female-ba-2.webp";
import maleBA2 from "@/assets/male-ba-2.webp";
import baBmiLean from "@/assets/ba-bmi-lean.webp";
import baBmiNormal from "@/assets/ba-bmi-normal.webp";
import baBmiOverweight from "@/assets/ba-bmi-overweight.webp";
import baBmiObese from "@/assets/ba-bmi-obese.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


interface Props {
  hormoneResult: HormoneResult;
  userEmail: string;
}

/* ═══ PAYMENT LOGOS (removed per request) ═══ */
const PaymentLogos = () => null;

/* ═══ PRICING SECTION (reusable) ═══ */
const PricingSection = ({
  selectedPlan,
  setSelectedPlan,
  handleClaim,
  minutes,
  seconds,
}: {
  selectedPlan: string;
  setSelectedPlan: (p: "7day" | "1month" | "3month") => void;
  handleClaim: () => void;
  minutes: number;
  seconds: number;
}) => {
  const plans = {
    "7day":   { label: "7-Day Plan",  subtitle: "Hormone Reset Plan", perDayDollars: "1", perDayCents: "09", total: "$7.69",  originalTotal: "$24.99", recommended: false },
    "1month": { label: "1-Month Plan", subtitle: "Hormone Reset Plan", perDayDollars: "0", perDayCents: "65", total: "$18.39", originalTotal: "$44.99", recommended: true },
    "3month": { label: "3-Month Plan", subtitle: "Hormone Reset Plan", perDayDollars: "0", perDayCents: "32", total: "$28.59", originalTotal: "$79.99", recommended: false },
  } as const;
  const planOrder: (keyof typeof plans)[] = ["7day", "1month", "3month"];

  // Pull hormone result + target weight for header
  const answers = (() => { try { return JSON.parse(sessionStorage.getItem("quizAnswers") || "{}"); } catch { return {}; } })();
  const goalLbs = (answers.goalWeight as number) || 150;
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const targetWeight = unit === "kg" ? Math.round(goalLbs / 2.205) : Math.round(goalLbs);
  const hormoneName = (() => { try { return (window as any).__hormonePrimary || ""; } catch { return ""; } })();

  return (
    <div className="py-8 px-5">
      <div className="mx-auto max-w-lg">
        {/* Pricing cards - stacked vertically */}
        <div className="flex flex-col gap-4 mb-6">
          {planOrder.map((key) => {
            const plan = plans[key];
            const isSelected = selectedPlan === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlan(key as any)}
                style={isSelected ? { borderColor: "hsl(var(--primary))", boxShadow: "0 0 0 4px hsl(var(--primary) / 0.25)" } : undefined}
                className={`relative rounded-2xl border-2 transition-all duration-200 text-left bg-card ${
                  isSelected ? "" : "border-border hover:border-primary/50"
                } ${plan.recommended ? "mt-3" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-display font-bold rounded-full whitespace-nowrap shadow-sm">
                      Special Offer · Save Over 50%
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground leading-tight">{plan.label}</h3>
                    <p style={{ color: "#0b434c" }} className="text-sm md:text-base font-body font-semibold mt-1">{plan.subtitle}</p>
                    <p className="text-sm font-body text-muted-foreground mt-2">
                      <span className="line-through opacity-70 mr-1.5">{plan.originalTotal}</span>
                      <span className="text-foreground font-semibold">{plan.total}</span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-muted/40 px-4 py-3 flex items-baseline gap-1 flex-shrink-0">
                    <span className="text-base font-display text-foreground">$</span>
                    <span className="text-4xl md:text-5xl font-display font-bold text-foreground leading-none">{plan.perDayDollars}</span>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-base font-display font-bold text-foreground">{plan.perDayCents}</span>
                      <span className="text-[10px] font-body text-muted-foreground mt-1">per day</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stars row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 mb-6">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} style={{ color: "#0b434c", fill: "#0b434c" }} className="w-4 h-4" />
            ))}
          </div>
          <span className="text-sm font-body text-muted-foreground sm:ml-2">
            4.8 from <span className="font-bold text-foreground">25K+</span> reviews · <span className="font-bold text-foreground">153K+</span> members
          </span>
        </div>

        {/* CTA — glowing/pulsing */}
        <motion.button
          onClick={handleClaim}
          className="relative group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-hero text-primary-foreground font-body font-bold text-xl shadow-medium overflow-hidden mb-6"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              "0 0 0 0 hsl(var(--primary) / 0.55)",
              "0 0 0 14px hsl(var(--primary) / 0)",
              "0 0 0 0 hsl(var(--primary) / 0)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        >
          Get My Plan
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center text-center gap-1.5 px-2 py-3 rounded-xl bg-muted/30">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-display font-bold text-foreground">60-Day</p>
              <p className="text-xs font-display font-bold text-foreground">Money-Back Guarantee</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 px-2 py-3 rounded-xl bg-muted/30">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-display font-bold text-foreground">Cancel Anytime</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 px-2 py-3 rounded-xl bg-muted/30">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-display font-bold text-foreground">Secure Checkout</p>
            </div>
          </div>
        </div>

        <PaymentLogos />
      </div>
    </div>
  );
};

/* ═══ AS FEATURED IN ═══ */
const AsFeaturedIn = () => (
  <div className="py-8 px-6">
    <div className="mx-auto max-w-xl text-center">
      <p className="text-sm font-body text-muted-foreground mb-6">Our diet featured in:</p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        <img src={logoNYT} alt="The New York Times" className="h-6 md:h-7 object-contain opacity-70" loading="lazy" decoding="async" />
        <img src={logoWomensHealth} alt="Women's Health" className="h-5 md:h-6 object-contain opacity-70" loading="lazy" decoding="async" />
        <img src={logoHealthline} alt="Healthline" className="h-5 md:h-6 object-contain opacity-70" loading="lazy" decoding="async" />
      </div>
    </div>
  </div>
);

/* ═══ TESTIMONIALS ═══ */
const testimonials = [
  {
    name: "Jasmine F.",
    age: 51,
    image: jasmineBA,
    title: "27 lbs in 8 weeks — and I actually have energy now",
    text: "Everyone says the Hormone Reset Diet helps you shed excess weight - and I have to say they're right! I've already lost 27 lbs in just 8 weeks! The feeling of great health and fresh food is giving me new strong bursts of energy!",
    featured: true,
  },
  {
    name: "Tiffany W.",
    age: 62,
    image: tiffanyBA,
    title: "I didn't feel like I was dieting once",
    text: "The plan was not difficult to follow. The foods were pretty easy to find and with consistency, I found myself dropping pounds of fat each week. My friends are astounded by how different I look!",
    featured: false,
  },
  {
    name: "Michelle O.",
    age: 68,
    image: destinyBA,
    title: "I've tried everything. This is the only thing that actually stuck",
    text: "Feels really good to be shedding stubborn weight finally after years of trying every other diet under the sun with no success. This REALLY works!",
    featured: false,
  },
];

const extraTestimonials = [
  {
    name: "Rachel M.",
    age: 42,
    image: femaleBA2,
    title: "Delicious Fat-Shredding Solution!",
    text: "So, I'm a big fan of The Hormone Reset Diet now. Tastes really really good. I've had to make a few adjustments with some of the food but that hasn't changed the overall outcome of the diet. Feels really good to be shedding stubborn weight finally after years of trying every other diet under the sun with no success. This REALLY works!",
  },
  {
    name: "Linda H.",
    age: 52,
    image: baFeatured,
    title: "Down 24 lbs and feeling like myself again",
    text: "After menopause hit, nothing I tried worked. The Hormone Reset Diet was completely different — the meals are easy, satisfying, and the weight finally started coming off. I've lost 24 lbs and my energy is through the roof. I feel like myself again!",
  },
];

const TestimonialsSection = () => {
  const isMale = (() => { try { const a = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}"); return (a.gender || a.sex) === "Male"; } catch { return false; } })();
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <div className="py-8 px-5">
      <div className="mx-auto max-w-lg">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2">
          Hear success stories from our users
        </h2>
        {/* Featured testimonial */}
        <div className="rounded-xl border border-border bg-card p-4 mb-4">
          <img src={featured.image} alt={featured.name} className="w-full aspect-[4/3] rounded-lg mb-3 object-cover object-top" width={400} height={300} loading="lazy" decoding="async" />
          <h3 className="text-sm font-display font-bold text-foreground mb-1">{featured.title}</h3>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs font-body text-muted-foreground leading-relaxed mb-2">{featured.text}</p>
          <p className="text-xs font-body text-muted-foreground">
            {featured.name}, {featured.age} <span className="text-primary font-medium">✓ Verified</span>
          </p>
        </div>
        {/* Remaining testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-4">
              <img src={t.image} alt={t.name} className="w-full aspect-[4/3] rounded-lg mb-3 object-cover object-top" width={400} height={300} loading="lazy" decoding="async" />
              <h3 className="text-sm font-display font-bold text-foreground mb-1">{t.title}</h3>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-body text-muted-foreground leading-relaxed mb-2">{t.text}</p>
              <p className="text-xs font-body text-muted-foreground">
                {t.name}, {t.age} <span className="text-primary font-medium">✓ Verified</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ GUARANTEE ═══ */
const GuaranteeBlock = () => (
  <div className="px-6 py-6">
    <div className="mx-auto max-w-xl rounded-xl p-6 border border-emerald-200 bg-emerald-50 text-center">
      <Shield className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
      <h3 className="text-lg font-display font-bold text-foreground mb-2">60-Day Money-Back Guarantee</h3>
      <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
        If you follow the plan for 60 days and don't see results, we'll refund every cent. No forms to fill out. No questions asked. Just email us and your refund is processed within 24 hours.
      </p>
    </div>
  </div>
);

/* ═══ FAQ ═══ */
const faqs = [
  { q: "What is your money-back guarantee?", a: "If you follow the plan for 60 days and don't see results, we'll refund every cent — no questions asked. Just email us and your refund is processed within 24 hours." },
  { q: "How much weight can I expect to lose?", a: "Many of our members achieve incredible results of over 7 pounds in their first week. Your commitment and determination will affect your overall weight loss. If you are committed and follow the plan diligently, you can definitely achieve your goal weight." },
  { q: "Will this help with my cholesterol?", a: "Yes! The Hormone Reset Diet diet is clinically shown to support healthy cholesterol levels. Many members report improved lipid panels within 8–12 weeks." },
  { q: "Will this help with my blood sugar levels?", a: "Absolutely. The meals are designed to stabilize blood sugar by balancing proteins, healthy fats, and complex carbs — reducing spikes and crashes throughout the day." },
];

const FAQSection = () => (
  <div className="py-8 px-5">
    <div className="mx-auto max-w-lg">
      <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">
        People <span className="text-primary">often</span> ask
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-4 bg-card">
            <AccordionTrigger className="text-sm font-body font-medium text-foreground py-4 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-body text-muted-foreground pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);

/* ═══ MAIN COMPONENT ═══ */
const PersonalizedPlan = ({ hormoneResult, userEmail }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<"7day" | "1month" | "3month">("1month");
  const [minutes, setMinutes] = useState(8);
  const [seconds, setSeconds] = useState(17);
  const isMale = (() => { try { const a = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}"); return (a.gender || a.sex) === "Male"; } catch { return false; } })();

  useEffect(() => {
    try { (window as any).__hormonePrimary = hormoneResult.primary; } catch {}
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => (m === 0 ? 0 : m - 1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hormoneResult.primary]);

  const sessionId = typeof window !== "undefined" ? localStorage.getItem("md_session_id") || "" : "";
  const emailParam = userEmail ? `&email=${encodeURIComponent(userEmail)}` : "";

  // Map hormone pattern to link code
  const hormoneCode: Record<string, string> = { Cortisol: "c", Estrogen: "e", Insulin: "i" };
  const hCode = hormoneCode[hormoneResult.primary] || "c";

  // Map diet preference from quiz answers to link code
  const answersRaw = typeof window !== "undefined" ? sessionStorage.getItem("quizAnswers") : null;
  const quizAnswers = answersRaw ? JSON.parse(answersRaw) : {};
  const dietAnswer = (quizAnswers.currentDiet || "Everything") as string;
  const dietMap: Record<string, { code: string }> = {
    "Dairy Free": { code: "df" },
    "Gluten Free": { code: "gf" },
    "Vegan": { code: "pb" },
    "Vegetarian": { code: "pb" },
    "Plant Based": { code: "pb" },
    "Pescatarian": { code: "s" },
    "Everything": { code: "s" },
  };
  const dCode = dietMap[dietAnswer]?.code || "s";

  // Exact ClickBank link table — sourced from HRD_Links_Final.pdf.
  // Key: `${hCode}-${dCode}-${plan}` -> { item, template }. tid=62005 for all.
  // plan keys: "1month" = 2-x suffix, "7day" = 1-x suffix, "3month" = 3-33 suffix.
  type LinkEntry = { item: string; template: "HRD03" | "HRD033" };
  const linkTable: Record<string, LinkEntry> = {
    // Cortisol
    "c-df-1month": { item: "hrd-c-df-2-1",   template: "HRD03"  },
    "c-df-7day":   { item: "hrd-c-df-1-7",   template: "HRD03"  },
    "c-df-3month": { item: "hrd-c-df-3-33",  template: "HRD033" },
    "c-gf-1month": { item: "hrd-c-gf-2-1-1", template: "HRD033" },
    "c-gf-7day":   { item: "hrd-c-gf-1-7",   template: "HRD03"  },
    "c-gf-3month": { item: "hrd-c-gf-3-33",  template: "HRD033" },
    "c-pb-1month": { item: "hrd-c-pb-2-11",  template: "HRD033" },
    "c-pb-7day":   { item: "hrd-c-pb-1-77",  template: "HRD03"  },
    "c-pb-3month": { item: "hrd-c-pb-3-33",  template: "HRD03"  },
    "c-s-1month":  { item: "hrd-c-s-2-11",   template: "HRD03"  },
    "c-s-7day":    { item: "hrd-c-s-1-77",   template: "HRD03"  },
    "c-s-3month":  { item: "hrd-c-s-3-33",   template: "HRD03"  },
    // Estrogen
    "e-df-1month": { item: "hrd-e-df-2-11",  template: "HRD03"  },
    "e-df-7day":   { item: "hrd-e-df-1-77",  template: "HRD03"  },
    "e-df-3month": { item: "hrd-e-df-3-33",  template: "HRD03"  },
    "e-gf-1month": { item: "hrd-e-gf-2-11",  template: "HRD03"  },
    "e-gf-7day":   { item: "hrd-e-gf-1-77",  template: "HRD03"  },
    "e-gf-3month": { item: "hrd-e-gf-3-33",  template: "HRD03"  },
    "e-pb-1month": { item: "hrd-e-pb-2-11",  template: "HRD03"  },
    "e-pb-7day":   { item: "hrd-e-pb-1-77",  template: "HRD03"  },
    "e-pb-3month": { item: "hrd-e-pb-3-33",  template: "HRD03"  },
    "e-s-1month":  { item: "hrd-e-s-2-11",   template: "HRD03"  },
    "e-s-7day":    { item: "hrd-e-s-1-77",   template: "HRD03"  },
    "e-s-3month":  { item: "hrd-e-s-3-33",   template: "HRD03"  },
    // Insulin
    "i-df-1month": { item: "hrd-i-df-2-11",  template: "HRD03"  },
    "i-df-7day":   { item: "hrd-i-df-1-77",  template: "HRD03"  },
    "i-df-3month": { item: "hrd-i-df-3-33",  template: "HRD03"  },
    "i-gf-1month": { item: "hrd-i-gf-2-11",  template: "HRD03"  },
    "i-gf-7day":   { item: "hrd-i-gf-1-77",  template: "HRD03"  },
    "i-gf-3month": { item: "hrd-i-gf-3-33",  template: "HRD03"  },
    "i-pb-1month": { item: "hrd-i-pb-2-1",   template: "HRD03"  },
    "i-pb-7day":   { item: "hrd-i-pb-1-7",   template: "HRD03"  },
    "i-pb-3month": { item: "hrd-i-pb-3-33",  template: "HRD033" },
    "i-s-1month":  { item: "hrd-i-s-2-1",    template: "HRD033" },
    "i-s-7day":    { item: "hrd-i-s-1-77",   template: "HRD033" },
    "i-s-3month":  { item: "hrd-i-s-3-33",   template: "HRD03"  },
  };

  const baseUrl = "https://hormreset.pay.clickbank.net/";
  const buildLink = (plan: "7day" | "1month" | "3month") => {
    const entry = linkTable[`${hCode}-${dCode}-${plan}`] ?? linkTable[`c-s-${plan}`];
    return `${baseUrl}?cbitems=${entry.item}&template=${entry.template}&tid=62005`;
  };
  const paymentLinks: Record<string, string> = {
    "7day":   buildLink("7day"),
    "1month": buildLink("1month"),
    "3month": buildLink("3month"),
  };

  const [redirecting, setRedirecting] = useState(false);
  const handleClaim = () => {
    const link = paymentLinks[selectedPlan];
    if (!link) return;
    setRedirecting(true);
    // Tracking is fire-and-forget (idle callback) — won't delay the redirect.
    track("order_form_view", "/results/order", { answer_value: selectedPlan });
    // Redirect on next tick so the overlay paints first → click feels instant.
    setTimeout(() => { window.location.href = link; }, 0);
  };

  // Personalized hero — instant template based on user's actual BMI
  const heroAge = (quizAnswers.age as string) || "40–49";
  const heroWeight = (quizAnswers.weight as number) || 160;
  const heroGoal = (quizAnswers.goalWeight as number) || 140;
  const heroHeightIn = (quizAnswers.height as number) || 66;
  const heroUnit = (quizAnswers.weightUnit as string) === "kg" ? "kg" : "lbs";

  // BMI = body-fat % (per user's stated convention)
  const heightM = heroHeightIn * 0.0254;
  const weightKgNow = heroUnit === "kg" ? heroWeight : heroWeight * 0.4536;
  const weightKgGoal = heroUnit === "kg" ? heroGoal : heroGoal * 0.4536;
  const bmiNow = Math.round(weightKgNow / (heightM * heightM));
  const bmiGoal = Math.round(weightKgGoal / (heightM * heightM));
  const nowBodyFatRange = `${bmiNow}%`;
  const goalBodyFatRange = `${bmiGoal}%`;

  // Pick template by current BMI tier — image reflects the user's actual body type
  const heroImage = (() => {
    if (bmiNow < 23) return baBmiLean;
    if (bmiNow < 27) return baBmiNormal;
    if (bmiNow < 32) return baBmiOverweight;
    return baBmiObese;
  })();


  const scrollToPricing = () => document.getElementById("results-pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* REDIRECTING OVERLAY — paints instantly on click so the wait for ClickBank doesn't feel like a frozen page */}
      {redirecting && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="font-body text-base font-semibold text-foreground">Securing your plan…</p>
          <p className="font-body text-xs text-muted-foreground">Redirecting to secure checkout</p>
        </div>
      )}
      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-50 bg-footer text-primary-foreground py-3.5 px-4 flex items-center justify-between">
        <img src={mdLogoWhite} alt="Hormone Reset Diet" className="h-8" loading="lazy" decoding="async" />
        <nav className="flex items-center gap-3" aria-label="Plan navigation">
          <span className="font-body text-sm font-medium hidden sm:inline">
            Your plan is reserved for{" "}
            <span className="font-bold text-honey">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </span>
          <button
            onClick={scrollToPricing}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get Your Plan
          </button>
        </nav>
      </header>

      {/* HERO — before/after */}
      <section className="px-5 pt-6 pb-4" aria-label="Your transformation">
        <div className="mx-auto max-w-md text-center">
          <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-card relative">
            <div className="grid grid-cols-2 border-b border-border">
              <p className="py-2.5 text-sm font-display font-semibold text-foreground text-center border-r border-border">Now</p>
              <p className="py-2.5 text-sm font-display font-semibold text-primary text-center">Goal</p>
            </div>
            <img
              src={heroImage}
              alt="Your personalized before and after transformation"
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
            />
            {(() => {
              const energyAns = (quizAnswers.energyLevels as string) || "";
              const lowEnergy = /low|crash|drag|tired|exhaust/i.test(energyAns);
              const nowEnergy = lowEnergy ? "Low" : "Inconsistent";
              const goalEnergy = "High & steady";
              const nowBars = lowEnergy ? 1 : 2;
              const goalBars = 5;
              const Bars = ({ filled, color }: { filled: number; color: string }) => (
                <div className="flex items-end gap-0.5 mt-1">
                  {[1,2,3,4,5].map((i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-sm ${i <= filled ? color : "bg-muted"}`}
                      style={{ height: `${6 + i * 2}px` }}
                    />
                  ))}
                </div>
              );
              return (
                <div className="grid grid-cols-2 border-t border-border">
                  <div className="px-4 py-3 text-left border-r border-border">
                    <p className="text-[10px] font-display font-semibold tracking-wider uppercase text-muted-foreground">Body fat</p>
                    <p className="text-sm font-display font-bold text-foreground mt-0.5">{nowBodyFatRange}</p>
                    <p className="text-[10px] font-display font-semibold tracking-wider uppercase text-muted-foreground mt-3">Energy level</p>
                    <p className="text-sm font-display font-bold text-foreground mt-0.5">{nowEnergy}</p>
                    <Bars filled={nowBars} color="bg-foreground/70" />
                  </div>
                  <div className="px-4 py-3 text-left">
                    <p className="text-[10px] font-display font-semibold tracking-wider uppercase text-muted-foreground">Body fat</p>
                    <p className="text-sm font-display font-bold text-primary mt-0.5">{goalBodyFatRange}</p>
                    <p className="text-[10px] font-display font-semibold tracking-wider uppercase text-muted-foreground mt-3">Energy level</p>
                    <p className="text-sm font-display font-bold text-primary mt-0.5">{goalEnergy}</p>
                    <Bars filled={goalBars} color="bg-primary" />
                  </div>
                </div>
              );
            })()}
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight mt-12 text-center md:whitespace-nowrap md:-mx-20">
            Your hormone reset plan is ready!
          </h1>
          <div className="mt-5 flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted/60">
                <Scale className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-body uppercase tracking-wider text-muted-foreground">Target weight</p>
                <p className="text-base md:text-lg font-display font-bold text-foreground leading-tight">
                  {(() => {
                    const goalLbs = (quizAnswers.goalWeight as number) || 150;
                    const u = (quizAnswers.weightUnit as string) === "kg" ? "kg" : "lbs";
                    return `${u === "kg" ? Math.round(goalLbs / 2.205) : Math.round(goalLbs)} ${u}`;
                  })()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                <Activity className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-body uppercase tracking-wider text-muted-foreground">Hormone pattern</p>
                <p className="text-base md:text-lg font-display font-bold text-foreground leading-tight">{hormoneResult.primary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="results-pricing" aria-label="Pricing plans">
        <h1 className="sr-only">Your Personalized Hormone Reset Diet Plan</h1>
        <PricingSection
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          handleClaim={handleClaim}
          minutes={minutes}
          seconds={seconds}
        />
      </section>

      {/* EVERYTHING YOU NEED */}
      <section className="px-6 py-10" aria-label="Everything you need">
        <div className="mx-auto max-w-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
              Everything you need to reset your hormones.
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden mb-8 mx-auto max-w-[60%]">
            <img
              src={productMockup}
              alt="Hormone Reset Diet on tablet, laptop and mobile"
              className="w-full h-auto block"
              loading="lazy"
              decoding="async"
            />
          </div>

          <ul className="flex flex-col gap-3 max-w-xl mx-auto">
            {[
              "Personalized meals to support hormone balance",
              "Simple eating rhythm to steady energy and reduce cravings",
              "100,000+ satisfying meal combinations",
              "Quick, real-life recipes for home or eating out",
              "Daily habits to improve sleep and reduce stress",
              "Gentle, hormone-friendly workouts for fat loss",
              "Optional supplement support for recovery and balance",
              "24/7 access to expert, science-backed guidance",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-sm font-body text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />



      {/* CTA before FAQ */}
      <div className="px-6 py-6">
        <div className="mx-auto max-w-lg">
          <motion.button
            onClick={handleClaim}
            className="relative group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-hero text-primary-foreground font-body font-bold text-xl shadow-medium overflow-hidden"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0.55)",
                "0 0 0 14px hsl(var(--primary) / 0)",
                "0 0 0 0 hsl(var(--primary) / 0)",
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          >
            
            Begin My Journey
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <PaymentLogos />
        </div>
      </div>

      {/* FAQ */}
      <FAQSection />

      <footer className="bg-footer mt-8">
        <div className="px-6 py-3 mb-16 md:mb-0">
          <p className="text-center text-xs text-white/40 font-body mb-2">
            © 2026 <a href="https://hormonereset.diet" className="underline hover:text-white/60 transition-colors">hormonereset.diet</a>. All rights reserved. Results may vary.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/40 font-body">
            <a href="https://hormonereset.diet/privacy" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span>|</span>
            <a href="https://hormonereset.diet/terms" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Product Support</a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border px-4 py-3 shadow-medium">
        <motion.button
          onClick={handleClaim}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-hero text-primary-foreground font-body font-bold text-lg shadow-medium"
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-display text-primary-foreground/90 border-r border-primary-foreground/30 pr-3">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          Select Plan
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PersonalizedPlan;
