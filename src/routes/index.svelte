<script>
    import { currentPage } from "./restaurants/_stores.js";
    import { onMount } from "svelte";

    let Location;
    let CategoryOptionsForm;
    let ResultsPage;
    let pages;

    onMount(async () => {
        window.history.replaceState($currentPage, null, "");

        window.onpopstate = function (event) {
            if (event.state) {
                $currentPage = event.state;
            }
        };

        const locationModule = await import('../components/location/LocationFinder.svelte');
        Location = locationModule.default;

        const categoryOptionsFormModule = await import('../components/categories/CategoryOptionsForm.svelte');
        CategoryOptionsForm = categoryOptionsFormModule.default;

        const resultsPageModule = await import('../components/results/ResultsPage.svelte');
        ResultsPage = resultsPageModule.default;

        pages = {
            1: Location,
            2: CategoryOptionsForm,
            3: ResultsPage
        };
    });

</script>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

{#if pages != null}
    <svelte:component this={pages[$currentPage]}/>
{/if}