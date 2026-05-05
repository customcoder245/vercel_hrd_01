
-- Create quiz_events table for analytics tracking
CREATE TABLE public.quiz_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page_path TEXT,
  question_id TEXT,
  question_label TEXT,
  answer_value TEXT,
  age_band TEXT,
  primary_goal TEXT,
  core_symptom TEXT,
  urgency TEXT,
  commitment TEXT,
  weight_to_lose_bucket TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  gclid TEXT
);

-- Enable RLS
ALTER TABLE public.quiz_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (events come from the frontend without auth)
CREATE POLICY "Allow anonymous inserts"
ON public.quiz_events
FOR INSERT
TO anon
WITH CHECK (true);

-- No public SELECT - only service role can read (edge function for dashboard)
CREATE POLICY "Allow anon select for dashboard"
ON public.quiz_events
FOR SELECT
TO anon
USING (true);

-- Index for common queries
CREATE INDEX idx_quiz_events_session ON public.quiz_events (session_id);
CREATE INDEX idx_quiz_events_event_name ON public.quiz_events (event_name);
CREATE INDEX idx_quiz_events_created_at ON public.quiz_events (created_at DESC);
CREATE INDEX idx_quiz_events_utm_source ON public.quiz_events (utm_source);
CREATE INDEX idx_quiz_events_utm_campaign ON public.quiz_events (utm_campaign);
