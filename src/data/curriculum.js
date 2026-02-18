
export const curriculum = {
    phases: [
        {
            id: "phase1",
            title: "Phase 1: The Home Row (Foundation)",
            lessons: [
                { id: "1.1", title: "Basic Home Row", content: "a s d f j k l ;", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], text: "asdf jkl; asdf jkl; aa ss dd ff jj kk ll ;;" },
                { id: "1.2", title: "Home Row Reaches", content: "g h", keys: ["g", "h"], text: "fgjh fgjh ghgh fghj g h g h" },
                { id: "1.3", title: "Coordination Drill", content: "Home Row + G/H", keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"], text: "asdfgh hjkl; asdfgh hjkl;" },
                { id: "1.4", title: "Confusion Clear (F vs J)", content: "F vs J Focus", keys: ["f", "j"], text: "fjf jfj ffjj jjff f j j f" },
                { id: "1.5", title: "Speed Sprint: Easy Words", content: "High Speed", keys: [], text: "sad dad lad fad ask fall all lass", isDrill: true }
            ]
        },
        {
            id: "phase2",
            title: "Phase 2: The Top Row (Upper Reach)",
            lessons: [
                { id: "2.1", title: "Vowels & High Frequency", content: "e i r u", keys: ["e", "i", "r", "u"], text: "eire uri erui ieie urur" },
                { id: "2.2", title: "Remaining Top Row", content: "q w t y o p", keys: ["q", "w", "t", "y", "o", "p"], text: "qwerty uiop qwerty uiop" },
                { id: "2.3", title: "Confusion Clear (U vs Y)", content: "U vs Y Focus", keys: ["u", "y"], text: "uyuy uyu uuyu yyuu u y u y" },
                { id: "2.4", title: "Confusion Clear (R vs T)", content: "R vs T Focus", keys: ["r", "t"], text: "rtrt trtr rrtt trtr r t r t" },
                { id: "2.5", title: "Pinky Challenge", content: "q p a ; z /", keys: ["q", "p", "a", ";", "z", "/"], text: "qa z/ p; qa z/ p; zap zip quip" }
            ]
        },
        {
            id: "phase3",
            title: "Phase 3: The Bottom Row (Lower Reach)",
            lessons: [
                { id: "3.1", title: "Basic Bottom Row", content: "v m c , x .", keys: ["v", "m", "c", ",", "x", "."], text: "vmc,x. vmc,x. v m c , x ." },
                { id: "3.2", title: "The Outer Keys", content: "z / b n", keys: ["z", "/", "b", "n"], text: "z/bn z/bn zz // bb nn" },
                { id: "3.3", title: "Confusion Clear (V vs B)", content: "V vs B Focus", keys: ["v", "b"], text: "vbvb bvbv vbbv v b v b" },
                { id: "3.4", title: "Confusion Clear (N vs M)", content: "N vs M Focus", keys: ["n", "m"], text: "nmnm mnmn nnmm n m n m" },
                { id: "3.5", title: "Speed Sprint: Common Words", content: "Mix", keys: [], text: "the and for are but not you all any can had has him his how man new now old see two way who" }
            ]
        },
        {
            id: "phase4",
            title: "Phase 4: Numbers & Symbols",
            lessons: [
                { id: "4.1", title: "Number Row Left", content: "1 2 3 4 5", keys: ["1", "2", "3", "4", "5"], text: "12345 54321 1 2 3 4 5" },
                { id: "4.2", title: "Number Row Right", content: "6 7 8 9 0", keys: ["6", "7", "8", "9", "0"], text: "67890 09876 6 7 8 9 0" },
                { id: "4.3", title: "Basic Punctuation", content: ". , / ; '", keys: [".", ",", "/", ";", "'"], text: ".,/;'. , / ; '" },
                { id: "4.4", title: "Advanced Symbols", content: "! @ # $ % ^ & * ( ) _ +", keys: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"], text: "!@#$% ^&*()_+" },
                { id: "4.5", title: "Developer Special", content: "{ } [ ] < > | \\ / =>", keys: ["{", "}", "[", "]", "<", ">", "|", "\\", "/", "=", ">"], text: "{} [] <> | \\ / =>" }
            ]
        },
        {
            id: "phase5",
            title: "Phase 5: Sentences & Flow",
            lessons: [
                { id: "5.1", title: "Common English Words", content: "High frequency words", keys: [], text: "the and this that with you are not have" },
                { id: "5.2", title: "Capitalization", content: "Shift keys usage", keys: [], text: "The Quick Brown Fox Jumps Over The Lazy Dog" },
                { id: "5.3", title: "Short Sentences", content: "Sentences with punctuation", keys: [], text: "Hello, world. This is a typing test. React is awesome." },
                { id: "5.4", title: "Speed Sprint: Final Exam", content: "Go Fast", keys: [], text: "fast quick zoom speed rush dash run fly jet race win top best" }
            ]
        },
        {
            id: "programmingQuotes",
            title: "Programming Quotes (Bonus)",
            lessons: [
                { id: "quote-1", title: "Talk is cheap...", content: "Linus Torvalds", keys: [], text: "Talk is cheap. Show me the code." },
                { id: "quote-2", title: "Programs for people", content: "Harold Abelson", keys: [], text: "Programs must be written for people to read, and only incidentally for machines to execute." },
                { id: "quote-3", title: "Violent Psychopath", content: "John Woods", keys: [], text: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." },
                { id: "quote-4", title: "Humans can understand", content: "Martin Fowler", keys: [], text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." },
                { id: "quote-5", title: "Solve first", content: "John Johnson", keys: [], text: "First, solve the problem. Then, write the code." },
                { id: "quote-6", title: "Experience & Mistakes", content: "Oscar Wilde", keys: [], text: "Experience is the name everyone gives to their mistakes." },
                { id: "quote-7", title: "Irreplaceable", content: "Coco Chanel", keys: [], text: "In order to be irreplaceable, one must always be different." },
                { id: "quote-8", title: "Java vs JavaScript", content: "Jeremy Keith", keys: [], text: "Java is to JavaScript what car is to Carpet." },
                { id: "quote-9", title: "Knowledge is power", content: "Francis Bacon", keys: [], text: "Knowledge is power." },
                { id: "quote-10", title: "Code like humor", content: "Cory House", keys: [], text: "Code is like humor. When you have to explain it, it’s bad." },
                { id: "quote-11", title: "Cause not symptom", content: "Steve McConnell", keys: [], text: "Fix the cause, not the symptom." },
                { id: "quote-12", title: "Optimism hazard", content: "Kent Beck", keys: [], text: "Optimism is an occupational hazard of programming: feedback is the treatment." },
                { id: "quote-13", title: "Simplicity", content: "Austin Freeman", keys: [], text: "Simplicity is the soul of efficiency." },
                { id: "quote-14", title: "Usable software", content: "Ralph Johnson", keys: [], text: "Before software can be reusable it first has to be usable." },
                { id: "quote-15", title: "Make it right", content: "Kent Beck", keys: [], text: "Make it work, make it right, make it fast." }
            ]
        }
    ],
    speedChallenges: [
        { id: 1, title: "Warm Up", text: "The quick brown fox jumps over the lazy dog.", threshold: { wpm: 30, accuracy: 90 } },
        { id: 2, title: "Common Words", text: "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what", threshold: { wpm: 40, accuracy: 92 } },
        { id: 3, title: "Punctuation Dash", text: "Wait- what? No, really! This is a test; it's designed to be tricky. (Parentheses) and [Brackets] are common in code.", threshold: { wpm: 45, accuracy: 94 } },
        { id: 4, title: "Number Crunch", text: "In 1995, Java was released. 1 + 1 = 2. call 555-0199 for help. ISO 8601 format: 2023-10-27.", threshold: { wpm: 50, accuracy: 95 } },
        { id: 5, title: "Code Snippet: Loop", text: "for (let i = 0; i < 10; i++) { console.log(i); }", threshold: { wpm: 40, accuracy: 95 } },
        { id: 6, title: "Code Snippet: Function", text: "function add(a, b) { return a + b; } const result = add(5, 10);", threshold: { wpm: 45, accuracy: 96 } },
        { id: 7, title: "Developer Quote", text: "The only way to go fast, is to go well. - Robert C. Martin", threshold: { wpm: 60, accuracy: 95 } },
        { id: 8, title: "Typing Master", text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", threshold: { wpm: 70, accuracy: 97 } }
    ]
};
