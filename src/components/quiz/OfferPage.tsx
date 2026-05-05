import { motion, AnimatePresence } from "framer-motion";
import appMockup from "@/assets/app-mockup.webp";
import { Check, Shield, Star, ArrowRight, Leaf, ChevronDown, Heart, Award, Utensils, Zap, Users, CreditCard, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { QuizResults } from "@/types/quiz";
import samBeforeAfter from "@/assets/sam-before-after.webp";
import jasmineBeforeAfter from "@/assets/jasmine-before-after.webp";
import tiffanyBeforeAfter from "@/assets/tiffany-before-after.webp";
import destinyBeforeAfter from "@/assets/destiny-before-after.webp";

interface OfferPageProps {
  planName: string;
  results: QuizResults;
  gender?: string;
  userEmail?: string;
}

const PaymentLogos = () => (
  <div className="space-y-4 mt-5">
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="h-px flex-1 max-w-[80px] bg-border" />
        <span className="text-xs font-body font-semibold text-muted-foreground tracking-wide">Secure Payment By:</span>
        <div className="h-px flex-1 max-w-[80px] bg-border" />
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm">
          <span className="font-display font-bold text-[11px]" style={{ color: '#003087' }}>Pay<span style={{ color: '#009cde' }}>Pal</span></span>
        </div>
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm flex items-center gap-0.5">
          <svg width="18" height="12" viewBox="0 0 24 16"><circle cx="9" cy="8" r="7" fill="#EB001B" /><circle cx="15" cy="8" r="7" fill="#F79E1B" /><path d="M12 2.4a7 7 0 0 1 0 11.2A7 7 0 0 1 12 2.4Z" fill="#FF5F00" /></svg>
        </div>
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm">
          <span className="font-display font-bold text-[11px] tracking-tight" style={{ color: '#1A1F71' }}>VISA</span>
        </div>
        <div className="rounded-md px-2 py-1.5 border border-border shadow-sm" style={{ backgroundColor: '#006FCF' }}>
          <span className="font-display font-bold text-[8px] text-white tracking-tight leading-none block">AMEX</span>
        </div>
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm">
          <span className="font-display font-bold text-[10px] tracking-tight text-foreground">DISC<span style={{ color: '#FF6600' }}>●</span>VER</span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5 bg-card shadow-sm">
        <Shield className="w-3.5 h-3.5" style={{ color: '#C1272D' }} />
        <span className="text-[9px] font-display font-bold text-foreground">McAfee®</span>
      </div>
      <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5 bg-card shadow-sm">
        <Check className="w-3.5 h-3.5 text-primary" />
        <span className="text-[9px] font-display font-bold text-foreground">TrustedSite</span>
      </div>
      <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5 bg-card shadow-sm">
        <Lock className="w-3.5 h-3.5" style={{ color: '#FFCD00' }} />
        <span className="text-[9px] font-display font-bold text-foreground">Norton</span>
      </div>
      <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5 bg-card shadow-sm">
        <Check className="w-3.5 h-3.5" style={{ color: '#C1272D' }} />
        <span className="text-[9px] font-display font-bold text-foreground">VeriSign</span>
      </div>
    </div>
  </div>
);

const FeaturedInBlock = () => (
  <div className="bg-card rounded-xl p-6 text-center shadow-card border border-border">
    <p className="text-muted-foreground font-body text-sm mb-4">Our diet featured in:</p>
    <div className="flex items-center justify-center gap-2 mb-5 overflow-x-auto">
      {["Forbes", "HEALTH", "Women's Health", "MEN'S HEALTH", "yahoo!"].map((name) => (
        <div key={name} className="bg-olive-muted rounded-lg px-3 py-1.5 whitespace-nowrap flex-shrink-0">
          <span className="text-foreground font-display font-bold text-xs sm:text-sm">{name}</span>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-center gap-6 md:gap-10">
      <div className="text-center">
        <span className="text-xl font-display font-bold text-primary">50+</span>
        <p className="text-muted-foreground font-body text-xs">Media features</p>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-display font-bold text-primary">4.9</span>
          <Star className="w-4 h-4 fill-primary text-primary" />
        </div>
        <p className="text-muted-foreground font-body text-xs">Avg rating</p>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="text-center">
        <span className="text-xl font-display font-bold text-primary">153K+</span>
        <p className="text-muted-foreground font-body text-xs">Customers</p>
      </div>
    </div>
  </div>
);

const OfferPage = ({ planName, results, gender = "Female", userEmail }: OfferPageProps) => {
  const [selectedPlan, setSelectedPlan] = useState<"1month" | "3month" | "6month">("6month");
  const [timeLeft, setTimeLeft] = useState({ minutes: 8, seconds: 17 });
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);

  const emailParam = userEmail ? `&email=${encodeURIComponent(userEmail)}` : "";

  const paymentLinks: Record<string, string> = {
    "1month": `https://jackalbany_mediterr.pay.clickbank.net/?cbitems=med-30-b&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}`,
    "3month": `https://jackalbany_mediterr.pay.clickbank.net/?cbitems=med-54-b&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}`,
    "6month": `https://jackalbany_mediterr.pay.clickbank.net/?cbitems=med1p-r-72&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}`,
  };

  const [redirecting, setRedirecting] = useState(false);
  const handleClaimPlan = () => {
    setExitPopupShown(true);
    setRedirecting(true);
    // Defer redirect one tick so the overlay paints first → click feels instant.
    setTimeout(() => { window.location.href = paymentLinks[selectedPlan]; }, 0);
  };
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isMale = gender === "Male";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Exit-intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitPopupShown) {
        setShowExitPopup(true);
        setExitPopupShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [exitPopupShown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const plans = {
    "1month": {
      label: "1 Month",
      perDay: "$1.25",
      total: "$36",
      period: "Billed every month",
      save: null as string | null,
      recommended: false,
      originalPerDay: "$0.5",
    },
    "6month": {
      label: "6 Month",
      perDay: "$0.40",
      total: "$72",
      period: "Billed every 6 months",
      save: "70%",
      recommended: true,
      originalPerDay: "$1.2",
    },
    "3month": {
      label: "3 Month",
      perDay: "$0.60",
      total: "$54",
      period: "Billed every 3 months",
      save: null as string | null,
      recommended: false,
      originalPerDay: "$1.6",
    },
  };

  const planOrder: (keyof typeof plans)[] = ["1month", "6month", "3month"];

  const features = [
    { text: "Personalised Hormone Reset Diet meal plan: breakfasts, lunches, dinners, snacks, and desserts tailored to your goals", icon: Utensils },
    { text: "24/7 on demand nutrition coaching with access to registered dietitian support", icon: Zap },
    { text: "Simple, dietitian-designed recipes with everyday ingredients, plus guidance for eating out", icon: Heart },
    { text: "Beginner-friendly Hormone Reset Diet guide with step-by-step setup and realistic goals", icon: Award },
    { text: "$200 chef-prepared delivery meal voucher to jump-start your plan with zero overwhelm", icon: Star },
  ];

  const faqs = [
    { q: "What is your money-back guarantee?", a: "We offer a full 60-day money-back guarantee. Try the plan risk-free. If it's not right for you, get a full refund — no questions asked." },
    { q: "How much weight can I expect to lose?", a: "Results vary by individual, but most members following the plan consistently see noticeable changes within the first 2–3 weeks. The plan is designed for sustainable, lasting results." },
    { q: "Will this help with my cholesterol?", a: "The Hormone Reset Diet is clinically proven to support healthy cholesterol levels. Our plans emphasize heart-healthy fats, fiber-rich foods, and omega-3 sources." },
    { q: "Will this help with my blood sugar levels?", a: "Yes. The Hormone Reset Diet focuses on complex carbohydrates, healthy fats, and protein balance — all of which support stable blood sugar levels throughout the day." },
  ];

  const testimonials = [
    {
      name: "Sam C.",
      title: "Got Rid Of My Fat Fast!",
      text: "I've tried a few different diets before and usually fall off after a couple of weeks. This was the first time I didn't feel like I was forcing it. The meals were simple and actually filling, and I didn't have to think too much about what to eat each day. I wasn't perfect with it, but I still lost 32 lbs and it's continuing to go. Feels a lot more sustainable than anything I've done before.",
      rating: 5,
      image: samBeforeAfter,
      verified: true,
    },
    {
      name: "Jasmine F.",
      title: "Feeling Healthier Than Ever!",
      text: "Everyone says the Hormone Reset Diet helps you shed excess fat — and they're right. I've already lost 27 lbs in just 3 weeks! But, what's best about this diet for me is the feeling of great health. Fresh food and all is giving me new strong bursts of energy that I haven't felt in years!",
      rating: 5,
      image: jasmineBeforeAfter,
      verified: true,
    },
    {
      name: "Tiffany W.",
      title: "Easy To Follow. Effective As Hell.",
      text: "The diet was not difficult to follow. The foods contained in it were pretty easy to find and with consistency, I found myself dropping pounds and pounds of fat each week. My friends tell me they are astounded by how different I look in just after two months.",
      rating: 5,
      image: tiffanyBeforeAfter,
      verified: true,
    },
    {
      name: "Destiny O.",
      title: "Delicious Fat-Shredding Solution!",
      text: "So, I'm a big fan of The Hormone Reset Diet now. Tastes really really good. I've had to make a few adjustments with some of the food but that hasn't changed the overall outcome of the diet.\n\nFeels really good to be shedding stubborn weight finally after years of trying every other diet under the sun with no success. This REALLY works!",
      rating: 5,
      image: destinyBeforeAfter,
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-sand">
      {redirecting && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="font-body text-base font-semibold text-foreground">Securing your plan…</p>
          <p className="font-body text-xs text-muted-foreground">Redirecting to secure checkout</p>
        </div>
      )}
      {/* Sticky timer */}
      <div className="sticky top-0 z-50 bg-foreground text-primary-foreground py-2 px-4 text-center">
        <span className="font-body text-sm font-medium">
          THIS OFFER ENDS IN:{" "}
          <span className="font-bold text-honey">
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </span>
          {" "}MINUTES
        </span>
      </div>

      {/* Header */}
      <div className="bg-gradient-hero py-10 md:py-14 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-body mb-4 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5" />
              VOTED #1 BEST DIET FOR 2026
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
              Start your personalized Hormone Reset Diet today
            </h1>
            <p className="text-primary-foreground/80 font-body text-sm">
              for less than a cup of coffee ☕
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 -mt-6">
        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10"
        >
          {planOrder.map((key) => {
            const plan = plans[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`relative rounded-xl p-4 border-2 transition-all duration-200 flex flex-row md:flex-col items-center md:items-stretch md:text-center gap-4 md:gap-0 ${
                  selectedPlan === key
                    ? "border-primary bg-card shadow-glow ring-2 ring-primary/20"
                    : "border-border bg-card hover:border-primary/40 shadow-card opacity-70"
                }`}
              >
                {plan.recommended && selectedPlan === key && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-warm text-primary-foreground text-[10px] font-body font-bold whitespace-nowrap">
                    Special Offer — Save {plan.save}
                  </span>
                )}
                {/* Left section on mobile, top on desktop */}
                <div className="flex flex-col items-center md:mb-1 min-w-[70px]">
                  <span className="text-sm font-display font-bold text-foreground mb-0.5 md:mb-1 mt-1">{plan.label}</span>
                  <span className="text-[10px] text-muted-foreground font-body hidden md:block mb-2">Hormone Reset Diet</span>
                </div>
                {/* Center section on mobile */}
                <div className="flex flex-col items-center flex-1 md:flex-none">
                  <div className="text-3xl font-display font-bold text-primary">{plan.perDay}</div>
                  <span className="text-[10px] text-muted-foreground font-body">per day</span>
                </div>
                {/* Right section on mobile, bottom on desktop */}
                <div className="flex flex-col items-center md:mt-3 md:pt-2 md:border-t md:border-border min-w-[90px]">
                  <span className="text-[11px] text-muted-foreground/60 font-body">{plan.total} {plan.period.toLowerCase()}</span>
                  <p className="text-[9px] text-muted-foreground font-body mt-1 md:mt-2">
                    Can be canceled at any time
                  </p>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center mb-10" id="claim-plan">
          <motion.button
            onClick={handleClaimPlan}
            className="group w-full max-w-md inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-warm text-primary-foreground font-body font-bold text-lg shadow-medium hover:shadow-glow transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Claim My Plan
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
          <p className="text-xs text-muted-foreground font-body mt-3">
            RISK-FREE GUARANTEE — cancel at any time without being charged the full price
          </p>
          <PaymentLogos />
        </div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl p-6 shadow-card border border-border mb-6"
        >
          <h3 className="text-lg font-display font-bold text-foreground mb-4 text-center">
            What's Included
          </h3>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-3 font-body text-foreground text-sm">
                <div className="w-8 h-8 rounded-lg bg-olive-muted flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                {feature.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* App Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <img
            src={appMockup}
            alt="Hormone Reset Diet app shown on multiple devices"
            className="w-full max-w-2xl rounded-xl"
            loading="lazy" decoding="async"
          />
        </motion.div>

        {/* As Featured In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <FeaturedInBlock />
        </motion.div>

        {/* A Hormone Reset Diet you can stick to */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-olive-muted rounded-xl p-6 border border-primary/10 mb-10 text-center"
        >
          <Leaf className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-display font-bold text-foreground mb-2">
            Finally, a Hormone Reset Diet you can stick to
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            No calorie counting. No extremes. Just simple daily structure.
          </p>
        </motion.div>

        {/* Testimonials - Before/After Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-lg font-display font-bold text-foreground mb-4 text-center">
            Real people. Real results.
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {testimonials.map((review) => (
              <div key={review.name} className="bg-card rounded-xl p-4 shadow-card border border-border">
                <img
                  src={review.image}
                  alt={`${review.name} before and after`}
                  className="w-full rounded-lg object-cover mb-3"
                  loading="lazy" decoding="async"
                />
                <h4 className="font-display font-bold text-foreground text-xs mb-1">{review.title}</h4>
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-honey text-honey" />
                  ))}
                </div>
                <p className="font-body text-foreground text-xs mb-2 whitespace-pre-line line-clamp-4">{review.text}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-body font-semibold text-muted-foreground">{review.name}</span>
                  {review.verified && (
                    <span className="text-[9px] font-body text-primary font-semibold bg-olive-muted px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-olive-muted rounded-xl p-6 border border-primary/10 mb-10 text-center"
        >
          <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-display font-bold text-foreground mb-2">
            60-Day Money-Back Guarantee
          </h3>
          <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
            Try the plan risk-free. If it's not right for you, get a full refund — no questions asked.
          </p>
        </motion.div>

        {/* Second CTA */}
        <div className="text-center mb-10">
          <motion.button
            onClick={handleClaimPlan}
            className="group w-full max-w-md inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-warm text-primary-foreground font-body font-bold text-lg shadow-medium hover:shadow-glow transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Claim My Plan
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-lg font-display font-bold text-foreground mb-4 text-center">
            People often ask
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-body font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm font-body text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center pb-10 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-4 mb-3 text-muted-foreground text-xs font-body">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</span>
            <span className="flex items-center gap-1"><Leaf className="w-3.5 h-3.5" /> Cancel Anytime</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-body max-w-lg mx-auto">
            © 2026 Hormone Reset Diet. All rights reserved. Results may vary depending on the individual.
          </p>
        </div>
      </div>

      {/* Exit-Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center px-6 z-[100]"
            onClick={() => setShowExitPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card rounded-2xl p-8 shadow-medium border border-border w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-5">
                <div className="text-5xl mb-3">🛑</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  DON'T LEAVE THIS PAGE!
                </h3>
              </div>

              <p className="text-center font-body text-foreground text-lg mb-6">
                If you leave this page you <span className="font-bold underline">WON'T</span> get your:
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "30-Day Hormone Reset Diet Meal Plan",
                  "77 Hormone Reset Dessert Recipes",
                  "100 Hormone Reset Diet Recipes",
                  "Your $200 Hormone Reset Diet Gift Card",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 pb-3 border-b border-border last:border-b-0">
                    <span className="text-lg">❌</span>
                    <span className="font-body text-muted-foreground font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => {
                  setShowExitPopup(false);
                  document.getElementById("claim-plan")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-body font-bold text-lg shadow-medium transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                STAY ON THIS PAGE
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfferPage;
