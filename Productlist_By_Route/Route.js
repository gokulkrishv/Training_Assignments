const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let products = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index', { products });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { name, price } = req.body;
    if (name && price) {
        products.push({ name, price });
    }
    res.redirect('/'); 
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
