
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock, Play, Zap } from 'lucide-react';
import { curriculum } from '../data/curriculum';

const SpeedTestSelector = ({
    isOpen,
    onClose,
    currentTestIndex,
    unlockedCount,
    onSelectTest
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        className="fixed left-0 top-0 bottom-0 w-96 bg-slate-900 border-r border-slate-800 z-50 overflow-y-auto p-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
                                <Zap size={24} />
                                Speed Challenges
                            </h2>
                            <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
                        </div>

                        <div className="space-y-4">
                            {curriculum.speedChallenges.map((test, index) => {
                                const isUnlocked = index < unlockedCount;
                                const isActive = index === currentTestIndex;

                                return (
                                    <button
                                        key={test.id}
                                        disabled={!isUnlocked}
                                        onClick={() => {
                                            if (isUnlocked) {
                                                onSelectTest(index);
                                                onClose();
                                            }
                                        }}
                                        className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden group
                                            ${isActive
                                                ? 'bg-sky-500/10 border-sky-500/50'
                                                : isUnlocked
                                                    ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                                                    : 'bg-slate-900 border-slate-800 opacity-60 grayscale'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`font-bold ${isActive ? 'text-sky-400' : 'text-slate-300'}`}>
                                                {test.title}
                                            </span>
                                            {!isUnlocked && <Lock size={16} className="text-slate-600" />}
                                            {isUnlocked && isActive && <Play size={16} className="text-sky-400 fill-current" />}
                                        </div>

                                        <div className="flex gap-4 text-xs text-slate-500">
                                            <span>Goal: {test.threshold.wpm} WPM</span>
                                            <span>Accuracy: {test.threshold.accuracy}%</span>
                                        </div>

                                        {isUnlocked && index < unlockedCount - 1 && (
                                            <div className="absolute right-2 bottom-2 text-emerald-500/20">
                                                <CheckCircle size={40} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SpeedTestSelector;
