var messageList = document.querySelector('.message-list'),
    messageText = document.querySelector('.message-text');


function addMessage() {
    var div = document.createElement('div');
    div.className = 'message-user';
    div.innerText = messageText.value;
    messageList.appendChild(div);
}

document.querySelector('.button').addEventListener('click', addMessage);
