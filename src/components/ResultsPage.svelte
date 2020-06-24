<script>
    import Result from "./Result.svelte";

    export let results;
</script>

{#each results as result}
    <Result data={result}/>
{/each}