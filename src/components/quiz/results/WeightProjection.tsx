import { motion } from "framer-motion";
import { ArrowRight, TrendingDown } from "lucide-react";

interface Props {
  answers: Record<string, string | string[] | number>;
  onContinue: () => void;
}

const WeightProjection = ({ answers, onContinue }: Props) => {
  const currentWeight = (answers.weight as number) || 180;
  const goalWeight = (answers.goalWeight as number) || 150;
  const weightDiff = currentWeight - goalWeight;

  const now = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const targetMonth = months[(now.getMonth() + 3) % 12];
  const targetDay = now.getDate();

  // Cap total loss over 3 months at 50 lbs, then space evenly across months
  const totalLoss = Math.min(Math.max(0, weightDiff), 50);
  const monthlyLoss = totalLoss / 3;
  const month1Weight = Math.round(currentWeight - monthlyLoss);
  const month2Weight = Math.round(currentWeight - monthlyLoss * 2);
  const projectedGoalWeight = Math.round(currentWeight - totalLoss);
  const m1 = months[(now.getMonth() + 1) % 12];
  const m2 = months[(now.getMonth() + 2) % 12];
  const m3 = months[(now.getMonth() + 3) % 12];

  const graphPoints = [
    { x: 40, y: 30, label: `${currentWeight}`, month: "Now" },
    { x: 100, y: 52, label: "", month: "" },
    { x: 140, y: 70, label: `${month1Weight}`, month: m1 },
    { x: 180, y: 82, label: "", month: "" },
    { x: 240, y: 110, label: `${month2Weight}`, month: m2 },
    { x: 280, y: 128, label: "", month: "" },
    { x: 340, y: 150, label: `${projectedGoalWeight}`, month: m3 },
  ];
  const keyIndices = [0, 2, 4, 6];

  const pathD = `M 40 30 C 60 35, 85 48, 100 52 C 115 56, 125 64, 140 70 C 155 75, 165 79, 180 82 C 200 87, 220 100, 240 110 C 255 117, 265 123, 280 128 C 300 135, 320 143, 340 150`;
  const glp1Path = `M 40 30 C 70 40, 100 75, 140 90 C 170 100, 190 105, 220 100 C 250 95, 290 80, 340 70`;

  const glp1Points = [
    { x: 40, y: 30 },
    { x: 340, y: 70 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-sand flex flex-col items-center justify-start px-5 py-10"
    >
      <div className="w-full max-w-md mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(150_30%_94%)] text-[hsl(150_40%_35%)] text-sm font-body font-medium">
            <TrendingDown className="w-4 h-4" />
            Projection
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-2"
        >
          Your 3-Month Weight Projection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground font-body text-center mb-6"
        >
          We estimate you could reach <span className="font-semibold text-primary">{projectedGoalWeight} lbs</span> by {targetMonth} {targetDay}th
        </motion.p>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border shadow-card p-4 mb-4"
        >
          <div className="bg-muted/30 rounded-lg p-4">
            <svg viewBox="0 0 380 190" className="w-full">
              <line x1="40" y1="170" x2="340" y2="170" stroke="hsl(var(--border))" strokeWidth="1" />
              <defs>
                <linearGradient id="resultsProgressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(340, 80%, 58%)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(4, 80%, 55%)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={`${pathD} L 340 170 L 40 170 Z`} fill="url(#resultsProgressGrad)" />
              <motion.path
                d={pathD}
                fill="none"
                stroke="hsl(340, 80%, 58%)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
              />
              {/* GLP-1 comparison line */}
              <motion.path
                d={glp1Path}
                fill="none"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
              />
              {graphPoints.map((p, i) => {
                if (!keyIndices.includes(i)) return null;
                return (
                  <g key={i}>
                    <motion.circle
                      cx={p.x} cy={p.y} r="5"
                      fill={i === graphPoints.length - 1 ? "hsl(340, 80%, 58%)" : "hsl(var(--card))"}
                      stroke="hsl(340, 80%, 58%)" strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.3 }}
                    />
                    <text x={p.x} y={p.y - 14} textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">
                      {p.label} lbs
                    </text>
                    <text x={p.x} y={185} textAnchor="middle" className="text-[10px]" fill="hsl(var(--muted-foreground))">
                      {p.month}
                    </text>
                  </g>
                );
              })}
              {/* GLP-1 end label */}
              <text x={345} y={glp1Points[glp1Points.length - 1].y - 10} textAnchor="start" className="text-[9px] font-semibold" fill="hsl(var(--muted-foreground))">
                GLP-1
              </text>
              <line x1="340" y1={150} x2="350" y2={150} stroke="hsl(340, 80%, 58%)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="355" y={154} className="text-[9px]" fill="hsl(var(--muted-foreground))">Target</text>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-primary rounded" />
              <span className="text-[10px] text-muted-foreground font-body">Hormone Reset Diet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 border-t-2 border-dashed border-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-body">GLP-1 (Ozempic)</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground font-body mt-2 text-center">
            GLP-1 users often regain weight after stopping. Hormone Reset Diet results tend to be more sustainable.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-[hsl(150_35%_40%)] text-white font-body font-semibold text-lg shadow-medium transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WeightProjection;
