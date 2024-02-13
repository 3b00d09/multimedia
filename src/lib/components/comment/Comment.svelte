<script lang="ts">
    import { onMount } from "svelte";
    import ReplyForm from "./ReplyForm.svelte";
    import type { CommentWithProfile } from "$lib/types";
    import { goto } from "$app/navigation";
    import CommentLike from "./CommentLike.svelte";
    

    export let comment: CommentWithProfile

    let activeReply:boolean = false;
    export let postId: string;

    const navigateToComment = () =>{
        goto(`/post/${postId}/${comment.comment.id}`)
    }

    onMount(()=>{
        console.log(comment)
    })

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="comment-container" on:click|self={navigateToComment}>
    <div class="comment-author" on:click|self={navigateToComment}>
            <img class="profile-image" src={comment.author.profilePictureUrl} alt="Profile icon"/>
            <p class="author">{comment.author.username}</p>
            <p class="timestamp">{`.${"3"}d`}</p>
    </div>
    <div class="comment-content">{comment.comment.comment}</div>
    <div class="icons-container">
        <CommentLike comment = {comment.comment}/>
        <span class="like-count">{comment.comment.likeCount}</span>
        <button on:click={()=>{activeReply = !activeReply}}><img src ="/images/icons/reply.png" alt="Reply Icon"></button>
        <p>{comment.comment.replyCount}</p>
        <button><img src ="/images/icons/forward.png" alt="Direct Message Icon"></button>
    </div>

    {#if activeReply}
        <ReplyForm commentId={comment.comment.id}/>
    {/if}
</div>

<style>
    .comment-container{
        display: grid;
        gap: 0.75rem;
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
        width: fit-content
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
        width: 3rem;
        height: 3rem;
    }
</style>