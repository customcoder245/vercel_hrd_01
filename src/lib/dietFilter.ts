// Filters quiz options for proteins / vegetables / carbs based on the user's
// selected dietary preference (currentDiet question).
// Guarantees a minimum of 6 selectable options (excluding "Other" /
// "None of the above") by backfilling diet-appropriate alternatives.

type Option = { label: string; icon?: string; description?: string };

const MIN_REAL_OPTIONS = 6;

// Labels considered "animal" — removed for vegan / vegetarian.
const MEAT_LABELS = new Set([
  "Chicken",
  "Beef",
  "Lamb",
  "Pork",
  "Wild game (venison, bison etc.)",
]);

const SEAFOOD_LABELS = new Set([
  "Fish (salmon, tuna etc.)",
  "Seafood (prawns, shellfish)",
]);

const DAIRY_LABELS = new Set(["Greek yogurt", "Cheese"]);

const ANIMAL_BYPRODUCT_LABELS = new Set(["Eggs", ...DAIRY_LABELS]);

// Gluten-containing items in the carbs list.
const GLUTEN_LABELS = new Set(["Bread", "Pasta", "Couscous"]);

// Higher-carb items removed for low-carb preference.
const HIGH_CARB_LABELS = new Set([
  "Bread",
  "Pasta",
  "Rice",
  "Potatoes",
  "Sweet potatoes",
  "Couscous",
  "Oats",
]);

// Diet-specific backfill options so we always offer ≥6 real choices.
const PROTEIN_BACKFILLS: Record<string, Option[]> = {
  Vegan: [
    { label: "Seitan", icon: "🌾" },
    { label: "Edamame", icon: "🫛" },
    { label: "Chickpeas", icon: "🫘" },
    { label: "Nuts & seeds", icon: "🥜" },
    { label: "Plant-based protein powder", icon: "🥤" },
    { label: "Nutritional yeast", icon: "🧈" },
  ],
  Vegetarian: [
    { label: "Cottage cheese", icon: "🧀" },
    { label: "Paneer", icon: "🧀" },
    { label: "Chickpeas", icon: "🫘" },
    { label: "Nuts & seeds", icon: "🥜" },
    { label: "Edamame", icon: "🫛" },
    { label: "Seitan", icon: "🌾" },
  ],
  Pescatarian: [
    { label: "Sardines", icon: "🐟" },
    { label: "Mackerel", icon: "🐟" },
    { label: "Cod", icon: "🐟" },
    { label: "Cottage cheese", icon: "🧀" },
  ],
  "Dairy-free": [
    { label: "Coconut yogurt", icon: "🥥" },
    { label: "Almond-based cheese", icon: "🌰" },
    { label: "Nuts & seeds", icon: "🥜" },
    { label: "Chickpeas", icon: "🫘" },
  ],
};

const CARB_BACKFILLS: Record<string, Option[]> = {
  "Gluten-free": [
    { label: "Buckwheat", icon: "🌾" },
    { label: "Millet", icon: "🌾" },
    { label: "Corn / polenta", icon: "🌽" },
    { label: "Rice noodles", icon: "🍜" },
  ],
  "Low-carb preference": [
    { label: "Cauliflower rice", icon: "🥦" },
    { label: "Zucchini noodles", icon: "🥒" },
    { label: "Berries", icon: "🍓" },
    { label: "Nuts & seeds", icon: "🥜" },
    { label: "Avocado", icon: "🥑" },
    { label: "Greek yogurt", icon: "🥛" },
  ],
};

const TERMINAL_LABELS = new Set(["Other", "None of the above"]);

function backfill(
  filtered: Option[],
  extras: Option[] | undefined
): Option[] {
  const real = filtered.filter((o) => !TERMINAL_LABELS.has(o.label));
  const terminal = filtered.filter((o) => TERMINAL_LABELS.has(o.label));
  const existing = new Set(real.map((o) => o.label));

  if (extras) {
    for (const extra of extras) {
      if (real.length >= MIN_REAL_OPTIONS) break;
      if (!existing.has(extra.label)) {
        real.push(extra);
        existing.add(extra.label);
      }
    }
  }

  // Ensure the final count (real + terminal) is even, so the grid renders
  // cleanly with no orphan tile in the last row.
  const totalCount = real.length + terminal.length;
  if (totalCount % 2 !== 0 && extras) {
    for (const extra of extras) {
      if (!existing.has(extra.label)) {
        real.push(extra);
        existing.add(extra.label);
        break;
      }
    }
  }

  return [...real, ...terminal];
}

// Top-level evener: if the original (unfiltered) options list has an odd
// count, drop the trailing non-terminal item to make it even.
function ensureEven(options: Option[]): Option[] {
  if (options.length % 2 === 0) return options;
  // Try to drop the last non-terminal item
  for (let i = options.length - 1; i >= 0; i--) {
    if (!TERMINAL_LABELS.has(options[i].label)) {
      return [...options.slice(0, i), ...options.slice(i + 1)];
    }
  }
  return options;
}

export function filterOptionsByDiet(
  questionId: string,
  options: Option[] | undefined,
  diet: string | undefined
): Option[] | undefined {
  if (!options) return options;

  const isProteins = questionId === "proteins";
  const isCarbs = questionId === "carbs";
  const isVegetables = questionId === "vegetables";
  const isFoodQuestion = isProteins || isCarbs || isVegetables;

  if (!diet) {
    return isFoodQuestion ? ensureEven(options) : options;
  }

  if (isProteins) {
    let filtered = options;
    switch (diet) {
      case "Vegan":
        filtered = options.filter(
          (o) =>
            !MEAT_LABELS.has(o.label) &&
            !SEAFOOD_LABELS.has(o.label) &&
            !ANIMAL_BYPRODUCT_LABELS.has(o.label)
        );
        break;
      case "Vegetarian":
        filtered = options.filter(
          (o) => !MEAT_LABELS.has(o.label) && !SEAFOOD_LABELS.has(o.label)
        );
        break;
      case "Pescatarian":
        filtered = options.filter((o) => !MEAT_LABELS.has(o.label));
        break;
      case "Dairy-free":
        filtered = options.filter((o) => !DAIRY_LABELS.has(o.label));
        break;
      default:
        return ensureEven(options);
    }
    return ensureEven(backfill(filtered, PROTEIN_BACKFILLS[diet]));
  }

  if (isCarbs) {
    if (diet === "Gluten-free") {
      const filtered = options.filter((o) => !GLUTEN_LABELS.has(o.label));
      return ensureEven(backfill(filtered, CARB_BACKFILLS["Gluten-free"]));
    }
    if (diet === "Low-carb preference") {
      const filtered = options.filter((o) => !HIGH_CARB_LABELS.has(o.label));
      return ensureEven(backfill(filtered, CARB_BACKFILLS["Low-carb preference"]));
    }
    return ensureEven(options);
  }

  return isVegetables ? ensureEven(options) : options;
}
