// तुम्हारी 50 एक्टिवेशन कीज़
const validKeys = [
    "AWY-101X", "AWY-102Y", "AWY-103Z", "AWY-104A", "AWY-105B",
    "AWY-106C", "AWY-107D", "AWY-108E", "AWY-109F", "AWY-110G",
    "AWY-111H", "AWY-112I", "AWY-113J", "AWY-114K", "AWY-115L",
    "AWY-116M", "AWY-117N", "AWY-118O", "AWY-119P", "AWY-120Q",
    "AWY-121R", "AWY-122S", "AWY-123T", "AWY-124U", "AWY-125V",
    "AWY-126W", "AWY-127X", "AWY-128Y", "AWY-129Z", "AWY-130A",
    "AWY-131B", "AWY-132C", "AWY-133D", "AWY-134E", "AWY-135F",
    "AWY-136G", "AWY-137H", "AWY-138I", "AWY-139J", "AWY-140K",
    "AWY-141L", "AWY-142M", "AWY-143N", "AWY-144O", "AWY-145P",
    "AWY-146Q", "AWY-147R", "AWY-148S", "AWY-149T", "AWY-150U"
];

function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// वीडियो का साइज़ अंदाज़ा लगाने का फंक्शन (ऑफिशियल लुक के लिए)
function generateRandomSize() {
    const sizes = ["45.2 MB", "128.5 MB", "340.1 MB", "75.8 MB", "210.4 MB", "512.0 MB"];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

async function checkStatus() {
    const url = document.getElementById('youtube-url').value.trim();
    const videoID = extractVideoID(url);
    
    if (!videoID) {
        alert("Please enter a valid YouTube link!");
        return;
    }

    // वीडियो सेक्शन दिखाएं
    document.getElementById('video-section').classList.remove('hidden');
    document.getElementById('yt-player').src = `https://www.youtube.com/embed/${videoID}`;
    document.getElementById('video-link-text').innerText = url;
    document.getElementById('video-size').innerText = generateRandomSize();
    
    // स्टेटस मैसेज को रीसेट करें
    const statusMsg = document.getElementById('status-message');
    statusMsg.style.display = 'none';
    statusMsg.innerText = '';

    // वीडियो का टाइटल निकालना
    try {
        const response = await fetch(`https://noembed.com/embed?url=${url}`);
        const data = await response.json();
        document.getElementById('video-title').innerText = data.title || "Unknown YouTube Video";
    } catch (error) {
        document.getElementById('video-title').innerText = "Encrypted YouTube Video";
    }
}

function applyKey() {
    const inputKey = document.getElementById('activation-key').value.trim().toUpperCase();
    const statusMsg = document.getElementById('status-message');
    
    if (inputKey === "") {
        alert("Please enter Activation Key!");
        return;
    }

    let usedKeys = JSON.parse(localStorage.getItem('alterweb_used_keys_v2')) || [];
    statusMsg.style.display = 'block';

    if (usedKeys.includes(inputKey)) {
        statusMsg.style.backgroundColor = "rgba(255, 68, 68, 0.1)";
        statusMsg.style.border = "1px solid #ff4444";
        statusMsg.style.color = "#ff4444";
        statusMsg.innerText = "❌ Key Expired or Already Used!";
    } 
    else if (validKeys.includes(inputKey)) {
        usedKeys.push(inputKey);
        localStorage.setItem('alterweb_used_keys_v2', JSON.stringify(usedKeys));
        
        statusMsg.style.backgroundColor = "rgba(0, 200, 81, 0.1)";
        statusMsg.style.border = "1px solid #00C851";
        statusMsg.style.color = "#00C851";
        // तुम्हारा मांगा हुआ एग्जैक्ट मैसेज (1 to 30 days)
        statusMsg.innerText = "Congratulation! Your demo complete. Refresh YouTube after 1 to 30 days.";
        
        document.getElementById('activation-key').value = "";
    } 
    else {
        statusMsg.style.backgroundColor = "rgba(255, 68, 68, 0.1)";
        statusMsg.style.border = "1px solid #ff4444";
        statusMsg.style.color = "#ff4444";
        statusMsg.innerText = "❌ Invalid Activation Key!";
    }
}
