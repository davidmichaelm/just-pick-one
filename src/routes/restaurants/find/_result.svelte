<script>
    export let data;

    // TODO: validate data
    data.price = data.price === undefined ? "$" : data.price; // quick hack

    let directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + new URLSearchParams(data.name);

    const maxStars = 5;

    let stars = [];
    $: {
        stars = [];
        for (let i = 1; i <= maxStars; i++) {
            if (i <= data.rating) {
                stars.push("star");
            } else if (i === data.rating + .5) {
                stars.push("half-star");
            } else {
                stars.push("empty-star");
            }
        }
        stars = stars;
    }

</script>

<style>
    .result {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #e63946;
        padding: 10px;
        margin: 15px;
        border-radius: 5px;
        width: 250px;
    }

    .result div {
        margin: 5px;
    }

    .bottom-row {
        display: flex;
        align-items: center;
    }

    .bottom-row > div {
        margin: 5px;
    }

    .price {
        font-size: 25px;
    }

    figure {
        background-color: white;
        padding: 5px;
        height: 100px;
        border-radius: 5px;
        margin: 10px;
    }

    img {
        margin: 0;
        vertical-align: middle;
    }

    h2 {
        text-align: center;
        margin: 5px;
    }

    a {
        text-decoration: none;
    }
</style>

<div class="result">
    <a href="{data.url}"><h2>{data.name}</h2></a>
    <figure>
        <a href="{data.url}"><img src="{data.image_url}" height="100" width="100"></a>
    </figure>
    <div>
        {#each stars as star}
            <img width="25px" height="25px" src="{star}.png">
        {/each}
    </div>

    <div class="bottom-row">
        <div class="price">{data.price}</div>
        <div>
            <a href="{directionsUrl}">
                <img width="25px" height="25px" src="map-pin.png">
            </a>
        </div>
        <div>
            <a href="tel:{data.phone}">
                <img width="25px" height="25px" src="phone.png">
            </a>
        </div>
<!--        {#each data.transactions as transaction}-->
<!--            <span>{transaction}</span>-->
<!--        {/each}-->
    </div>

</div>