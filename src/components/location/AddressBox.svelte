<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let autocompletes = [];
    let clickToComplete = false;
    export let addressText = "";

    $: fetch("/location/autocomplete?input=" + addressText, {
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

    function checkAddress() {
        if (addressText === undefined || addressText === null || addressText === "") {
            // error mesage for user
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
        color: white;
        background-color: #e63946;
        border-radius: 5px;
        margin-left: 5px;
    }

    .button:hover {
        background-color: #ff4252;
        cursor: pointer;
    }
</style>

<div class="flex">
    <input type="text" list="places" bind:value={addressText} placeholder="Enter Zip Code, City, or State">
    <span class="button" on:click={checkAddress}>Go</span>
    <datalist id="places">
        {#each autocompletes as autocomplete}
            <option value="{autocomplete}">
        {/each}
    </datalist>
    {#if clickToComplete}
        {#each autocompletes as autocomplete}
            <div on:click={() => useClickToComplete(autocomplete)}><a href="#">{autocomplete}</a></div>
        {/each}
    {/if}
</div>
