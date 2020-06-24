<script>
    import Checkbox from "../components/checkbox.svelte"
    import Result from "../components/Result.svelte";

    export let results = [];
    function submitClick(event) {
        results = [];
        event.preventDefault();

        const form = new FormData(document.querySelector("form"));
        const formJson = JSON.stringify(Object.fromEntries(form.entries()));
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
        console.log(response);
        for (let i = 0; i < 3; i++) {
            const randomInt = getRandomInt(response.businesses.length);
            console.log(randomInt);
            results.push(response.businesses[randomInt]);
            results = results;

            response.businesses.splice(randomInt, 1);
        }
        console.log(results);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
</script>


<form on:submit={submitClick}>
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