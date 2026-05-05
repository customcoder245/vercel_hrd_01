import { useEffect, useState, useCallback } from "react";
import { track } from "@/lib/tracking";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Star, ArrowRight, Leaf, ChevronDown, Heart, Award, Utensils,
  Zap, Users, Lock, Check, TrendingDown, User, MessageCircle, Sparkles, CheckCircle, Gift, BookOpen, Apple, ShoppingBasket } from
"lucide-react";
import { QuizResults } from "@/types/quiz";
import appMockup from "@/assets/app-mockup.webp";
import coachKimberly from "@/assets/coach-kimberly.webp";
import mediterraneanFood from "@/assets/mediterranean-food.webp";
import samBeforeAfter from "@/assets/sammi-before-after.webp";
import jasmineBeforeAfter from "@/assets/jasmine-before-after.webp";
import tiffanyBeforeAfter from "@/assets/tiffany-before-after.webp";
import destinyBeforeAfter from "@/assets/destiny-before-after.webp";
import testimonialEmma from "@/assets/testimonial-emma.webp";
import testimonialRachel from "@/assets/testimonial-rachel.webp";
import testimonialSophie from "@/assets/testimonial-sophie.webp";
import testimonialJames from "@/assets/testimonial-james.webp";
import testimonialMark from "@/assets/testimonial-mark.webp";
import testimonialDavid from "@/assets/testimonial-david.webp";
import heroMediterranean from "@/assets/hero-mediterranean-v2.webp";
import mdLogoWhite from "@/assets/md-white-logo.webp";
import profileFemale2029 from "@/assets/profile-female-20-29.webp";
import profileFemale3039 from "@/assets/profile-female-30-39.webp";
import profileFemale4049 from "@/assets/profile-female-40-49.webp";
import profileFemale5059 from "@/assets/profile-female-50-59.webp";
import profileFemale60 from "@/assets/profile-female-60.webp";
import profileMale2029 from "@/assets/profile-male-20-29.webp";
import profileMale3039 from "@/assets/profile-male-30-39.webp";
import profileMale4049 from "@/assets/profile-male-40-49.webp";
import profileMale5059 from "@/assets/profile-male-50-59.webp";
import profileMale60 from "@/assets/profile-male-60.webp";

interface ResultsOfferPageProps {
  results: QuizResults;
  answers: Record<string, string | string[] | number>;
  userName?: string;
  userEmail?: string;
}

/* ─── Confetti ─── */
const ConfettiParticle = ({ delay, x, color }: {delay: number;x: number;color: string;}) =>
<motion.div
  className="absolute w-2 h-3 rounded-sm"
  style={{ backgroundColor: color, left: `${x}%`, top: -10 }}
  initial={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
  animate={{
    opacity: [1, 1, 0],
    y: [0, 200, 400],
    rotate: [0, 180, 360 + Math.random() * 180],
    x: [0, (Math.random() - 0.5) * 100],
    scale: [1, 1, 0.5]
  }}
  transition={{ duration: 2.5 + Math.random(), delay, ease: "easeOut" }} />;



const ConfettiExplosion = () => {
  const colors = [
  "hsl(340, 80%, 58%)", "hsl(4, 80%, 55%)", "hsl(38, 85%, 55%)",
  "hsl(340, 60%, 70%)", "hsl(30, 25%, 70%)", "hsl(4, 72%, 50%)"];

  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i, delay: Math.random() * 0.8, x: Math.random() * 100, color: colors[i % colors.length]
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => <ConfettiParticle key={p.id} {...p} />)}
    </div>);

};

/* ─── Macro Ring ─── */
const MacroRing = ({ label, value, color }: {label: string;value: number;color: string;}) => {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - value / 100 * circumference;
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
    </div>);

};

/* ─── Payment Logos ─── */
const PaymentLogos = () =>
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
      {[
    { icon: Shield, label: "McAfee®", color: '#C1272D' },
    { icon: Check, label: "TrustedSite", color: undefined },
    { icon: Lock, label: "Norton", color: '#FFCD00' },
    { icon: Check, label: "VeriSign", color: '#C1272D' }].
    map(({ icon: Icon, label, color }) =>
    <div key={label} className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5 bg-card shadow-sm">
          <Icon className="w-3.5 h-3.5" style={color ? { color } : undefined} />
          <span className="text-[9px] font-display font-bold text-foreground">{label}</span>
        </div>
    )}
    </div>
  </div>;


