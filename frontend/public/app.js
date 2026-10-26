// Fetch the car list from the backend and show it on the page
async function loadCars() {
    const list = document.getElementById('car-list');
  
    try {
      const response = await fetch('/api/cars');
      const cars = await response.json();
  
      list.innerHTML = '';
      cars.forEach((car) => {
        const card = document.createElement('div');
        card.className = 'car-card';
  
        const title = document.createElement('h3');
        title.textContent = car.brand + ' ' + car.model;
  
        const year = document.createElement('p');
        year.textContent = 'Year: ' + car.year;
  
        card.appendChild(title);
        card.appendChild(year);
        list.appendChild(card);
      });
    } catch (error) {
      list.textContent = 'Could not load cars. Is the backend running?';
    }
  }
  
  loadCars();