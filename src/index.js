import './sass/main.scss'

import API from './js/fetchCountries'
import getRefs from './js/getRefs'

import countriesList from './templates/countriesList.hbs'
import countryCardTpl from './templates/cardMarkup.hbs'

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import debounce from 'lodash.debounce';


const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    // const searchQuery = refs.input.value;
    refs.container.innerHTML = '';
    if (!searchQuery) {
        return;
  }
    API.fetchCountries(searchQuery).then(renderCountryCard)
        .catch(onFetchError)
};

function renderCountryCard(country) {
    if (country.status === 404) {
        refs.container.innerHTML = '';
    onFetchError();
    return;
    }

    if (country.length > 10) {
        refs.container.innerHTML = '';
    onFetchLengthError();
    return;
    }

    if (country.length >= 2 && country.length <= 10) {
    const markupList = countriesList(country);
        refs.container.innerHTML = markupList;
    return;
    }

    const markup = countryCardTpl(country);
    refs.container.innerHTML = markup;
    // refs.input.value = '';
};

function onFetchError() {
    error({
        title: 'INCORRECT REQUEST',
        text: 'Please enter a more specific query!',
        delay: 2000,
  })
};

function onFetchLengthError() {
    error({
        title: 'Too many matches found',
        text: 'Please enter a more specific query!',
        delay: 2000,
  })
}





