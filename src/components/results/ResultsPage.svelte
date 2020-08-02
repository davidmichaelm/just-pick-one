<script>
    import Result from "./Result.svelte";
    import { yelpResults } from "../../routes/restaurants/_stores.js";
    import { getRandomInt, startOver } from "../../util.js";

    function chooseFinalOption() {
        setRandomOption();
        hideFinalOptionButton();
    }

    function setRandomOption() {
        const randomNum = getRandomInt($yelpResults.length);
        $yelpResults = [$yelpResults[randomNum]];
    }

    function hideFinalOptionButton() {
        document.getElementById("chooseFinalOption").style.display = "none";
    }
</script>

<style>
    #results {
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 400px) {
        #results {
            flex-direction: column;
        }
    }
</style>

<div id="results">
    {#each $yelpResults as result}
        <Result data={result}/>
    {/each}
</div>

<div>
    <button class="button" id="chooseFinalOption" on:click={chooseFinalOption}>Narrow it down</button>
    <button class="button alt-button" on:click={startOver}>Start over</button>
</div>