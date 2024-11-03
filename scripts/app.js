const wonderListElement = document.getElementById('wonder-list');

// Selecting the <select> tag
const dd = document.getElementById("time-period-dd")

dd.addEventListener("change", () => {
  const current_value = dd.value;
  window.location.href = "?time_period=" + current_value
})

//async function to fetch all wonders
async function fetchWonders() {
  try {
    const time_period = getQueryParam("time_period")
    const response = await axios.get(BASE_URL + "?time_period=" + time_period);
    displayWonders(response.data);
  } catch (error) {
    console.error("Error fetching wonders:", error);
    wonderListElement.innerHTML = "<p>Failed to load wonders. Please try again later.</p>";
  }
}

//async function to fetch dropdown filters
async function fetchTimePeriods() {
  try {
    const response = await axios.get(BASE_URL + "/time-periods");
    filter_elements = response.data;

    // Fetching the initial HTML
    let current_html = dd.innerHTML

    // Looping over the element returned to create an option for each one
    filter_elements.map((element) => {

      // Creating an option for each element returned
      current_html += `<option value='${element}'>${element}</option>`
    })

    // Appending the options to the <select> tag
    dd.innerHTML = current_html
    setSelectedOption()
  } catch (error) {
    console.error("Error fetching wonders:", error);
  }
}

function setSelectedOption() {
  const selected_value = getQueryParam("time_period")
  dd.value = selected_value
}

//displaying wonders on html
function displayWonders(wonders) {
  wonderListElement.innerHTML = '';
  wonders.forEach((wonder) => {

    const { name, links, summary } = wonder
    const wonderElement = document.createElement('div');
    wonderElement.classList.add('wonder');

    let imagesHTML = '';
    if (links && links.images && links.images.length > 0) {
      imagesHTML = `<img src="${links.images[0]}" alt="${name}" loading="lazy" />`;
    } else {
      console.warn(`No images found for: ${name}`);
    }

    wonderElement.innerHTML = `
        ${imagesHTML}
        <h2>${name}</h2>
        <p>${summary}</p>
        <a href="wonder.html?name=${name}">View Details</a>
      `;

    wonderListElement.appendChild(wonderElement);
  });
}

setSelectedOption()
fetchTimePeriods();
fetchWonders();