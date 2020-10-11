<script>
    import AddressBox from "./_addressBox.svelte";
    import GeolocationButton from "./_geolocationButton.svelte";
    import {goto} from "@sapper/app";

    function useLocation(event) {
        let locationParams = new URLSearchParams(event.detail.locationData);
        goto("/restaurants/categories?" + locationParams);
    }
</script>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

<AddressBox on:use={useLocation}/>
<GeolocationButton on:use={useLocation}/>
