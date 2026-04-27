async function sendMessage() {
    let input = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");

    let userText = input.value;
    chatBox.innerHTML += `<p><b>You:</b> ${userText}</p>`;

    input.value = "";

    let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `You are KANISHKA AI. Reply like a Sri Lankan teen.\nUser: ${userText}`
                }]
            }]
        })
    });

    let data = await response.json();
    let botReply = data.candidates[0].content.parts[0].text;

    chatBox.innerHTML += `<p><b>Kanishka:</b> ${botReply}</p>`;
}