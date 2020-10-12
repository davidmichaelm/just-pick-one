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
        return { yelpResults, params };
    }
</script>

<script>
    import Result from "./_result.svelte";
    import {getRandomInt} from "../../../util.js";

    export let yelpResults;
    export let params;

    let message = "Like any of these?";
    let restaurants;

    if (yelpResults && yelpResults.businesses) {
        console.log("got results");
        restaurants = getRandomChoices(yelpResults.businesses, 3);
    } else {
        console.log("No results")
    }

    console.log(yelpResults)

    function getRandomChoices(data, numChoices) {
        let results = [];
        for (let i = 0; i < numChoices; i++) {
            const randomInt = getRandomInt(data.length);
            results.push(data[randomInt]);

            data.splice(randomInt, 1);
        }

        console.log(results);
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
</script>

<style>
    h1 {
        margin-top: 25px;
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


<h1>{message}</h1>
<div id="results">
    {#each restaurants as result}
        <Result data={result}/>
    {/each}
</div>

<div id="navButtons">
    <button class="button" id="chooseFinalOption" on:click={chooseFinalOption}>Narrow it down</button>
    <a href={"/restaurants/categories?" + new URLSearchParams(params)}>
        <button class="button alt-button">Start over</button>
    </a>
</div>
