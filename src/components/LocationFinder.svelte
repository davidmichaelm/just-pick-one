<script>
    import { locationData } from "../routes/_stores.js";

    export let currentPage;

    function useZipCode() {
        if (validateZipCode($locationData.zipCode)) {
            $locationData.locationType = "zipCode";
            currentPage++;
        } else {
            console.log("Zip Code is not valid");
        }
    }

    function validateZipCode(inputZipCode) {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputZipCode);
    }

    function useCurrentLocation() {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    function success(position) {
        $locationData.locationType = "geolocation";
        $locationData.latitude = position.coords.latitude;
        $locationData.longitude = position.coords.longitude;
        currentPage++;
    }

    function error() {
        console.log('Unable to retrieve your location');
    }

</script>

<input type="text" name="zipcode" id="zipcode" bind:value={$locationData.zipCode}> <button on:click={useZipCode}>Enter Zip Code</button> or
<button on:click={useCurrentLocation}>Use Current Location</button>