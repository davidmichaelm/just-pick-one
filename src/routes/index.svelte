<script>
    import ResultsPage from "../components/ResultsPage.svelte";
    import CategoryOptionsForm from "../components/CategoryOptionsForm.svelte";

    let results = [];
</script>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

<CategoryOptionsForm bind:results/>
<ResultsPage results={results}/>