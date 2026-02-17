
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowRight, XCircle, CheckCircle } from 'lucide-react';

const ResultsModal = ({ isOpen, stats, personalBest, threshold = 90, requirements, onRetry, onNext, isLastLesson }) => {
    const { wpm, accuracy, errors } = stats;
    const passed = accuracy >= threshold;
    const previousBestWPM = personalBest?.wpm || 0;
    const isNewRecord = passed && wpm > previousBestWPM;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
                    >
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 
                ${passed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {passed ? <CheckCircle size={40} /> : <XCircle size={40} />}
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            {passed ? "Lesson Complete!" : "Lesson Failed"}
                        </h2>

                        {isNewRecord && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-block bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-yellow-500/50"
                            >
                                🏆 New Personal Best!
                            </motion.div>
                        )}

                        <p className="text-slate-400 mb-8">
                            {passed ? "Great job! Ready for the next challenge?" : "Accuracy too low. Keep practicing!"}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-slate-700/50 rounded-xl relative overflow-hidden">
                                <div className={`text-3xl font-bold ${requirements?.wpm && wpm < requirements.wpm ? 'text-rose-400' : 'text-white'}`}>{wpm}</div>
                                <div className="text-xs uppercase tracking-widest text-slate-500">WPM</div>
                                {previousBestWPM > 0 && (
                                    <div className="text-[10px] text-slate-500 mt-1">
                                        Best: {previousBestWPM}
                                    </div>
                                )}
                            </div>
                            <div className={`p-4 bg-slate-700/50 rounded-xl border ${passed ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
                                <div className={`text-3xl font-bold ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>{accuracy}%</div>
                                <div className="text-xs uppercase tracking-widest text-slate-500">Acc</div>
                            </div>
                            <div className="p-4 bg-slate-700/50 rounded-xl">
                                <div className="text-3xl font-bold text-white">{errors}</div>
                                <div className="text-xs uppercase tracking-widest text-slate-500">Err</div>
                            </div>
                        </div>

                        {/* Requirements Section */}
                        <div className="mb-8 p-3 bg-slate-700/30 rounded-lg border border-slate-700">
                            <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-2">Requirements</h3>
                            <div className="flex justify-center gap-6 text-sm">
                                <div className={`flex items-center gap-2 ${requirements?.wpm && wpm < requirements.wpm ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    <span>{requirements?.wpm || 0} WPM</span>
                                    {requirements?.wpm && wpm < requirements.wpm ? <XCircle size={14} /> : <CheckCircle size={14} />}
                                </div>
                                <div className={`flex items-center gap-2 ${accuracy < threshold ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    <span>{threshold}% Acc</span>
                                    {accuracy < threshold ? <XCircle size={14} /> : <CheckCircle size={14} />}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center mb-6">
                            <button
                                onClick={onRetry}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                                <RefreshCw size={20} />
                                Retry
                            </button>

                            {passed && !isLastLesson && (
                                <button
                                    onClick={onNext}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105"
                                >
                                    Next Challenge
                                    <ArrowRight size={20} />
                                </button>
                            )}
                        </div>

                        {!passed && (
                            <div className="text-xs text-rose-400/80 mb-6">
                                Must achieve goals to advance.
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResultsModal;
