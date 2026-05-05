import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmailCapture from "@/components/quiz/EmailCapture";
import SEO from "@/components/SEO";
import { trackVirtualPageview } from "@/lib/tracking";

const EmailCapturePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackVirtualPageview("/quiz/email");
  }, []);

  const handleSubmit = async (email: string, name: string) => {
    sessionStorage.setItem("quizEmail", email);
    sessionStorage.setItem("quizName", name);
    navigate("/results");
  };

  return (
    <>
      <SEO
        title="Get Your Results – Enter Your Email"
        description="Enter your email to unlock your personalized Hormone Reset Diet diet meal plan and weight loss projection."
        path="/email"
      />
      <EmailCapture mode="capture" onSubmit={handleSubmit} />
    </>
  );
};

export default EmailCapturePage;
