import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { track, setDebugMode, getDebugLog } from "@/lib/tracking";
import { Lock, RefreshCw, Bug, FlaskConical } from "lucide-react";
import { StepDropOff } from "@/components/dashboard/StepDropOff";
import { DebugEventLog } from "@/components/dashboard/DebugEventLog";

// ─── Types ───
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
  age_band: string | null;
  primary_goal: string | null;
  core_symptom: string | null;
  urgency: string | null;
  commitment: string | null;
  weight_to_lose_bucket: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
}

// Password is validated server-side via edge function

const DATE_RANGES = [
  { label: "Today", days: 1 },
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
  { label: "All time", days: 0 },
];

const pct = (num: number, den: number) => (den === 0 ? "0%" : `${((num / den) * 100).toFixed(1)}%`);

// ─── Password Gate ───
const PasswordGate = ({ onAuth }: { onAuth: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-4">
        <div className="text-center">
          <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <h1 className="text-xl font-display font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Enter password to continue</p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const { data, error } = await supabase.functions.invoke("dashboard-data", {
                body: { password: pw, dateRange: 0 },
              });
              if (error || !data?.data) {
                setError(true);
              } else {
                sessionStorage.setItem("dash_pw", pw);
                onAuth();
              }
            } catch {
              setError(true);
            }
          }}
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
          />
          {error && <p className="text-xs text-destructive mt-1">Incorrect password</p>}
          <button type="submit" className="mt-3 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───
const AnalyticsDashboard = () => {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem("dash_pw"));
  const [events, setEvents] = useState<QuizEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);
  const [debug, setDebug] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const pw = sessionStorage.getItem("dash_pw");
    if (!pw) { setLoading(false); setAuthed(false); return; }
    try {
      const { data, error } = await supabase.functions.invoke("dashboard-data", {
        body: { password: pw, dateRange },
      });
      if (error || !data?.data) {
        sessionStorage.removeItem("dash_pw");
        setAuthed(false);
      } else {
        setEvents((data.data as QuizEvent[]) || []);
      }
    } catch {
      sessionStorage.removeItem("dash_pw");
      setAuthed(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchEvents();
  }, [authed, dateRange]);

  // noindex for this page
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";
    return () => { meta.content = ""; };
  }, []);

  useEffect(() => {
    setDebugMode(debug);
  }, [debug]);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return <DashboardContent events={events} loading={loading} dateRange={dateRange} setDateRange={setDateRange} onRefresh={fetchEvents} debug={debug} setDebug={setDebug} />;
};

