<script>
    import Checkbox from "./Checkbox.svelte"
    import { locationData, yelpResults } from "../../routes/restaurants/_stores.js";
    import { getRandomInt, backPage, nextPage } from "../../util.js";
    import { categories } from "../../routes/restaurants/_categories.js";

    function submitClick() {
        fetch("/restaurants/find", {
            method: "POST",
            body: getFormData(),
            headers: {
                'Content-Type': 'application/json'
            }
        })
                .then(response => response.json())
                .then(response => handleResponse(response))
    }

    function getFormData() {
        if (!$locationData.locationType) {
            console.log("No location data");
            return;
        }

        const form = {
            categories: Object.fromEntries(new FormData(document.querySelector("form")).entries()),
            locationData: $locationData
        };

        return JSON.stringify(form);
    }

    function handleResponse(response) {
        console.log(response);

        if (response && response.businesses) {
            $yelpResults = getRandomChoices(response.businesses, 3);
            nextPage();
        } else {
            console.log("No results")
        }
    }

    function getRandomChoices(data, numChoices) {
        let results = [];
        for (let i = 0; i < numChoices; i++) {
            const randomInt = getRandomInt(data.length);
            results.push(data[randomInt]);

            data.splice(randomInt, 1);
        }

        return results;
    }
</script>

<style>
    .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>


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
<a href="" on:click={backPage}>Back to Location</a>