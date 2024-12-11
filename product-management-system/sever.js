// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// In-memory data storage
let products = [];
let users = {
    admin: { username: 'admin', password: 'admin', role: 'admin' },
    user: { username: 'user', password: 'user', role: 'user' }
};

// Routes
app.use('/products', productRoutes(products));

// Login routes
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && user.password === password) {
        req.session.user = user;
        if (user.role === 'admin') {
            return res.redirect('/products/admin');
        } else {
            return res.redirect('/products/user');
        }
    }
    res.send('Invalid credentials');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});