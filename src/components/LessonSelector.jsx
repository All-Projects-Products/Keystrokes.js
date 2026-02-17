
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { curriculum } from '../data/curriculum';

const LessonSelector = ({
    isOpen,
    onClose,
    currentPhaseIndex,
    currentLessonIndex,
    unlocked,
    onSelectPhase,
    onSelectLesson
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
                        className="fixed left-0 top-0 bottom-0 w-80 bg-slate-900 border-r border-slate-800 z-50 overflow-y-auto p-6 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-emerald-400">Curriculum</h2>
                            <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
                        </div>

                        <div className="space-y-8">
                            {curriculum.phases.map((phase, pIndex) => {
                                if (!phase.lessons) return null;

                                const isUnlocked = unlocked[phase.id] || pIndex === 0;
                                const isActivePhase = pIndex === currentPhaseIndex;

                                return (
                                    <div key={phase.id} className={`transition-opacity ${isUnlocked ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                                        <h3
                                            className="text-sm uppercase tracking-widest font-bold text-slate-500 mb-3 flex items-center gap-2 cursor-pointer hover:text-emerald-300 transition-colors"
                                            onClick={() => isUnlocked && onSelectPhase(pIndex)}
                                        >
                                            {phase.title}
                                            {!isUnlocked && <Lock size={12} />}
                                        </h3>

                                        <div className="space-y-2 pl-2 border-l border-slate-800">
                                            {phase.lessons.map((lesson, lIndex) => {
                                                const isActive = isActivePhase && lIndex === currentLessonIndex;

                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        disabled={!isUnlocked}
                                                        onClick={() => {
                                                            onSelectPhase(pIndex); // Ensure phase switches too
                                                            onSelectLesson(lIndex);
                                                            onClose();
                                                        }}
                                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between group
                              ${isActive
                                                                ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/50'
                                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                                            }
                            `}
                                                    >
                                                        <span className="truncate">{lesson.title}</span>
                                                        {isActive && <Play size={12} className="fill-current" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LessonSelector;
