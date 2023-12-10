<script lang="ts">
  import type { postType } from "$lib/types";
  import { onMount } from "svelte";
  import CommentForm from "./CommentForm.svelte";
  import Comment from "./Comment.svelte";


    export let post:postType;
    let activeComment:boolean = false;
    let days:number;

    onMount(()=>{
        const originalTime = post.timestamp!.getTime();
        const currTime = new Date().getTime()
        const diffHours = (currTime - originalTime) / 3600000
        
        days = Math.floor(diffHours / 24)

    })

</script>

<div class="post-container">
    <div class="post-header">
        <div class="post-author">
            <img class="profile-image" src="/images/icons/image19.png" alt="Profile icon"/>
            <p class="author">{post.author}</p>
            <p class="timestamp">{`.${days}d`}</p>
        </div>

        <p>...</p>
    </div>
    <div class="post-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi et sit hic deserunt. Eveniet, labore sed, eligendi eos earum delectus, deleniti perspiciatis laborum quasi beatae molestias unde sequi? Nisi, explicabo.</div>
    <div class="icons-container">
        <button><img src ="/images/icons/like.svg" alt="Like Icon"></button>
        <button on:click={()=>{activeComment = !activeComment}}><img src ="/images/icons/reply.svg" alt="Reply Icon"></button>
        <button><img src ="/images/icons/dm.svg" alt="Direct Message Icon"></button>
    </div>
    {#if activeComment}
        <CommentForm/>
    {/if}
    <Comment/>
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