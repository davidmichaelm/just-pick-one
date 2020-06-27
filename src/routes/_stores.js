import { readable, writable } from 'svelte/store';

export let locationData = writable({
    locationType: null,
    zipCode: null,
    latitude: null,
    longitude: null
});

export let yelpResults = writable(null);

export let currentPage = writable(1);