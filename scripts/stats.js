const mainContainer = document.getElementById('main');
const tableContainer = document.getElementById('tabla');

let eventsArray = [];

const initPage = async () => {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        if (response) {
            const eventos = await response.json();
            eventsArray = eventos.events;
            let categoryArray = getCategories(eventsArray);
            categoryArray.forEach(category => {
                let revenues =  calculateRevenues(eventsArray, category);
                tableContainer.innerHTML += `<tr>
                <td>${category}</td>
                <td>${revenues}</td>
                <td>&nbsp;</td>
                </tr>
                <tr>`
            })
        }

    }
    catch (error) {
        console.log(error);
    }
}

initPage();
generateTable();

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
        }
    });
    return revenues;
}

function generateTable() {

    tableContainer.innerHTML = `<tr>
    <th colspan="3">Event statistics</th>
  </tr>
  <tr>
    <td>Events with lowest percentage of attendance</td>
    <td>Events with highest percentage of attendance</td>
    <td>Event with larger capacity</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>

  <tr>
    <th colspan="3"> Upcoming Events statistics by category</th>
  </tr>
  <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>

  <tr>
  <th colspan="3">Past Events statistics by category</th>
  </tr>
 
`;
}



{/* <tr>
<td>Categories</td>
<td>Revenues</td>
<td>Percentage of attendance</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr> */}