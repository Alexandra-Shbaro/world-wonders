// base API URL
const API_URL = 'https://www.world-wonders-api.org/v0/wonders';
const wonderListElement = document.getElementById('wonder-list');

// async function that fetches data from the API
async function fetchWonders() {
  try {
    const response = await axios.get(API_URL);
    displayWonders(response.data);
  } catch (error) {
    console.error("Error fetching wonders:", error);
    wonderListElement.innerHTML = "<p>Failed to load wonders. Please try again later.</p>";
  }
}

// after fetching data, display the fetched data of the wonders on index
function displayWonders(wonders) {
  wonders.forEach(wonder => {
    const wonderElement = document.createElement('div');
    wonderElement.classList.add('wonder');
    wonderElement.innerHTML = `
      <img src="${wonder.imageUrl || 'placeholder.jpg'}" alt="${wonder.name}">
      <h2>${wonder.name}</h2>
      <p>${wonder.shortDescription || 'No description available.'}</p>
      <button onclick="viewWonderDetails('${wonder.id}')">View Details</button>
    `;
    wonderListElement.appendChild(wonderElement);
  });
}

// redirect new wonder.html (next step)to the specified wonderID in the query parameter
function viewWonderDetails(wonderId) {
    window.location.href = `wonder.html?id=${wonderId}`;
  }

// fetch wonders when the page loads
fetchWonders();