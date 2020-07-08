import { readable, writable } from 'svelte/store';

export let locationData = writable({
});

export let yelpResults = writable(null);

export let currentPage = writable(1);