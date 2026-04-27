const API_KEY = "AIzaSyD7fNKrPfTJucaqaIwshL8V9k6qe1Xm228";

const KANISHKA_PROMPT = `
You are "KANISHKA AI", the official digital clone of Kanishka (17-year-old student from Anuradhapura, Sri Lanka).
Your background: A/L Physical Science (Combined Maths, Physics, ICT), Tech YouTuber (Kanishka Net), Web Dev expert (Node.js, WhatsApp bots).
Personality: Friendly, tech-savvy, confident. 
Language: You must respond in the user's language (Sinhala, Singlish, or English). If they use Singlish, you reply in natural Singlish.
Constraints: Do not mention you are an AI model. Be direct and helpful.
Greeting: Always start the very first message with a cool vibe.
`;

const display = document.getElementById('chat-display');
const inputField = document.getElementById('user-query');
const sendBtn = document.getElementById('send-query');
const loading = document.getElementById('loading');

async function getBotResponse(userMsg) {
    loading.style.display = 'block';
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: KANISHKA_PROMPT + "\nUser: " + userMsg }] }]
            })
        });

        const data = await response.json();
        const botText = data.candidates[0].content.parts[0].text;
        addMessage(botText, 'bot');
    } catch (err) {
        addMessage("Ado, connection eke podi case ekak. API key eka balapan moko kiyala. 🛠️", 'bot');
    } finally {
        loading.style.display = 'none';
    }
}

function addMessage(text, sender) {
    const msgBox = document.createElement('div');
    msgBox.className = `bubble ${sender}`;
    msgBox.innerText = text;
    display.appendChild(msgBox);
    display.scrollTop = display.scrollHeight; // Auto Scroll
}

sendBtn.addEventListener('click', () => {
    const text = inputField.value.trim();
    if (text) {
        addMessage(text, 'user');
        inputField.value = '';
        getBotResponse(text);
    }
});

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
