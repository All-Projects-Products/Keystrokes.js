
import React from 'react';
import { motion } from 'framer-motion';

const StatsDisplay = ({ wpm, accuracy, errors, className = "" }) => {
    return (
        <div className={`flex gap-6 ${className}`}>
            <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-slate-500">WPM</span>
                <motion.span
                    key={wpm}
                    initial={{ scale: 1.2, color: "#34d399" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    className="text-3xl font-mono font-bold"
                >
                    {wpm}
                </motion.span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-slate-500">ACC</span>
                <span className={`text-3xl font-mono font-bold ${accuracy < 90 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {accuracy}%
                </span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-slate-500">ERR</span>
                <span className={`text-3xl font-mono font-bold ${errors > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                    {errors}
                </span>
            </div>
        </div>
    );
};

export default StatsDisplay;
