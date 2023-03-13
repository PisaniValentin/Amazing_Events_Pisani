const mainContainer = document.getElementById('main');

mainContainer.innerHTML = insertCards(eventos.events);

let categoriasContainer = document.getElementById('categorias');

categoriasContainer.innerHTML = generateCategories(eventos.events);


