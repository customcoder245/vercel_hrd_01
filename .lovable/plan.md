

## Reorder Quiz, Add New Breaks, Replace Final Calculation

I'll restructure the entire quiz flow to match the order in your PDF, add the new questions, insert new break screens, move the projection graph mid-quiz, and rebuild the final calculation/analyzing screen with the 4-bar progress format you referenced.

### New Quiz Order

```
Landing  → Gender (existing)
Q1  → Weight loss goal               (was Q3, moved up)
Q2  → Biggest difference right now   ★ NEW question
BREAK 1 → Trusted hands              (existing)
Q3  → Age
Q4  → Height
Q5  → Current weight
Q6  → Goal weight
Q7  → Activity level                 (moved earlier)
BREAK 2 → Personal Profile           ★ REWORKED (per "Your starting point" mock: BMI gauge + Body type / Target zones / Lifestyle / Diet type)
Q8  → Past results pattern           ★ NEW (multi-choice: "Yes multiple times" etc.)
Q9  → Past diets tried
Q10 → Med Diet familiarity
BREAK 3 → "It's not a diet" info     (existing whatIsGlp1)
Q11 → Name input                     ★ NEW (text input)
BREAK 4 → Weight projection graph    ★ MOVED here from /projection page
Q12 → Target zones (body areas)      ★ NEW body-image-select layout (matches mock)
BREAK 5 → "80% of users have reduced…"  ★ NEW (personalised by age + sex)
Q13 → Dietary preferences
Q14 → Meals per day
Q15 → Diet balance                   ★ NEW
BREAK 6 → "Mediterranean stabilises hunger & energy"  ★ NEW transitional break
Q16 → Proteins
Q17 → Vegetables
Q18 → Carbs
BREAK 7 → Calculating (existing analysingInputs)
BREAK 8 → Before/After (existing beforeAfter)
Q19 → Sweet tooth
Q20 → Eat out
Q21 → Alcohol
Q22 → Water intake                   ★ NEW
BREAK 9 → "We're building your perfect plan" + phone mockup  ★ NEW
Q23 → Energy levels
Q24 → Hunger levels
Q25 → Sleep
Q26 → Activity check-in              (note: kept as separate question per PDF ordering)
BREAK 10 → Health Score / Weight loss blockers  ★ REWORKED to match mock (4 ranked blockers with % bars)
Q27 → Other health conditions        (existing healthConcerns moved later)
Q28 → Weight loss medications        (existing glp1Medication moved later)
BREAK 11 → "Thanks for sharing"      ★ NEW transitional
Q29 → Agree/disagree: weight affects confidence  ★ NEW
Q30 → Agree/disagree: feel stuck     ★ NEW
Q31 → Agree/disagree: ready for change ★ NEW
FINAL CALCULATION SCREEN ★ REBUILT (4 sequential progress bars):
   1. Analyzing Your Metabolism & Body Type
   2. Calculating Your Ideal Fat-Burning Zone
   3. Personalizing Your Mediterranean Meal Strategy
   4. Generating Your Personal Mediterranean Plan
   + "Trusted by 527,348 clients" + rotating testimonial
→ Email capture → Results
```

### New Components & Files

**New question types in `src/types/quiz.ts`:**
- `text-input` — for the Name question
- `agree-disagree` — for the 3 final statements (renders as a 5-point scale or two-button card)
- `body-image-select` — image-based multi-select for Target zones (cleaner than current body-overlay approach for face/neck/legs/butt)

**New break types in `BreakScreens.tsx`:**
- `personalProfile` — replaces existing `bmi` break, follows the "Your starting point" mock exactly (BMI gradient bar + risks card + Body Type / Target Zones / Lifestyle / Diet Type rows)
- `projectionInline` — wraps the existing `/projection` chart logic so it renders mid-quiz
- `eightyPercent` — "80% of {women|men} aged {bucket} have reduced weight on this plan" with personalised copy
- `mediterraneanStabilises` — short transitional info card
- `buildingPlan` — phone mockup illustration + "We're building you the perfect plan"
- `weightLossBlockers` — replaces existing `healthSnapshot`; renders the 4 ranked blockers (Emotional Eating / Stress & Overload / Self-criticism / Fear of failure) with % bars derived from quiz answers, plus an explainer card for the top blocker
- `thanksForSharing` — short transitional break

**New page: `src/pages/BuildingPlanPage.tsx`** (replaces current `/analyzing` content)
- 4 stacked progress bars that fill sequentially (Body Params 100% → Meals & Activity → Health & Safety → Generating Plan)
- Each bar takes ~2.5s, total ~10s
- Below: "Trusted by 527,348 clients" + 5-star testimonial card that rotates 2-3 quotes
- On completion → navigates to `/email`

