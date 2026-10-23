const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Şimdilik geçici veri, ileride veritabanına taşıyacağız
const cars = [
  { id: 1, brand: 'BMW', model: 'M3 E30', year: 1988 },
  { id: 2, brand: 'Toyota', model: 'Supra MK4', year: 1993 },
  { id: 3, brand: 'Nissan', model: 'Skyline GT-R R34', year: 1999 },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.listen(3000, () => {
  console.log('Backend 3000 portunda çalışıyor');
});