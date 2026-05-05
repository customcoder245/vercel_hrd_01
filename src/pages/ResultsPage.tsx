import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { scoreHormonePatterns, HormoneResult } from "@/lib/hormonePatterns";
import { track, trackVirtualPageview } from "@/lib/tracking";
import SEO from "@/components/SEO";
import FutureSelf from "@/components/quiz/results/FutureSelf";
import YourPlan from "@/components/quiz/results/YourPlan";
import PersonalizedPlan from "@/components/quiz/results/PersonalizedPlan";

type Screen = "profile" | "plan" | "final";
const screenOrder: Screen[] = ["profile", "plan", "final"];

const ResultsPageRoute = () => {
  const navigate = useNavigate();
  const initialScreen: Screen = (() => {
    if (typeof window === "undefined") return "profile";
    const s = new URLSearchParams(window.location.search).get("screen");
    if (s === "plan") return "plan";
    if (s === "final") return "final";
    return "profile";
  })();
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number> | null>(null);
  const [email, setEmail] = useState("");
  const [hormoneResult, setHormoneResult] = useState<HormoneResult | null>(null);

  useEffect(() => {
    try {
      const answersRaw = sessionStorage.getItem("quizAnswers");
      const storedEmail = sessionStorage.getItem("quizEmail") || "";

      if (!answersRaw) {
        navigate("/", { replace: true });
        return;
      }

      const parsed = JSON.parse(answersRaw);
      if (!parsed || typeof parsed !== "object") {
        navigate("/", { replace: true });
        return;
      }
      setAnswers(parsed);
      setEmail(storedEmail);

      setHormoneResult(scoreHormonePatterns(parsed));
    } catch {
      navigate("/", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const ansRaw = sessionStorage.getItem("quizAnswers");
        const email = sessionStorage.getItem("quizEmail") || "";
        const storedName = sessionStorage.getItem("quizName") || "";
        const parsedAnswers = JSON.parse(ansRaw);
        const weight = (parsedAnswers.weight as number) || 180;
        const goalWeight = (parsedAnswers.goalWeight as number) || 150;
        const heightInches = (parsedAnswers.height as number) || 66;
        const ageRaw = (parsedAnswers.age as string) || "40–49";
        const age = ageRaw.includes("Under") ? 35 : ageRaw.includes("70") ? 72 : parseInt(ageRaw) + 4 || 45;
        const gender = (parsedAnswers.gender as string) || "Female";
        const queryParams = new URLSearchParams({
          name: storedName,
          email: email,
          age: age.toString(),
          weight: weight.toString(),
          target_weight: goalWeight.toString(),
          height: heightInches.toString(),
          gender: gender,
        }).toString();
        const res = await fetch(`https://mediterraneanplan.com/add-to-member.php?${queryParams}`);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };
    fetchData();

    trackVirtualPageview(`/quiz/results/${initialScreen}`);
    track(`results_${initialScreen}_view`, `/quiz/results/${initialScreen}`);
  }, [initialScreen, navigate]);

  const goNext = useCallback(() => {
    const idx = screenOrder.indexOf(screen);
    if (idx < screenOrder.length - 1) {
      const next = screenOrder[idx + 1];
      setScreen(next);
      window.scrollTo({ top: 0, behavior: "instant" });
      trackVirtualPageview(`/quiz/results/${next}`);
      track(`results_${next}_view`, `/quiz/results/${next}`);
    }
  }, [screen]);

  if (!answers || !hormoneResult) return null;

  return (
    <main>
      <SEO
        title="Your Hormone Reset Diet Results"
        description="View your personalized metabolic profile, custom Hormone Reset Diet meal plan, and weight projection."
        path="/results"
      />
      <AnimatePresence mode="wait">
        {screen === "profile" && (
          <FutureSelf key="profile" answers={answers} hormoneResult={hormoneResult} onContinue={goNext} />
        )}
        {screen === "plan" && (
          <YourPlan key="plan" answers={answers} hormoneResult={hormoneResult} onContinue={goNext} />
        )}
        {screen === "final" && <PersonalizedPlan key="final" hormoneResult={hormoneResult} userEmail={email} />}
      </AnimatePresence>
    </main>
  );
};

export default ResultsPageRoute;
