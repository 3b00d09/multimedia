<script lang="ts">
    import { toastStore } from "$lib/helpers/stores";
    export let postId: string;
    let showOptions: boolean = false;
    
    const toggleOptions = () =>{
        showOptions = !showOptions
    }

    const copyLink = () =>{
        const url = window.location.href
        navigator.clipboard.writeText(url+"post/"+postId)

        toastStore.set({
            active: true,
            status: "success",
            message: "Copied Link!"
        })
    }
</script>

<div>
    <button id="button" on:click={toggleOptions}>
        ...
    </button>

    {#if showOptions}
        <ul class="options box-shadow">
            <button on:click={copyLink}><li>Share Link</li></button>
            <li>Send to group</li>
            <li>Delete Post</li>
        </ul>
    {/if}

</div>


<style>
    #button{
        justify-self: end;
    }

    button{
        all:unset;
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