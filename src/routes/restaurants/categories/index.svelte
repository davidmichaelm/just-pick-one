<script context="module">
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
    import Checkbox from "./_checkbox.svelte"
    import {categories} from "./_categories.js";
    import Status from "../_shared/_status.svelte";
    import {goto} from "@sapper/app";

    if (params && params.categories) {
        let paramCategories = params.categories.split(",");
        categories.forEach((c) => {
            c.checked = paramCategories.includes(c.id);
        });
    }

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
        params.rng = Math.random();

        return params;
    }
</script>

<style>
    .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .submitContainer {
        margin: 15px;
    }
</style>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>


<Status params={params} useCategories={false}/>
<form on:submit|preventDefault={submitClick}>
    <div class="flex">
        {#each categories as category}
            <Checkbox id={category.id} name={category.name} checked={category.checked}/>
        {/each}
    </div>

    <div class="flex submitContainer">
        <input class="button" type="submit" value="Choose for me!">
    </div>
</form>
