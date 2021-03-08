if (!zipData) return;
const places = zipData.places[0];
const elements = [];

elements.push(makeElement('div', 'Country', 'box', 'header'));
elements.push(makeElement('div', 'Abbreviation', 'box', 'header'));
elements.push(makeElement('div', 'State', 'box', 'header'));
elements.push(makeElement('div', 'City', 'box', 'header'));
elements.push(makeElement('div', 'Longitude', 'box', 'header'));
elements.push(makeElement('div', 'Latitude', 'box', 'header'));

elements.push(makeElement('div', zipData.country, 'box'));
elements.push(makeElement('div', zipData['country abbreviation'], 'box'));
elements.push(makeElement('div', places.state, 'box'));
elements.push(makeElement('div', places['place name'], 'box'));
elements.push(makeElement('div', places.longitude, 'box'));
elements.push(makeElement('div', places.latitude, 'box'));

elements.forEach((ele) => {
  grid.appendChild(ele);
});

fillStateShape(places['state abbreviation']);



function makeElement(type, content, classWord, auxClass) {
  const newEl = document.createElement(type);
  newEl.textContent = content;

  if (classWord) {
    newEl.classList.add(classWord);
  }
  if (auxClass) {
    newEl.classList.add(auxClass);
  }
  return newEl;
}



function fillStateShape(stateAbr) {
  console.log(stateShape);
  const imgEl = document.createElement('img');
  imgEl.src = `./states/${stateAbr}.svg`;
  imgEl.id = 'shape';
  display.appendChild(makeElement('p', 'State Shape'));
  display.appendChild(imgEl);
}