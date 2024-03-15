<script lang="ts">
  import { toastStore } from "$lib/helpers/stores";
  import type { groupsTable } from "$lib/server/schema";

    export let group: typeof groupsTable.$inferInsert
    export let postId: string;
    let sendBtn: HTMLButtonElement;

    const sendPost = async() =>{
        const req = await fetch("/api/groups/posts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupId: group.id, postId: postId }),
        })
        const res = await req.json()
        if(res.success){
            sendBtn.disabled = true
        }
        toastStore.set({
            status: res.error ? "error": "success",
            active: true,
            message: "Post sent"
        })
    }
</script>

<div class="group">
    <p>{group.name}</p>
    <button class="send-btn" bind:this={sendBtn} on:click={sendPost}>Send</button>
</div>
<span class="linebreak"></span>


<style>

    .group{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .group > button{
        padding: 0.5rem;
        border-radius: 16px;
        border: 1px solid var(--action);
        width: fit-content;
        cursor: pointer;
        font-size: 1rem;
    }

    span{
        margin: 0.5rem 0;
        display: block;
        height: 1px;
        width: 100%;
        background-color: var(--text-secondary);
    }

    .send-btn:disabled{
        background-color: gray;
        cursor: default;
    }
</style>