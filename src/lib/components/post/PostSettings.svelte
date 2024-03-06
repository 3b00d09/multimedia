<script lang="ts">
    let showOptions: boolean = false;
    
    const toggleOptions = () =>{
        showOptions = !showOptions
    }
</script>

<div>
    <button id="button" on:click={toggleOptions}>
        ...
    </button>

    {#if showOptions}
        <ul class="options box-shadow">
            <li>Share Link</li>
            <li>Send to group</li>
            <li>Delete Post</li>
        </ul>
    {/if}
</div>


<style>
    button{
        all:unset;
        justify-self: end;
    }

    div{
        position: relative;
        width: 30%;
        display: grid;
    }

    ul{
        background-color: var(--background);
        position: absolute;
        top: 30px;
        right: 15px;
        padding: 1rem;
        border-radius: 16px;
        display: grid;
        gap: 1rem;
        cursor: default;
    }
    li{
        list-style: none;
        cursor: pointer;
    }
</style>