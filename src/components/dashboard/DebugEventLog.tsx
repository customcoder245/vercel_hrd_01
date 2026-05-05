import { useMemo, useState } from "react";

interface QuizEvent {
  id: string;
  created_at: string;
  session_id: string;
  event_name: string;
  page_path: string;
  question_index: number | null;
  question_id: string | null;
  question_label: string | null;
  answer_value: string | null;
  answer_numeric: number | null;
  answer_unit: string | null;
  is_multi: boolean | null;
}

export const DebugEventLog = ({ events }: { events: QuizEvent[] }) => {
  const [filter, setFilter] = useState<"all" | "step" | "answer">("all");

  const filtered = useMemo(() => {
    const relevant = events.filter((e) =>
      e.event_name === "quiz_step_view" || e.event_name === "quiz_question_answered"
    );
    if (filter === "step") return relevant.filter((e) => e.event_name === "quiz_step_view");
    if (filter === "answer") return relevant.filter((e) => e.event_name === "quiz_question_answered");
    return relevant;
  }, [events, filter]);

  const shown = filtered.slice(0, 200);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h3 className="text-sm font-display font-bold text-foreground">🔍 Step & Answer Event Log (last 200)</h3>
        <div className="flex gap-1">
          {(["all", "step", "answer"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] px-2 py-1 rounded transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f === "all" ? "All" : f === "step" ? "Step Views" : "Answers"}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="w-full text-[10px]">
          <thead className="sticky top-0 bg-card">
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-1.5 px-1">Time</th>
              <th className="text-left py-1.5 px-1">Session</th>
              <th className="text-left py-1.5 px-1">Event</th>
              <th className="text-right py-1.5 px-1">#</th>
              <th className="text-left py-1.5 px-1">Question ID</th>
              <th className="text-left py-1.5 px-1">Label</th>
              <th className="text-left py-1.5 px-1">Answer</th>
              <th className="text-right py-1.5 px-1">Numeric</th>
              <th className="text-left py-1.5 px-1">Unit</th>
              <th className="text-center py-1.5 px-1">Multi</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((e) => (
              <tr key={e.id} className="border-b border-border/20 hover:bg-muted/20">
                <td className="py-1 px-1 text-muted-foreground whitespace-nowrap">{new Date(e.created_at).toLocaleTimeString()}</td>
                <td className="py-1 px-1 text-foreground font-mono">{e.session_id?.slice(0, 8)}</td>
                <td className="py-1 px-1">
                  <span className={`inline-block px-1 py-0.5 rounded text-[9px] font-medium ${
                    e.event_name === "quiz_step_view" ? "bg-blue-500/10 text-blue-600" : "bg-green-500/10 text-green-600"
                  }`}>
                    {e.event_name === "quiz_step_view" ? "STEP" : "ANSWER"}
                  </span>
                </td>
                <td className="text-right py-1 px-1 text-foreground font-mono">{e.question_index != null ? e.question_index + 1 : "–"}</td>
                <td className="py-1 px-1 text-foreground font-mono">{e.question_id || "–"}</td>
                <td className="py-1 px-1 text-muted-foreground max-w-[120px] truncate">{e.question_label || "–"}</td>
                <td className="py-1 px-1 text-foreground max-w-[100px] truncate">{e.answer_value || "–"}</td>
                <td className="text-right py-1 px-1 text-foreground tabular-nums">{e.answer_numeric != null ? e.answer_numeric : "–"}</td>
                <td className="py-1 px-1 text-muted-foreground">{e.answer_unit || "–"}</td>
                <td className="text-center py-1 px-1 text-muted-foreground">{e.is_multi ? "✓" : "–"}</td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan={10} className="text-center py-4 text-muted-foreground">No step/answer events yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">{filtered.length} events found, showing first 200</p>
    </div>
  );
};
