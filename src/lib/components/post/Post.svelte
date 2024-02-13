<script lang="ts">
    import type { PostWithProfile } from "$lib/types";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import PostLike from "./postLike.svelte";
    import LikesModal from "../LikesModal.svelte";

    let commentCount = 0;
  
    export let post: PostWithProfile;

    let showModal:boolean = false;

    let days: number;

    onMount(() => {
        const originalTime = post.post.timestamp!.getTime();
        const currTime = new Date().getTime();
        const diffHours = (currTime - originalTime) / 3600000;

        days = Math.floor(diffHours / 24);
     

       
    });

    const navigateToPost = () => goto(`/post/${post.post.id}`);
</script>

<LikesModal visable={showModal} postId={post.post.id} on:toggle={()=>showModal = false}/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|self={navigateToPost} class="post-container">
    <div on:click|self={navigateToPost} class="post-header">
        <div class="post-author">
            <a href={`/users/${post.author}`}>
                <img
                    class="profile-image"
                    src={post.author.profilePictureUrl}
                    alt="Profile icon"
                />
                {#if post.author.firstName || post.author.lastName}
                    <div>
                        <p class="author-name">{`${post.author.firstName ? post.author.firstName.concat(" ",post.author.lastName || "")  : "" + post.author.lastName ? post.author.lastName : ""}`}</p>
                        <p class="author-secondary">{"@" + post.post.author}</p>
                    </div>
                {:else}
                    <p class="author">{post.author}</p>
                {/if}
            </a>
            <p class="timestamp">{`.${days}d`}</p>
        </div>

        <p>...</p>
    </div>
    <div class="post-content"><p>{post.post.content}</p></div>
    <div class="icons-container">
        <button>
            <PostLike postId={post.post.id} likecount={post.post.likeCount}/>
           
            
        </button>

        <button>
            <img src="/images/icons/comment.png" alt="Reply Icon" />
            <p>{post.post.commentCount}</p>
        </button>
        <button
            ><img
                src="/images/icons/forward.png"
                alt="Direct Message Icon"
            /></button
        >
    </div>
</div>

<style>
    .post-container {
        display: grid;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 16px;
    }

    .post-container:hover {
        background-color: rgba(226, 224, 224, 0.075);
        transition: 300ms ease;
    }
    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .post-author,
    .post-author > a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .author {
        font-size: 1.2rem;
    }

    .author-name{
        font-size: 1.2rem;
    }

    .author-secondary{
        font-size: 0.8rem;
        color:var(--text-secondary)
    }

    .timestamp {
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    .post-content {
        color: var(--text-primary);
        line-height: 22px;
        width: fit-content;
    }

    .icons-container {
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
        padding: 0.45rem;
        width: 2.5rem;
        height: 2.5rem;
        border: none;
    }

    .icons-container > button > img {
        width: 100%;
    }

    .profile-image {
        border-radius: 50%;
        object-fit: cover;
        width: 3rem;
        height: 3rem;
    }
</style>
