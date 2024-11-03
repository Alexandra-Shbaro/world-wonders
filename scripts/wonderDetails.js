const wonderDetailsElement = document.getElementById('wonder-details');

async function fetchWonderDetails() {

  const name = getQueryParam("name")

  try {
    const response = await axios.get(BASE_URL + "?name=" + name);
    const wonders = response.data;

    // Selecting the first returned wonder
    const target_wonder = wonders[0]
    displayWonderDetails(target_wonder)

  } catch (error) {
    console.error("Error fetching wonder details:", error);
    wonderDetailsElement.innerHTML = "<p>Failed to load wonder details. Please try again later.</p>";
  }
}

function displayWonderDetails(wonder) {

  const { name, links, summary, location, time_period, build_year } = wonder

  let imageHTML = '';
  if (links && links.images && links.images.length > 0) {
    imageHTML = `<img src="${links.images[0]}" alt="${name}">`; // Display the first image
  }

  wonderDetailsElement.innerHTML = `
    ${imageHTML}
    <h2>${name}</h2>
    <p>${summary}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Time Period:</strong> ${time_period}</p>
    <p><strong>Build Year:</strong> ${build_year}</p>
  `;
}

fetchWonderDetails(); 
