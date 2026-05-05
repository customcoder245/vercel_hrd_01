import { useState, useEffect } from "react";
import { track } from "@/lib/tracking";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, Star, Users } from "lucide-react";
import { analysisQuestions } from "@/data/quizQuestions";
import tiffanyBeforeAfter from "@/assets/tiffany-before-after.webp";

interface EmailCaptureProps {
  mode?: "capture" | "analyzing";
  onSubmit?: (email: string, name: string) => void;
  onAnalysisComplete?: () => void;
}

const EmailCapture = ({ mode = "capture", onSubmit, onAnalysisComplete }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [popupIndex, setPopupIndex] = useState(-1);
  const [popupAnswers, setPopupAnswers] = useState<Record<string, string>>({});
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const isAnalyzing = mode === "analyzing";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !onSubmit) return;
    track("email_submitted", "/quiz/email");
    onSubmit(email, "");
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    const showingPopup = () =>
    popupIndex >= 0 &&
    popupIndex < analysisQuestions.length &&
    !popupAnswers[analysisQuestions[popupIndex]?.id];

    const progressInterval = setInterval(() => {
      if (showingPopup()) return;

      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    const popup1Timer = setTimeout(() => setPopupIndex(0), 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(popup1Timer);
    };
  }, [isAnalyzing, popupIndex, popupAnswers]);

  useEffect(() => {
    if (!isAnalyzing) return;

    const firstAnswered = analysisQuestions.length > 0 && popupAnswers[analysisQuestions[0]?.id];
    if (firstAnswered && popupIndex === 0) {
      const timer = setTimeout(() => setPopupIndex(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, popupIndex, popupAnswers]);

  useEffect(() => {
    if (!isAnalyzing) return;

    if (analysisProgress >= 100 && Object.keys(popupAnswers).length >= analysisQuestions.length) {
      const timer = setTimeout(() => onAnalysisComplete?.(), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, analysisProgress, popupAnswers, onAnalysisComplete]);

  const handlePopupAnswer = (answer: string) => {
    const q = analysisQuestions[popupIndex];
    if (!q) return;

    const newAnswers = { ...popupAnswers, [q.id]: answer };
    setPopupAnswers(newAnswers);

    // Persist popup answers so results page can use commitment
    sessionStorage.setItem("quizPopupAnswers", JSON.stringify(newAnswers));

    // Track commitment question
    if (q.id === "commitment") {
      track("quiz_question_answered", "/quiz/calculating", {
        question_id: "commitment",
        question_label: q.title,
        answer_value: answer,
        commitment: answer,
      });
    }

    // Don't auto-advance here — the useEffect with 3s delay handles showing the next popup
  };

  if (isAnalyzing) {
    const steps = [
    "Analyzing your metabolic profile",
    "Calculating ideal macros & calories",
    "Building your meal framework",
    "Personalizing your meal plan"];


    const showPopup =
    popupIndex >= 0 &&
    popupIndex < analysisQuestions.length &&
    !popupAnswers[analysisQuestions[popupIndex]?.id];

    return (
      <div className="min-h-screen bg-gradient-sand flex items-center justify-center px-6 relative">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-md w-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-8 rounded-full border-4 border-muted border-t-primary" />

          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Building your plan....
          </h1>

          <div className="w-full h-2 rounded-full bg-muted mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-hero rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 0.3 }} />

          </div>

          <div className="space-y-3 text-left">
            {steps.map((step, i) => {
              const stepProgress = (i + 1) * 25;
              const isComplete = analysisProgress >= stepProgress;
              const isActive = analysisProgress >= stepProgress - 25 && !isComplete;

              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isActive || isComplete ? 1 : 0.3, x: 0 }}
                  transition={{ delay: i * 0.3, duration: 0.4 }}
                  className="flex items-center gap-3 text-muted-foreground font-body">

                  {isComplete ?
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">

                      <span className="text-primary-foreground text-xs">✓</span>
                    </motion.div> :

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    isActive ? "border-primary animate-pulse-soft" : "border-muted-foreground/30"}`
                    } />

                  }
                  {step}
                </motion.div>);

            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 bg-card rounded-xl p-4 border border-border">

            <div className="flex items-start gap-3">
              <img
                src={tiffanyBeforeAfter}
                alt="Tiffany W. before and after"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) =>
                  <Star key={i} className="w-4 h-4 fill-honey text-honey" />
                  )}
                </div>
                <p className="text-sm font-body text-foreground italic mb-1 leading-snug">
                  "The diet was not difficult to follow. With consistency, I found myself dropping pounds of fat each week. My friends are astounded by how different I look!"
                </p>
                <span className="text-xs text-muted-foreground font-body">Tiffany W. — Verified</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showPopup &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center px-6 z-10">

              <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-card rounded-2xl p-6 shadow-medium border border-border w-full max-w-lg">

                <div className="text-center mb-2">
                  <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                    One more thing...
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-5 text-center">
                  {analysisQuestions[popupIndex].title}
                </h3>
                <div className="space-y-2.5">
                  {analysisQuestions[popupIndex].options.map((opt) =>
                <motion.button
                  key={opt}
                  onClick={() => handlePopupAnswer(opt)}
                  className="w-full p-3.5 rounded-xl border-2 border-border bg-card hover:border-primary/40 hover:shadow-soft text-left font-body font-medium text-foreground text-sm transition-all"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}>

                      {opt}
                    </motion.button>
                )}
                </div>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-sand flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-muted text-primary font-body text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Congratulations!</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
          Where Should We Send Your Results?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@email.com"
            required
            className="w-full px-6 py-4 rounded-xl border-2 border-border bg-card text-foreground font-body text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50" />

          <motion.button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            View My Results
          </motion.button>
        </form>

        <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="text-xs font-body">We are not going to send you spam.</span>
        </div>

        {(() => {
          const isMale = (() => {
            try {
              const a = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}");
              return (a.gender || a.sex) === "Male";
            } catch { return false; }
          })();
          const audience = isMale ? "men" : "women";
          return (
            <div className="bg-green-50 rounded-xl p-4 border border-green-200 flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <p className="text-sm font-body font-semibold text-green-800">
                Over 150,000 {audience} have already joined
              </p>
            </div>
          );
        })()}
      </motion.div>
    </div>);

};

export default EmailCapture;