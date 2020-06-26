<script>
    import ResultsPage from "../components/ResultsPage.svelte";
    import CategoryOptionsForm from "../components/CategoryOptionsForm.svelte";
    import { onMount } from 'svelte';

    let Location;

    onMount(async () => {
        const module = await import('../components/LocationFinder.svelte');
        Location = module.default;
    });


    let results = [];
    let locationData;
</script>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

<svelte:component this={Location} bind:locationData/>
<CategoryOptionsForm bind:results locationData={locationData}/>
<ResultsPage results={results}/>