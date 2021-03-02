<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import AutoComplete from "simple-svelte-autocomplete";

    const dispatch = createEventDispatcher();
    let autocompletes = [];
    export let address = "";
    $: addressInput = address.text;
    $: addressIsValid = validateAddress(addressInput);

    let doAutocomplete;

    function validateAddress(a) {
        if (a === undefined || a === null || a === "") {
            return false;
        }

        let match = false;
        for (let option of autocompletes) {
            if (option.toUpperCase() === a.toUpperCase()) {
                match = true;
            }
        }

        return match;
    }

    onMount(async () => {
        doAutocomplete = async (keyword) => {
            // fetch can't be used server-side, so this function can only be loaded client-side
            const response = await fetch("/restaurants/location/autocomplete?input=" + encodeURIComponent(keyword));
            const json = await response.json();
            autocompletes = json.map(j => j.text);
            addressInput = keyword;

            return json;
        }
    })

    function sendAddress() {
        dispatch('use', {
            locationData: {
                locationType: "address",
                address: address.text
            }
        })
    }
</script>

<style>
    .flex {
        display: flex;
        margin: 15px;
    }

    :global(.addressBox) {
        min-width: 400px !important;
    }

    .button {
        vertical-align: middle;
        padding: 8.75px 12.5px 8.75px 12.5px;
        margin-left: 5px;
    }
</style>

<div class="flex">
    <AutoComplete
            labelFieldName="text"
            valueFieldName="text"
            searchFunction={doAutocomplete}
            bind:selectedItem={address}
            hideArrow
            placeholder="Enter an address..."
            className="addressBox"
            name="test"
    >
    </AutoComplete>

    {#if addressIsValid}
        <button class="button" on:click={sendAddress}>Go</button>
    {/if}
</div>
