import { useMemo } from "react";
import { quizQuestions } from "@/data/quizQuestions";
import { analysisQuestions } from "@/data/quizQuestions";

interface QuizEvent {
  id: string;
  session_id: string;
  event_name: string;
  page_path: string | null;
  question_index: number | null;
  question_id: string | null;
  question_label: string | null;
}

interface FunnelStep {
  key: string;
  label: string;
  type: "question" | "milestone";
  sessions: number;
}

const pct = (n: number, d: number) => (d === 0 ? "0%" : `${((n / d) * 100).toFixed(1)}%`);

const severityColor = (rate: number) => {
  if (rate >= 0.7) return "text-green-600 dark:text-green-400";
  if (rate >= 0.4) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

const severityBg = (rate: number) => {
  if (rate >= 0.7) return "bg-green-500/20";
  if (rate >= 0.4) return "bg-yellow-500/20";
  return "bg-red-500/20";
};

export const StepDropOff = ({ events }: { events: QuizEvent[] }) => {
  const steps: FunnelStep[] = useMemo(() => {
    // Build expected question list from quiz data (skip breaks)
    const allQuestions = quizQuestions.filter((q) => q.type !== "break");
    // Also include analysis questions that come after main quiz
    const analysisQs = analysisQuestions || [];

    // Collect session sets per question_index from step view events
    const stepViewSessions = new Map<number, Set<string>>();
    events
      .filter((e) => e.event_name === "quiz_step_view" && e.question_index != null)
      .forEach((e) => {
        const idx = e.question_index!;
        if (!stepViewSessions.has(idx)) stepViewSessions.set(idx, new Set());
        stepViewSessions.get(idx)!.add(e.session_id);
      });

    // Milestone session sets
    const milestoneSessions = (name: string, filter?: (e: QuizEvent) => boolean) => {
      const set = new Set<string>();
      events.filter((e) => e.event_name === name && (!filter || filter(e))).forEach((e) => set.add(e.session_id));
      return set.size;
    };

    // Page visitors = unique sessions that loaded the landing page
    const pageVisitors = milestoneSessions("page_view_virtual", (e) => e.page_path === "/" || e.page_path === "/quiz/start" || e.page_path === "/goal");
    // Quiz start = clicked gender select
    const startSessions = milestoneSessions("quiz_start");

    // Build funnel steps
    const result: FunnelStep[] = [];

    // Page Visitors (landed on page)
    result.push({
      key: "visitors",
      label: "Page Visitors",
      type: "milestone",
      sessions: pageVisitors,
    });

    // Quiz Start (gender selection)
    result.push({
      key: "start",
      label: "Quiz Start — Gender Select",
      type: "milestone",
      sessions: startSessions,
    });

    // Each actual question step
    let questionCounter = 0;
    quizQuestions.forEach((q, rawIndex) => {
      if (q.type === "break") return;
      questionCounter++;
      const sessions = stepViewSessions.get(rawIndex)?.size || 0;
      result.push({
        key: `q-${rawIndex}`,
        label: `Q${questionCounter}: ${q.title}`,
        type: "question",
        sessions,
      });
    });

    // Analysis questions (commitment, blocker) — they come after main quiz
    analysisQs.forEach((q, i) => {
      questionCounter++;
      // These are tracked with question_index = quizQuestions.length + i
      const idx = quizQuestions.length + i;
      const sessions = stepViewSessions.get(idx)?.size || 0;
      result.push({
        key: `aq-${i}`,
        label: `Q${questionCounter}: ${q.title}`,
        type: "question",
        sessions,
      });
    });

    // Projection page
    result.push({
      key: "projection",
      label: "Projection Page",
      type: "milestone",
      sessions: milestoneSessions("projection_view"),
    });

    // Email capture
    result.push({
      key: "email",
      label: "Email Capture",
      type: "milestone",
      sessions: milestoneSessions("email_submitted"),
    });

    // Results page
    result.push({
      key: "results",
      label: "Results Page",
      type: "milestone",
      sessions: milestoneSessions("results_view"),
    });

    // Final / Sales page
    result.push({
      key: "final",
      label: "Final / Sales Page",
      type: "milestone",
      sessions: milestoneSessions("final_page_view"),
    });

    // Order form
    result.push({
      key: "order",
      label: "Order Form",
      type: "milestone",
      sessions: milestoneSessions("order_form_view"),
    });

    // Purchase
    result.push({
      key: "purchase",
      label: "Purchase",
      type: "milestone",
      sessions: milestoneSessions("purchase"),
    });

    return result;
  }, [events]);

  const maxSessions = Math.max(...steps.map((s) => s.sessions), 1);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-sm font-display font-bold text-foreground mb-1">📊 Full Funnel Drop-Off</h3>
      <p className="text-[10px] text-muted-foreground mb-4">
        Every step from quiz start → purchase. Bar width = unique sessions. Red = high drop-off from previous step.
      </p>

      <div className="space-y-0">
        {steps.map((step, i) => {
          const prevSessions = i > 0 ? steps[i - 1].sessions : step.sessions;
          const retentionRate = prevSessions > 0 ? step.sessions / prevSessions : 1;
          const dropOff = prevSessions - step.sessions;
          const barWidth = Math.max((step.sessions / maxSessions) * 100, 2);
          const isMilestone = step.type === "milestone";

          return (
            <div key={step.key}>
              {/* Drop-off indicator between steps */}
              {i > 0 && dropOff > 0 && (
                <div className="flex items-center gap-2 py-0.5 pl-8">
                  <div className={`flex-1 h-px ${retentionRate >= 0.7 ? "bg-green-500/30" : retentionRate >= 0.4 ? "bg-yellow-500/30" : "bg-red-500/30"}`} />
                  <span className={`text-[9px] tabular-nums font-medium ${severityColor(retentionRate)}`}>
                    ↓ {dropOff} lost ({pct(dropOff, prevSessions)})
                  </span>
                </div>
              )}

              {/* Step row */}
              <div className={`flex items-center gap-2 py-1.5 ${isMilestone ? "" : ""}`}>
                {/* Step number / icon */}
                <div className={`w-6 shrink-0 text-center ${isMilestone ? "text-xs" : "text-[10px] font-mono text-muted-foreground"}`}>
                  {isMilestone ? (
                    step.key === "visitors" ? "👁" :
                    step.key === "start" ? "🚀" :
                    step.key === "projection" ? "📈" :
                    step.key === "email" ? "📧" :
                    step.key === "results" ? "📊" :
                    step.key === "final" ? "🎯" :
                    step.key === "order" ? "🛒" :
                    step.key === "purchase" ? "💰" : "•"
                  ) : (
                    ""
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs shrink-0 truncate ${
                    isMilestone
                      ? "font-display font-bold text-foreground w-48"
                      : "text-foreground/80 w-48"
                  }`}
                  title={step.label}
                >
                  {step.label}
                </span>

                {/* Bar */}
                <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-full rounded-full flex items-center justify-end pr-1.5 transition-all ${
                      isMilestone ? "bg-primary/80" : "bg-primary/50"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  >
                    <span className="text-[9px] text-primary-foreground font-medium whitespace-nowrap">
                      {step.sessions}
                    </span>
                  </div>
                </div>

                {/* Retention badge */}
                <div className="w-16 shrink-0 text-right">
                  {i > 0 ? (
                    <span className={`text-[10px] tabular-nums font-semibold px-1.5 py-0.5 rounded ${severityBg(retentionRate)} ${severityColor(retentionRate)}`}>
                      {pct(step.sessions, prevSessions)}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">—</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {steps.length <= 1 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No step view data yet. Complete a quiz to see data.
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <span className="flex items-center gap-1 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> ≥70% retained
        </span>
        <span className="flex items-center gap-1 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> 40–70%
        </span>
        <span className="flex items-center gap-1 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> &lt;40%
        </span>
        <span className="text-[10px] text-muted-foreground ml-auto">
          Unique sessions per step
        </span>
      </div>
    </div>
  );
};
