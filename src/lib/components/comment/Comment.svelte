<script lang="ts">
    import ReplyForm from "./ReplyForm.svelte";
    import type { CommentWithProfile } from "$lib/helpers/types";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    

    export let comment: CommentWithProfile

    let activeReply:boolean = false;
    export let postId: string;

    const navigateToComment = () =>{
        goto(`/post/${postId}/${comment.comment.id}`)
    }
      let liked = false;
  
  async function toggleLike() {
    
    const response = await fetch(`/api/likes/CommentLikes`, {
      method: liked ? "DELETE": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: comment.comment.id, postId }),
    });

    const data = await response.json();
    if (data.success) {
      liked = !liked;
    } else {
      console.error("Failed to toggle like:", data.message);
    }
  }

  onMount(async()=>{
    const data = await fetch(`/api/likes/CommentLikes?id=${comment.comment.id}`)
    const res = await data.json()
    liked = res.liked;
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
        <div class="like-container">
            <button class="like-btn" on:click={toggleLike}>
                <img class:like={liked} src={!liked ? "/images/icons/like.png" : "/images/icons/likeFilled.png"} alt="Like Icon"/>
            </button>
            <span class="like-count">{comment.comment.likeCount}</span>
        </div>
        <div class="reply-container">
            <button on:click={()=>{activeReply = !activeReply}}><img src ="/images/icons/reply.png" alt="Reply Icon"></button>
            <p>{comment.comment.replyCount}</p>
        </div>
    </div>

    {#if activeReply}
        <ReplyForm commentId={comment.comment.id} {postId}/>
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

    .profile-image{
        border-radius: 50%;
        object-fit: cover;
        width: 3rem;
        height: 3rem;
    }

    .like-container, .reply-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
</style>