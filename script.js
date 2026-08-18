const STORAGE_KEY = "text-viewer-messages";

// Get existing messages
let messages = JSON.parse(
localStorage.getItem(STORAGE_KEY) || "[]"
);

// Get new text from URL
const params = new URLSearchParams(window.location.search);
const newText = params.get("text");

// Add new message to the beginning
if (newText !== null && newText.trim() !== "") {
messages.unshift({
    text: newText,
    date: new Date().toLocaleString('en-US', {hour12: false})
});

localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(messages)
);

// Remove ?text= from the URL after saving it
history.replaceState({}, "", window.location.pathname);
}

function renderMessages() {
const container = document.getElementById("messages");

if (messages.length === 0) {
    container.innerHTML =
	'<div class="empty">No messages yet.</div>';
    return;
}

container.innerHTML = "";

messages.forEach((message, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "message";

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = `#${messages.length - index} - ` + message.date;

    const textarea = document.createElement("textarea");
    textarea.value = message.text;

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = "Del";

    // Automatically save edits
    textarea.addEventListener("input", () => {
	messages[index].text = textarea.value;

	localStorage.setItem(
	    STORAGE_KEY,
	    JSON.stringify(messages)
	);
    });

    btn.addEventListener("click", () => {
	messages.splice(index, 1)

	localStorage.setItem(
	    STORAGE_KEY,
	    JSON.stringify(messages)
	);
	    
	renderMessages();
    });

    wrapper.appendChild(date);
    wrapper.appendChild(textarea);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
});
}

renderMessages();

