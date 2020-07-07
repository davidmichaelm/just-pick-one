<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let autocompletes = [];
    let clickToComplete = false;
    export let addressText = "";

    $: fetch("/autocomplete?input=" + addressText, {
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

<input type="text" list="places" bind:value={addressText}> Enter Zip Code, City, or State
<button on:click={checkAddress}>Go</button>
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