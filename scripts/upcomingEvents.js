const mainContainer = document.getElementById('main');
const input = document.querySelector('input');


let categoriasContainer = document.getElementById('categorias');


input.addEventListener('input', combinedFilter);
categoriasContainer.addEventListener('change', combinedFilter);


let eventsArray = [];

const initPage = async () => {
  try {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    if (response) {
      const eventos = await response.json();
      eventsArray = eventos.events;
      let eventsArrayFiltered = eventsArray.filter(dato => dato.date > eventos.currentDate);
      insertCards(eventsArrayFiltered);
      categoriasContainer.innerHTML = generateCategories(eventsArrayFiltered);
    }

  }
  catch (error) {
    console.log(error);
  }
}

initPage();


/**
 * 
 * @param {*} array array to be iterated and transformed into cards.
 * @returns html template with cards.
 */
function insertCards(array) {
  if (array.length == 0) {
    mainContainer.innerHTML = `<div class="filterAlert">
        <h2 class='display-1 fw-bolder'>No coincidences!</h2>
    </div>`
    return

  }
  let cards = '';
  array.forEach(datos => {
    cards += `<div class="columna col-12 col-sm-6 col-lg-3">
          <div class="cardTop">
            <img src=${datos.image}>
          </div>
          <div class="cardBot row">
            <div class="cardBotHeader row">
              <h5>${datos.name}</h5>
              <p>${datos.description}</p>
              <p>Date: ${datos.date}</p>
              <p>Capacity: ${datos.capacity}</p>
              <p>Estimate: ${datos.estimate}</p>
            </div>
            <div class="cardBotFooter row">
              <div class="cardPrice col-6">price $ ${datos.price}</div>
              <div class="cardButton col-6">
                <a class="verMasButton" href="./details.html?name=${datos.name}">See more</a>
              </div>
            </div>
          </div>
        </div>`
  });
  mainContainer.innerHTML = cards;
}

/**
 * 
 * @param {*} array array to be iterated to get categories.
 * @returns html template of categories.
 */

function generateCategories(array) {
  let opciones = '';
  let set = new Set();

  array.forEach(dato => {
    if (!set.has(dato.category)) {
      opciones += `<div class="form-check form-check-inline">
        <input class="form-check-input" role="switch" type="checkbox" id="${dato.category}" value="${dato.category}">
        <label class="form-check-label" for="${dato.category}">${dato.category}</label>
        </div>`
      set.add(dato.category);
    }
  });
  return opciones;
}

function filterByText(arrayDatos, texto) {
  let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}

function filterByCheckboxes(arrayInfo) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let arrayChecks = Array.from(checkboxes);
  let checksChecked = arrayChecks.filter(check => check.checked);
  if (checksChecked.length == 0) {
    return arrayInfo;
  }
  let checkValues = checksChecked.map(check => check.value);
  let arrayFiltrado = arrayInfo.filter(elemento => checkValues.includes(elemento.category));
  return arrayFiltrado;
}

function combinedFilter() {
  let filteredByText = filterByText(eventsArray, input.value);
  let filteredByTextAndCheckbox = filterByCheckboxes(filteredByText);
  insertCards(filteredByTextAndCheckbox);
}