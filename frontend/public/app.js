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

      addPhoto(card, car, '');
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