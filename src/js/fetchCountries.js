
const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(country) {
        return fetch(`${BASE_URL}/name/${country}`)
            .then(response => response.json())
}
export default { fetchCountries };

