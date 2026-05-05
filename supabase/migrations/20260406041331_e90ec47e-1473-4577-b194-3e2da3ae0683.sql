
-- 1. Explicitly deny SELECT for anon and authenticated roles
-- (No SELECT policy = default deny with RLS enabled, but being explicit is safer)
CREATE POLICY "Deny all reads for anon"
ON public.quiz_events
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny all reads for authenticated"
ON public.quiz_events
FOR SELECT
TO authenticated
USING (false);

-- 2. Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.quiz_events;

-- 3. Create a tighter INSERT policy with basic validation constraints
CREATE POLICY "Allow validated anonymous inserts"
ON public.quiz_events
FOR INSERT
TO anon
WITH CHECK (
  -- event_name must be one of the known events
  event_name IN (
    'page_view_virtual',
    'quiz_start',
    'quiz_step_view',
    'quiz_question_answered',
    'quiz_complete',
    'email_submitted',
    'results_view',
    'offer_view',
    'purchase_click',
    'purchase',
    'analyzing_start',
    'analyzing_complete',
    'popup_answered',
    'results_screen_view',
    'results_continue',
    'profile_snapshot'
  )
  -- session_id must be UUID-like length
  AND length(session_id) BETWEEN 36 AND 36
  -- text fields must have reasonable length limits
  AND (page_path IS NULL OR length(page_path) <= 200)
  AND (question_id IS NULL OR length(question_id) <= 100)
  AND (question_label IS NULL OR length(question_label) <= 200)
  AND (answer_value IS NULL OR length(answer_value) <= 500)
  AND (utm_source IS NULL OR length(utm_source) <= 200)
  AND (utm_medium IS NULL OR length(utm_medium) <= 200)
  AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
  AND (utm_content IS NULL OR length(utm_content) <= 200)
  AND (utm_term IS NULL OR length(utm_term) <= 200)
  AND (gclid IS NULL OR length(gclid) <= 200)
);
