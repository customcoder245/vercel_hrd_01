import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizState } from "@/types/quiz";
import ProgressBar from "./ProgressBar";
const BreakScreens = lazy(() => import("./BreakScreens"));
import { trackStepView, trackAnswer } from "@/lib/tracking";
import { filterOptionsByDiet } from "@/lib/dietFilter";
import bodySelectWoman from "@/assets/body-select-woman.webp";
import zoneFemaleLegs from "@/assets/zone-female-legs.jpg";
import zoneFemaleBelly from "@/assets/zone-female-belly.jpg";
import zoneFemaleArms from "@/assets/zone-female-arms.jpg";
import zoneFemaleButt from "@/assets/zone-female-butt.jpg";
import zoneFemaleFace from "@/assets/zone-female-face.jpg";
import zoneMaleLegs from "@/assets/zone-male-legs.jpg";
import zoneMaleBelly from "@/assets/zone-male-belly.jpg";
import zoneMaleArms from "@/assets/zone-male-arms.jpg";
import zoneMaleButt from "@/assets/zone-male-butt.jpg";
import zoneMaleFace from "@/assets/zone-male-face.jpg";

interface QuizFlowProps {
  quizState: QuizState;
  onAnswer: (questionId: string, value: string | string[] | number) => void;
  onBack: () => void;
  onComplete: () => void;
  liveCount: number;
}

const preloadImage = (src: string) => {
  if (!src) return;
  const img = new Image();
  img.src = src;
};

