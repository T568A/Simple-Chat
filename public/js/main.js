var messageList = document.querySelector('.message-list'),
    textArea = document.querySelector('.message-text'),
    socket = io();


function getMessageText () {
    return textArea.value.trim();
}

function addMessageToPage(messageText) {
    var div = document.createElement('div');
    div.className = 'animated flipInX message-user';
    div.innerText = messageText;
    messageList.appendChild(div);
}

function clearTextArea() {
    textArea.value = '';
    messageList.scrollTop = messageList.scrollHeight;
}

function sendMessageToServer(messageText) {
    socket.emit('chat message', messageText);
}

function sendMessage() {
    var messageText = getMessageText();
    if (messageText !== '') {
        addMessageToPage(messageText);
        clearTextArea();
        sendMessageToServer(messageText);
    }
}

document.querySelector('.button-send').addEventListener('click', sendMessage);
document.querySelector('.message-text').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        if (event.shiftKey) {
            return true;
        } else {
            event.preventDefault();
            sendMessage();
        }
    }
});
