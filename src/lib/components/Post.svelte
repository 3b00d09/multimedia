<script lang="ts">
  import type { AggregatedPost, postType } from "$lib/types";
  import { onMount } from "svelte";
  import CommentForm from "./CommentForm.svelte";
  import Comment from "./Comment.svelte";


    export let post: AggregatedPost;
    let activeComment:boolean = false;
    let days:number;

    onMount(()=>{
        const originalTime = post.post.timestamp!.getTime();
        const currTime = new Date().getTime()
        const diffHours = (currTime - originalTime) / 3600000
        
        days = Math.floor(diffHours / 24)

    })

</script>

<div class="post-container">
    <div class="post-header">
        <div class="post-author">
            <img class="profile-image" src="/images/icons/profile.png" alt="Profile icon"/>
            <p class="author">{post.post.author}</p>
            <p class="timestamp">{`.${days}d`}</p>
        </div>

        <p>...</p>
    </div>
    <div class="post-content">{post.post.content}</div>
    <div class="icons-container">
        <button><img src ="/images/icons/like.svg" alt="Like Icon"></button>
        <button on:click={()=>{activeComment = !activeComment}}><img src ="/images/icons/reply.svg" alt="Reply Icon"></button>
        <button><img src ="/images/icons/dm.svg" alt="Direct Message Icon"></button>
    </div>
    {#if activeComment}
        <CommentForm/>
    {/if}
    
    {#if post.comments}
        {#each post.comments as comment}
            <Comment comment={comment}/>
        {/each}
    {/if}
    
</div>

<style>

    .post-container{
        display: grid;
        gap: 0.75rem;
    }
    .post-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .post-author{
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

    .post-content{
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
        width: 2.5rem;
        height: 2.5rem;
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