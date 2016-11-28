var messageList = document.querySelector('.message-list'),
    messageText = document.querySelector('.message-text');


function addMessage() {
    var div = document.createElement('div');
    div.className = 'animated flipInX message-user';
    if (messageText.value.trim() !== '') {
        div.innerText = messageText.value.trim();
        messageList.appendChild(div);
        messageText.value = '';
        messageList.scrollTop = messageList.scrollHeight;
    }
}


document.querySelector('.button').addEventListener('click', addMessage);
document.querySelector('.message-text').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        if (event.shiftKey) {
            return true;
        } else {
            event.preventDefault();
            addMessage();
        }
    }
});
