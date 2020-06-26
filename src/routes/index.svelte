<script>
    import ResultsPage from "../components/ResultsPage.svelte";
    import CategoryOptionsForm from "../components/CategoryOptionsForm.svelte";
    //import { locationData, yelpData } from "./_stores.js";
    import { onMount } from 'svelte';

    let Location;
    /*let CategoryOptionsForm;
    let ResultsPage;*/
    let pages;

    onMount(async () => {
        const module = await import('../components/LocationFinder.svelte');
        Location = module.default;

        pages = {
            1: Location,
            2: CategoryOptionsForm,
            3: ResultsPage
        };
    });


    let results = [];
    let locationData;

    let currentPage = 1;
</script>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

{#if pages != null}
    <svelte:component this={pages[currentPage]} bind:currentPage/>
{/if}


<!--
<svelte:component this={Location} bind:locationData/>
<CategoryOptionsForm bind:results locationData={locationData}/>
<ResultsPage results={results}/>-->
