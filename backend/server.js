const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Temporary data, will be moved to the database later
const cars = [
  { id: 1, brand: 'BMW', model: 'M3 E30', year: 1988 },
  { id: 2, brand: 'Toyota', model: 'Supra MK4', year: 1993 },
  { id: 3, brand: 'Nissan', model: 'Skyline GT-R R34', year: 1999 },
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Returns all cars
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});