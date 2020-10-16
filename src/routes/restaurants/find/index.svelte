<script context="module">
    export async function preload(page, session) {
        console.log(page.query);
        let params = page.query;

        if (!params.locationType) {
            console.log("No location data");
            return this.redirect(302, 'restaurants/location');
        } else if (!params.categories) {
            console.log("No category data");
            return this.redirect(302, "restaurants/categories?" + new URLSearchParams(params));
        }

        const data = await this.fetch("restaurants/find/yelp?" + new URLSearchParams(params));
        const yelpResults = await data.json();
        console.log("preload: found " + yelpResults.businesses.length + " results")
        return {yelpResults, params};
    }
</script>

<script>
    import Result from "./_result.svelte";
    import Status from "../_shared/_status.svelte";
    import seedrandom from "seedrandom";
    import {onMount} from "svelte";

    export let yelpResults;
    export let params;

    let message = "Like any of these?";
    let restaurants;

    if (!params.rng) {
        params.rng = "just-pick-one";
    }

    let rng = seedrandom(params.rng);

    onMount(() => {
        if (yelpResults && yelpResults.businesses) {
            console.log("Got results, " + yelpResults.businesses.length + " of them");
            restaurants = getRandomChoices(yelpResults.businesses, 3);
        } else {
            console.log("No results")
            message = "Sorry, no results were found";
        }
    });

    function getRandomInt(max) {
        return Math.floor(rng() * Math.floor(max));
    }

    function getRandomChoices(data, numChoices) {
        let dataCopy = [...data];
        let results = [];
        for (let i = 0; i < numChoices; i++) {
            const randomInt = getRandomInt(dataCopy.length);
            results.push(dataCopy[randomInt]);

            dataCopy.splice(randomInt, 1);
        }

        return results;
    }

    function chooseFinalOption() {
        setRandomOption();
        hideFinalOptionButton();
        changeToFinalMessage();
    }

    function setRandomOption() {
        const randomNum = getRandomInt(restaurants.length);
        restaurants = [restaurants[randomNum]];
    }

    function hideFinalOptionButton() {
        document.getElementById("chooseFinalOption").style.display = "none";
    }

    function changeToFinalMessage() {
        message = "Final Decision";
    }

    function refreshResults() {
        console.log("refreshing");
        rng = seedrandom(Math.random());
        restaurants = getRandomChoices(yelpResults.businesses, 3);
    }
</script>

<style>
    h1 {
        margin-top: 15px;
    }

    #results {
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 400px) {
        #results {
            flex-direction: column;
        }
    }

    #navButtons {
        margin: 15px;
    }
</style>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

<Status params={params} useCategories={true}/>
<h1>{message}</h1>
<div id="results">
    {#if restaurants}
        {#each restaurants as result}
            <Result data={result}/>
        {/each}
    {/if}
</div>

<div id="navButtons">
    {#if restaurants}
        <button class="button" id="chooseFinalOption" on:click={chooseFinalOption}>Narrow it down</button>
    {/if}
    <button class="button alt-button" on:click={refreshResults}>Refresh</button>

</div>