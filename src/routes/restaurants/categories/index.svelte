<script context="module">
    import Checkbox from "./_checkbox.svelte"
    //import {locationData, yelpResults} from "../_stores.js";
    import {getRandomInt} from "../../../util.js";
    import {categories} from "./_categories.js";
    import LocationStatus from "./_locationStatus.svelte";
    import {onMount} from "svelte";
    import {goto} from "@sapper/app";

    let params;

    export async function preload(page, session) {
        params = page.query;

        if (!params.locationType) {
            console.log("No location data");
            return this.redirect(302, 'restaurants/location');
        }
    }
</script>

<script>
/*    let submitClick;

    onMount(async () => {
        submitClick = () => {
            console.log(getFormData());
            // fetch can't be used server-side, so this function can only be loaded client-side



            /!*fetch("/restaurants/find", {
                method: "GET",
                body: getFormData(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => handleResponse(response))*!/
        }
    });*/

    function submitClick() {
        let searchParams = new URLSearchParams(getFormData()).toString();
        goto("/restaurants/find?" + searchParams);
    }

    function getFormData() {
        if (!params.locationType) {
            console.log("No location data");
            return;
        }

        let formData = document.querySelectorAll("input[type='checkbox']:checked");
        let categories = '';

        for (let checkbox of formData) {
            if (categories !== "") {
                categories += ",";
            }

            categories += checkbox.name;
        }

        params.categories = categories;

        console.log(params);

        return params;
    }

/*    function handleResponse(response) {
        console.log(response);

        if (response && response.businesses) {
            $yelpResults = getRandomChoices(response.businesses, 3);
            goto("/restaurants/results");
        } else {
            console.log("No results")
        }
    }*/

/*    function getRandomChoices(data, numChoices) {
        let results = [];
        for (let i = 0; i < numChoices; i++) {
            const randomInt = getRandomInt(data.length);
            results.push(data[randomInt]);

            data.splice(randomInt, 1);
        }

        return results;
    }*/
</script>

<style>
    .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 15px;
    }
</style>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>


<LocationStatus/>
<form on:submit|preventDefault={submitClick}>
    <div class="flex">
        {#each categories as category}
            <Checkbox id={category.id} name={category.name}/>
        {/each}
    </div>

    <div class="flex">
        <input class="button" type="submit" value="Choose for me!">
    </div>
</form>
