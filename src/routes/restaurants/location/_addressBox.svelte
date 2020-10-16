<script>
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();
    let autocompletes = [];
    let clickToComplete = false;
    export let addressText = "";
    let doAutocomplete;

    onMount(async () => {
        doAutocomplete = () => {
            // fetch can't be used server-side, so this function can only be loaded client-side
            fetch("/restaurants/location/autocomplete?input=" + addressText, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => {
                    let newAutocompletes = [];
                    for (let option of response) {
                        newAutocompletes.push(option.description);
                    }
                    autocompletes = newAutocompletes;
                });
        }
    })

    $: if (addressText !== "") doAutocomplete();

    function checkAddress() {
        if (addressText === undefined || addressText === null || addressText === "") {
            // error message for user
            console.log("address is empty");
            return;
        }

        let match = false;
        for (let option of autocompletes) {
            if (option.toUpperCase() === addressText.toUpperCase()) {
                match = true;
                addressText = option;
                console.log("address matched");
                sendAddress();
            }
        }

        if (!match) {
            clickToComplete = true;
            console.log("click to complete");
        }
    }

    function useClickToComplete(address) {
        addressText = address;
        sendAddress();
    }

    function sendAddress() {
        dispatch('use', {
            locationData: {
                locationType: "address",
                address: addressText
            }
        })
    }
</script>

<style>
    .flex {
        display: flex;
        margin: 15px;
    }

    input {
        vertical-align: middle;
        width: 255px;
        font-size: 1em;
        padding: 7.5px;
        border-radius: 5px;
        border-style: solid;
    }

    .button {
        vertical-align: middle;
        padding: 8.75px 12.5px 8.75px 12.5px;
        margin-left: 5px;
    }

    #clickToComplete {
        margin: 15px;
        text-align: center;
    }

    a:hover {
        color: gray;
    }

</style>
{#if !clickToComplete}
    <div class="flex">

        <input type="text" list="places" bind:value={addressText} placeholder="Enter Zip Code, City, or State">
        <span class="button" on:click={checkAddress}>Go</span>
        <datalist id="places">
            {#each autocompletes as autocomplete}
                <option value="{autocomplete}">
            {/each}
        </datalist>
    </div>
{/if}

{#if clickToComplete}
    <div id="clickToComplete">
        <h3>Did you mean...</h3>
        {#each autocompletes as autocomplete}
            <div on:click={() => useClickToComplete(autocomplete)}><a href="#">{autocomplete}</a></div>
        {/each}
    </div>
{/if}