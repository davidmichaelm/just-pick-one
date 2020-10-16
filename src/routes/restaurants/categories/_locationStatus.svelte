<script>
    import {locationData} from "../_stores.js";

    let locationText = "";
    $: {
        if ($locationData.locationType) {
            locationText = $locationData.locationType === "geolocation" ? "your current location" : $locationData.address;
        }
    }
</script>

<style>
    div {
        margin: 0;
    }
</style>

<div>
    Searching within <span>25 miles</span> of {locationText}
</div>