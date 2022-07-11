const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({
    path: '.env-local'
});

const PORT = process.env.PORT || '3000';

const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');

//add CORS support to the Express server
//https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('client connected')
    io.emit('on-shelf-data-changed', `response from socket server!!!!`)
    socket.on('on-shelf-changed', data => {
        console.log(data);
        io.emit('on-shelf-data-changed', `response from socket server!!!!`)
    })
})

server.listen(PORT, () => {
    console.log(`Listening for request on port ${PORT}`);
})

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Routes */
// app.get('/', (request, response) => {
//     response.status(200).json({
//         name: "Hoa",
//         doing: "Nothing to do"
//     });
// })

app.get('/', (req, res) => {
    res.status(200).send("Head to /user/:id and replace :id with your user")
});

app.post('/notifys', (req, res) => {
    io.emit('on-shelf-data-changed', `response from socket server!!!!`)
    res.status(200).send("OK")
});


const userRouter = require('./routes/user');
app.use('/user', userRouter);

const bookRouter = require('./routes/book')
app.use('/books', bookRouter);

const notifyRouter = require('./routes/notify')
app.use('/notify', notifyRouter);

/** Start  listening*/
// app.listen(PORT, () => {
//     console.log(`Listening for request on port ${PORT}`);
// })