const QuizFlow = ({ quizState, onAnswer, onBack, onComplete, liveCount }: QuizFlowProps) => {
  const isMobile = useIsMobile();
  const slideDistance = isMobile ? 16 : 24;
  const slideDuration = isMobile ? 0.3 : 0.4;
  const hoverScale = isMobile ? undefined : { scale: 1.02 };
  const hoverScaleSm = isMobile ? undefined : { scale: 1.01 };
  const hoverScaleLg = isMobile ? undefined : { scale: 1.05 };
  const hoverScaleScale = isMobile ? undefined : { scale: 1.04 };
  const question = quizQuestions[quizState.currentStep];
  const currentAnswer = quizState.answers[question.id];
  const [sliderValue, setSliderValue] = useState<number>(
    (currentAnswer as number) || question.sliderConfig?.defaultValue || question.sliderConfig?.min || 150
  );
  const [sliderTouched, setSliderTouched] = useState(false);

  useEffect(() => {
    setSliderValue(
      (quizState.answers[question.id] as number) || question.sliderConfig?.defaultValue || question.sliderConfig?.min || 150
    );
    setSliderTouched(false);
    const existing = quizState.answers[question.id];
    setMultiSelected(Array.isArray(existing) ? existing : []);
    setNumberInputValue(String((quizState.answers[question.id] as number) || question.sliderConfig?.defaultValue || ""));
    setTextInputValue(String((quizState.answers[question.id] as string) || ""));
  }, [question.id]);

  // Fire quiz_step_view on every question load (skip breaks)
  useEffect(() => {
    if (question.type !== "break") {
      trackStepView(quizState.currentStep, question.id, question.title);
    }
  }, [quizState.currentStep, question.id, question.title, question.type]);

  // Preload images for the next 2 steps
  useEffect(() => {
    const nextSteps = quizQuestions.slice(quizState.currentStep + 1, quizState.currentStep + 3);
    nextSteps.forEach(step => {
      if (step.type === "body-select") {
        preloadImage(bodySelectWoman);
      }
      if (step.type === "body-image-select") {
        const isMaleUser = ((quizState.answers.sex as string) || (quizState.answers.gender as string)) === "Male";
        [zoneFemaleLegs, zoneMaleLegs, zoneFemaleBelly, zoneMaleBelly, zoneFemaleArms, zoneMaleArms, zoneFemaleButt, zoneMaleButt, zoneFemaleFace, zoneMaleFace].forEach(preloadImage);
      }
    });
  }, [quizState.currentStep, quizState.answers]);

  const [multiSelected, setMultiSelected] = useState<string[]>(
    Array.isArray(currentAnswer) ? (currentAnswer as string[]) : []
  );
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(6);
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [numberInputValue, setNumberInputValue] = useState<string>(
    String((currentAnswer as number) || question.sliderConfig?.defaultValue || "")
  );
  const [textInputValue, setTextInputValue] = useState<string>(
    String((currentAnswer as string) || "")
  );

  // Options that are exclusive (selecting them deselects everything else)
  const exclusiveOptions = ["None", "None of the above", "No change", "No strong preference", "I don't eat much fruit", "I struggle to eat vegetables", "None of these"];

  const fireAnswer = (value: string | string[] | number, unit?: string) => {
    trackAnswer({
      questionIndex: quizState.currentStep,
      questionId: question.id,
      questionLabel: question.title,
      value,
      isMulti: question.type === "multi-select" || question.type === "body-select",
      unit,
    });
  };

  const advanceToNext = (delay = 300) => {
    setTimeout(() => {
      onComplete();
    }, delay);
  };

  const handleSelect = (value: string) => {
    onAnswer(question.id, value);
    fireAnswer(value);
    advanceToNext(450);
  };

  const handleMultiToggle = (value: string) => {
    const isExclusive = exclusiveOptions.includes(value);
    if (isExclusive) {
      setMultiSelected([value]);
      onAnswer(question.id, [value]);
      fireAnswer([value]);
      advanceToNext(450);
      return;
    }
    setMultiSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return [...prev.filter((v) => !exclusiveOptions.includes(v)), value];
    });
  };

  const handleMultiSubmit = () => {
    onAnswer(question.id, multiSelected);
    fireAnswer(multiSelected);
    advanceToNext();
  };

  const handleSliderSubmit = () => {
    const finalValue = weightUnit === "kg" ? Math.round(sliderValue * 2.205) : sliderValue;
    onAnswer(question.id, finalValue);
    // Persist the user's preferred display unit so later screens can show kg if chosen
    onAnswer("weightUnit", weightUnit);
    fireAnswer(finalValue, "lbs");
    advanceToNext();
  };

  const handleHeightSubmit = () => {
    const totalInches = heightFeet * 12 + heightInches;
    onAnswer(question.id, totalInches);
    fireAnswer(totalInches, "in");
    advanceToNext();
  };

  const handleNumberInputSubmit = () => {
    const num = parseInt(numberInputValue, 10);
    if (!isNaN(num) && question.sliderConfig && num >= question.sliderConfig.min && num <= question.sliderConfig.max) {
      onAnswer(question.id, num);
      fireAnswer(num);
      advanceToNext();
    }
  };

  const handleTextInputSubmit = () => {
    const trimmed = textInputValue.trim();
    if (trimmed.length === 0) return;
    onAnswer(question.id, trimmed);
    if (question.id === "name") {
      try { sessionStorage.setItem("quizName", trimmed); } catch { /* noop */ }
    }
    fireAnswer(trimmed);
    advanceToNext();
  };

  const handleAgreeDisagree = (value: string) => {
    onAnswer(question.id, value);
    fireAnswer(value);
    advanceToNext(400);
  };

  const handleScaleSelect = (value: number) => {
    onAnswer(question.id, value);
    fireAnswer(value);
    advanceToNext(400);
  };

  // Count non-break questions for progress
  const totalActualQuestions = quizQuestions.filter(q => q.type !== "break").length;
  const currentActualStep = quizQuestions.slice(0, quizState.currentStep + 1).filter(q => q.type !== "break").length;

  const questionId = question.id;

  // Filter options for proteins / vegetables / carbs based on the user's
  // selected dietary preference (vegan, vegetarian, etc.)
  const dietAnswer = quizState.answers["currentDiet"] as string | undefined;
  const displayOptions = filterOptionsByDiet(question.id, question.options, dietAnswer);

  // Break screen
  if (question.type === "break") {
    return (
      <div className="bg-gradient-sand flex flex-col min-h-dvh overflow-y-auto">
        <div className="container mx-auto px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <ProgressBar current={currentActualStep} total={totalActualQuestions} />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-start justify-center px-6 pb-12 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionId}
              initial={{ opacity: 0, x: slideDistance }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slideDistance }}
              transition={{ duration: slideDuration, ease: "easeInOut" }}
              className="w-full will-change-transform"
            >
              <Suspense fallback={<div className="w-full max-w-lg mx-auto animate-pulse h-64 rounded-xl bg-muted" />}>
                {/* Hide inline break Continue buttons (gradient-hero) on mobile - replaced by floating button */}
                <div className="[&_.bg-gradient-hero]:max-md:hidden">
                  <BreakScreens
                    breakType={question.breakType!}
                    answers={quizState.answers}
                    onContinue={onComplete}
                  />
                </div>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Mobile spacer so floating button doesn't cover content */}
        <div className="h-24 md:hidden" />
        {/* Mobile floating Continue button on break screens */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)] bg-gradient-to-t from-background via-background/95 to-background/0"
        >
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium active:scale-[0.98] transition-transform"
          >
            Continue
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sand flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <ProgressBar current={currentActualStep} total={totalActualQuestions} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-6 pb-20 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={questionId}
            initial={{ opacity: 0, x: slideDistance }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideDistance }}
            transition={{ duration: slideDuration, ease: "easeInOut" }}
            className="w-full max-w-2xl will-change-transform"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 text-balance max-w-xl mx-auto leading-tight">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto text-balance">
                  {question.subtitle}
                </p>
              )}
            </div>

            {/* Single select / Cards */}
            {(question.type === "cards" || question.type === "single") && displayOptions && (
              <div className={`grid gap-3 ${displayOptions.length <= 4 ? "grid-cols-1 max-w-lg mx-auto" :
                displayOptions.length >= 6 && displayOptions.every(o => o.description) ? "grid-cols-1 sm:grid-cols-2" :
                  question.type === "cards" ? "grid-cols-1 sm:grid-cols-2" :
                    "grid-cols-1 max-w-lg mx-auto"
                }`}>
                {displayOptions.map((option) => {
                  const isSelected = currentAnswer === option.label;
                  return (
                    <motion.button
                      key={option.label}
                      onClick={() => handleSelect(option.label)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 font-body ${isSelected
                        ? "border-transparent bg-gradient-hero shadow-glow text-primary-foreground"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-soft"
                        }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        {option.icon && (
                          <span className="text-xl flex-shrink-0">{option.icon}</span>
                        )}
                        <div className="flex-1">
                          <span className={`font-semibold block text-sm ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                            {option.label}
                          </span>
                          {option.description && (
                            <span className={`text-xs mt-0.5 block ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                              {option.description}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Body-select (visual body map) */}
            {question.type === "body-select" && question.options && (
              <div>
                <div className="relative max-w-sm mx-auto flex justify-center">
                  <div className="relative inline-block" style={{ lineHeight: 0 }}>
                    <img src={bodySelectWoman} alt="Body selection" className="h-[420px] md:h-[480px] w-auto block" width={400} height={480} loading="lazy" decoding="async" fetchPriority="low" style={{ backgroundColor: 'transparent' }} />
                    {/* Highlight overlays — positioned relative to visible image pixels */}
                    {/* Arms left */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Arms") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ left: "10%", top: "26%", width: "16%", height: "14%" }} />
                    {/* Arms right */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Arms") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ right: "10%", top: "26%", width: "16%", height: "14%" }} />
                    {/* Chest */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Chest") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ left: "26%", top: "22%", width: "48%", height: "10%" }} />
                    {/* Back */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Back") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ left: "28%", top: "30%", width: "44%", height: "8%" }} />
                    {/* Belly */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Belly") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ left: "30%", top: "37%", width: "40%", height: "11%" }} />
                    {/* Butt */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Butt") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ left: "28%", top: "48%", width: "44%", height: "9%" }} />
                    {/* Legs left */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Legs") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ left: "24%", top: "58%", width: "20%", height: "24%" }} />
                    {/* Legs right */}
                    <div className={`absolute pointer-events-none rounded-[50%] transition-all duration-300 ${multiSelected.includes("Legs") ? "bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.35)]" : ""}`}
                      style={{ right: "24%", top: "58%", width: "20%", height: "24%" }} />
                  </div>
                  {/* Labels positioned around the body */}
                  {question.options.map((option) => {
                    const isSelected = multiSelected.includes(option.label);
                    const positions: Record<string, string> = {
                      Arms: "absolute left-0 top-[28%]",
                      Chest: "absolute right-0 top-[22%]",
                      Back: "absolute left-0 top-[40%]",
                      Belly: "absolute right-0 top-[38%]",
                      Butt: "absolute left-0 top-[54%]",
                      Legs: "absolute right-0 top-[62%]",
                    };
                    return (
                      <motion.button
                        key={option.label}
                        onClick={() => handleMultiToggle(option.label)}
                        className={`${positions[option.label] || ""} px-5 py-2.5 rounded-xl border-2 text-sm font-body font-semibold transition-all duration-200 ${isSelected
                          ? "border-transparent bg-gradient-hero text-primary-foreground shadow-glow"
                          : "border-border bg-card text-foreground hover:border-primary/40 hover:shadow-soft"
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
                <motion.button
                  onClick={handleMultiSubmit}
                  disabled={multiSelected.length === 0}
                  className="hidden md:block mt-6 w-full max-w-lg mx-auto py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: multiSelected.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
                <div className="md:hidden h-24" aria-hidden="true" />
              </div>
            )}

            {/* Multi-select */}
            {question.type === "multi-select" && displayOptions && (
              <div>
                <div className={`grid gap-3 ${displayOptions.length > 6 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-lg mx-auto"
                  }`}>
                  {displayOptions.map((option) => {
                    const isSelected = multiSelected.includes(option.label);
                    return (
                      <motion.button
                        key={option.label}
                        onClick={() => handleMultiToggle(option.label)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 font-body ${isSelected
                          ? "border-transparent bg-gradient-hero shadow-glow text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40 hover:shadow-soft"
                          }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          {option.icon && (
                            <span className="text-xl flex-shrink-0">{option.icon}</span>
                          )}
                          <span className={`font-semibold text-sm flex-1 ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                            {option.label}
                          </span>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-primary-foreground border-primary-foreground" : "border-muted-foreground/30"
                            }`}>
                            {isSelected && <Check className="w-3 h-3 text-primary" />}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <motion.button
                  onClick={handleMultiSubmit}
                  disabled={multiSelected.length === 0}
                  className="hidden md:block mt-6 w-full max-w-lg mx-auto py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: multiSelected.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
                <div className="md:hidden h-24" aria-hidden="true" />
              </div>
            )}

            {/* Height picker */}
            {question.type === "height" && (
              <div className="max-w-sm mx-auto">
                <div className="flex items-end justify-center gap-4 mb-8">
                  <div className="text-center">
                    <label className="text-sm text-muted-foreground font-body mb-2 block">Feet</label>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-24 py-3 px-4 rounded-xl border-2 border-border bg-card text-foreground font-body text-xl text-center focus:border-primary focus:outline-none appearance-none"
                    >
                      {[4, 5, 6, 7].map((f) => (
                        <option key={f} value={f}>{f}'</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-center">
                    <label className="text-sm text-muted-foreground font-body mb-2 block">Inches</label>
                    <select
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-24 py-3 px-4 rounded-xl border-2 border-border bg-card text-foreground font-body text-xl text-center focus:border-primary focus:outline-none appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>{i}"</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="text-center text-muted-foreground font-body text-sm mb-6">
                  {Math.round((heightFeet * 12 + heightInches) * 2.54)} cm
                </div>
                <motion.button
                  onClick={handleHeightSubmit}
                  className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>

                <div className="mt-5 flex items-start gap-2 bg-muted/50 rounded-lg p-3">
                  <span className="text-lg flex-shrink-0">👍</span>
                  <div>
                    <p className="text-sm font-body font-semibold text-foreground">Calculating your body mass index</p>
                    <p className="text-xs font-body text-muted-foreground mt-0.5">The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Number input (e.g. age) */}
            {question.type === "number-input" && question.sliderConfig && (
              <div className="max-w-sm mx-auto">
                <div className="text-center mb-8">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={question.sliderConfig.min}
                    max={question.sliderConfig.max}
                    value={numberInputValue}
                    onChange={(e) => setNumberInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleNumberInputSubmit()}
                    className="w-32 text-center text-5xl font-display font-bold text-primary bg-transparent border-b-2 border-primary/40 focus:border-primary focus:outline-none py-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    placeholder={question.id === "age" ? "" : String(question.sliderConfig.defaultValue ?? "")}
                    autoFocus
                  />
                  <p className="text-muted-foreground font-body text-sm mt-2">{question.sliderConfig.unit}</p>
                </div>
                <motion.button
                  onClick={handleNumberInputSubmit}
                  disabled={!numberInputValue || parseInt(numberInputValue) < question.sliderConfig.min || parseInt(numberInputValue) > question.sliderConfig.max}
                  className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>

                {question.id === "age" && (
                  <div className="mt-5 flex items-start gap-2 bg-muted/50 rounded-lg p-3">
                    <span className="text-lg flex-shrink-0">👍</span>
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground">We ask your age to create your personal plan</p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">So your meals, portions, and schedule is tailored towards your metabolism and BMI.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Weight picker */}
            {question.type === "weight" && question.sliderConfig && (
              <div className="max-w-md mx-auto">
                <div className="flex justify-center gap-2 mb-6">
                  {(["lbs", "kg"] as const).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setWeightUnit(unit)}
                      className={`px-5 py-2 rounded-full font-body font-medium text-sm transition-all ${weightUnit === unit
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
                <div className="text-center mb-8">
                  <span className="text-5xl font-display font-bold text-primary">
                    {weightUnit === "lbs" ? sliderValue : Math.round(sliderValue / 2.205)}
                  </span>
                  <span className="text-2xl font-body text-muted-foreground ml-2">
                    {weightUnit}
                  </span>
                </div>
                <input
                  type="range"
                  min={question.sliderConfig.min}
                  max={question.sliderConfig.max}
                  step={question.sliderConfig.step}
                  value={sliderValue}
                  onChange={(e) => { setSliderValue(Number(e.target.value)); setSliderTouched(true); }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
                  style={{
								background: `linear-gradient(to right, #c25159 0%, #c25159 ${
								  ((sliderValue - question.sliderConfig.min) / 
								  (question.sliderConfig.max - question.sliderConfig.min)) * 100
								}%, #f3f4f6 ${
								  ((sliderValue - question.sliderConfig.min) / 
								  (question.sliderConfig.max - question.sliderConfig.min)) * 100
								}%, #f3f4f6 100%)`,
							  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground font-body mt-2">
                  <span>{weightUnit === "lbs" ? question.sliderConfig.min : Math.round(question.sliderConfig.min / 2.205)} {weightUnit}</span>
                  <span>{weightUnit === "lbs" ? question.sliderConfig.max : Math.round(question.sliderConfig.max / 2.205)} {weightUnit}</span>
                </div>
                {question.id === "goalWeight" && (() => {
                  const currentW = (quizState.answers.weight as number) || 180;
                  const goalW = weightUnit === "kg" ? Math.round(sliderValue * 2.205) : sliderValue;
                  const diff = currentW - goalW;
                  const pctLoss = Math.round((diff / currentW) * 100);
                  if (diff > 40) {
                    const displayLimit = weightUnit === "kg" ? 20 : 40;
                    return (
                      <p className="text-xs font-body text-destructive mt-4 text-center max-w-sm mx-auto">
                        ⚠️ Losing more than {displayLimit} {weightUnit} in a 3-month period is generally considered unsafe. We recommend setting a closer goal and adjusting over time.
                      </p>
                    );
                  }
                  if (sliderTouched && diff > 0 && pctLoss >= 5) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 flex items-start gap-2 rounded-lg p-3"
                        style={{ backgroundColor: "hsl(140 40% 95%)", borderColor: "hsl(140 40% 85%)", border: "1px solid hsl(140 40% 85%)" }}
                      >
                        <span className="text-lg flex-shrink-0">👍</span>
                        <div>
                          <p className="text-sm font-body font-semibold text-foreground">HEALTH BENEFITS: lose {pctLoss}% of your weight</p>
                          <p className="text-xs font-body text-muted-foreground mt-0.5">Studies have shown that losing 10% or more of your body weight can reduce your risk of some obesity-related conditions, such as heart attacks, high blood sugar, and inflammation in your blood vessels.</p>
                        </div>
                      </motion.div>
                    );
                  }
                  return null;
                })()}
                <motion.button
                  onClick={handleSliderSubmit}
                  className="mt-8 w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            )}

            {/* Text input (e.g. name) */}
            {question.type === "text-input" && (
              <div className="max-w-sm mx-auto">
                <input
                  type="text"
                  value={textInputValue}
                  onChange={(e) => setTextInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTextInputSubmit()}
                  placeholder={question.placeholder || ""}
                  autoFocus
                  className="w-full text-center text-xl font-body font-semibold text-foreground bg-card border-2 border-border rounded-xl py-4 px-4 mb-6 focus:border-primary focus:outline-none transition-colors"
                />
                <motion.button
                  onClick={handleTextInputSubmit}
                  disabled={textInputValue.trim().length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: textInputValue.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            )}

            {/* Agree / Disagree */}
            {question.type === "agree-disagree" && (
              <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
                {[
                  { label: "Agree", icon: "👍" },
                  { label: "Disagree", icon: "👎" },
                ].map((opt) => {
                  const isSelected = currentAnswer === opt.label;
                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => handleAgreeDisagree(opt.label)}
                      className={`p-6 rounded-xl border-2 text-center transition-all duration-200 font-body ${isSelected
                        ? "border-transparent bg-gradient-hero shadow-glow text-primary-foreground"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-soft text-foreground"
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-3xl mb-2">{opt.icon}</div>
                      <div className="text-base font-semibold">{opt.label}</div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Scale 1-5 */}
            {question.type === "scale-1-5" && (
              <div className="max-w-md mx-auto">
                <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const isSelected = currentAnswer === n;
                    return (
                      <motion.button
                        key={n}
                        onClick={() => handleScaleSelect(n)}
                        className={`aspect-square rounded-xl border-2 flex items-center justify-center text-2xl sm:text-3xl font-display font-bold transition-all ${isSelected
                          ? "border-transparent bg-gradient-hero shadow-glow text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40 hover:shadow-soft text-foreground"
                          }`}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {n}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs font-body text-muted-foreground px-1">
                  <span>Not very likely</span>
                  <span>Most likely</span>
                </div>
              </div>
            )}

            {/* Body image select (target zones) */}
            {question.type === "body-image-select" && question.options && (
              <div>
                <div className="grid grid-cols-1 max-w-md mx-auto gap-3">
                  {question.options.map((option) => {
                    const isSelected = multiSelected.includes(option.label);
                    const isMaleUser = ((quizState.answers.sex as string) || (quizState.answers.gender as string)) === "Male";
                    const photoMap: Record<string, { f: string; m: string }> = {
                      Legs: { f: zoneFemaleLegs, m: zoneMaleLegs },
                      Belly: { f: zoneFemaleBelly, m: zoneMaleBelly },
                      Arms: { f: zoneFemaleArms, m: zoneMaleArms },
                      Butt: { f: zoneFemaleButt, m: zoneMaleButt },
                      "Face and neck": { f: zoneFemaleFace, m: zoneMaleFace },
                    };
                    const photo = photoMap[option.label];
                    const photoSrc = photo ? (isMaleUser ? photo.m : photo.f) : undefined;
                    return (
                      <motion.button
                        key={option.label}
                        onClick={() => handleMultiToggle(option.label)}
                        className={`relative p-3 rounded-xl border-2 flex items-center gap-4 transition-all duration-200 font-body ${isSelected
                          ? "border-transparent bg-gradient-hero shadow-glow text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40 hover:shadow-soft"
                          }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${isSelected ? "ring-2 ring-primary-foreground/40" : "bg-muted"
                          }`}>
                          {photoSrc && (
                            <img
                              src={photoSrc}
                              alt={option.label}
                              loading="eager"
                              fetchPriority="high"
                              decoding="async"
                              width={512}
                              height={512}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className={`flex-1 text-left font-semibold text-base ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>
                          {option.label}
                        </span>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-primary-foreground border-primary-foreground" : "border-muted-foreground/30"
                          }`}>
                          {isSelected && <Check className="w-3 h-3 text-primary" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                <motion.button
                  onClick={handleMultiSubmit}
                  disabled={multiSelected.length === 0}
                  className="hidden md:block mt-6 w-full max-w-md mx-auto py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: multiSelected.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
                <div className="md:hidden h-24" aria-hidden="true" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile floating Continue — only for multi-select questions, appears once at least one option chosen */}
      <AnimatePresence>
        {(question.type === "multi-select" || question.type === "body-select" || question.type === "body-image-select") &&
          multiSelected.length > 0 && (
            <motion.div
              key="mobile-floating-continue"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] bg-gradient-to-t from-background via-background/95 to-background/0 pointer-events-none"
            >
              <button
                onClick={handleMultiSubmit}
                className="pointer-events-auto w-full max-w-lg mx-auto block py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-glow active:scale-[0.98] transition-transform"
              >
                Continue
              </button>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Subtle reassurance footer */}
      <footer className="mt-12 border-t border-border/40 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>All information you share is secure and confidential.</span>
        </div>
      </footer>
    </div>
  );
};

export default QuizFlow;
