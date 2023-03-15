const queryString = location.search;
const params = new URLSearchParams(queryString);

const eventName = params.get("name");

const evento = eventos.events.find(evento => evento.name == eventName);
console.log(evento);
const detailsCointainer = document.getElementById('detailsContainer');



detailsCointainer.innerHTML = 
`<div class="detailsImage ">
    <img src=${evento.image}>
</div>
<div class="detailsDescription">
    <h5>${evento.name}</h5>
    <p>${evento.description}</p>
</div>

`