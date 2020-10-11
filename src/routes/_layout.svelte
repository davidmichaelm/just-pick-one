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

    a {
        text-decoration: none;
    }
</style>

<div class="container center">
    <header class="center">
        <h1><a href="/restaurants/location">Just Pick One</a></h1>
        <div>Let us choose the restaurant for you.</div>
    </header>

    <main class="center">
        <slot></slot>
    </main>
</div>