<script>
    import Result from "./Result.svelte";
    import { yelpResults } from "../routes/_stores.js";

    export let currentPage;
</script>

{#each $yelpResults as result}
    <Result data={result}/>
{/each}