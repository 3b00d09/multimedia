<script lang="ts">
    import type { commentsTable } from "$lib/server/schema";
    import { onMount } from "svelte";
    import Linebreak from "./Linebreak.svelte";
    import ReplyForm from "./ReplyForm.svelte";

    type commentType = typeof commentsTable.$inferInsert
    export let comment: commentType

    let replies: commentType[];
    let activeReply:boolean = false;

    const fetchReplies = async() =>{
        const data = await fetch(`api/fetchReplies/?id=${comment.id}`)
        const res = await data.json()
        replies = res
    }

    onMount(async()=>{
        fetchReplies();
    })
    
</script>

<Linebreak/>
<div class="comment-container">
    <div class="comment-author">
            <img class="profile-image" src="/images/icons/profile.png" alt="Profile icon"/>
            <p class="author">{comment.author}</p>
            <p class="timestamp">{`.${"3"}d`}</p>
    </div>
    <div class="comment-content">{comment.comment}</div>
    <div class="icons-container">
        <button><img src ="/images/icons/like.png" alt="Like Icon"></button>
        <button on:click={()=>{activeReply = !activeReply}}><img src ="/images/icons/reply.png" alt="Reply Icon"></button>
        <button><img src ="/images/icons/forward.png" alt="Direct Message Icon"></button>
    </div>

    {#if activeReply}
        <ReplyForm commentId={comment.id}/>
        {#if replies.length > 0} 

        {#each replies as comment} 
            <svelte:self comment={comment}/>
        {/each}

        {/if}
    {/if}
</div>

<style>
    .comment-container{
        display: grid;
        gap: 0.75rem;
        margin-left: 2rem;
    }
    .comment-author{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    
    .author{
        font-size: 1.2rem;
    }

    .timestamp{
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    .comment-content{
        color: var(--text-secondary);
        line-height: 22px;
    }

    .icons-container{
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    button {
        padding: .45rem;
        width: 2rem;
        height: 2rem;
        border: none;
    }

    .icons-container > button > img{
        width: 100%;
    }

    .profile-image{
        border-radius: 50%;
        object-fit: cover;
    }
</style>