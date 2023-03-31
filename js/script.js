'use strict';
const themeChanger = document.querySelector('.theme');
const input = document.querySelector('[input-search]');
const filterRegion = document.querySelector('[btn-filter]');
const countryContainer = document.querySelector('[countries-container]');
let AllcountryData;

const renderData = (data) => {
	countryContainer.innerHTML = '';
	data.map((country) => {
		const countryCard = document.createElement('a');
		countryCard.classList = 'country-card';
		countryCard.href = `/country.html?name=${country.name.common}`;
		countryCard.innerHTML = `
                      <img src="${country.flags.svg}" alt="${country.name.common}" />
						<div class="card-text">
							<h3 class="card-title">${country.name.common}</h3>
							<p><b>Population:</b>${country.population}</p>
							<p><b>Region: </b>${country.region}</p>
							<p><b>Capital:</b> ${country.capital}</p>
						</div>
    `;
		return countryContainer.append(countryCard);
	});
};
function renderError(msg) {
	countryContainer.insertAdjacentText('beforeend', msg);
}
const fetchCountryData = () => {
	new Promise((resolve, reject) => {
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => {
				if (!res.ok) throw new Error(`country not found ${response.status}`);
				return res.json();
			})
			.then((data) => {
				resolve(data);
				renderData(data);
				AllcountryData = data;
				console.log(AllcountryData);
			})
			.catch((err) => {
				reject(new Error(renderError(`location not found ${err.message}`)));
			});
	});
};
fetchCountryData();

// filter region
filterRegion.addEventListener('change', () => {
	fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
		.then((res) => res.json())
		.then((data) => {
			renderData(data);
		});
});

//search input

input.addEventListener('input', (e) => {
	const value = e.target.value.toLowerCase();
	const searchCounty = AllcountryData.filter((country) =>
		country.name.common.toLowerCase().includes(value)
	);

	console.log(searchCounty);
	// if (value != searchCounty) {
	// 	console.log('erf');
	// 	const html = `
	// <h2 class='error'>COUNTRY NOT FOUND! </h2>
	// <p class='error'>Insert correct country name </p>
	// `;
	// 	countryContainer.insertAdjacentHTML('beforebegin', html);
	// }
	renderData(searchCounty);
});

// themeChanger
themeChanger.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});
