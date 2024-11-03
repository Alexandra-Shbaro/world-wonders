const API_URL = 'https://www.world-wonders-api.org/v0/wonders';
const wonderDetailsElement = document.getElementById('wonder-details');

async function fetchWonderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const wonderIndex = urlParams.get('index'); 

  if (wonderIndex === null) {
    wonderDetailsElement.innerHTML = "<p>Wonder not found.</p>";
    return;
  }

  try {
    const response = await axios.get(API_URL);
    const wonders = response.data;

    if (wonders[wonderIndex]) {
      displayWonderDetails(wonders[wonderIndex]);
    } else {
      wonderDetailsElement.innerHTML = "<p>Wonder not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching wonder details:", error);
    wonderDetailsElement.innerHTML = "<p>Failed to load wonder details. Please try again later.</p>";
  }
}

function displayWonderDetails(wonder) {
  let imageHTML = '';
  if (wonder.links && wonder.links.images && wonder.links.images.length > 0) {
    imageHTML = `<img src="${wonder.links.images[0]}" alt="${wonder.name}">`; // Display the first image
  }

  wonderDetailsElement.innerHTML = `
    <h2>${wonder.name}</h2>
    ${imageHTML} <!-- Only display the image if it exists -->
    <p>${wonder.summary}</p>
    <p>Location: ${wonder.location}</p>
    <p>Time Period: ${wonder.time_period}</p>
    <p>Build Year: ${wonder.build_year}</p>
  `;
}

fetchWonderDetails(); 
