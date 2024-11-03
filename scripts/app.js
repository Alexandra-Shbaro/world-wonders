// API URL
const API_URL = 'https://www.world-wonders-api.org/v0/wonders';
const wonderListElement = document.getElementById('wonder-list');

//async function to fetch all wonders
async function fetchWonders() {
  try {
    const response = await axios.get(API_URL); 
    displayWonders(response.data);
  } catch (error) {
    console.error("Error fetching wonders:", error);
    wonderListElement.innerHTML = "<p>Failed to load wonders. Please try again later.</p>";
  }
}

//displaying wonders on html
function displayWonders(wonders) {
    wonderListElement.innerHTML = '';
    wonders.forEach((wonder, index) => {
      const wonderElement = document.createElement('div');
      wonderElement.classList.add('wonder');
  
      let imagesHTML = '';
      if (wonder.links && wonder.links.images && wonder.links.images.length > 0) {
        imagesHTML = `<img src="${wonder.links.images[0]}" alt="${wonder.name}" />`;
      } else {
        console.warn(`No images found for: ${wonder.name}`);
      }
  
      wonderElement.innerHTML = `
        ${imagesHTML}
        <h2>${wonder.name}</h2>
        <p>${wonder.summary}</p>
        <a href="wonder.html?index=${index}">View Details</a>
      `;
  
      wonderListElement.appendChild(wonderElement);
    });
  }

fetchWonders(); 