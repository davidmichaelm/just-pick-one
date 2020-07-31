<script>
    export let id;
    export let name;
</script>

<style>
    label {
        display: inline-block;
        padding: 25px;
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
</style>

<div>
    <input type="checkbox" name="{id}" id="{id}" value="on">
    <label class="alt-button" for="{id}">{name}</label>
</div>
