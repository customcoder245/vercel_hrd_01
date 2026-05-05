import { motion } from "framer-motion";
import { ArrowRight, Utensils, Heart, Clock, ShoppingCart, UtensilsCrossed, Gift, BookOpen, MessageCircle } from "lucide-react";
import productMockup from "@/assets/product-mockup-med.webp";

interface Props {
  onContinue: () => void;
}

const features = [
  {
    icon: Utensils,
    title: "Know exactly what to eat",
    description: "Without overthinking it. Balanced meals designed around your hormone pattern.",
  },
  {
    icon: Heart,
    title: "Eat with your body, not against it",
    description: "Hormone-support foods that stabilize energy and reduce cravings naturally.",
  },
  {
    icon: Clock,
    title: "Meals that fit real life",
    description: "Simple 30-minute recipes — not perfect routines, just consistent ones.",
  },
  {
    icon: ShoppingCart,
    title: "Walk in knowing what to buy",
    description: "Weekly grocery lists with zero guesswork or meal planning stress.",
  },
  {
    icon: UtensilsCrossed,
    title: "Stay on track eating out",
    description: "A dining cheat sheet so you don't stress about restaurant menus.",
  },
  {
    icon: Gift,
    title: "Enjoy food without restriction",
    description: "Hormone-smart snacks and desserts that keep you satisfied.",
  },
  {
    icon: BookOpen,
    title: "Start with confidence",
    description: "A clear beginner guide, even if nothing has worked before.",
  },
  {
    icon: MessageCircle,
    title: "Get help when you need it",
    description: "24/7 nutritionist support — not when it's convenient, when it matters.",
  },
];

const SocialProofScreen = ({ onContinue }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col items-center justify-start px-6 py-10"
    >
      <div className="w-full max-w-xl mx-auto">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2"
        >
          What's included in your{" "}
          <br className="hidden md:block" />
          Hormone Reset Diet Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground font-body text-center mb-4"
        >
          Everything you need to support your metabolism and feel in control again.
        </motion.p>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="flex justify-center mb-8"
        >
          <img
            src={productMockup}
            alt="Hormone Reset Diet product"
            className="w-full max-w-xs h-auto object-contain rounded-xl"
            width={400} height={200} loading="eager" decoding="async"
          />
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              className="bg-card rounded-xl p-5 border border-border shadow-card"
            >
              <feature.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-base font-display font-bold text-foreground mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          onClick={onContinue}
          className="w-full mt-8 py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-lg shadow-medium transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Build my personalised plan
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SocialProofScreen;
