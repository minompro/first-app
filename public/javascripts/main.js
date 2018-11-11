const url = "http://localhost:3000/api/messages";
const socketURL = "ws://localhost:3000";
const button = document.querySelector("#submit-button");
const loginInput = document.querySelector("#login-input");
const textArea = document.querySelector(".message-box .message");
const lastMessagesBox = document.querySelector(".last-messages-body");


window.addEventListener("load", () => {
    let lastMessages = getLastMessages();
    lastMessages
        .then(data => renderMessages(data))             //async function always return promise
        .catch(error => console.error(error.message));
});

const socket = new WebSocket(socketURL);

socket.onopen = (event) => {
    console.log(`client connection established`);
}

socket.onmessage = (event) => {
    console.log(`new message was send`);
}

button.addEventListener("click", manageMessages);

async function manageMessages() {
    let values = getCurrentInputValues();    
    try {
        await fetch(url, {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                    });
        socket.send(JSON.stringify(values));
        let messagesArray = [];
        messagesArray.push(values);
        renderMessages(messagesArray);              
    }
    catch(rejected) {
        console.error(rejected.message);
    }    
}

function getCurrentInputValues() {
    if(loginInput.value && textArea.value) {        
        return {
            userName: loginInput.value,
            messageText: textArea.value
        }
    }
    throw new Error("Login or message field is empty!");    
}


async function getLastMessages() {     
    let response = await fetch(url);   
    let incomingMessage = await response.json();
    return incomingMessage;
}

function renderMessages(messages) {
    messages.forEach(message => {
        const div = document.createElement("div");
        const span = document.createElement("span");
        const p = document.createElement("p");
        div.classList.add("message");
        span.classList.add("login");
        span.textContent = message.userName;
        p.textContent = message.messageText;
        div.appendChild(span);
        div.appendChild(p);
        lastMessagesBox.appendChild(div);
    })    
}









