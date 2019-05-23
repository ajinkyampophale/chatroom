$(() => {

    let socket = io.connect('http://localhost:5000');

    let username = $('#username');
    let send_username = $('#send_username');
    let message = $('#message');
    let send_message = $('#send_message');
    let chatbox = $('#chatbox');

    //emit message
    send_message.click(() => {
        socket.emit('new_message', { message: message.val() });
        message.val('');
    });

    //listen to message
    socket.on('new_message', ({ username, message }) => {
        chatbox.append(`<p><b>${username}:</b> ${message}</p>`);
    });

    //emit a username
    send_username.click(() => {
        socket.emit('change_username', { username: username.val() });
    });

    //emit typing
    message.bind('keypress', () => {
        socket.emit('typing');
    });

    //listen to typing
    socket.on('typing', ({ username }) => {
        chatbox.append(`<p><i>${username} is typing a message...</i></p>`);
    });

});