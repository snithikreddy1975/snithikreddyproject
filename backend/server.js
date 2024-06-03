const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database
const db = new sqlite3.Database(':memory:');

// Create table
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");
});

// CRUD operations
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ id: this.lastID });
    });
});

app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM users WHERE id = ?", id, function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});