
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TypingArea = ({
    text,
    typed,
    cursor,
    isFinished,
    startTime,
    targetWPM = 0,
    personalBestWPM = 0
}) => {
    const [ghostCursor, setGhostCursor] = useState(0);
    const [pbGhostCursor, setPbGhostCursor] = useState(0);

    // Ghost Logic (Competitor & PB)
    useEffect(() => {
        if (!startTime || isFinished) return;

        const interval = setInterval(() => {
            const timeElapsedMinutes = (Date.now() - startTime) / 60000;

            // Competitor Ghost
            if (targetWPM > 0) {
                const ghostChars = Math.floor(targetWPM * 5 * timeElapsedMinutes);
                setGhostCursor(Math.min(ghostChars, text.length));
            }

            // PB Ghost
            if (personalBestWPM > 0) {
                const pbChars = Math.floor(personalBestWPM * 5 * timeElapsedMinutes);
                setPbGhostCursor(Math.min(pbChars, text.length));
            }

        }, 100);

        return () => clearInterval(interval);
    }, [startTime, isFinished, targetWPM, personalBestWPM, text.length]);

    return (
        <div className="relative max-w-4xl w-full">
            {/* Ghost Progress Bar (Competitor) */}
            <div className="absolute -top-6 left-0 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-sky-600/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${(ghostCursor / text.length) * 100}%` }}
                    transition={{ duration: 0.1 }}
                />
                {/* PB Progress (Subtle overlay) */}
                {personalBestWPM > 0 && (
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-yellow-500/30"
                        initial={{ width: 0 }}
                        animate={{ width: `${(pbGhostCursor / text.length) * 100}%` }}
                        transition={{ duration: 0.1 }}
                    />
                )}
            </div>

            <div className="bg-slate-800/50 p-12 rounded-2xl shadow-2xl text-3xl leading-relaxed break-words font-medium relative overflow-hidden backdrop-blur-sm border border-slate-700/50 select-none">

                {text.split('').map((char, index) => {
                    const isTyped = index < cursor;
                    const isCurrent = index === cursor;
                    const typedChar = typed[index];
                    const isCorrect = isTyped && typedChar === char;
                    const isError = isTyped && typedChar !== char;
                    const isGhostHere = index === ghostCursor && targetWPM > 0 && !isFinished;
                    const isPbGhostHere = index === pbGhostCursor && personalBestWPM > 0 && !isFinished;

                    let charClass = "transition-colors duration-100 ";
                    if (isCurrent) charClass += "text-white ";
                    else if (!isTyped) charClass += "text-slate-600 ";
                    else if (isCorrect) charClass += "text-emerald-400 ";
                    else if (isError) charClass += "text-rose-500 ";

                    return (
                        <span key={index} className="relative inline-block min-w-[1ch]">
                            {/* Character */}
                            <span className={charClass}>
                                {char === ' ' && isError ? '_' : char}
                            </span>

                            {/* User Caret */}
                            {isCurrent && (
                                <motion.div
                                    layoutId="caret"
                                    className="absolute -left-[2px] top-1 bottom-1 w-[3px] bg-emerald-400 rounded-full z-20"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            {/* Ghost Caret (Competitor) */}
                            {isGhostHere && (
                                <motion.div
                                    layoutId="ghost-caret"
                                    className="absolute -left-[2px] top-1 bottom-1 w-[3px] bg-sky-500/50 rounded-full z-10 blur-[1px]"
                                    transition={{ duration: 0.1 }}
                                />
                            )}

                            {/* PB Ghost Caret */}
                            {isPbGhostHere && (
                                <motion.div
                                    layoutId="pb-ghost-caret"
                                    className="absolute -left-[2px] top-1 bottom-1 w-[3px] bg-yellow-500/50 rounded-full z-0 blur-[1px]"
                                    transition={{ duration: 0.1 }}
                                />
                            )}

                            {/* Error background */}
                            {isError && (
                                <span className="absolute inset-0 bg-rose-500/20 rounded z-[-1]" />
                            )}
                        </span>
                    );
                })}
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500 uppercase tracking-widest font-bold">
                <span>You</span>
                <div className="flex gap-4">
                    {personalBestWPM > 0 && <span className="text-yellow-500">PB ({personalBestWPM})</span>}
                    {targetWPM > 0 && <span className="text-sky-500">Bot ({targetWPM})</span>}
                </div>
            </div>
        </div>
    );
};

export default TypingArea;
