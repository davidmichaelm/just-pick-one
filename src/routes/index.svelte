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

<style>
    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container {
        height: 100vh;
        min-height: 500px;
    }

    main :global(div) {
        margin: 15px;
    }

    h1 {
        color: white;
        background-color: #e63946;
        padding: 10px;
        border-radius: 5px;
        font-size: 3em;
    }
</style>

<svelte:head>
    <title>Just Pick One</title>
</svelte:head>

<div class="container center">
    <header class="center">
        <h1>Just Pick One</h1>

        <div>Let us choose the restaurant for you.</div>
    </header>

    <main class="center">
        {#if pages != null}
            <svelte:component this={pages[$currentPage]}/>
        {/if}
    </main>

</div>
