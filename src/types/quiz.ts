export interface QuizAnswer {
  questionId: string;
  value: string | string[] | number;
}

export interface QuizState {
  currentStep: number;
  answers: Record<string, string | string[] | number>;
  email: string;
  name: string;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  slug: string;
  type:
    | 'single'
    | 'multi'
    | 'slider'
    | 'cards'
    | 'height'
    | 'weight'
    | 'body-select'
    | 'body-image-select'
    | 'multi-select'
    | 'break'
    | 'number-input'
    | 'text-input'
    | 'agree-disagree'
    | 'scale-1-5';
  breakType?:
    | 'bmi'
    | 'mediterranean'
    | 'validation'
    | 'progress'
    | 'social'
    | 'biology'
    | 'women40'
    | 'notAlone'
    | 'microInsight'
    | 'mediterraneanMetabolism'
    | 'uniqueMetabolism'
    | 'almostDone'
    | 'millionWomen'
    | 'whatIsGlp1'
    | 'beforeAfter'
    | 'designedNaturally'
    | 'comparisonGraph'
    | 'trustedStudy'
    | 'shapingPlan'
    | 'tailorEating'
    | 'buildPlan'
    | 'trustedHands'
    | 'behaviouralProfile'
    | 'healthSnapshot'
    | 'foodPreferences'
    | 'analysingInputs'
    | 'finalDetails'
    | 'personalProfile'
    | 'projectionInline'
    | 'eightyPercent'
    | 'mediterraneanStabilises'
    | 'buildingPlan'
    | 'weightLossBlockers'
    | 'thanksForSharing'
    | 'sleepGraphic'
    | 'notAloneInThis';
  title: string;
  subtitle?: string;
  options?: { label: string; icon?: string; description?: string }[];
  sliderConfig?: { min: number; max: number; step: number; unit: string; labels?: string[]; defaultValue?: number };
  genderSpecific?: boolean;
  placeholder?: string;
}

export interface QuizResults {
  planName: string;
  headline: string;
  calorieRange: string;
  macros: { protein: number; carbs: number; fat: number };
  recommendations: string[];
  mealSnapshot: { meal: string; description: string }[];
  lifestyleTips: string[];
  coachMessage: string;
  bmi: number;
  bmiCategory: string;
  metabolicProfile: string;
  metabolicDescription: string;
  progressTimeline: { phase: string; days: string; results: string[] }[];
  estimatedWeightLoss: string;
  profileSummary: { label: string; value: string }[];
}
