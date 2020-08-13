<script>
    import {locationData, currentPage} from "../../routes/restaurants/_stores.js";
    import {startOver} from "../../util.js";

    let locationText = "";
    $: {
        if ($locationData.locationType) {
            locationText = $locationData.locationType === "geolocation" ? "your current location" : $locationData.address;
        }
    }


</script>

<style>
    div {
        margin: 15px 0 0 0;
    }

    a:hover {
        color: gray;
    }
</style>

<div>
    {#if locationText !== ""}
        Searching within <span>25 miles</span> of <a href="" on:click={startOver}>{locationText}</a>
    {/if}

</div>