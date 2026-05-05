import { Check } from "lucide-react";

interface Props {
  current: 1 | 2 | 3;
}

const steps = [
  { n: 1, label: "Your Results" },
  { n: 2, label: "Your Plan" },
  { n: 3, label: "Pricing Plans" },
];

const ResultsStepper = ({ current }: Props) => {
  return (
    <div className="w-full bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {steps.map((s, i) => {
            const isActive = s.n === current;
            const isComplete = s.n < current;
            return (
              <div key={s.n} className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-display font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isComplete
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isComplete ? <Check className="w-3.5 h-3.5" /> : s.n}
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-display font-semibold truncate ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block flex-1 h-px bg-border ml-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsStepper;
