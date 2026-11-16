// Read the car id from the URL, e.g. car.html?id=2
const params = new URLSearchParams(window.location.search);
const carId = params.get('id');

// Ask Wikipedia for the main photo of the best matching article
async function findWikiPhoto(car) {
  const query = encodeURIComponent(car.brand + ' ' + car.model);
  const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*'
    + '&generator=search&gsrlimit=1&gsrsearch=' + query
    + '&prop=pageimages&piprop=thumbnail&pithumbsize=640';
  const response = await fetch(url);
  const data = await response.json();
  if (!data.query) {
    return null;
  }
  const page = Object.values(data.query.pages)[0];
  return page.thumbnail ? page.thumbnail.source : null;
}

// Show a placeholder first, then swap it for the real photo when it is found
function addPhoto(container, car, extraClass) {
  const placeholder = document.createElement('div');
  placeholder.className = 'car-photo placeholder ' + extraClass;
  placeholder.textContent = car.brand;
  container.appendChild(placeholder);

  const showImage = (src) => {
    const photo = document.createElement('img');
    photo.className = 'car-photo ' + extraClass;
    photo.src = src;
    photo.alt = car.brand + ' ' + car.model;
    placeholder.replaceWith(photo);
  };

  // A manual link in the database always wins
  if (car.image_url) {
    showImage(car.image_url);
    return;
  }

  findWikiPhoto(car)
    .then((src) => {
      if (src) {
        showImage(src);
      }
    })
    .catch(() => {
      // Keep the placeholder if Wikipedia cannot be reached
    });
}

// Show "-" when a value is missing in the database
function formatValue(value, unit) {
  if (value === null || value === undefined) {
    return '-';
  }
  return unit ? value + ' ' + unit : String(value);
}

// Add one table row with the given cell texts
function addRow(tbody, cells) {
  const row = document.createElement('tr');
  cells.forEach((text) => {
    const cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
  });
  tbody.appendChild(row);
}

function showSpecs(car) {
  const body = document.getElementById('specs-body');
  addRow(body, ['Engine', formatValue(car.engine)]);
  addRow(body, ['Horsepower', formatValue(car.horsepower, 'hp')]);
  addRow(body, ['Torque', formatValue(car.torque_nm, 'Nm')]);
  addRow(body, ['0-100 km/h', formatValue(car.zero_to_100, 's')]);
  addRow(body, ['Weight', formatValue(car.weight_kg, 'kg')]);
}

function showParts(parts) {
  const body = document.getElementById('parts-body');
  if (parts.length === 0) {
    addRow(body, ['No parts added yet', '', '']);
    return;
  }
  parts.forEach((part) => {
    addRow(body, [part.name, part.category, part.part_number]);
  });
}

async function loadCar() {
  const title = document.getElementById('car-title');

  if (!carId) {
    title.textContent = 'No car selected';
    return;
  }

  try {
    // Send both requests at the same time
    const [carResponse, partsResponse] = await Promise.all([
      fetch('/api/cars/' + carId),
      fetch('/api/cars/' + carId + '/parts'),
    ]);

    if (!carResponse.ok) {
      title.textContent = 'Car not found';
      return;
    }

    const car = await carResponse.json();
    const parts = await partsResponse.json();

    title.textContent = car.brand + ' ' + car.model + ' (' + car.year + ')';
    document.title = car.brand + ' ' + car.model;
    addPhoto(document.getElementById('car-photo'), car, 'large');
    showSpecs(car);
    showParts(parts);
  } catch (error) {
    title.textContent = 'Could not load car. Is the backend running?';
  }
}

loadCar();