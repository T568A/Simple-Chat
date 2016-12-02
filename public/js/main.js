var messageList = document.querySelector('.message-list'),
    textArea = document.querySelector('.message-text'),
    socket = io(),
    username;


function logon() {
    username = document.querySelector('.user-name').value.trim();
    socket.emit('connect user', {'userName': username});
}

socket.on('logon', function(msg) {
    if (msg === 'deny') {
        document.querySelector('.user-name').value = '';
        document.querySelector('.logon-system-message').innerText = 'Username already taken!';
        document.querySelector('.logon-system-message').classList.add('logon-system-message-show');
    } else if (msg === 'allow') {
        hidePopup();
    }
});

socket.on('chat message', function(msg){
    if (username === msg.userName) {
        addMessageToPage(msg, 'message-user');
    } else {
        addMessageToPage(msg, 'remote-user');
    }
});


function hidePopup() {
    document.querySelector('.popup').classList.add('hide-popup');
    document.querySelector('.background-popup').classList.add('hide-popup');
}

function getMessageText() {
    return textArea.value.trim();
}

function addMessageToPage(msg, selector) {
    var div = document.createElement('div'),
        strong = document.createElement('strong'),
        br = document.createElement('br'),
        span =document.createElement('span');

    strong.innerText = msg.userName + ':';
    span.innerText = msg.messageText;

    div.className = 'animated flipInX ' + selector;
    div.appendChild(strong);
    div.appendChild(br);
    div.appendChild(span);

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
    msg.userName = username;
    msg.messageText = getMessageText();
    if (msg.messageText !== '' && msg.userName !== '') {
        clearTextArea();
        sendMessageToServer(msg);
    }
}


socket.on('render userlist', function(userList){
    renderUserList(userList);
});

function renderUserList(userList) {
    var ul = document.createElement('ul'),
        list = document.querySelector('.user-list');

    list.innerText = '';
    userList.forEach(function(user, index, array) {
        li = document.createElement('li');
        li.innerText = user;
        ul.appendChild(li);
    });
    list.appendChild(ul);
}



document.querySelector('.button-send-username').addEventListener('click', logon);
document.querySelector('.user-name').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        logon();
    }
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
