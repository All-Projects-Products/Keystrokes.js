/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
            },
            colors: {
                // Custom colors if needed, but existing slate/emerald/rose covers requirements
            }
        },
    },
    plugins: [],
}
