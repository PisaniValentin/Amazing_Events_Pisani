const mainContainer = document.getElementById('main');
const tableContainer = document.getElementById('tabla');

let eventsArray = [];

const initPage = async () => {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        if (response) {
            const eventos = await response.json();
            eventsArray = eventos.events;
            let pastEventsArray = eventsArray.filter(dato => dato.date < eventos.currentDate);
            let upcomingEventsArray = eventsArray.filter(dato => dato.date > eventos.currentDate);
            generateEventStatistics(pastEventsArray);
            generateUpcomingEventsTable(upcomingEventsArray);
            generatePastEventsTable(pastEventsArray);

        }
    }
    catch (error) {
        console.log(error);
    }
}

initPage();
//generateTable();




function getCategories(array) {
    let set = new Set();
    array.forEach(element => {
        if (!set.has(element.category)) {
            set.add(element.category);
        }
    })
    return Array.from(set);
}

function calculateRevenues(array, category) {
    let revenues = 0;
    array.forEach(element => {
        if (element.category == category && element.assistance != undefined) {
            revenues = revenues + (element.assistance * element.price);
        } else {
            if (element.category == category) {
                revenues = revenues + (element.estimate * element.price);
            }
        }
    });
    return revenues;
}

function calculatePercentage(array, category) {
    let totalAssistance = 0;
    let totalCapacity = 0;
    let res = 0;
    array.forEach(element => {
        if (element.category == category && element.assistance != undefined) {
            totalAssistance += element.assistance;
            totalCapacity += element.capacity;
        } else {
            if (element.category == category) {
                totalAssistance += element.estimate;
                totalCapacity += element.capacity;
            }

        }
    });
    res = (totalAssistance * 100) / totalCapacity;
    return res.toFixed(2);
}

function generateEventStatistics(array) {
    tableContainer.innerHTML += `<tr>
    <th colspan="3">Event statistics</th>
  </tr>
  <tr>
    <td>Events with lowest percentage of attendance</td>
    <td>Events with highest percentage of attendance</td>
    <td>Event with larger capacity</td>
  </tr>`;
    let maximumElement = array[0];
    array.forEach(element => {
        if (element.capacity > maximumElement.capacity) {
            maximumElement = element;
        }
    });
    let lowerPercentage = getLowerPercentageAttendance(array);
    let higherPercentage = getHigherPercentageAttendance(array);
    tableContainer.innerHTML += `<tr>
        <td>${lowerPercentage}</td>
        <td>${higherPercentage}</td>
        <td>${maximumElement.name} ${maximumElement.capacity}</td>
        </tr>
        <tr>`

}

function getLowerPercentageAttendance(array) {
    let minimumElement = array[0];
    let minimumElementPercentage = (minimumElement.assistance * 100) / minimumElement.capacity;
    array.forEach(element => {
        minimumElementPercentage = (minimumElement.assistance * 100) / minimumElement.capacity;
        let elementPercentage = (element.assistance * 100) / element.capacity;
        if (minimumElementPercentage < elementPercentage) {
            minimumElement = element;
        }
    });
    return  minimumElement.name+" "+minimumElementPercentage.toFixed(2);
}

function getHigherPercentageAttendance(array) {
    let maximumElement = array[0];
    let maximumElementPercentage = (maximumElement.assistance * 100) / maximumElement.capacity;
    array.forEach(element => {
        maximumElementPercentage = (maximumElement.assistance * 100) / maximumElement.capacity;
        let elementPercentage = (element.assistance * 100) / element.capacity;
        if (maximumElementPercentage > elementPercentage) {
            maximumElement = element;
        }
    });
    return maximumElement.name+" "+maximumElementPercentage.toFixed(2);
}



function generatePastEventsTable(array) {
    let categoryArray = getCategories(array);
    tableContainer.innerHTML += `<tr>
    <th colspan="3">Past Events statistics by category</th>
    </tr>
    <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
    </tr>`;
    categoryArray.forEach(category => {
        let percentage = calculatePercentage(array, category);
        let revenues = calculateRevenues(array, category);
        tableContainer.innerHTML += `<tr>
        <td>${category}</td>
        <td>${revenues}</td>
        <td>${percentage}</td>
        </tr>
        <tr>`
    })
}

function generateUpcomingEventsTable(array) {
    let categoryArray = getCategories(array);
    tableContainer.innerHTML += `<tr>
    <th colspan="3">Upcoming Events statistics by category</th>
    </tr>
    <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
    </tr>`;
    categoryArray.forEach(category => {
        let percentage = calculatePercentage(array, category);
        let revenues = calculateRevenues(array, category);
        tableContainer.innerHTML += `<tr>
        <td>${category}</td>
        <td>${revenues}</td>
        <td>${percentage}</td>
        </tr>
        <tr>`
    })
}

