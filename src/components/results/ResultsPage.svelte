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

{#each $yelpResults as result}
    <Result data={result}/>
{/each}
<button id="chooseFinalOption" on:click={chooseFinalOption}>Choose for me!</button>
<button on:click={startOver}>Start over!</button>