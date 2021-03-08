// Declare variables
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  display = document.getElementById('display'),
  resultMessage = document.getElementById('result-message'),
  regex = /^\d{5}(?:[-\s]\d{4})?$/g,
  apiUrl = `https://api.zippopotam.us/us/`;

let apiData = null;

// Search zip and fetch api
async function searchZip(e) {
  e.preventDefault();
  const term = search.value.trim();

  if (!term.match(regex)) {
    resultMessage.innerHTML = `<p>Invalid zip code. Try again!</p>`;
    display.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(apiUrl + term);
    const zipData = await response.json();
    resultMessage.innerHTML = `<p>Search results for ${term}</p>`;
    apiData = camelizeZipData(zipData);
    populateCard(apiData);
  } catch (error) {
    console.log(error);
  }
}

function camelizeZipData(data) {
  const result = {};
  for (const property in data) {
    if (!Array.isArray(data[property])) {
      const value = data[property];
      result[camelize(property)] = value;
    } else {
      let obj = data[property][0];
      for (const property in obj) {
        const value = obj[property];
        result[camelize(property)] = value;
      }
    }
  }
  return result;
}

// Camelize function pulled from stackoverflow
// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
function camelize(text) {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
}

function isEmpty(data) {
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(data) === JSON.stringify({});
}

// Populate card with data
function populateCard(data) {
  if (isEmpty(data) || !data) {
    display.innerHTML = '';
    resultMessage.innerHTML = `<p>This zip doesn't exist. Try again!</p>`;
    return;
  }

  const {
    country,
    countryAbbreviation,
    latitude,
    longitude,
    placeName,
    postCode,
    state,
    stateAbbreviation,
  } = data;
  display.innerHTML = `<div class="col-1">
			<div class="data-group">
			  <h3>Country</h3>
			  <h2>${country}</h2>
			</div>
			<div class="data-group">
			  <h3>State</h3>
			  <h2>${state}<span> (${stateAbbreviation})</span></h2>
			</div>
			<div class="data-group">
			  <h3>Longitude</h3>
			  <h2>${longitude}</h2>
			</div>
		</div>
		<div class="col-2">
			<div class="data-group">
			  <h3>Abbreviation</h3>
			  <h2>${countryAbbreviation}</h2>
			</div>
			<div class="data-group">
			  <h3>City</h3>
			  <h2>${placeName}</h2>
			</div>
			<div class="data-group">
			  <h3>Latitude</h3>
			  <h2>${latitude}</h2>
			</div>
		</div>
		<div class="col-3">
			<div class="data-group">
				<h3>State Shape</h3>
				<img src="./states/${stateAbbreviation}.svg" alt="${state}">
			</div>
		</div>`;
}

// Event Listeners
submit.addEventListener('submit', searchZip);
