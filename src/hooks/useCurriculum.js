
import { useState, useCallback, useEffect } from 'react';
import { curriculum } from '../data/curriculum';

const STORAGE_KEY = 'typing-tutor-progress';

const useCurriculum = () => {
    // Load initial state
    const [phaseIndex, setPhaseIndex] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).phaseIndex || 0 : 0;
    });

    const [lessonIndex, setLessonIndex] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).lessonIndex || 0 : 0;
    });

    const [unlocked, setUnlocked] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).unlocked || { phase1: true } : { phase1: true };
    });

    const [personalBests, setPersonalBests] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).personalBests || {} : {};
    });

    const [confusionDrill, setConfusionDrill] = useState(null);

    const [speedTestIndex, setSpeedTestIndex] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).speedTestIndex || 0 : 0;
    });

    const [speedTestsUnlocked, setSpeedTestsUnlocked] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).speedTestsUnlocked || 1 : 1; // 1 means first test unlocked
    });

    const [speedPersonalBests, setSpeedPersonalBests] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved).speedPersonalBests || {} : {};
    });

    // Persistence Effect
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            phaseIndex,
            lessonIndex,
            unlocked,
            personalBests,
            speedTestIndex,
            speedTestsUnlocked,
            speedPersonalBests
        }));
    }, [phaseIndex, lessonIndex, unlocked, personalBests, speedTestIndex, speedTestsUnlocked, speedPersonalBests]);


    const currentPhase = curriculum.phases[phaseIndex];
    const currentLesson = confusionDrill || currentPhase.lessons[lessonIndex];
    const currentPersonalBest = personalBests[currentLesson.id];

    // Speed Test Logic
    const currentSpeedTest = curriculum.speedChallenges ? curriculum.speedChallenges[speedTestIndex] : null;
    const currentSpeedTestPB = currentSpeedTest ? speedPersonalBests[currentSpeedTest.id] : null;

    const completeSpeedTest = useCallback((stats) => {
        const { wpm, accuracy } = stats;
        const test = curriculum.speedChallenges[speedTestIndex];
        const { threshold } = test;

        if (wpm >= threshold.wpm && accuracy >= threshold.accuracy) {
            // Unlock next if applicable
            if (speedTestIndex + 1 < curriculum.speedChallenges.length) {
                if (speedTestsUnlocked <= speedTestIndex + 1) {
                    setSpeedTestsUnlocked(prev => Math.max(prev, speedTestIndex + 2)); // unlock index + 2 (conceptually)
                }
                // Auto-advance to next test [FIX]
                setSpeedTestIndex(prev => prev + 1);
            }

            // Update PB
            setSpeedPersonalBests(prev => {
                const currentPB = prev[test.id]?.wpm || 0;
                if (wpm > currentPB) {
                    return { ...prev, [test.id]: { wpm, accuracy, date: Date.now() } };
                }
                return prev;
            });
        }
    }, [speedTestIndex, speedTestsUnlocked]);

    const completeLesson = useCallback((stats) => {
        // Check for confusion drills
        const { weakKeys, wpm, accuracy } = stats;
        let drillTriggered = false;

        // Only check confusion on non-drill lessons
        if (!currentLesson.isDrill) {
            if ((weakKeys['u'] || 0) + (weakKeys['y'] || 0) > 5) {
                setConfusionDrill({
                    id: "drill-uy",
                    title: "Confusion Clear: U vs Y",
                    text: "uyuy uyu uuyu yyuu uyuy uyu uuyu yyuu",
                    isDrill: true
                });
                drillTriggered = true;
            } else if ((weakKeys['e'] || 0) + (weakKeys['i'] || 0) > 5) {
                setConfusionDrill({
                    id: "drill-ei",
                    title: "Confusion Clear: E vs I",
                    text: "eie iei eeii iiee eie iei eeii iiee",
                    isDrill: true
                });
                drillTriggered = true;
            } else if ((weakKeys['r'] || 0) + (weakKeys['t'] || 0) > 5) {
                setConfusionDrill({
                    id: "drill-rt",
                    title: "Confusion Clear: R vs T",
                    text: "rtrt trtr rrtt trtr rtrt trtr rrtt trtr",
                    isDrill: true
                });
                drillTriggered = true;
            }
        }

        if (drillTriggered) return;

        // Update PB if better
        if (accuracy > 90) { // Only valid runs count
            setPersonalBests(prev => {
                const currentPB = prev[currentLesson.id]?.wpm || 0;
                if (wpm > currentPB) {
                    return { ...prev, [currentLesson.id]: { wpm, accuracy, date: Date.now() } };
                }
                return prev;
            });
        }

        // Clear drill if active
        if (confusionDrill) {
            setConfusionDrill(null);
            return; // Return to normal progression
        }

        // Normal Progression
        if (accuracy > 90) {
            if (lessonIndex < currentPhase.lessons.length - 1) {
                setLessonIndex(prev => prev + 1);
            } else {
                // Phase Complete
                if (phaseIndex < curriculum.phases.length - 1) {
                    const nextPhaseId = curriculum.phases[phaseIndex + 1].id;
                    setUnlocked(prev => ({ ...prev, [nextPhaseId]: true }));
                    setPhaseIndex(prev => prev + 1);
                    setLessonIndex(0);
                }
            }
        }
    }, [confusionDrill, lessonIndex, phaseIndex, currentPhase.lessons.length, currentLesson.id, currentLesson.isDrill]);


    const switchPhase = (index) => {
        // Only allow if previous phase is unlocked or it's phase 0
        // Simplified: check if the phase ID key exists in unlocked object
        const targetPhaseId = curriculum.phases[index].id;
        if (unlocked[targetPhaseId] || index === 0) {
            setPhaseIndex(index);
            setLessonIndex(0);
            setConfusionDrill(null);
        }
    };

    const switchLesson = (index) => {
        // Allow switching to any lesson within an unlocked phase
        // In a stricter system, we might check if previous lessons are done, 
        // but for a tutor, usually you can practice any lesson in an unlocked phase.
        if (unlocked[currentPhase.id]) {
            setLessonIndex(index);
            setConfusionDrill(null);
        }
    };

    return {
        currentPhase,
        currentLesson,
        completeLesson,
        unlocked,
        currentPersonalBest,
        phaseIndex,
        lessonIndex,
        switchPhase,
        switchLesson,
        // Speed Test Props
        speedTestIndex,
        setSpeedTestIndex,
        speedTestsUnlocked,
        currentSpeedTest,
        currentSpeedTestPB,
        completeSpeedTest
    };
};

export default useCurriculum;
