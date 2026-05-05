import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizState } from "@/types/quiz";
import { quizQuestions, slugToIndex } from "@/data/quizQuestions";
import QuizFlow from "@/components/quiz/QuizFlow";
import EmailCapture from "@/components/quiz/EmailCapture";
import SEO from "@/components/SEO";
import { captureAttribution, track, trackVirtualPageview, getWeightBucket } from "@/lib/tracking";

const QuizPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  // Derive currentStep from slug
  const currentStep = slug ? (slugToIndex.get(slug) ?? 0) : 0;

  // If user lands on a quiz slug without having answered sex, redirect to landing
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("quizAnswers");
      const answers = stored ? JSON.parse(stored) : {};
      if (!answers.sex) {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  // Load answers from sessionStorage on mount
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>(() => {
    try {
      const stored = sessionStorage.getItem("quizAnswers");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const quizState: QuizState = useMemo(() => ({
    currentStep,
    answers,
    email: "",
    name: "",
    completed: false,
  }), [currentStep, answers]);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const question = quizQuestions[currentStep];
    trackVirtualPageview(`/${question.slug}`);
    if (currentStep === 0) {
      track("quiz_start", `/${question.slug}`);
    }
  }, [currentStep]);

  const handleAnswer = useCallback((questionId: string, value: string | string[] | number) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      sessionStorage.setItem("quizAnswers", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleQuizNext = useCallback(() => {
    if (currentStep >= quizQuestions.length - 1) {
      // Quiz complete — go to analyzing
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));

      const currentWeight = answers.weight as number;
      const goalWeight = answers.goalWeight as number;
      if (currentWeight && goalWeight) {
        const bucket = getWeightBucket(currentWeight, goalWeight);
        track("quiz_weight_intent", "/analyzing", { weight_to_lose_bucket: bucket });
      }

      navigate("/analyzing");
    } else {
      const nextSlug = quizQuestions[currentStep + 1].slug;
      navigate(`/${nextSlug}`);
    }
  }, [currentStep, answers, navigate]);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [currentStep]);

  const handleQuizBack = useCallback(() => {
    if (currentStep === 0) {
      navigate("/");
      return;
    }
    const prevSlug = quizQuestions[currentStep - 1].slug;
    navigate(`/${prevSlug}`);
  }, [currentStep, navigate]);

  const liveCount = useMemo(() => Math.floor(Math.random() * 81) + 20, []);

  const question = quizQuestions[currentStep];

  return (
    <main>
      <SEO
        title="Hormone Reset Diet Quiz – Your Personalized Plan"
        description="Answer a few quick questions about your eating habits, goals, and lifestyle to get a personalized Hormone Reset Diet meal plan."
        path={`/${question.slug}`}
      />
      <QuizFlow
        quizState={quizState}
        onAnswer={handleAnswer}
        onBack={handleQuizBack}
        onComplete={handleQuizNext}
        liveCount={liveCount}
      />
    </main>
  );
};

export default QuizPage;
