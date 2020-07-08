<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function checkCurrentLocation() {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    function success(position) {
        dispatch('use', {
            locationData: {
                locationType: "geolocation",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });
    }

    function error() {
        console.log('Unable to retrieve your location');
    }
</script>

<button on:click={checkCurrentLocation}>Use My Current Location</button>