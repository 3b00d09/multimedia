<script lang="ts">
  import type { AggregatedPost, PostType } from "$lib/types";
  import { onMount } from "svelte";
  import CommentForm from "./CommentForm.svelte";
  import Comment from "./Comment.svelte";
  import { redirect } from "@sveltejs/kit";
  import { goto } from "$app/navigation";

    type PostWithCommentCount = PostType & {
        commentCount: number;
        imageUrl: string | null
    }
    export let post: PostWithCommentCount;
    let activeComment:boolean = false;
    let days:number;

    onMount(()=>{
        const originalTime = post.timestamp!.getTime();
        const currTime = new Date().getTime()
        const diffHours = (currTime - originalTime) / 3600000
        
        days = Math.floor(diffHours / 24)

    })

    const navigateToPost = () => goto(`/post/${post.id}`)

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|self={navigateToPost} class="post-container">
    <div on:click|self={navigateToPost} class="post-header">
        <div  class="post-author">
            <img class="profile-image" src={post.imageUrl} alt="Profile icon"/>
            <p class="author">{post.author}</p>
            <p class="timestamp">{`.${days}d`}</p>
        </div>

        <p>...</p>
    </div>
    <div  class="post-content"><p>{post.content}</p></div>
    <div  class="icons-container">
        <button><img src ="/images/icons/like.png" alt="Like Icon"></button>
        <button on:click={()=>{activeComment = !activeComment}}>
            <img src ="/images/icons/comment.png" alt="Reply Icon">
            <p>{post.commentCount}</p>
        </button>
        <button><img src ="/images/icons/forward.png" alt="Direct Message Icon"></button>
    </div>
    {#if activeComment}
        <CommentForm postId={post.id}/>
    {/if}
    

    
</div>

<style>

    .post-container{
        display: grid;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 16px;
    }

    .post-container:hover{
        background-color: rgba(226, 224, 224, 0.075);
        transition: 300ms ease;
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
        width: fit-content;
    }

    .icons-container{
        display: flex;
        align-items: center;
        gap: 1rem;
        width: fit-content;
    }

    .icons-container > button {
        display: flex;
        align-items: center;
        color: inherit;
        gap: 0.5rem;
        min-width: fit-content;
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
        width: 3rem;
        height: 3rem;
    }
</style>