<script>
    export let id;
    export let name;
</script>

<style>
    label {
        background-color: #1d3557;
        color: white;
        display: inline-block;
        padding: 25px;
        border-radius: 5px;
        width: 150px;
        text-align: center;
        cursor: pointer;
    }

    label:hover {
        background-color: #457b9d;
    }

    input:checked + label {
        background-color: #e63946;
    }

    input {
        position: absolute;
        opacity: 0;
    }
</style>

<div>
    <input type="checkbox" name="{id}" id="{id}" value="on">
    <label for="{id}">{name}</label>
</div>
