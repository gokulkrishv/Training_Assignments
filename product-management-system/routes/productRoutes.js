// routes/productRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (products) => {
    // Admin routes
    router.get('/admin', (req, res) => {
        if (req.session.user && req.session.user.role === 'admin') {
            res.send(`
                <h1>Admin Dashboard</h1>
                <form action="/products/admin/register" method="POST">
                    <input type="text" name="name" placeholder="Product Name" required>
                    <input type="text" name="id" placeholder="Product ID" required>
                    <input type="number" name="price" placeholder="Price" required>
                    <input type="text" name="category" placeholder="Category" required>
                    <input type="date" name="manufacturingDate" required>
                    <input type="date" name="expirationDate" required>
                    <button type="submit">Register Product</button>
                </form>
                <h2>Product List</h2>
                <ul>
                    ${products.map(product => `<li>${product.name} - ${product.category} - Price: $${product.price}</li>`).join('')}
                </ul>
            `);
        } else {
            res.send('Access denied');
        }
    });

    router.post('/admin/register', (req, res) => {
        const { name, id, price, category, manufacturingDate, expirationDate } = req.body;
        products.push({ name, id, price, category, manufacturingDate, expirationDate });
        res.redirect('/products/admin');
    });

    // User routes
   // routes/productRoutes.js (continued)
    // User routes
    router.get('/user', (req, res) => {
        if (req.session.user && req.session.user.role === 'user') {
            res.send(`
                <h1>User Dashboard</h1>
                <form action="/products/user/search" method="GET">
                    <input type="text" name="nameQuery" placeholder="Search by Name" required>
                    <input type="text" name="categoryQuery" placeholder="Search by Category" required>
                    <button type="submit">Search</button>
                </form>
            `);
        } else {
            res.send('Access denied');
        }
    });

    router.get('/user/search', (req, res) => {
        const nameQuery = req.query.nameQuery.toLowerCase();
        const categoryQuery = req.query.categoryQuery.toLowerCase();
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(nameQuery) || 
            product.category.toLowerCase().includes(categoryQuery)
        );

        res.send(`
            <h1>Search Results</h1>
            <ul>
                ${filteredProducts.length > 0 ? 
                    filteredProducts.map(product => `<li>${product.name} - ${product.category} - Price: $${product.price}</li>`).join('') : 
                    '<li>No products found</li>'
                }
            </ul>
            <a href="/products/user">Back to User Dashboard</a>
        `);
    });

    return router;
};