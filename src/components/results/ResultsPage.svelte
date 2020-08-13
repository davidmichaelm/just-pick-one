<script>
    import Result from "./Result.svelte";
    import { yelpResults } from "../../routes/restaurants/_stores.js";
    import { getRandomInt, startOver } from "../../util.js";

    let message = "Like any of these?";

    function chooseFinalOption() {
        setRandomOption();
        hideFinalOptionButton();
        changeToFinalMessage();
    }

    function setRandomOption() {
        const randomNum = getRandomInt($yelpResults.length);
        $yelpResults = [$yelpResults[randomNum]];
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

<h1>{message}</h1>
<div id="results">
    {#each $yelpResults as result}
        <Result data={result}/>
    {/each}
</div>

<div id="navButtons">
    <button class="button" id="chooseFinalOption" on:click={chooseFinalOption}>Narrow it down</button>
    <button class="button alt-button" on:click={startOver}>Start over</button>
</div>