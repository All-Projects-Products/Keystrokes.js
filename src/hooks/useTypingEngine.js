
import { useState, useEffect, useCallback } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/typingUtils';

const useTypingEngine = (text) => {
    const [typed, setTyped] = useState("");
    const [cursor, setCursor] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [errors, setErrors] = useState(0);
    const [totalTyped, setTotalTyped] = useState(0);
    const [weakKeys, setWeakKeys] = useState({});

    const reset = useCallback(() => {
        setTyped("");
        setCursor(0);
        setStartTime(null);
        setEndTime(null);
        setErrors(0);
        setTotalTyped(0);
        setWeakKeys({});
    }, []);

    // Reset when text changes
    useEffect(() => {
        reset();
    }, [text, reset]);

    const handleKeyDown = useCallback((e) => {
        if (endTime) return; // Test finished

        const { key } = e;

        // Ignore non-character keys
        if (key.length > 1 && key !== "Backspace") return;

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (key === "Backspace") {
            if (cursor > 0) {
                setTyped((prev) => prev.slice(0, -1));
                setCursor((prev) => prev - 1);
            }
            return;
        }

        // Handle typing
        setTyped((prev) => prev + key);
        setTotalTyped((prev) => prev + 1);

        const correctChar = text[cursor];
        if (key === correctChar) {
            // Correct
        } else {
            // Error
            setErrors((prev) => prev + 1);
            setWeakKeys((prev) => ({
                ...prev,
                [correctChar]: (prev[correctChar] || 0) + 1
            }));
        }

        setCursor((prev) => {
            const nextCursor = prev + 1;
            if (nextCursor === text.length) {
                setEndTime(Date.now());
            }
            return nextCursor;
        });

    }, [cursor, endTime, startTime, text]);

    // Calculate stats
    const timeElapsed = endTime ? (endTime - startTime) : (startTime ? Date.now() - startTime : 0);

    // Count exact correct characters based on typed text vs original text
    const correctTypedChars = typed.split('').reduce((acc, char, index) => {
        return char === text[index] ? acc + 1 : acc;
    }, 0);

    const wpm = calculateWPM(correctTypedChars, timeElapsed);

    // Accuracy = (Total Keystrokes - Errors) / Total Keystrokes
    // If we only count characters in the final string, we miss backspaced errors.
    // However, the standard formula often uses (Total Entries - Uncorrected Errors) / Total Entries
    // or (Total Entries - Total Errors) / Total Entries.
    // Given we have totalTyped (all keystrokes) and errors (all mistakes made),
    // let's use: (totalTyped - errors) / totalTyped.
    // Ensure we don't go below 0 if errors > totalTyped (unlikely but safe).
    const netCorrectKeystrokes = Math.max(0, totalTyped - errors);
    const accuracy = calculateAccuracy(netCorrectKeystrokes, totalTyped);

    return {
        typed,
        cursor,
        wpm,
        accuracy,
        errors,
        handleKeyDown,
        isFinished: !!endTime,
        weakKeys,
        startTime,
        reset
    };
};

export default useTypingEngine;
