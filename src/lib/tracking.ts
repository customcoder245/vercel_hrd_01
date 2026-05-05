// Lazy-loaded Supabase client. Loading the client adds ~174 KB to the initial
// bundle, which we don't want on first paint. Tracking is fire-and-forget, so
// we can defer the import until the first event is sent.
let supabasePromise: Promise<typeof import("@/integrations/supabase/client").supabase> | null = null;
function getSupabase() {
  if (!supabasePromise) {
    supabasePromise = import("@/integrations/supabase/client").then((m) => m.supabase);
  }
  return supabasePromise;
}

// ─── Types ───
interface TrackingPayload {
  event: string;
  session_id: string;
  timestamp: string;
  page_path: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  question_index?: number;
  question_id?: string;
  question_label?: string;
  answer_value?: string;
  answer_numeric?: number;
  answer_unit?: string;
  is_multi?: boolean;
  age_band?: string;
  primary_goal?: string;
  core_symptom?: string;
  urgency?: string;
  commitment?: string;
  weight_to_lose_bucket?: string;
}

// ─── Session ───
function getOrCreateSessionId(): string {
  const key = "md_session_id";
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
      localStorage.setItem("md_first_seen", new Date().toISOString());
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

// ─── Attribution ───
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;

export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const hasAny = UTM_KEYS.some((k) => params.has(k));
    if (!hasAny) return;
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) localStorage.setItem(`md_${k}`, v);
    });
  } catch {
    // Storage unavailable (e.g. Safari private browsing)
  }
}

function getAttribution(): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  try {
    UTM_KEYS.forEach((k) => {
      out[k] = localStorage.getItem(`md_${k}`) || null;
    });
  } catch {
    UTM_KEYS.forEach((k) => { out[k] = null; });
  }
  return out;
}

// ─── Debug mode ───
let debugMode = false;
const debugLog: TrackingPayload[] = [];

export function setDebugMode(on: boolean) {
  debugMode = on;
}
export function getDebugLog() {
  return debugLog;
}

// ─── Bot detection ───
function isBot(): boolean {
  const ua = navigator.userAgent;
  if ((navigator as any).webdriver) return true;
  return /bot|crawl|spider|slurp|facebookexternalhit|bingpreview|linkedinbot|mediapartners|googlebot|baiduspider|yandex|duckduckbot|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot/i.test(ua);
}

// ─── Core track function ───
export function track(
  eventName: string,
  pagePath: string,
  extra: Partial<Omit<TrackingPayload, "event" | "session_id" | "timestamp" | "page_path">> = {}
) {
  if (isBot()) return;
  const sessionId = getOrCreateSessionId();
  const attribution = getAttribution();
  const payload: TrackingPayload = {
    event: eventName,
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    page_path: pagePath,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    gclid: attribution.gclid,
    ...extra,
  };

  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (debugMode) {
    console.log("[TRACKING]", payload);
    debugLog.push(payload);
    if (debugLog.length > 10) debugLog.shift();
  }

  // Write to DB (fire-and-forget). Defer the actual send until idle so it
  // never competes with the first paint or quiz-step transitions.
  const send = () => {
    getSupabase().then((supabase) => {
      supabase
        .from("quiz_events")
        .insert({
      session_id: payload.session_id,
      event_name: payload.event,
      page_path: payload.page_path,
      question_index: payload.question_index ?? null,
      question_id: payload.question_id || null,
      question_label: payload.question_label || null,
      answer_value: payload.answer_value || null,
      answer_numeric: payload.answer_numeric ?? null,
      answer_unit: payload.answer_unit || null,
      is_multi: payload.is_multi ?? null,
      age_band: payload.age_band || null,
      primary_goal: payload.primary_goal || null,
      core_symptom: payload.core_symptom || null,
      urgency: payload.urgency || null,
      commitment: payload.commitment || null,
      weight_to_lose_bucket: payload.weight_to_lose_bucket || null,
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_content: payload.utm_content,
      utm_term: payload.utm_term,
          gclid: payload.gclid,
        })
        .then(({ error }) => {
          if (error && debugMode) console.error("[TRACKING DB ERROR]", error);
        });
    });
  };

  if (typeof (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback === "function") {
    (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
      .requestIdleCallback(send, { timeout: 2000 });
  } else {
    setTimeout(send, 0);
  }
}

// ─── Virtual pageview helper ───
export function trackVirtualPageview(path: string) {
  track("page_view_virtual", path);
}

// ─── Quiz step view helper ───
export function trackStepView(questionIndex: number, questionId: string, questionLabel: string) {
  track("quiz_step_view", `/quiz/step/${questionIndex + 1}`, {
    question_index: questionIndex,
    question_id: questionId,
    question_label: questionLabel,
  });
}

// ─── Quiz answer helper ───
export function trackAnswer(opts: {
  questionIndex: number;
  questionId: string;
  questionLabel: string;
  value: string | string[] | number;
  isMulti?: boolean;
  unit?: string;
}) {
  const { questionIndex, questionId, questionLabel, value, isMulti, unit } = opts;
  const pagePath = `/quiz/step/${questionIndex + 1}`;

  // For multi-select: emit one event per selected option
  if (Array.isArray(value)) {
    value.forEach((v) => {
      track("quiz_question_answered", pagePath, {
        question_index: questionIndex,
        question_id: questionId,
        question_label: questionLabel,
        answer_value: v,
        is_multi: true,
      });
    });
    return;
  }

  // Numeric
  if (typeof value === "number") {
    track("quiz_question_answered", pagePath, {
      question_index: questionIndex,
      question_id: questionId,
      question_label: questionLabel,
      answer_value: `${value}${unit ? ` ${unit}` : ""}`,
      answer_numeric: value,
      answer_unit: unit || null,
      is_multi: false,
    });
    return;
  }

  // Single string
  track("quiz_question_answered", pagePath, {
    question_index: questionIndex,
    question_id: questionId,
    question_label: questionLabel,
    answer_value: value,
    is_multi: isMulti ?? false,
  });
}

// ─── Weight bucket helper ───
export function getWeightBucket(currentLbs: number, goalLbs: number): string {
  const diffLbs = currentLbs - goalLbs;
  const diffKg = diffLbs * 0.4536;
  if (diffKg < 3) return "<3kg";
  if (diffKg <= 8) return "3–8kg";
  if (diffKg <= 15) return "8–15kg";
  return "15kg+";
}

// ─── Legacy mapping for profile snapshot events ───
export const TRACKED_QUESTIONS: Record<string, string> = {
  age: "age_band",
  frustration: "primary_goal",
  bodyNow: "core_symptom",
  changeOnset: "urgency",
};

// Declare dataLayer on window
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}