/* ─── Pricing Section (reusable) ─── */
const PricingSection = ({
  selectedPlan, setSelectedPlan, handleClaimPlan, timeLeft, showTimer = true, userName
}: {selectedPlan: string;setSelectedPlan: (p: "1month" | "3month" | "6month") => void;handleClaimPlan: () => void;timeLeft: {minutes: number;seconds: number;};showTimer?: boolean;userName?: string;}) => {
  const plans = {
    "1month": { label: "1-MONTH PLAN", perWeek: "$8.30", total: "$36", originalTotal: "$60", gift: false, recommended: false },
    "6month": { label: "6-MONTH PLAN", perWeek: "$2.79", total: "$72", originalTotal: "$144", gift: true, recommended: true },
    "3month": { label: "3-MONTH PLAN", perWeek: "$4.10", total: "$54", originalTotal: "$124", gift: false, recommended: false }
  };
  const planOrder: (keyof typeof plans)[] = ["1month", "6month", "3month"];

  return (
    <div className="py-8 px-6">
      <div className="container mx-auto max-w-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
            {userName ? `${userName}, Your Personalized Hormone Reset Diet Plan is Ready.` : "Your Personalized Hormone Reset Diet Plan is Ready."}
          </h2>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          {planOrder.map((key) => {
            const plan = plans[key];
            const isSelected = selectedPlan === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`relative rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected ? "border-primary shadow-glow" : "border-border/60 hover:border-primary/40"
                } ${plan.recommended ? "pt-8" : ""}`}
              >
                {plan.recommended && (
                  <span className="absolute -top-0 left-4 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-display font-bold rounded-b-lg">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center justify-between px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30 bg-muted/30"
                    }`}>
                      {isSelected && <Check className="w-4.5 h-4.5 text-primary-foreground" />}
                    </div>
                    <div>
                      <p className="text-base font-display font-bold text-foreground">{plan.label}</p>
                      <p className="text-sm font-body text-muted-foreground">
                        <span className="line-through">{plan.originalTotal}</span>{" "}
                        <span className="text-foreground font-semibold">{plan.total}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right bg-muted/40 rounded-lg px-4 py-3">
                    <span className="text-2xl font-display font-bold text-foreground">{plan.perWeek}</span>
                    <p className="text-xs font-body text-muted-foreground">per week</p>
                  </div>
                </div>
                {plan.gift && (
                  <div className="px-5 pb-4 -mt-1">
                    <p className="text-[11px] font-body text-primary font-medium">
                      + $200 meal delivery voucher included 🎁
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-sm font-display font-bold text-foreground text-center mb-5 underline underline-offset-4">
          60-Day Money-Back Guarantee – Cancel Anytime
        </p>

        <div>
          <motion.button
            onClick={handleClaimPlan}
            className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-warm text-primary-foreground font-body font-bold text-xl shadow-medium hover:shadow-glow transition-all"
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
          >
            {showTimer && (
              <span className="font-display text-primary-foreground/90 border-r border-primary-foreground/30 pr-3">
                {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            )}
            Select Plan
          </motion.button>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-xs font-body text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Secure checkout
            </span>
            <span className="flex items-center gap-1 text-xs font-body text-muted-foreground">
              <Users className="w-3.5 h-3.5 text-primary" /> 153K+ members
            </span>
          </div>
          <PaymentLogos />
        </div>
      </div>
    </div>
  );
};



/* ═══════════════ MAIN COMPONENT ═══════════════ */

const ResultsOfferPage = ({ results, answers, userName, userEmail }: ResultsOfferPageProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"1month" | "3month" | "6month">("6month");
  const [timeLeft, setTimeLeft] = useState({ minutes: 8, seconds: 17 });
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [socialProof, setSocialProof] = useState<{name: string;location: string;time: string;} | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [expandedTestimonials, setExpandedTestimonials] = useState<Record<string, boolean>>({});

  const gender = answers.gender as string || "Female";
  const isMale = gender === "Male";

  const emailParam = userEmail ? `&email=${encodeURIComponent(userEmail)}` : "";
  const sessionId = typeof window !== "undefined" ? (localStorage.getItem("md_session_id") || "") : "";
  const sidParam = sessionId ? `&tid=${encodeURIComponent(sessionId)}` : "";

  const paymentLinks: Record<string, string> = {
    "1month": `https://jackalbany_mediterr.pay.clickbank.net/?cbitems=med-30-b&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}${sidParam}`,
    "3month": `https://jackalbany_mediterr.pay.clickbank.net/?cbitems=med-54-b&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}${sidParam}`,
    "6month": `https://jackalbany_mediterr.pay.clickbank.net/?cbitems=med1p-r-72&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}${sidParam}`
  };

  const [redirecting, setRedirecting] = useState(false);
  const handleClaimPlan = useCallback(() => {
    const link = paymentLinks[selectedPlan];
    if (!link) return;
    setExitPopupShown(true);
    setRedirecting(true);
    track("order_form_view", "/results/order", { answer_value: selectedPlan });
    // Defer redirect one tick so the overlay paints first → click feels instant.
    setTimeout(() => { window.location.href = link; }, 0);
  }, [selectedPlan, paymentLinks]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  /* Sticky bottom CTA bar — show after scrolling past pricing section */
  useEffect(() => {
    const handleScroll = () => {
      const pricingEl = document.getElementById("pricing-section");
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitPopupShown) {
        setShowExitPopup(true);
        setExitPopupShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
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

  /* Social proof notifications */
  const femaleSocialProof = [
  { name: "Maria C.", location: "Barcelona, ES" },
  { name: "Sarah T.", location: "Austin, TX" },
  { name: "Jennifer L.", location: "London, UK" },
  { name: "Amanda K.", location: "Sydney, AU" },
  { name: "Rachel M.", location: "Toronto, CA" },
  { name: "Elena V.", location: "Miami, FL" },
  { name: "Sophie R.", location: "Paris, FR" },
  { name: "Lisa B.", location: "Chicago, IL" },
  { name: "Nicole P.", location: "Melbourne, AU" },
  { name: "Hannah D.", location: "Denver, CO" }];

  const maleSocialProof = [
  { name: "David W.", location: "New York, NY" },
  { name: "James H.", location: "Dublin, IE" },
  { name: "Michael S.", location: "San Diego, CA" },
  { name: "Chris R.", location: "Vancouver, CA" },
  { name: "Robert M.", location: "London, UK" },
  { name: "Daniel K.", location: "Austin, TX" },
  { name: "Anthony L.", location: "Sydney, AU" },
  { name: "Marcus T.", location: "Chicago, IL" },
  { name: "Jason P.", location: "Miami, FL" },
  { name: "Andrew B.", location: "Denver, CO" }];

  const socialProofPeople = isMale ? maleSocialProof : femaleSocialProof;

  const timeAgoOptions = ["2 minutes ago", "5 minutes ago", "12 minutes ago", "18 minutes ago", "23 minutes ago", "31 minutes ago", "42 minutes ago", "56 minutes ago"];

  useEffect(() => {
    const showNotification = () => {
      const person = socialProofPeople[Math.floor(Math.random() * socialProofPeople.length)];
      const time = timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)];
      setSocialProof({ name: person.name, location: person.location, time });
      setTimeout(() => setSocialProof(null), 4000);
    };
    const initialDelay = setTimeout(showNotification, 10000);
    const interval = setInterval(showNotification, 12000 + Math.random() * 8000);
    return () => {clearTimeout(initialDelay);clearInterval(interval);};
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  /* Computed data */
  const currentWeight = answers.weight as number || 180;
  const goalWeight = answers.goalWeight as number || 150;
  const weightDiff = currentWeight - goalWeight;
  const heightInches = answers.height as number || 66;
  const heightFt = Math.floor(heightInches / 12);
  const heightIn = heightInches % 12;

  const now = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthlyLoss = Math.min(weightDiff / 3, 8);
  const month1Weight = Math.round(currentWeight - monthlyLoss);
  const month2Weight = Math.round(currentWeight - monthlyLoss * 2);
  const m1 = months[(now.getMonth() + 1) % 12];
  const m2 = months[(now.getMonth() + 2) % 12];
  const m3 = months[(now.getMonth() + 3) % 12];

  const graphPoints = [
  { x: 40, y: 30, label: `${currentWeight}`, month: "Now" },
  { x: 100, y: 52, label: "", month: "" },
  { x: 140, y: 70, label: `${month1Weight}`, month: m1 },
  { x: 180, y: 82, label: "", month: "" },
  { x: 240, y: 110, label: `${month2Weight}`, month: m2 },
  { x: 280, y: 128, label: "", month: "" },
  { x: 340, y: 150, label: `${goalWeight}`, month: m3 }];

  const keyIndices = [0, 2, 4, 6];
  const pathD = `M 40 30 C 60 35, 85 48, 100 52 C 115 56, 125 64, 140 70 C 155 75, 165 79, 180 82 C 200 87, 220 100, 240 110 C 255 117, 265 123, 280 128 C 300 135, 320 143, 340 150`;

  /* Dynamic meals */
  const dietary = answers.dietary as string || "Everything";
  const proteins = answers.proteins as string[] || [];
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
    if (proteins.some((p) => p.includes("Chicken")) && dietary !== "Vegan" && dietary !== "Vegetarian") {
      lunch = "Grilled chicken souvlaki bowl with tzatziki & fresh greens";
    }
    // Sweet tooth → swap snack for a Hormone Reset Diet dessert
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
    { meal: "Dinner", description: dinner }];

  };
  const dynamicMeals = getMealSuggestions();

  /* Testimonials */
  const beforeAfterTestimonials = [
  { name: "Sammi C.", title: "Got Rid Of My Fat Fast!", text: "I used to hit the gym four times a week just to try to lose weight. But I never got any results until I started the Hormone Reset Diet. I'm currently down 32 lbs since I started 2 months ago!", rating: 5, image: samBeforeAfter, verified: true },
  { name: "Jasmine F.", title: "Feeling Healthier Than Ever!", text: "Everyone says the Hormone Reset Diet helps you shed excess fat — and they're right. I've already lost 17 lbs in just 3 weeks! The feeling of great health and fresh food is giving me new strong bursts of energy!", rating: 5, image: jasmineBeforeAfter, verified: true },
  { name: "Tiffany W.", title: "Easy To Follow. Effective As Hell.", text: "The diet was not difficult to follow. The foods were pretty easy to find and with consistency, I found myself dropping pounds of fat each week. My friends are astounded by how different I look!", rating: 5, image: tiffanyBeforeAfter, verified: true },
  { name: "Destiny O.", title: "Delicious Fat-Shredding Solution!", text: "Feels really good to be shedding stubborn weight finally after years of trying every other diet under the sun with no success. This REALLY works!", rating: 5, image: destinyBeforeAfter, verified: true }];


  const features = [
  { title: "A Personalized Hormone Reset Diet Meal Plan", description: "Know exactly what to eat for breakfast, lunch, and dinner, tailored to your preferences and goals, and crafted by Registered Dietitian Nutritionists.", icon: Utensils },
  { title: "Hormone Reset Diet Snacks and Desserts", description: "Enjoy Hormone Reset Diet snacks that will satisfy your cravings and won't break your diet.", icon: Apple },
  { title: "Easy-to-Follow Recipes", description: "Simple, satisfying meals that leave you pleasantly full, plus guidance on what to order when eating out.", icon: Heart },
  { title: "Simple Ingredients From Any Store", description: "Every recipe uses commonly available ingredients, saving you time, money, and effort.", icon: ShoppingBasket },
  { title: "24/7 On-Demand Nutritionist Support", description: "Get instant answers, meal swaps, and guidance anytime you need it.", icon: Zap },
  { title: "A Complete Hormone Reset Diet Guide for Beginners", description: "We will guide you step-by-step on how to start your Hormone Reset Diet to ensure you reach your weight loss goal. Your success is our success!", icon: BookOpen },
  { title: "60-Day Money-Back Guarantee", description: "If you're not completely satisfied for any reason, simply contact us within 60 days of your purchase for a full, no-questions-asked refund.", icon: CheckCircle },
  { title: "$200 Exclusive Bonus Gift Card", description: "Jumpstart your journey with a $200 bonus gift card that can be redeemed toward premium Hormone Reset Diet essentials delivered straight to your home, giving you the ultimate head start on your new lifestyle.", icon: Gift }];


  const faqs = [
  { q: "What is your money-back guarantee?", a: "We offer a full 60-day money-back guarantee. Try the plan risk-free. If it's not right for you, get a full refund — no questions asked." },
  { q: "How much weight can I expect to lose?", a: "Results vary by individual, but most members following the plan consistently see noticeable changes within the first 2–3 weeks. The plan is designed for sustainable, lasting results." },
  { q: "Will this help with my cholesterol?", a: "The Hormone Reset Diet diet is clinically proven to support healthy cholesterol levels. Our plans emphasize heart-healthy fats, fiber-rich foods, and omega-3 sources." },
  { q: "Will this help with my blood sugar levels?", a: "Yes. The Hormone Reset Diet diet focuses on complex carbohydrates, healthy fats, and protein balance — all of which support stable blood sugar levels throughout the day." }];


  const todayFormatted = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  // GLP-1 line: drops steeply, flattens, then curves back up by month 3
  const glp1Path = `M 40 30 C 55 40, 70 60, 90 80 C 110 100, 130 115, 150 120 C 170 125, 195 125, 220 118 C 245 110, 265 98, 285 85 C 305 72, 325 62, 340 58`;

  return (
    <div className="min-h-screen bg-gradient-sand">
      {redirecting && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="font-body text-base font-semibold text-foreground">Securing your plan…</p>
          <p className="font-body text-xs text-muted-foreground">Redirecting to secure checkout</p>
        </div>
      )}
      {/* ═══ STICKY TOP BAR ═══ */}
      <div className="sticky top-0 z-50 bg-foreground text-primary-foreground py-3.5 px-4 flex items-center justify-between">
        <img src={mdLogoWhite} alt="Hormone Reset Diet" className="h-8" loading="lazy" decoding="async" />
        <div className="flex items-center gap-3">
          <span className="font-body text-sm font-medium hidden sm:inline">
            Your plan is reserved for{" "}
            <span className="font-bold text-honey">
              {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </span>
          <button
            onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity">

            Get Your Plan
          </button>
        </div>
      </div>

      {/* ═══ SECTION 1: Hero ═══ */}
      <div className="bg-gradient-sand py-8 md:py-12 px-6 relative overflow-hidden">
        {showConfetti && <ConfettiExplosion />}
        <div className="container mx-auto max-w-3xl text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-muted backdrop-blur-sm text-foreground font-body font-semibold text-sm mb-4 border border-border">

              <Award className="w-4 h-4 text-primary" />
              Plan Ready
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══ SECTION 2: Profile Summary ═══ */}
      <div className="container mx-auto max-w-3xl px-6 -mt-6 relative z-20">
        <motion.div {...fadeUp} className="bg-card rounded-xl p-6 shadow-card border border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-bold text-foreground">Your profile summary</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex-shrink-0">
             {(() => {
                const gender = answers.gender as string || "Female";
                const age = answers.age as string || "40–49";
                const isMale = gender === "Male";
                const maleImages = [profileMale2029, profileMale3039, profileMale4049, profileMale5059, profileMale60];
                const femaleImages = [profileFemale2029, profileFemale3039, profileFemale4049, profileFemale5059, profileFemale60];
                const ageIndex = age.includes("Under") || age.includes("18") || age.includes("29") ? 0 :
                age.includes("30") ? 1 :
                age.includes("40") ? 2 :
                age.includes("50") ? 3 :
                4;
                const profileImg = isMale ? maleImages[ageIndex] : femaleImages[ageIndex];
                return (
                  <div className="w-full aspect-square md:aspect-auto md:h-full rounded-xl overflow-hidden">
                    <img
                      src={profileImg}
                      alt="Your profile"
                      className="w-full h-full object-cover" loading="eager" decoding="async" />

                  </div>);

              })()}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              {[
              { label: "Age Group", value: answers.age as string || "40–49" },
              { label: "Height", value: `${heightFt}'${heightIn}"` },
              { label: "Current Weight", value: `${currentWeight} lbs` },
              { label: "Target Weight", value: `${goalWeight} lbs` },
              { label: "BMI", value: `${results.bmi} (${results.bmiCategory})` },
              { label: "Meal Preference", value: dietary === "Everything" ? "Standard" : dietary }].
              map((item) =>
              <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                  <span className="text-xs text-muted-foreground font-body block">{item.label}</span>
                  <span className="text-sm font-body font-semibold text-foreground">{item.value}</span>
                </div>
              )}
            </div>
          </div>

          {/* Estimated results — merged into profile */}
          <div className="mt-5 pt-5 border-t border-border">
            <div className="rounded-lg px-4 py-3 flex items-center justify-between mb-4 border" style={{ backgroundColor: "hsl(140 40% 95%)", borderColor: "hsl(140 40% 85%)" }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(140 40% 88%)" }}>
                  <CheckCircle className="w-4 h-4" style={{ color: "hsl(140 50% 35%)" }} />
                </div>
                <div>
                  <p className="text-sm font-body font-semibold text-foreground">Estimated results</p>
                  <p className="text-base font-display font-bold text-foreground">{Math.max(10, Math.min(15, Math.round(weightDiff * 0.5)))}–{Math.max(12, Math.min(20, Math.round(weightDiff * 0.5) + 5))} lbs in 6 weeks</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
              { label: "Metabolism", value: results.metabolicProfile.split(" ")[0] || "Active", icon: User },
              { label: "Energy boost", value: "Day 3", icon: Zap },
              { label: "Fat burn mode", value: "Week 1", icon: TrendingDown },
              { label: "Visible results", value: "Week 2–3", icon: Star }].
              map(({ label, value, icon: Icon }) =>
              <div key={label} className="bg-muted rounded-lg p-3.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-body text-muted-foreground">{label}</span>
                  </div>
                  <span className="text-sm font-display font-bold text-foreground">{value}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ═══ What Your Answers Suggest ═══ */}
        <motion.div {...fadeUp} className="rounded-xl overflow-hidden mb-6 border border-amber-200/40 shadow-sm" style={{ backgroundColor: "hsl(42 50% 97%)" }}>
          <div className="px-5 py-4 border-b border-amber-200/40" style={{ backgroundColor: "hsl(42 55% 93%)" }}>
            <h3 className="text-lg font-display font-bold text-foreground mb-1">Your Body Isn't Broken — It's Changing</h3>
            <p className="text-xs font-body text-foreground/60 leading-relaxed">{isMale ? "Most diets weren't designed for how your body actually works." : "Most diets were never designed for women's hormones."} Your Hormone Reset Diet plan is built to work with your body, not against it.</p>
          </div>
          <div className="px-5 py-4 space-y-4">
            <p className="text-sm font-body text-foreground/80 leading-relaxed">
              Your responses show patterns many {isMale ? "men" : "women"} experience in midlife — signs that your body is playing by different rules now.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["Slower metabolism", "Stubborn belly fat", "Stronger cravings", "Energy dips", "Sleep disruption", "Change in mood"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-body font-medium text-foreground/70 border border-amber-200/50" style={{ backgroundColor: "hsl(42 45% 94%)" }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(25 80% 55%)" }} />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm font-body text-foreground/70 leading-relaxed italic">
              You can do everything right and still struggle — because the rules around metabolism change after 40.
            </p>
            <p className="text-sm font-body text-foreground/80 leading-relaxed font-medium">
              This plan uses balanced meals, real foods, and stable energy to help your body find a healthier rhythm.
            </p>
          </div>
        </motion.div>

        {/* ═══ SECTION 3: Your Plan (dark) ═══ */}
        <motion.div {...fadeUp} className="bg-foreground rounded-xl p-6 shadow-card border border-border mb-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-bold text-primary-foreground">Your plan</h3>
          </div>
          <p className="text-sm font-body text-primary-foreground/70 mb-4">We've used your answers to organise your daily meals and portions for you.</p>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="text-center">
              <span className="text-3xl font-display font-bold text-primary">{results.calorieRange}</span>
              <p className="text-xs text-primary-foreground/60 font-body mt-1">Daily Calories</p>
            </div>
            <div className="flex gap-6">
              <MacroRing label="Protein" value={results.macros.protein} color="hsl(340, 80%, 58%)" />
              <MacroRing label="Carbs" value={results.macros.carbs} color="hsl(38, 85%, 55%)" />
              <MacroRing label="Fats" value={results.macros.fat} color="hsl(30, 25%, 70%)" />
            </div>
          </div>

          {/* Meal Plan */}
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
              {dynamicMeals.map((item) =>
              <div key={item.meal} className="bg-primary-foreground/10 rounded-lg p-3">
                  <span className="text-[10px] font-body font-semibold text-primary block mb-1">{item.meal}</span>
                  <span className="text-xs font-body text-primary-foreground/70">{item.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Nutritionist Credibility */}
          <div className="border-t border-primary-foreground/10 pt-5 mt-5">
            <div className="flex items-center gap-4">
              <img src={coachKimberly} alt="Kimberly, Registered Dietitian" className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 flex-shrink-0" loading="lazy" decoding="async" />
              <div>
                <p className="text-sm font-display font-bold text-primary-foreground">Created by Kimberly R., RDN</p>
                <p className="text-xs font-body text-primary-foreground/70">Registered Dietitian Nutritionist with 12+ years of experience in Hormone Reset Diet nutrition and weight management.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ SECTION 4: First Pricing ═══ */}
      </div>
      <div id="pricing-section">
        <PricingSection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} handleClaimPlan={handleClaimPlan} timeLeft={timeLeft} userName={userName} />
      </div>

      {/* ═══ SECTION 7: What's Included ═══ */}
      <div className="container mx-auto max-w-3xl px-6 mt-6">
        <motion.div {...fadeUp} className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border mb-8">
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-olive-muted flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            What's included?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const isGuarantee = feature.title.includes("60-day");
              return (
                <div key={feature.title} className="rounded-xl p-4 border bg-muted/50 border-border/50">
                  <div className="flex items-start gap-3 mb-1.5">
                    <feature.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isGuarantee ? "text-primary" : "text-foreground"}`} />
                    <h4 className="font-display font-bold text-sm text-foreground leading-snug">{feature.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed pl-8">{feature.description}</p>
                </div>);
            })}
          </div>
        </motion.div>

        {/* ═══ (App mockup section removed) ═══ */}


        <div className="mb-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4 text-center">
            Real people. Real results.
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {beforeAfterTestimonials.map((review, idx) => {
              const isExpanded = expandedTestimonials[review.name];
              return (
              <div key={review.name} className="bg-card rounded-xl p-4 shadow-card border border-border">
                <img src={review.image} alt={`${review.name} before and after`} className="w-full aspect-square rounded-lg object-cover object-top mb-3" loading="lazy" decoding="async" />
                <h4 className="font-display font-bold text-foreground text-xs mb-1">{review.title}</h4>
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(review.rating)].map((_, i) =>
                <Star key={i} className="w-3 h-3 fill-honey text-honey" />
                )}
                </div>
                <p className={`font-body text-foreground text-xs mb-2 whitespace-pre-line ${idx < 2 ? "" : isExpanded ? "" : "line-clamp-4"}`}>{review.text}</p>
                {idx >= 2 && !isExpanded &&
                  <button onClick={() => setExpandedTestimonials(prev => ({ ...prev, [review.name]: true }))} className="text-[10px] font-body font-semibold text-primary">Read more</button>
                }
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-body font-semibold text-muted-foreground">{review.name}</span>
                  {review.verified &&
                <span className="text-[9px] font-body text-primary font-semibold bg-olive-muted px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Verified
                    </span>
                }
                </div>
              </div>
              );
            })}
          </div>
        </div>


        {/* ═══ As Featured In ═══ */}
        <motion.div {...fadeUp} className="mb-8">
           <div className="bg-card rounded-xl p-6 text-center shadow-card border border-border">
            <p className="text-muted-foreground font-body text-sm mb-4">Our diet featured in:</p>
            <div className="flex items-center justify-center gap-2 mb-5 overflow-x-auto">
              {[
                { name: "Forbes", style: "font-serif italic" },
                { name: "HEALTH", style: "tracking-[0.2em]" },
                { name: isMale ? "Men's Health" : "Women's Health", style: "" },
                { name: "Shape", style: "tracking-[0.1em]" },
                { name: "yahoo!", style: "font-serif" },
              ].map((pub) =>
              <div key={pub.name} className="bg-muted/50 rounded-lg px-3 py-1.5 whitespace-nowrap flex-shrink-0">
                  <span className={`text-foreground font-display font-bold text-xs sm:text-sm ${pub.style}`}>{pub.name}</span>
                </div>
              )}
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
        </motion.div>

        {/* ═══ (Clinically proven stats removed) ═══ */}


      </div>

      {/* ═══ SECTION 13: FAQs ═══ */}
      <div className="container mx-auto max-w-3xl px-6">
        <motion.div {...fadeUp} className="mb-10">
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1 text-center">
            People <span className="text-gradient-warm">often</span> ask
          </h3>
          <div className="space-y-2 mt-4">
            {faqs.map((faq, i) =>
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-body font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i &&
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4">
                    <p className="text-sm font-body text-muted-foreground">{faq.a}</p>
                  </motion.div>
              }
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center pb-10 pt-4 bg-footer rounded-b-lg px-6">
          <div className="flex items-center justify-center gap-4 mb-3 text-white/70 text-xs font-body">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</span>
            <span className="flex items-center gap-1"><Leaf className="w-3.5 h-3.5" /> Cancel Anytime</span>
          </div>
          <p className="text-[10px] text-white/40 font-body max-w-lg mx-auto">
            © 2026 Hormone Reset Diet Plan. All rights reserved. Results may vary depending on the individual.
          </p>
        </div>
      </div>

      {/* ═══ Social Proof Notification ═══ */}
      <AnimatePresence>
        {socialProof &&
        <motion.div
          initial={{ opacity: 0, x: -80, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-4 z-[90] max-w-xs">

            <div className="bg-foreground/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-medium border border-border/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-display font-bold text-primary">{socialProof.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body text-primary-foreground">
                  <span className="font-semibold text-primary-foreground">{socialProof.name}</span>{" "}
                  <span className="text-primary-foreground/70">from {socialProof.location}</span>
                </p>
                <p className="text-xs font-body text-primary-foreground/80">
                  just purchased their <span className="text-primary font-semibold">Hormone Reset Diet Plan</span>
                </p>
                <p className="text-[10px] font-body text-primary-foreground/50 mt-0.5">{socialProof.time}</p>
              </div>
              <button
              onClick={() => setSocialProof(null)}
              className="text-primary-foreground/40 hover:text-primary-foreground/70 text-xs flex-shrink-0">

                ✕
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* ═══ Exit-Intent Popup ═══ */}
      <AnimatePresence>
        {showExitPopup &&
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center px-6 z-[100]"
          onClick={() => setShowExitPopup(false)}>

            <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-card rounded-2xl p-8 shadow-medium border border-border w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}>

              <button onClick={() => setShowExitPopup(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">✕</button>
              <div className="text-center mb-5">
                <div className="text-5xl mb-3">⏳</div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">Wait — your plan is still reserved</h3>
              </div>
              <p className="text-center font-body text-muted-foreground text-sm mb-6">
                Your personalized Hormone Reset Diet Plan is ready and waiting. Here's everything that's included:
              </p>
              <div className="space-y-3 mb-8">
                {["Your Personalized Meal Plan", "77 Hormone Reset Diet Dessert Recipes", "100+ Easy Hormone Reset Diet Recipes", "$200 Hormone Reset Diet Essentials Gift Card"].map((item) =>
              <div key={item} className="flex items-center gap-3 pb-3 border-b border-border last:border-b-0">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-body text-foreground font-medium text-sm">{item}</span>
                  </div>
              )}
              </div>
              <motion.button
              onClick={() => {setShowExitPopup(false);document.getElementById("claim-plan")?.scrollIntoView({ behavior: "smooth" });}}
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-body font-bold text-lg shadow-medium transition-all"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>

                STAY ON THIS PAGE
              </motion.button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* ═══ Sticky Mobile CTA Bar ═══ */}
      <AnimatePresence>
        {showStickyBar &&
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[80] md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 shadow-medium">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-body text-muted-foreground truncate">
                  <span className="font-semibold text-primary">{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}</span> left at this price
                </p>
              </div>
              <button
                onClick={handleClaimPlan}
                className="px-5 py-2.5 rounded-lg bg-gradient-warm text-primary-foreground font-body font-bold text-sm shadow-medium whitespace-nowrap flex-shrink-0">
                Get My Plan →
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

export default ResultsOfferPage;
