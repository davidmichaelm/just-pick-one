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

<style>
    div {
        color: #333;
    }

    div:hover {
        color: gray;
        cursor: pointer;
    }

    span, img {
        vertical-align: middle;
    }
</style>


<div on:click={checkCurrentLocation}>
    <img src="target.png" height="19px" width="19px"/>
    <span>Use My Current Location</span>
</div>