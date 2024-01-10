const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

/**
 * Define constants
 */
const app = express();
const port = 3002;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, HEAD',
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/**
 * Store users and messages in memory
 */
const users = [];
const messages = [];

/**
 * Register a new user
 */
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(409).json({ error: 'Username already taken' });
    }

    const newUser = {
        username,
        password,
    };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

/**
 * Authenticate user
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = users.find((u) => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

/**
 * Show users
 */

app.get('/api/users', (req, res) => {
    const userList = users.map(user => user.username);
    res.status(200).json(userList);
});

/**
 * Get all messages
 */
app.get('/api/messages', (req, res) => {
    const { currentUser, recipientUser } = req.query;
    const filteredMessages = messages.filter(msg => (
        (msg.from === currentUser && msg.to === recipientUser) ||
        (msg.from === recipientUser && msg.to === currentUser)
    ));
    res.status(200).json(filteredMessages);
});

/**
 * Send a message
 */
app.post('/api/messages', (req, res) => {
    const { from, to, content } = req.body;
    const newMessage = { from, to, content };
    console.log('New message:', newMessage);
    messages.push(newMessage);
    res.status(200).json(newMessage);
});

/**
 * Websocket handler
*/
wss.on('connection', (ws) => {
    console.log('WebSocket connected');

    ws.on('message', (message) => {
        console.log('Received WebSocket message:', message);

        const messageString = message.toString('utf-8');
        console.log('Converted WebSocket message to string:', messageString);

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                try {
                    const parsedMessage = JSON.parse(messageString);
                    console.log('Parsed WebSocket message:', parsedMessage);

                    const newMessageString = JSON.stringify(parsedMessage);
                    console.log('Sending WebSocket message:', newMessageString);
                    client.send(newMessageString);
                } catch (error) {
                    console.error('Invalid JSON format:', messageString);
                }
            }
        });
    });
});

/**
 * Export users and messages
 */
module.exports = {
    users,
    messages,
};

/**
 * Run server
 */
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});