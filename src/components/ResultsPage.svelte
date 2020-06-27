<script>
    import Result from "./Result.svelte";
    import { yelpResults } from "../routes/_stores.js";
    import { getRandomInt } from "../util.js";

    export let currentPage;

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

    function startOver() {
        currentPage = 1;
    }
</script>

{#each $yelpResults as result}
    <Result data={result}/>
{/each}
<button id="chooseFinalOption" on:click={chooseFinalOption}>Choose for me!</button>
<button on:click={startOver}>Start over!</button>