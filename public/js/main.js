var messageList = document.querySelector('.message-list'),
    textArea = document.querySelector('.message-text'),
    socket = io();


function getMessageText () {
    return textArea.value.trim();
}

function addMessageToPage(msg) {
    var div = document.createElement('div');
    div.className = 'animated flipInX message-user';
    div.innerText = msg.messageText;
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
}

function clearTextArea() {
    textArea.value = '';
}

function sendMessageToServer(msg) {
    socket.emit('chat message', msg);
}

function sendMessage() {
    var msg = {
        userName: '',
        messageText: ''
    };
    msg.messageText = getMessageText();
    if (msg.messageText !== '') {
        clearTextArea();
        sendMessageToServer(msg);
    }
}

socket.on('chat message', function(msg){
    addMessageToPage(msg);
 });

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
