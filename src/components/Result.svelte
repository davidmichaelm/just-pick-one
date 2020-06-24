<script>
    export let data;

    let directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeStringForUrl(data.name);

    function encodeStringForUrl(string) {
        return string.replace(/ /gi, '+');
    }
</script>

<div>
    <img src="{data.image_url}" height="100" width="100">
    <a href="{data.url}">{data.name}</a>
    <span>Rating: {data.rating}</span>
    <span>Price: {data.price}</span>
    <a href="{directionsUrl}">Directions</a>
    {#each data.transactions as transaction}
        <span>{transaction}</span>
    {/each}
</div>