**Routing changes in `App.tsx`:**
- `/projection` route removed (graph now lives inside the quiz as a break)
- `/analyzing` keeps its path but renders the new 4-bar `BuildingPlanPage`
- Old `EmailCapture` "analyzing" mode becomes unused on the analyzing page (kept available for legacy)

### Question Logic Notes

- **Name input** persists to `sessionStorage` as `quizName` (already used downstream by results page)
- **Water intake** options: "Less than 1 L", "1–2 L", "2–3 L", "3 L+"
- **Diet balance** options: 4 single-select per PDF
- **Past results pattern** options: 4 single-select per PDF
- **Agree/disagree** questions: each renders as 2 large cards ("Agree" / "Disagree"), auto-advance on click
- **Target zones** body-image-select: 5 options (Legs, Belly, Arms, Butt, Face and neck) each rendered as a row with a small photo (uses existing body imagery; reuses multi-select state)
- **80% break** copy varies by `(sex, age bucket)`:
  - "80% of women in their 50s reduced their weight on this plan"
  - "80% of men aged 40+ saw measurable changes within 6 weeks"
  - etc.

### Personal Profile Break (BMI screen rework)

Match the mock exactly:
- Gradient horizontal BMI bar (15 / 18.5 / 25 / 30 / 40) with "You – {bmi}" pill above the user's position
- Underneath: orange "Risks of unhealthy BMI" card (only shown if BMI > 25), source: AHA
- Card 2: 4 rows — Body Type (derived from BMI), Target Zones (placeholder "to be selected" — we don't have target zones yet at this point in the flow, so swap this row for "Goal" = lose X lbs), Lifestyle (from activity answer), Diet Type (from current diet, if answered — otherwise omit row)

Note: Target zones are asked **after** this break in the new order, so this card uses Goal / Lifestyle instead. The PDF mock shows Target Zones but that screen would only make sense if zones were captured first; using Goal keeps the layout intact without lying about data we don't have.

### Weight Loss Blockers Break

Replaces existing `healthSnapshot`. Compute % weights from quiz answers:
- **Emotional Eating** weight: +20 if hunger pattern = "grazing all day" or "changes with stress", +15 if sweet tooth = "Yes", +10 if alcohol ≥ "few times/week"
- **Stress & Overload**: +20 if sleep = "broken/poor", +15 if energy "low", +10 if alcohol high
- **Self-criticism**: +25 if confidence agree-disagree = "Agree", +15 if past results = "lose but never lasts"
- **Fear of failure**: +25 if "feel stuck" = "Agree", +10 if past diets ≥ 2 tried

Normalise to 100%, sort descending, render top 4 as the colored ranked bars from the mock. Below: explainer card for the top blocker.

### Final Calculation Screen (BuildingPlanPage)

Visual reference: dark navy background like the precedent image, but adapted to the existing light Mediterranean theme — use white cards on the gradient-sand background with primary-color progress bars.

```text
[Heading: "Building your personal plan…"]

Analyzing Your Metabolism & Body Type        [████████████] 100%
Calculating Your Ideal Fat-Burning Zone       [██████░░░░░░]  62%
Personalizing Your Mediterranean Meal Strategy[░░░░░░░░░░░░]   0%
Generating Your Personal Mediterranean Plan   [░░░░░░░░░░░░]   0%

──────────────────────────────────────
Trusted by over 527,348 clients
★★★★★
"Lost 12 lbs in 3 weeks. Much easier than weight watchers."
— Theresa H.
```

Bars fill sequentially, each ~2.5s. Total ~10s before auto-advance.

### Files Modified

- `src/data/quizQuestions.ts` — full reorder + new questions + new break entries
- `src/types/quiz.ts` — add `text-input`, `agree-disagree`, `body-image-select` types + new breakType union members
- `src/components/quiz/QuizFlow.tsx` — render handlers for the 3 new question types
- `src/components/quiz/BreakScreens.tsx` — rework `bmi`, rework `healthSnapshot` → `weightLossBlockers`, add `personalProfile`, `projectionInline`, `eightyPercent`, `mediterraneanStabilises`, `buildingPlan`, `thanksForSharing`
- `src/pages/AnalyzingPage.tsx` — render new `BuildingPlanPage` component
- `src/pages/BuildingPlanPage.tsx` — NEW (4-bar calculation screen)
- `src/App.tsx` — remove `/projection` route
- `src/components/quiz/EmailCapture.tsx` — keep capture mode only (analyzing mode no longer used)

### Things I'm Assuming (flag if wrong)

1. The PDF lists "Q3 - How old are you?" twice (once before Break 1 and once after) — I'm treating the second as the real position (after Break 1) and dropping the first
2. "Q26 How active" appearing again late in the PDF is a check-in, but since you already asked activity earlier, I'll **omit the duplicate** rather than ask twice
3. The current `/projection` page becomes unused — I'll delete it after confirming the inline break works

