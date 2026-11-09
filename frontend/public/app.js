// Fetch the car list from the backend and show it on the page
async function loadCars() {
  const list = document.getElementById('car-list');

  try {
    const response = await fetch('/api/cars');
    const cars = await response.json();

    list.innerHTML = '';
    cars.forEach((car) => {
      // Each card is a link to the detail page of the car
      const card = document.createElement('a');
      card.className = 'car-card';
      card.href = 'car.html?id=' + car.id;

      const title = document.createElement('h3');
      title.textContent = car.brand + ' ' + car.model;

      const info = document.createElement('p');
      info.textContent = car.year + ' · ' + car.horsepower + ' hp';

      card.appendChild(title);
      card.appendChild(info);
      list.appendChild(card);
    });
  } catch (error) {
    list.textContent = 'Could not load cars. Is the backend running?';
  }
}

// Fetch the most viewed cars (counted through Kafka)
async function loadPopular() {
  const list = document.getElementById('popular-list');

  try {
    const response = await fetch('/api/popular-cars');
    const cars = await response.json();

    list.innerHTML = '';
    if (cars.length === 0) {
      const item = document.createElement('li');
      item.textContent = 'No views yet. Open a car page!';
      list.appendChild(item);
      return;
    }

    cars.forEach((car) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = 'car.html?id=' + car.id;
      link.textContent = car.brand + ' ' + car.model;

      const views = document.createElement('span');
      views.textContent = ' · ' + car.views + ' views';

      item.appendChild(link);
      item.appendChild(views);
      list.appendChild(item);
    });
  } catch (error) {
    list.textContent = 'Could not load popular cars.';
  }
}

loadPopular();
loadCars();