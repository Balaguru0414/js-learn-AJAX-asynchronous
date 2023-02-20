'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend',msg)
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data,className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}m people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*const getCountry = function (country) {
const request = new XMLHttpRequest();
request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
request.send();
request.addEventListener('load',function () {
  // console.log(this.responseText);
  const [data] = JSON.parse(this.responseText);
  console.log(data);
  const ind = `
  <article class="country">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population/10000000).toFixed(1)}C people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0]}</p>
        <p class="country__row"><span>💰</span>${data.currencies.name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend',ind);
  countriesContainer.style.opacity = 1;
});
};
getCountry('india');
getCountry('usa');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}m people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
////////////////////////////////////////////////////////////////////
const getCountryAndNeighbour = function (country) {

  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country 1
    renderCountry(data);    

    // Get Neighbour Country 
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 1
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load',function () {
      // console.log(this.responseText)
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2,'neighbour'); 
    })

  });
};

getCountryAndNeighbour('usa');
*/

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(function (response) {
//     // console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     // console.log(data);
//     renderCountry(data[0]);
//   });
// };

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% fetch() %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const getCountryData = function (country) {

  // country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
    // console.log(data);

    const neighbour = data[0].borders[0];
    if (!neighbour) return;

    // country 2
    return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)    
  })
  .then(response => response.json())
  .then(data => renderCountry(data,'neighbour'))
  .catch(err => {
    console.error(`${err} :(`);
    renderError(`Something went Wrong ${err} : Try again`)
  })
  .finally(() => {
    countriesContainer.style.opacity = 1;
  })
};

// getCountryData('usa');
btn.addEventListener('click', function () {
  getCountryData('germany');
})
getCountryData('dfgg');













