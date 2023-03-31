'use strict';
const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');
const themeChanger = document.querySelector('.theme');
const getMap = document.querySelector('.get-map')

function renderData(data) {
	flagImage.src = data.flags.svg;
	countryNameH1.innerText = data.name.common;
	population.innerText = data.population.toLocaleString('en-IN');
	region.innerText = data.region;
	topLevelDomain.innerText = data.tld.join(', ');

	if (data.capital) {
		capital.innerText = data.capital?.[0];
	}

	if (data.subregion) {
		subRegion.innerText = data.subregion;
	}

	if (data.name.nativeName) {
		nativeName.innerText = Object.values(data.name.nativeName)[0].common;
	} else {
		nativeName.innerText = data.name.common;
	}

	if (data.currencies) {
		currencies.innerText = Object.values(data.currencies)
			.map((currency) => currency.name)
			.join(', ');
	}

	if (data.languages) {
		languages.innerText = Object.values(data.languages).join(', ');
	}
}
function renderError(msg) {
	borderCountries.insertAdjacentText('beforeend', msg);
}
const countryDetail = () => {
	fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
		.then((res) => res.json())
		.then(([data]) => {
			renderData(data);
			if (data.borders) {
				data.borders.forEach((border) => {
					fetch(`https://restcountries.com/v3.1/alpha/${border}`)
						.then((res) => {
							if (!res.ok) throw new Error(`fkfegj`);
							return res.json();
						})
						.then(([borderCountry]) => {
							console.log(borderCountry);
							const borderCountryTag = document.createElement('a');
							borderCountryTag.innerText = borderCountry.name.common;
							borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
							borderCountries.append(borderCountryTag);
						})
                        .catch((err) => {
                            new Error(renderError(`no border found ${err.message}`));
                        });
				});
			}
		})
	
};
countryDetail();

themeChanger.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});
