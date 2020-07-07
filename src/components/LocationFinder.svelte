<script>
    import AddressBox from "../components/AddressBox.svelte";
    import {locationData} from "../routes/_stores.js";
    import {nextPage} from "../util.js";
    import GeolocationButton from "./GeolocationButton.svelte";

    function useLocation(event) {
        $locationData = event.detail.locationData;
        nextPage();
    }
</script>

<AddressBox on:use={useLocation}/> or
<GeolocationButton on:use={useLocation}/>