// ─── Typical Persona ───
const TypicalPersona = ({ events }: { events: QuizEvent[] }) => {
  const persona = useMemo(() => {
    const answers = events.filter((e) => e.event_name === "quiz_question_answered");
    if (answers.length === 0) return null;

    const mostCommon = (qId: string): string | null => {
      const relevant = answers.filter((e) => e.question_id === qId && e.answer_value);
      if (relevant.length === 0) return null;
      const counts = new Map<string, number>();
      relevant.forEach((e) => {
        const v = e.answer_value!;
        counts.set(v, (counts.get(v) || 0) + 1);
      });
      let best = "";
      let bestCount = 0;
      counts.forEach((c, v) => { if (c > bestCount) { best = v; bestCount = c; } });
      return best || null;
    };

    const avgNumeric = (qId: string): number | null => {
      const relevant = answers.filter((e) => e.question_id === qId && e.answer_numeric != null);
      if (relevant.length === 0) return null;
      const sum = relevant.reduce((s, e) => s + (e.answer_numeric || 0), 0);
      return Math.round(sum / relevant.length);
    };

    const age = avgNumeric("age");
    const weight = avgNumeric("weight");
    const goalWeight = avgNumeric("goalWeight");
    const height = avgNumeric("height");
    const frustration = mostCommon("frustration");
    const changeOnset = mostCommon("changeOnset");
    const bodyNow = mostCommon("bodyNow");
    const bodyChangeArea = mostCommon("bodyChangeArea");
    const sleepPattern = mostCommon("sleepPattern");
    const activity = mostCommon("activity");
    const metabolismFeel = mostCommon("metabolismFeel");
    const cravingsTiming = mostCommon("cravingsTiming");
    const mealsPerDay = mostCommon("mealsPerDay");

    const weightToLose = weight && goalWeight ? weight - goalWeight : null;
    const totalAnswerers = new Set(answers.map((e) => e.session_id)).size;

    return {
      age, weight, goalWeight, height, weightToLose,
      frustration, changeOnset, bodyNow, bodyChangeArea,
      sleepPattern, activity, metabolismFeel, cravingsTiming, mealsPerDay,
      totalAnswerers,
    };
  }, [events]);

  if (!persona || !persona.age) return null;

  const p = persona;
  const weightUnit = events.find((e) => e.question_id === "weight" && e.answer_unit)?.answer_unit || "lbs";
  const heightFt = p.height ? Math.floor(p.height / 12) : null;
  const heightIn = p.height ? p.height % 12 : null;

  return (
    <Section title="👤 Typical Quiz Taker">
      <div className="space-y-3">
        <p className="text-sm text-foreground leading-relaxed">
          Based on <span className="font-semibold">{p.totalAnswerers} sessions</span>, the average person taking the quiz is a{" "}
          <span className="font-semibold">{p.age}-year-old woman</span>
          {heightFt != null && <>, <span className="font-semibold">{heightFt}'{heightIn}"</span> tall</>}
          {p.weight && <>, currently weighing <span className="font-semibold">{p.weight} {weightUnit}</span></>}
          {p.goalWeight && <> with a goal weight of <span className="font-semibold">{p.goalWeight} {weightUnit}</span></>}
          {p.weightToLose != null && p.weightToLose > 0 && <> (wanting to lose <span className="font-semibold">{p.weightToLose} {weightUnit}</span>)</>}
          .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {p.frustration && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Top frustration:</span>{" "}
              <span className="text-foreground font-medium">{p.frustration}</span>
            </div>
          )}
          {p.bodyNow && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Body description:</span>{" "}
              <span className="text-foreground font-medium">{p.bodyNow}</span>
            </div>
          )}
          {p.changeOnset && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Changes started:</span>{" "}
              <span className="text-foreground font-medium">{p.changeOnset}</span>
            </div>
          )}
          {p.bodyChangeArea && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Main change area:</span>{" "}
              <span className="text-foreground font-medium">{p.bodyChangeArea}</span>
            </div>
          )}
          {p.activity && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Activity level:</span>{" "}
              <span className="text-foreground font-medium">{p.activity}</span>
            </div>
          )}
          {p.metabolismFeel && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Metabolism feels:</span>{" "}
              <span className="text-foreground font-medium">{p.metabolismFeel}</span>
            </div>
          )}
          {p.sleepPattern && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Sleep pattern:</span>{" "}
              <span className="text-foreground font-medium">{p.sleepPattern}</span>
            </div>
          )}
          {p.cravingsTiming && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Cravings timing:</span>{" "}
              <span className="text-foreground font-medium">{p.cravingsTiming}</span>
            </div>
          )}
          {p.mealsPerDay && (
            <div className="bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">Preferred meals/day:</span>{" "}
              <span className="text-foreground font-medium">{p.mealsPerDay}</span>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

// ─── Dashboard Content ───
interface DashContentProps {
  events: QuizEvent[];
  loading: boolean;
  dateRange: number;
  setDateRange: (d: number) => void;
  onRefresh: () => void;
  debug: boolean;
  setDebug: (d: boolean) => void;
}

const DashboardContent = ({ events, loading, dateRange, setDateRange, onRefresh, debug, setDebug }: DashContentProps) => {
  const uniqueSessions = (name: string, filter?: (e: QuizEvent) => boolean) => {
    const set = new Set<string>();
    events.filter((e) => e.event_name === name && (!filter || filter(e))).forEach((e) => set.add(e.session_id));
    return set.size;
  };
  // Count visitors from all entry points: landing page, legacy path, first quiz step, or quiz_start
  const pageVisitors = (() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (
        (e.event_name === "page_view_virtual" && (e.page_path === "/" || e.page_path === "/quiz/start" || e.page_path === "/quiz/step/1" || e.page_path === "/goal")) ||
        e.event_name === "quiz_start"
      ) {
        set.add(e.session_id);
      }
    });
    return set.size;
  })();
  const starts = uniqueSessions("quiz_start");
  const projections = uniqueSessions("projection_view");
  const emails = uniqueSessions("email_submitted");
  const results = uniqueSessions("results_view");
  const finalViews = uniqueSessions("final_page_view");
  const orderViews = uniqueSessions("order_form_view");
  const purchases = uniqueSessions("purchase");

  // Campaign table
  const campaigns = useMemo(() => {
    const map = new Map<string, { visitors: Set<string>; starts: Set<string>; results: number; orders: number; purchases: number }>();
    events.forEach((e) => {
      const key = `${e.utm_source || "(direct)"} / ${e.utm_campaign || "(none)"}`;
      if (!map.has(key)) map.set(key, { visitors: new Set(), starts: new Set(), results: 0, orders: 0, purchases: 0 });
      const c = map.get(key)!;
      if (
        (e.event_name === "page_view_virtual" && (e.page_path === "/" || e.page_path === "/quiz/start" || e.page_path === "/quiz/step/1" || e.page_path === "/goal")) ||
        e.event_name === "quiz_start"
      ) c.visitors.add(e.session_id);
      if (e.event_name === "quiz_start") c.starts.add(e.session_id);
      if (e.event_name === "results_view") c.results++;
      if (e.event_name === "order_form_view") c.orders++;
      if (e.event_name === "purchase") c.purchases++;
    });
    return Array.from(map.entries())
      .map(([key, v]) => ({ key, visitors: v.visitors.size, starts: v.starts.size, results: v.results, orders: v.orders, purchases: v.purchases }))
      .sort((a, b) => b.visitors - a.visitors || b.starts - a.starts);
  }, [events]);

  // Breakdown helper
  const breakdownFor = (field: keyof QuizEvent) => {
    const profileEvents = events.filter((e) => e.event_name === "quiz_profile_created" && e[field]);
    const purchaseEvents = events.filter((e) => e.event_name === "purchase");
    const purchaseSessions = new Set(purchaseEvents.map((e) => e.session_id));

    const map = new Map<string, { count: number; purchased: number }>();
    profileEvents.forEach((e) => {
      const val = e[field] as string;
      if (!map.has(val)) map.set(val, { count: 0, purchased: 0 });
      const c = map.get(val)!;
      c.count++;
      if (purchaseSessions.has(e.session_id)) c.purchased++;
    });
    return Array.from(map.entries())
      .map(([value, v]) => ({ value, ...v }))
      .sort((a, b) => b.count - a.count);
  };

  const funnelStages = [
    { label: "Page Visitors", count: pageVisitors },
    { label: "Quiz Starts (Gender Select)", count: starts },
    { label: "Projection Page", count: projections },
    { label: "Email Capture", count: emails },
    { label: "Results Page", count: results },
    { label: "Final / Sales Page", count: finalViews },
    { label: "Order Form Views", count: orderViews },
    { label: "Purchases", count: purchases },
  ];
  const funnelMax = Math.max(pageVisitors, 1);

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-lg font-display font-bold text-foreground">📊 Quiz Analytics</h1>
          <div className="flex items-center gap-2 flex-wrap">
            {DATE_RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDateRange(r.days)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  dateRange === r.days ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {r.label}
              </button>
            ))}
            <button onClick={onRefresh} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Refresh">
              <RefreshCw className={`w-4 h-4 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setDebug(!debug)}
              className={`p-2 rounded-lg transition-colors ${debug ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
              title="Debug mode"
            >
              <Bug className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Typical Quiz Taker Persona */}
        <TypicalPersona events={events} />

        {/* KPI Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPITile label="Page Visitors" value={pageVisitors} sub="Landed on page" />
          <KPITile label="Quiz Starts" value={starts} sub={`${pct(starts, pageVisitors)} of visitors`} />
          <KPITile label="Projection" value={projections} sub={`${pct(projections, starts)} of starts`} />
          <KPITile label="Email Capture" value={emails} sub={`${pct(emails, projections)} of projections`} />
          <KPITile label="Results Page" value={results} sub={`${pct(results, emails)} of emails`} />
          <KPITile label="Final / Sales" value={finalViews} sub={`${pct(finalViews, results)} of results`} />
          <KPITile label="Order Form" value={orderViews} sub={`${pct(orderViews, finalViews)} of final`} />
          <KPITile label="Purchases" value={purchases} sub={`CVR: ${pct(purchases, starts)}`} />
        </div>

        {/* Funnel */}
        <Section title="Funnel">
          <div className="space-y-2">
            {funnelStages.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-32 shrink-0">{s.label}</span>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-primary/80 rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${Math.max((s.count / funnelMax) * 100, 2)}%` }}
                  >
                    <span className="text-[10px] text-primary-foreground font-medium">{s.count}</span>
                  </div>
                </div>
                {i > 0 && (
                  <span className="text-xs text-muted-foreground w-14 text-right">
                    {pct(s.count, funnelStages[i - 1].count)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Campaign Performance */}
        <Section title="Campaign Performance">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-2">Source / Campaign</th>
                  <th className="text-right py-2 px-2">Visitors</th>
                  <th className="text-right py-2 px-2">Starts</th>
                  <th className="text-right py-2 px-2">Start %</th>
                  <th className="text-right py-2 px-2">Results</th>
                  <th className="text-right py-2 px-2">Orders</th>
                  <th className="text-right py-2 px-2">Purchases</th>
                  <th className="text-right py-2 px-2">CVR</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.key} className="border-b border-border/50">
                    <td className="py-2 px-2 text-foreground font-medium">{c.key}</td>
                    <td className="text-right py-2 px-2 text-foreground">{c.visitors}</td>
                    <td className="text-right py-2 px-2 text-foreground">{c.starts}</td>
                    <td className="text-right py-2 px-2 text-foreground">{pct(c.starts, c.visitors)}</td>
                    <td className="text-right py-2 px-2 text-foreground">{c.results}</td>
                    <td className="text-right py-2 px-2 text-foreground">{c.orders}</td>
                    <td className="text-right py-2 px-2 text-foreground">{c.purchases}</td>
                    <td className="text-right py-2 px-2 text-foreground">{pct(c.purchases, c.visitors)}</td>
                  </tr>
                ))}
                {campaigns.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-4 text-muted-foreground">No campaign data yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Step Drop-Off */}
        <StepDropOff events={events as any} />


        {/* Debug Event Log */}
        <DebugEventLog events={events as any} />

        {/* Breakdown Tables */}
        <div className="grid md:grid-cols-2 gap-4">
          <BreakdownTable title="Age Band" data={breakdownFor("age_band")} />
          <BreakdownTable title="Primary Goal" data={breakdownFor("primary_goal")} />
          <BreakdownTable title="Core Symptom" data={breakdownFor("core_symptom")} />
          <BreakdownTable title="Urgency" data={breakdownFor("urgency")} />
          <BreakdownTable title="Commitment" data={breakdownFor("commitment")} />
          <BreakdownTable title="Weight to Lose" data={breakdownFor("weight_to_lose_bucket")} />
        </div>

        {/* Recent Events Feed */}
        <Section title="Recent Events (last 200)">
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-2">Time</th>
                  <th className="text-left py-2 px-2">Session</th>
                  <th className="text-left py-2 px-2">Event</th>
                  <th className="text-left py-2 px-2">Path</th>
                  <th className="text-left py-2 px-2">Campaign</th>
                  <th className="text-left py-2 px-2">gclid</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 200).map((e) => (
                  <tr key={e.id} className="border-b border-border/30 hover:bg-muted/30">
                    <td className="py-1.5 px-2 text-muted-foreground whitespace-nowrap">
                      {new Date(e.created_at).toLocaleString()}
                    </td>
                    <td className="py-1.5 px-2 text-foreground font-mono">{e.session_id?.slice(0, 8)}</td>
                    <td className="py-1.5 px-2 text-foreground font-medium">{e.event_name}</td>
                    <td className="py-1.5 px-2 text-muted-foreground">{e.page_path}</td>
                    <td className="py-1.5 px-2 text-muted-foreground">{e.utm_campaign || "–"}</td>
                    <td className="py-1.5 px-2 text-muted-foreground font-mono">{e.gclid?.slice(0, 8) || "–"}</td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-4 text-muted-foreground">No events yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Debug Panel */}
        {debug && (
          <Section title="🐛 Debug Panel">
            <div className="space-y-3">
              <button
                onClick={() => {
                  track("test_event", "/data", { question_id: "test", answer_value: "test_value" });
                  setTimeout(() => onRefresh(), 1000);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                <FlaskConical className="w-4 h-4" />
                Fire Test Event
              </button>
              <div>
                <h4 className="text-xs text-muted-foreground mb-1">Last 10 dataLayer pushes:</h4>
                <pre className="text-[10px] bg-muted rounded-lg p-3 overflow-x-auto max-h-64 text-foreground">
                  {JSON.stringify(getDebugLog(), null, 2) || "No events yet. Enable debug mode and interact with the quiz."}
                </pre>
              </div>
            </div>
          </Section>
        )}

        <p className="text-xs text-muted-foreground text-center pb-4">
          <span>{events.length}</span> events loaded
        </p>
      </div>
    </div>
  );
};

// ─── Helper Components ───
const KPITile = ({ label, value, sub }: { label: string; value: number; sub?: string }) => (
  <div className="bg-card border border-border rounded-xl p-4">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-2xl font-display font-bold text-foreground">{value}</p>
    {sub && <p className="text-xs text-primary mt-1">{sub}</p>}
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-xl p-4">
    <h3 className="text-sm font-display font-bold text-foreground mb-3">{title}</h3>
    {children}
  </div>
);

const BreakdownTable = ({ title, data }: { title: string; data: { value: string; count: number; purchased: number }[] }) => (
  <Section title={title}>
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-border text-muted-foreground">
          <th className="text-left py-1.5">Value</th>
          <th className="text-right py-1.5">Count</th>
          <th className="text-right py-1.5">Purchased</th>
          <th className="text-right py-1.5">Rate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.value} className="border-b border-border/30">
            <td className="py-1.5 text-foreground">{r.value}</td>
            <td className="text-right py-1.5 text-foreground">{r.count}</td>
            <td className="text-right py-1.5 text-foreground">{r.purchased}</td>
            <td className="text-right py-1.5 text-primary font-medium">{pct(r.purchased, r.count)}</td>
          </tr>
        ))}
        {data.length === 0 && <tr><td colSpan={4} className="text-center py-3 text-muted-foreground">No data</td></tr>}
      </tbody>
    </table>
  </Section>
);


export default AnalyticsDashboard;
