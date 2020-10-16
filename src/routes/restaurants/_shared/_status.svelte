<script>
    import { categories } from "../categories/_categories.js";
    export let params;
    export let useCategories;

    let paramsString;
    let categoriesText = "";
    let locationText = "";

    if (useCategories && params && params.categories) {
        paramsString = new URLSearchParams(params);

        let categoryArray = params.categories.split(",");
        for (let x = 0; x < categoryArray.length; x++) {

            if (x > 2) {
                let categoriesLeft = categoryArray.length - x
                categoriesText += ", and " + categoriesLeft + " other " + (categoriesLeft > 1 ? " categories" : " category");
                break;
            } else if (x > 0 && categoryArray.length === 2) {
                categoriesText += " and "
            } else if (x > 0 && categoryArray.length !== 1 && x !== categoryArray.length - 1) {
                categoriesText += ", ";
            } else if (x > 0 && x === categoryArray.length - 1) {
                categoriesText += ", and ";
            }

            categoriesText += categories.find(c => c.id === categoryArray[x]).name;
        }

        categoriesText = categoriesText;
    }

    if (params && params.locationType) {
        locationText = params.locationType === "geolocation" ? "your current location" : params.address;
    }
</script>

<style>
    div {
        text-align: center;
        margin: 15px 15px 0 15px;
    }

    a {
        color: #457b9d;
        text-decoration: none;
    }
</style>

<div>
    Searching
    {#if categoriesText}
        for
        <a href={"/restaurants/categories?" + paramsString}>
            {categoriesText}
        </a>
    {/if}
    within <span>25 miles</span> of <a href="/restaurants/location">{locationText}</a>
</div>