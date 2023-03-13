const mainContainer = document.getElementById('main');

let pastEventsArray = eventos.events.filter(dato => dato.date < eventos.currentDate);


mainContainer.innerHTML = insertCards(pastEventsArray);


let categoriasContainer = document.getElementById('categorias');
categoriasContainer.innerHTML = generateCategories(pastEventsArray);