<script>
    export let id;
    export let name;
    export let checked = false;
</script>

<style>
    label {
        display: inline-block;
        padding: 25px;
        margin: 15px;
        border-radius: 5px;
        width: 150px;
        text-align: center;
        cursor: pointer;
    }


    input:checked + label {
        background-color: #e63946;
    }

    input {
        position: absolute;
        opacity: 0;
    }

    @media (max-width: 400px) {
        label {
            padding: 5px;
            width: 130px;
        }
    }
</style>

<div>
    <input type="checkbox" name="{id}" id="{id}" value="on" checked={checked}>
    <label class="alt-button" for="{id}">{name}</label>
</div>
