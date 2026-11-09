const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { startKafka, sendCarViewed } = require('./kafka');

const app = express();
app.use(cors());

// Database connection settings come from docker-compose environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Returns all cars from the database
app.get('/api/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Returns the most viewed cars (view counts are updated through Kafka)
app.get('/api/popular-cars', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, brand, model, year, views FROM cars WHERE views > 0 ORDER BY views DESC LIMIT 5'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Returns a single car by id and sends a "car viewed" event to Kafka
app.get('/api/cars/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    const car = result.rows[0];

    // Asynchronous: we do not wait for Kafka, the user gets the answer right away
    sendCarViewed(car.id).catch((error) => {
      console.error('Kafka send failed:', error.message);
    });

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Returns all spare parts of a car
app.get('/api/cars/:id/parts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, category, part_number FROM parts WHERE car_id = $1 ORDER BY category, name',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
  startKafka(pool).catch((error) => {
    console.error('Kafka start failed:', error.message);
  });
});