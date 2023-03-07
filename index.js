const mainContainer = document.getElementById('main');
let cards = '';
for(datos of eventos.events){
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
          <a class="verMasButton" href="./details.html">See more</a>
        </div>
      </div>
    </div>
  </div>`
}
mainContainer.innerHTML = cards