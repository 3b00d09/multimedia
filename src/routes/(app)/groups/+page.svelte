<script lang="ts">
    import { enhance } from "$app/forms";

    export let data;
    let createActive:boolean = false;
</script>


<div>
    <h3>My Groups</h3>

    {#each data.groups as group}
        <div>
            <p>{group.name}</p>
            <p>{group.description}</p>
        </div>
    {/each}

    <button on:click={()=>createActive = !createActive}>Create Group</button>

    {#if createActive}

    <form action="?/createGroup" use:enhance method="POST">
        <input name="group-name" placeholder="Group Name">
        <textarea name="group-description" placeholder="Group Description"></textarea>
        <button type="submit">Create</button>
    </form>

    {/if}

</div>


<style>

div{
    align-self: start;
    display: grid;
    gap: 1rem;
}
button{
    all: unset;
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid var(--action);
    width: fit-content;
    cursor: pointer;
}

form{
    display: grid;
    gap: 1rem;
}

form > *{
    padding: 0.75rem;
    border-radius: 16px;
}

</style>