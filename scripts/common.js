// API URL
const BASE_URL = 'https://www.world-wonders-api.org/v0/wonders';

// Function to fetch a specific query param
function getQueryParam(prop_name) {
    const url_params = new URLSearchParams(window.location.search);
    const value = url_params.get(prop_name); // Get time_period from query string
    return value
}
