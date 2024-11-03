// Get the wonder ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const wonderId = urlParams.get('id');
const wonderDetailsElement = document.getElementById('wonder-details');

// Fetch and display details of a specific wonder
async function fetchWonderDetails(wonderId) {
    try {
      const response = await axios.get(`https://www.world-wonders-api.org/v0/wonders/${wonderId}`);
      const wonder = response.data;
      displayWonderDetails(wonder);
    } catch (error) {
      console.error("Error fetching wonder details:", error);
      wonderDetailsElement.innerHTML = "<p>Failed to load wonder details. Please try again later.</p>";
    }
  }
  

// Display the selected wonder's details
function displayWonderDetails(wonder) {
  wonderDetailsElement.innerHTML = `
    <h1>${wonder.name}</h1>
    <img src="${wonder.imageUrl || 'placeholder.jpg'}" alt="${wonder.name}">
    <p><strong>Location:</strong> ${wonder.location}</p>
    <p><strong>Description:</strong> ${wonder.longDescription || 'No description available.'}</p>
  `;
}

// Fetch wonder details when the page loads
fetchWonderDetails();