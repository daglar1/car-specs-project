let cars = [];

// Which specs to show, and whether a higher or lower value is better
const SPECS = [
  { label: 'Year', key: 'year' },
  { label: 'Engine', key: 'engine' },
  { label: 'Horsepower', key: 'horsepower', unit: 'hp', better: 'higher' },
  { label: 'Torque', key: 'torque_nm', unit: 'Nm', better: 'higher' },
  { label: '0-100 km/h', key: 'zero_to_100', unit: 's', better: 'lower' },
  { label: 'Weight', key: 'weight_kg', unit: 'kg', better: 'lower' },
];

function formatValue(value, unit) {
  if (value === null || value === undefined) {
    return '-';
  }
  return unit ? value + ' ' + unit : String(value);
}

// Fill a dropdown with all cars
function fillSelect(select) {
  cars.forEach((car) => {
    const option = document.createElement('option');
    option.value = car.id;
    option.textContent = car.brand + ' ' + car.model + ' (' + car.year + ')';
    select.appendChild(option);
  });
}

// Returns 'a', 'b' or null depending on which value is better
function findWinner(spec, valueA, valueB) {
  if (!spec.better || valueA === null || valueB === null) {
    return null;
  }
  const a = Number(valueA);
  const b = Number(valueB);
  if (a === b) {
    return null;
  }
  if (spec.better === 'higher') {
    return a > b ? 'a' : 'b';
  }
  return a < b ? 'a' : 'b';
}

function showComparison() {
  const idA = Number(document.getElementById('car-a').value);
  const idB = Number(document.getElementById('car-b').value);
  const carA = cars.find((car) => car.id === idA);
  const carB = cars.find((car) => car.id === idB);

  document.getElementById('name-a').textContent = carA.brand + ' ' + carA.model;
  document.getElementById('name-b').textContent = carB.brand + ' ' + carB.model;

  const body = document.getElementById('compare-body');
  body.innerHTML = '';

  SPECS.forEach((spec) => {
    const row = document.createElement('tr');
    const winner = findWinner(spec, carA[spec.key], carB[spec.key]);

    const label = document.createElement('td');
    label.textContent = spec.label;

    const cellA = document.createElement('td');
    cellA.textContent = formatValue(carA[spec.key], spec.unit);
    if (winner === 'a') {
      cellA.className = 'better';
    }

    const cellB = document.createElement('td');
    cellB.textContent = formatValue(carB[spec.key], spec.unit);
    if (winner === 'b') {
      cellB.className = 'better';
    }

    row.appendChild(label);
    row.appendChild(cellA);
    row.appendChild(cellB);
    body.appendChild(row);
  });
}

async function init() {
  try {
    const response = await fetch('/api/cars');
    cars = await response.json();

    const selectA = document.getElementById('car-a');
    const selectB = document.getElementById('car-b');
    fillSelect(selectA);
    fillSelect(selectB);

    // Start with the first two cars selected
    if (cars.length > 1) {
      selectB.value = cars[1].id;
    }

    selectA.addEventListener('change', showComparison);
    selectB.addEventListener('change', showComparison);
    showComparison();
  } catch (error) {
    document.getElementById('compare-body').textContent = 'Could not load cars.';
  }
}

init();