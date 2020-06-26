<script>
    import Checkbox from "../components/checkbox.svelte"
    import { locationData, yelpResults } from "../routes/_stores.js";

    export let results = [];

    export let currentPage;

    function submitClick(event) {
        results = [];

        if (!$locationData.locationType) {
            console.log("No location data");
            return;
        }

        let form = {};
        form.categories = Object.fromEntries(new FormData(document.querySelector("form")).entries());
        form.locationData = $locationData;

        const formJson = JSON.stringify(form);
        console.log(formJson);

        fetch("/restaurants/find", {
            method: "POST",
            body: formJson,
            headers: {
                'Content-Type': 'application/json'
            }
        })
                .then(response => response.json())
                .then(response => handleResponse(response))
    }

    function handleResponse(response) {
        // need error handling
        console.log(response);
        for (let i = 0; i < 3; i++) {
            const randomInt = getRandomInt(response.businesses.length);
            console.log(randomInt);
            results.push(response.businesses[randomInt]);

            response.businesses.splice(randomInt, 1);
        }
        $yelpResults = results;
        currentPage++;
        console.log(results);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
</script>


<form on:submit|preventDefault={submitClick}>
    <Checkbox id={"hotdogs"} name={"Fast Food"}/>
    <Checkbox id={"burgers"} name={"Burgers"}/>
    <Checkbox id={"chinese"} name={"Chinese"}/>
    <Checkbox id={"mexican"} name={"Mexican"}/>
    <Checkbox id={"italian"} name={"Italian"}/>
    <Checkbox id={"japanese"} name={"Japanese"}/>
    <Checkbox id={"thai"} name={"Thai"}/>
    <Checkbox id={"breakfast_brunch"} name={"Breakfast & Brunch"}/>
    <Checkbox id={"mediterranean"} name={"Mediterranean"}/>
    <Checkbox id={"bars"} name={"Bars"}/>
    <Checkbox id={"cafes"} name={"Cafes"}/>
    <Checkbox id={"vegetarian"} name={"Vegetarian"}/>
    <Checkbox id={"vegan"} name={"Vegan"}/>
    <br>
    <Checkbox id={"deliver"} name={"Delivery"}/>
    <Checkbox id={"Takeout"} name={"Takeout"}/>

    <input type="submit" value="Choose for me!">
</form>