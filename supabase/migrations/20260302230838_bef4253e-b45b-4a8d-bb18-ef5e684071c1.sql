
ALTER TABLE public.quiz_events
  ADD COLUMN IF NOT EXISTS question_index integer,
  ADD COLUMN IF NOT EXISTS answer_numeric double precision,
  ADD COLUMN IF NOT EXISTS answer_unit text,
  ADD COLUMN IF NOT EXISTS is_multi boolean;
