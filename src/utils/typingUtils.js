
export const calculateWPM = (correctChars, timeElapsed) => {
    if (timeElapsed === 0) return 0;
    const words = correctChars / 5;
    const minutes = timeElapsed / 60000;
    return Math.round(words / minutes);
};

export const calculateAccuracy = (correctChars, totalChars) => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
};

// Helper to determine letter class
export const getLetterClass = (original, typed, index, cursorIndex) => {
    if (index === cursorIndex) return "current";
    if (index > cursorIndex) return "upcoming";
    if (typed[index] === original[index]) return "correct";
    return "incorrect";
};
