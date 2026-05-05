// Weight is always stored canonically in lbs.
// Users may have chosen "kg" as their preferred display unit during the quiz.
// Use these helpers everywhere user-facing weight is displayed so the unit
// reflects the user's original selection.

export type WeightUnit = "lbs" | "kg";

export function getWeightUnit(answers: Record<string, unknown>): WeightUnit {
  return (answers?.weightUnit as string) === "kg" ? "kg" : "lbs";
}

/** Convert a canonical lbs value to the user's display unit (rounded). */
export function toDisplayWeight(lbs: number, unit: WeightUnit): number {
  return unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs);
}

/** Format a canonical lbs value as e.g. "82 kg" or "180 lbs". */
export function formatWeight(lbs: number, unit: WeightUnit): string {
  return `${toDisplayWeight(lbs, unit)} ${unit}`;
}
