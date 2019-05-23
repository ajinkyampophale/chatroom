const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

//template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(5000);

const io = require('socket.io')(server);

//listening on every connection
io.on('connection', (socket) => {

    socket.username = 'Anonymous';

    socket.on('change_username', ({ username }) => {
        socket.username = username;
    });

    socket.on('new_message', ({ message }) => {
        io.sockets.emit('new_message', { message, username: socket.username });
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username });
    });

});