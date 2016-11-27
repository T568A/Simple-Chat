var messageList = document.querySelector('.message-list'),
    messageText = document.querySelector('.message-text');

function addMessage() {
    messageList.innerHTML += '<div>' + messageText.value + '</div>';
}

document.querySelector('.button').addEventListener('click', addMessage);
