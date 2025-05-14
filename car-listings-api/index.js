const express = require('express');
const app = express();
const db = require('./database');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Car Listings API is running 🚗');
});

// Get all cars
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single car
app.get('/cars/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM cars WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Car not found' });
    res.json(row);
  });
});

// Add new car
app.post('/cars', (req, res) => {
  const { make, model, year, price, mileage, color } = req.body;
  const sql = 'INSERT INTO cars (make, model, year, price, mileage, color) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [make, model, year, price, mileage, color];
  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

// Update car
app.put('/cars/:id', (req, res) => {
  const { make, model, year, price, mileage, color } = req.body;
  const sql = 'UPDATE cars SET make = ?, model = ?, year = ?, price = ?, mileage = ?, color = ? WHERE id = ?';
  const values = [make, model, year, price, mileage, color, req.params.id];
  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Car updated', changes: this.changes });
  });
});

// Delete car
app.delete('/cars/:id', (req, res) => {
  db.run('DELETE FROM cars WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Car deleted', changes: this.changes });
  });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
