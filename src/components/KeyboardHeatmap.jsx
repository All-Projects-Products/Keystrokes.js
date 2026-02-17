
import React from 'react';

const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

const KeyboardHeatmap = ({ weakKeys, currentKey }) => {
    const maxErrors = Math.max(...Object.values(weakKeys), 1);

    const getKeyColor = (key) => {
        // Highlight active key
        if (currentKey && key.toLowerCase() === currentKey.toLowerCase()) {
            return 'bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.6)] scale-110 z-10';
        }

        const count = weakKeys[key] || 0;
        if (count === 0) return 'bg-slate-700 text-slate-400';

        // Calculate intensity 0-1
        const intensity = Math.min(count / 5, 1); // Cap at 5 errors for max red
        if (intensity < 0.3) return 'bg-yellow-500/50 text-white';
        if (intensity < 0.6) return 'bg-orange-500/70 text-white';
        return 'bg-rose-600 text-white';
    };

    return (
        <div className="flex flex-col gap-2 items-center p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700 mt-8">
            <h3 className="text-slate-400 text-sm uppercase tracking-widest mb-2 font-bold">Error Heatmap</h3>
            {keyboardLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((key) => (
                        <div
                            key={key}
                            className={`w-10 h-10 flex items-center justify-center rounded-md font-bold uppercase transition-colors duration-300 ${getKeyColor(key)}`}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            ))}
            <div className="flex gap-4 mt-4 text-xs text-slate-500 select-none">
                <span className="flex items-center gap-1 cursor-help" title="Keys you rarely mistype"><span className="w-3 h-3 bg-slate-700 rounded-full"></span> Safe</span>
                <span className="flex items-center gap-1 cursor-help" title="The key you need to press right now"><span className="w-3 h-3 bg-sky-500 rounded-full shadow-[0_0_5px_rgba(14,165,233,0.6)]"></span> Next</span>
                <span className="flex items-center gap-1 cursor-help" title="Keys with occasional errors"><span className="w-3 h-3 bg-yellow-500/50 rounded-full"></span> Warm</span>
                <span className="flex items-center gap-1 cursor-help" title="Keys with frequent errors"><span className="w-3 h-3 bg-orange-500/70 rounded-full"></span> Mod.</span>
                <span className="flex items-center gap-1 cursor-help" title="Keys with very high error rate"><span className="w-3 h-3 bg-rose-600 rounded-full"></span> Hot</span>
            </div>
        </div>
    );
};


export default KeyboardHeatmap;
