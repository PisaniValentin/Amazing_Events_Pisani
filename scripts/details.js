const queryString = location.search;
const params = new URLSearchParams(queryString);

const eventName = params.get("name");


const detailsCointainer = document.getElementById('detailsContainer');

const initPage = async () => {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        if (response) {
            const eventos = await response.json();
            eventsArray = eventos.events;
            const evento = eventsArray.find(evento => evento.name == eventName);
            detailsCointainer.innerHTML =
                `<div class="detailsImage ">
                 <img src=${evento.image}>
                </div>
                <div class="detailsDescription">
                <h5>${evento.name}</h5>
                <p>${evento.description}</p>
                </div>`
        }

    }
    catch (error) {
        console.log(error);
    }
}

initPage();

