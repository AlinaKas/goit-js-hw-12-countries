import './sass/main.scss'
import API from './js/fetchCountries'
import countriesList from './templates/countriesList.hbs'
import countryCardTpl from './templates/cardMarkup.hbs'

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import debounce from 'lodash.debounce';


const refs = {
    container: document.querySelector('.container'),
    input: document.querySelector('#search'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    // const searchQuery = refs.input.value;

    API.fetchCountries(searchQuery).then(renderCountryCard)
        .catch(onFetchError)
};

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.container.innerHTML = markup;
    // refs.input.value = '';

    if (country.status === 404 || country.length > 10) {
        refs.container.innerHTML = '';
    onFetchError();
    return;
    }

    if (country.length >= 2 && country.length <= 10) {
    const markupList = countriesList(country);
        refs.container.innerHTML = markupList;
    return;
  }
};

function onFetchError() {
    error({
        title: 'TRY AGAIN!',
        text: 'Too many matches found.Please enter a more specific query!',
        delay: 3000,
  })
};




