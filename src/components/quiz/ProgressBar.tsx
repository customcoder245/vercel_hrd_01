import { memo } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
};

export default memo(ProgressBar);
