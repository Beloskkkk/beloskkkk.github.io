let username = '';
let friends = [];
let avatarUrl = '';
let userKey = '';

// Verificar se há usuário logado ao carregar a página
window.onload = function() {
    const storedUsername = localStorage.getItem('username');
    const storedUserKey = localStorage.getItem('userKey');

    if (storedUsername && storedUserKey) {
        username = storedUsername;
        userKey = storedUserKey;
        showMainContent();
    }
};

function chooseOption(option) {
    document.getElementById('menu-container').style.display = 'none';
    if (option === 'login') {
        document.getElementById('login-container').style.display = 'flex';
    } else if (option === 'signup') {
        document.getElementById('signup-container').style.display = 'flex';
    }
}

function backToMenu() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('menu-container').style.display = 'flex';
}

function login() {
    username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Simulação de autenticação básica (não recomendado para uso real)
    if (username && password === 'senha') {
        userKey = generateUserKey(); // Gerar código único para o usuário
        localStorage.setItem('username', username);
        localStorage.setItem('userKey', userKey);
        showMainContent();
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
}

function signup() {
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    
    // Simulação de criação de conta (não recomendado para uso real)
    if (newUsername && newPassword) {
        username = newUsername;
        userKey = generateUserKey(); // Gerar código único para o usuário
        localStorage.setItem('username', username);
        localStorage.setItem('userKey', userKey);
        showMainContent();
    } else {
        alert('Preencha todos os campos.');
    }
}

function generateUserKey() {
    // Função simples para gerar um código único (não é realmente seguro)
    return Math.random().toString(36).substr(2, 9);
}

function showMainContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'flex';
    document.getElementById('friend-list').innerHTML = '<div>Bem-vindo, ' + username + '!</div>';
}

function logout() {
    username = '';
    userKey = '';
    localStorage.removeItem('username');
    localStorage.removeItem('userKey');
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('menu-container').style.display = 'flex';
}

function addFriend() {
    const friendUsername = document.getElementById('friend-username').value.trim();
    if (friendUsername && !friends.includes(friendUsername)) {
        friends.push(friendUsername);
        updateFriendList();
    }
}

function updateFriendList() {
    const friendList = document.getElementById('friend-list');
    friendList.innerHTML = '<div>Bem-vindo, ' + username + '!</div>';
    friends.forEach(friend => {
        const friendDiv = document.createElement('div');
        friendDiv.textContent = friend;
        friendList.appendChild(friendDiv);
    });
}

function changeAvatar() {
    const avatarInput = document.getElementById('avatar-input');
    const file = avatarInput.files[0];
    
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            avatarUrl = event.target.result;
            alert('Foto de perfil alterada com sucesso!');
        };
        fileReader.readAsDataURL(file);
    }
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (message || file) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');

        if (message) {
            const textMessage = document.createElement('div');
            textMessage.textContent = message;
            messageContainer.appendChild(textMessage);
        }

        if (file) {
            const fileMessage = document.createElement('div');
            const fileUrl = URL.createObjectURL(file);

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = fileUrl;
                img.style.maxWidth = '100%';
                fileMessage.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = fileUrl;
                video.controls = true;
                video.style.maxWidth = '100%';
                fileMessage.appendChild(video);
            } else if (file.type.startsWith('audio/')) {
                const audio = document.createElement('audio');
                audio.src = fileUrl;
                audio.controls = true;
                fileMessage.appendChild(audio);
            } else {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.textContent = 'Download ' + file.name;
                fileMessage.appendChild(link);
            }

            messageContainer.appendChild(fileMessage);
        }

        document.getElementById('chat-messages').appendChild(messageContainer);
        input.value = '';
        fileInput.value = '';
        input.focus();
        messageContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
