
import React, { useEffect, useState } from 'react';
import useTypingEngine from './hooks/useTypingEngine';
import useCurriculum from './hooks/useCurriculum';
import StatsDisplay from './components/StatsDisplay';
import TypingArea from './components/TypingArea';
import KeyboardHeatmap from './components/KeyboardHeatmap';
import Hands from './components/Hands';
import LessonSelector from './components/LessonSelector';
import SpeedTestSelector from './components/SpeedTestSelector'; // [NEW]
import ResultsModal from './components/ResultsModal'; // [NEW]
import { curriculum } from './data/curriculum';
import { Menu } from 'lucide-react';

function App() {
    const {
        currentPhase,
        currentLesson,
        completeLesson,
        currentPersonalBest,
        unlocked,
        phaseIndex,
        lessonIndex,
        switchPhase,
        switchLesson,
        speedTestIndex,
        setSpeedTestIndex,
        speedTestsUnlocked,
        currentSpeedTest,
        currentSpeedTestPB,
        completeSpeedTest
    } = useCurriculum();

    // Mode State: 'curriculum' | 'test'
    const [mode, setMode] = useState('curriculum');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // [NEW]

    // Decide what text to use based on mode
    const activeText = mode === 'curriculum'
        ? currentLesson.text
        : (currentSpeedTest ? currentSpeedTest.text : "Loading challenge...");

    const { typed, cursor, wpm, accuracy, errors, totalTyped, handleKeyDown, isFinished, weakKeys, startTime, reset } = useTypingEngine(activeText);

    // Ghost Settings
    const [ghostWPM, setGhostWPM] = useState(40);

    // Initialize Test Mode - This useEffect is no longer needed as testText state is removed
    // useEffect(() => {
    //     if (mode === 'test' && !testText) {
    //         const quotes = curriculum.phases.find(p => p.id === 'programmingQuotes')?.quotes || ["Error loading quotes"];
    //         const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    //         setTestText(randomQuote);
    //     }
    // }, [mode, testText]);

    // Key Event Listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Completion Logic is now handled via UI (ResultsModal)

    // startNewTest is no longer needed as testText state is removed and currentSpeedTest provides text
    // const startNewTest = () => {
    //     const quotes = curriculum.phases.find(p => p.id === 'programmingQuotes')?.quotes || ["Error loading quotes"];
    //     const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    //     setTestText(randomQuote);
    // };

    const nextChar = activeText[cursor] || "";

    const handleNextLesson = () => {
        if (mode === 'curriculum') {
            completeLesson({ wpm, accuracy, errors, weakKeys });
        } else {
            completeSpeedTest({ wpm, accuracy, errors });
        }
        reset();
    };

    const handleRetry = () => {
        reset();
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-10 font-mono flex flex-col items-center justify-center selection:bg-emerald-500/30 overflow-x-hidden">

            <ResultsModal
                isOpen={isFinished}
                stats={{ wpm, accuracy, errors, strokes: totalTyped }}
                personalBest={mode === 'curriculum' ? currentPersonalBest : currentSpeedTestPB}
                threshold={mode === 'curriculum' ? 90 : (currentSpeedTest?.threshold?.accuracy || 90)}
                onRetry={handleRetry}
                onNext={handleNextLesson}
            />

            <LessonSelector
                isOpen={isMenuOpen && mode === 'curriculum'}
                onClose={() => setIsMenuOpen(false)}
                currentPhaseIndex={phaseIndex}
                currentLessonIndex={lessonIndex}
                unlocked={unlocked}
                onSelectPhase={switchPhase}
                onSelectLesson={switchLesson}
            />

            <SpeedTestSelector
                isOpen={isMenuOpen && mode === 'test'}
                onClose={() => setIsMenuOpen(false)}
                currentTestIndex={speedTestIndex}
                unlockedCount={speedTestsUnlocked}
                onSelectTest={setSpeedTestIndex}
            />

            <div className="absolute top-6 left-10 z-30">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <Menu size={24} />
                    <span className="text-sm font-bold uppercase tracking-widest hidden md:inline">
                        {mode === 'curriculum' ? "Lessons" : "Challenges"}
                    </span>
                </button>
            </div>

            {/* Mode Switcher */}
            <div className="absolute top-6 right-10 flex gap-4 bg-slate-800 p-1 rounded-lg">
                <button
                    onClick={(e) => { e.currentTarget.blur(); setMode('curriculum'); }}
                    className={`px-4 py-1 rounded-md text-sm font-bold transition-colors ${mode === 'curriculum' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Curriculum
                </button>
                <button
                    onClick={(e) => { e.currentTarget.blur(); setMode('test'); }}
                    className={`px-4 py-1 rounded-md text-sm font-bold transition-colors ${mode === 'test' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Speed Test
                </button>
            </div>

            {/* Header / Nav */}
            <div className="absolute top-16 w-full max-w-4xl flex justify-between items-end border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-slate-500 text-sm uppercase tracking-widest mb-1">
                        {mode === 'curriculum' ? currentPhase.title : "Speed Challenge"}
                    </h2>
                    <h1 className="text-2xl text-emerald-400 font-bold flex items-center gap-2">
                        {mode === 'curriculum' ? currentLesson.title : (currentSpeedTest?.title || "Loading...")}
                        {mode === 'curriculum' && currentLesson.isDrill && <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">DRILL</span>}
                    </h1>
                </div>
                <StatsDisplay wpm={wpm} accuracy={accuracy} errors={errors} strokes={totalTyped} />
            </div>

            {/* Typing Area with Ghost */}
            <div className="mt-32 w-full flex flex-col items-center gap-8">
                <TypingArea
                    text={activeText}
                    typed={typed}
                    cursor={cursor}
                    isFinished={isFinished}
                    startTime={startTime}
                    targetWPM={ghostWPM}
                    personalBestWPM={mode === 'curriculum' ? (currentPersonalBest?.wpm || 0) : (currentSpeedTestPB?.wpm || 0)}
                />

                {/* Heatmap & Hands */}
                <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-4xl mt-8">
                    <div className="flex-1 w-full flex justify-center">
                        <Hands currentKey={nextChar} />
                    </div>
                    <div className="flex-1 w-full">
                        <KeyboardHeatmap weakKeys={weakKeys} />
                    </div>
                </div>
            </div>

            {/* Instructions / Footer */}
            <div className="mt-12 text-slate-500 text-sm text-center">
                {mode === 'curriculum' ? (
                    <>
                        <p>Type the text above. Accuracy &gt; 90% required to advance.</p>
                        <p className="mt-2 text-xs opacity-50">Current Progress: {currentLesson.isDrill ? "Correction Mode" : `Lesson ${currentLesson.id}`}</p>
                    </>
                ) : (
                    <>
                        <p>Speed Challenge: Beat {currentSpeedTest?.threshold?.wpm || 0} WPM with &gt;{currentSpeedTest?.threshold?.accuracy || 90}% Accuracy.</p>
                    </>
                )}

                {/* Ghost Toggle */}
                <div className="mt-4 flex gap-4 justify-center items-center">
                    <span className="text-xs uppercase">Bot Speed:</span>
                    {[10, 20, 30, 40, 60, 80, 100].map(speed => (
                        <button
                            key={speed}
                            onClick={() => setGhostWPM(speed)}
                            className={`text-xs font-bold hover:text-white ${ghostWPM === speed ? 'text-sky-400' : 'text-slate-600'}`}
                        >
                            {speed}
                        </button>
                    ))}
                    <button
                        onClick={() => setGhostWPM(0)}
                        className={`text-xs font-bold hover:text-white ${ghostWPM === 0 ? 'text-rose-400' : 'text-slate-600'}`}
                    >
                        OFF
                    </button>
                </div>
            </div>

        </div>
    );
}

export default App;
