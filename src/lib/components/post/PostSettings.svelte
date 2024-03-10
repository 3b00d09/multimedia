<script lang="ts">
    import { toastStore } from "$lib/helpers/stores";
  import type { groupsTable } from "$lib/server/schema";
  import GroupItem from "../groups/GroupItem.svelte";
    export let postId: string;
    let showOptions: boolean = false;
    export let groups: typeof groupsTable.$inferSelect[];
    let groupsDialog:HTMLDialogElement
    let sendBtn:HTMLButtonElement
    
    const toggleOptions = () =>{
        showOptions = !showOptions
    }

    const toggleGroups = () =>{
        groupsDialog.open ? groupsDialog.close() : groupsDialog.showModal()
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

<div class="container">
    <button id="button" on:click={toggleOptions}>
        ...
    </button>

    {#if showOptions}
        <ul class="options box-shadow">
            <button on:click={copyLink}><li>Share Link</li></button>
            <button on:click={toggleGroups}><li>Send to group</li></button>
            <li>Delete Post</li>
        </ul>
    {/if}

</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog  bind:this={groupsDialog} on:click|self={toggleGroups}>
    <div class="groups-dialog">
        {#if groups}

            {#each groups as group}
                <GroupItem {group} {postId}/>
            {/each}

        {/if}
    </div>
</dialog>


<style>
    #button{
        justify-self: end;
    }

    button{
        all:unset;
    }

    .container{
        position: relative;
        display: grid;
        width: 30%;
        z-index: 9999;
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

    dialog{
        position: fixed; /* Use fixed positioning */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Center the dialog */
        background-color: var(--background);
        color: var(--text-primary);
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid transparent;
        box-shadow: -2px -2px 6px -4px rgba(0, 0, 0, 0.5), 2px 2px 6px 4px rgba(0, 0, 0, 0.5);
        width: 25%;
    }
      dialog::backdrop{
        backdrop-filter: blur(4px);
    } 
    
</style>