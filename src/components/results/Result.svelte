<script>
    export let data;

    let directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeStringForUrl(data.name);

    function encodeStringForUrl(string) {
        return string.replace(/ /gi, '+');
    }
</script>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        background-color: #e63946;
        padding: 10px;
        border-radius: 5px;
        width: 250px;
    }

    figure {
        background-color: white;
        padding: 5px;
        height: 100px;
    }

    img {
        margin: 0;
    }

    h2 {
        text-align: center;
        margin: 0;
    }
</style>

<div>
    <a href="{data.url}"><h2>{data.name}</h2></a>
    <figure>
        <img src="{data.image_url}" height="100" width="100">
    </figure>
    <span>Rating: {data.rating}</span>
    <span>Price: {data.price}</span>
    <a href="{directionsUrl}">Directions</a>
    {#each data.transactions as transaction}
        <span>{transaction}</span>
    {/each}
</div>