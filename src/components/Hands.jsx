
import React from 'react';

// Finger Mappings
const Hands = ({ currentKey }) => {
    const targetKey = currentKey?.toLowerCase();

    // Finger mapping: key -> { hand: 'left'|'right', finger: 0-4 (thumb-pinky) }
    const getFingerData = (k) => {
        const leftHand = {
            pinky: ['1', 'q', 'a', 'z'],
            ring: ['2', 'w', 's', 'x'],
            middle: ['3', 'e', 'd', 'c'],
            index: ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'],
            thumb: [' ']
        };
        const rightHand = {
            thumb: [' '],
            index: ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'],
            middle: ['8', 'i', 'k', ','],
            ring: ['9', 'o', 'l', '.'],
            pinky: ['0', '-', '=', 'p', '[', ']', ';', "'", '/', '\\']
        };

        for (let finger in leftHand) {
            if (leftHand[finger].includes(k)) return { hand: 'left', finger };
        }
        for (let finger in rightHand) {
            if (rightHand[finger].includes(k)) return { hand: 'right', finger };
        }
        return null;
    };

    const activeData = getFingerData(targetKey);

    // Helper to get CSS classes for a finger
    const getFingerClass = (hand, fingerName) => {
        const isActive = activeData && activeData.hand === hand && activeData.finger === fingerName;
        // Special case for Spacebar matching both thumbs
        if (fingerName === 'thumb' && targetKey === ' ') return 'bg-emerald-400 scale-110 shadow-[0_0_15px_rgba(52,211,153,0.6)]';

        return isActive
            ? 'bg-emerald-400 scale-110 shadow-[0_0_15px_rgba(52,211,153,0.6)] z-10'
            : 'bg-slate-700';
    };

    return (
        <div className="flex gap-16 justify-center mt-12 select-none">
            {/* Left Hand */}
            <div className="relative w-40 h-40 bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex flex-col items-center">
                <span className="text-xs text-slate-500 uppercase tracking-widest mb-4">Left Hand</span>
                <div className="flex items-end gap-2 h-24">
                    <div className={`w-3 h-16 rounded-full transition-all duration-200 ${getFingerClass('left', 'pinky')}`} title="Pinky"></div>
                    <div className={`w-3 h-20 rounded-full transition-all duration-200 ${getFingerClass('left', 'ring')}`} title="Ring"></div>
                    <div className={`w-3 h-24 rounded-full transition-all duration-200 ${getFingerClass('left', 'middle')}`} title="Middle"></div>
                    <div className={`w-3 h-20 rounded-full transition-all duration-200 ${getFingerClass('left', 'index')}`} title="Index"></div>
                    <div className={`w-4 h-12 rounded-full transition-all duration-200 rotate-12 origin-bottom-left translate-x-2 ${getFingerClass('left', 'thumb')}`} title="Thumb"></div>
                </div>
            </div>

            {/* Right Hand */}
            <div className="relative w-40 h-40 bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex flex-col items-center">
                <span className="text-xs text-slate-500 uppercase tracking-widest mb-4">Right Hand</span>
                <div className="flex items-end gap-2 h-24">
                    <div className={`w-4 h-12 rounded-full transition-all duration-200 -rotate-12 origin-bottom-right -translate-x-2 ${getFingerClass('right', 'thumb')}`} title="Thumb"></div>
                    <div className={`w-3 h-20 rounded-full transition-all duration-200 ${getFingerClass('right', 'index')}`} title="Index"></div>
                    <div className={`w-3 h-24 rounded-full transition-all duration-200 ${getFingerClass('right', 'middle')}`} title="Middle"></div>
                    <div className={`w-3 h-20 rounded-full transition-all duration-200 ${getFingerClass('right', 'ring')}`} title="Ring"></div>
                    <div className={`w-3 h-16 rounded-full transition-all duration-200 ${getFingerClass('right', 'pinky')}`} title="Pinky"></div>
                </div>
            </div>
        </div>
    );
};

export default Hands;
