<script>
    import AddressBox from "./AddressBox.svelte";
    import {locationData} from "../../routes/restaurants/_stores.js";
    import {nextPage} from "../../util.js";
    import GeolocationButton from "./GeolocationButton.svelte";

    function useLocation(event) {
        $locationData = event.detail.locationData;
        nextPage();
    }
</script>

<AddressBox on:use={useLocation}/>
<GeolocationButton on:use={useLocation}/>