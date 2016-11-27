var messageList = document.querySelector('.message-list'),
    messageText = document.querySelector('.message-text');


function addMessage() {
    var div = document.createElement('div');
    div.className = 'message-user';
    if (messageText.value !== '') {
        div.innerText = messageText.value;
        messageList.appendChild(div);
        clearTextarea();
    }
}

function clearTextarea() {
    messageText.value = '';
}


document.querySelector('.button').addEventListener('click', addMessage);
document.querySelector('.message-text').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        if (event.shiftKey) {
            return true;
        } else {
            event.preventDefault();
            addMessage();
        }
    }
});
