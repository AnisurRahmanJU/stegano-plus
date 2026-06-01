// A smart dictionary mapping letters to word lists categorized by parts of speech 
// to help auto-generate somewhat realistic and grammatically structured sentences.
const wordPool = {
    a: ["Always", "All", "Action", "An"],
    b: ["brave", "bright", "bears", "build"],
    c: ["cats", "code", "quickly", "carefully"],
    d: ["dogs", "develop", "during", "dark"],
    e: ["everyday", "everyone", "easily", "eat"],
    f: ["find", "fast", "friends", "from"],
    g: ["good", "great", "giants", "go"],
    h: ["humans", "help", "here", "have"],
    i: ["intelligence", "inside", "is", "in"],
    j: ["just", "jump", "joyfully", "join"],
    k: ["keep", "knowledge", "kind", "keys"],
    l: ["love", "learning", "logical", "like"],
    m: ["making", "many", "monsters", "more"],
    n: ["never", "new", "networks", "now"],
    o: ["open", "online", "often", "only"],
    p: ["people", "program", "perfect", "place"],
    q: ["quietly", "questions", "quick", "quite"],
    r: ["runners", "read", "realtime", "right"],
    s: ["smart", "systems", "softly", "see"],
    t: ["the", "together", "today", "think"],
    u: ["under", "users", "update", "use"],
    v: ["very", "visual", "view", "value"],
    w: ["with", "worlds", "write", "whenever"],
    x: ["xenon", "xylophones", "X-ray", "xenial"],
    y: ["you", "your", "young", "yesterday"],
    z: ["zebras", "zero", "zone", "zoom"]
};

// Fallback arrays for numbers or special symbols if entered
const fallbackWords = ["item", "object", "thing", "element"];

/**
 * ENCRYPT / HIDE FUNCTION
 * Converts a string message into an acrostic cover text.
 */
function encryptMessage(message) {
    if (!message.trim()) return "Please enter a message to hide!";
    
    // Clean input: remove extra spaces, keep only lowercase alphabetic logic
    const cleanMessage = message.toLowerCase().replace(/[^a-z]/g, "");
    
    if (cleanMessage.length === 0) return "Error: Message must contain letters (A-Z).";

    let coverTextWords = [];

    for (let char of cleanMessage) {
        if (wordPool[char]) {
            const list = wordPool[char];
            // Pick a word based on a simple pseudo-random check so sentences vary slightly
            const randomIndex = Math.floor(Math.random() * list.length);
            coverTextWords.push(list[randomIndex]);
        } else {
            coverTextWords.push(fallbackWords[Math.floor(Math.random() * fallbackWords.length)]);
        }
    }

    // Capitalize the very first word of our generated cover text paragraph
    if (coverTextWords.length > 0) {
        coverTextWords[0] = coverTextWords[0].charAt(0).toUpperCase() + coverTextWords[0].slice(1);
    }

    return coverTextWords.join(" ") + ".";
}

/**
 * DECRYPT / REVEAL FUNCTION
 * Extracts the first letter of every word from the cover text.
 */
function decryptMessage(coverText) {
    if (!coverText.trim()) return "Please paste a cover text to decrypt!";

    // Split text into individual words, filtering out empty strings/punctuation
    const words = coverText.trim().toLowerCase().split(/[^a-z]+/i).filter(Boolean);
    
    let secretMessage = "";
    for (let word of words) {
        secretMessage += word.charAt(0); // Grab the first letter
    }

    return secretMessage ? secretMessage.toUpperCase() : "Could not find any hidden message.";
}

// --- DOM EVENT LISTENERS ---
document.getElementById("encryptBtn").addEventListener("click", () => {
    const input = document.getElementById("secretInput").value;
    const result = encryptMessage(input);
    document.getElementById("outputResult").value = result;
});

document.getElementById("decryptBtn").addEventListener("click", () => {
    const input = document.getElementById("secretInput").value;
    const result = decryptMessage(input);
    document.getElementById("outputResult").value = result;
});
