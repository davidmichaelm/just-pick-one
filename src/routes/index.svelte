<script context="module">
    export async function preload(page, session) {
        return this.redirect(302, 'restaurants/location');
    }
</script>

<style>
    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container {
        min-height: 500px;
    }

    /*main :global(div) {*/
    /*    margin: 15px;*/
    /*}*/

    h1 {
        margin: 0;
        font-size: 3em;
    }

    header {
        color: white;
        background-color: #e63946;
        padding: 10px;
        border-radius: 5px;
        margin-top: 20px;
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
</div>