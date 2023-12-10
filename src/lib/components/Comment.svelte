<script lang="ts">
  import CommentForm from "./CommentForm.svelte";
  import Linebreak from "./Linebreak.svelte";

    let activeComment:boolean = false;
</script>

<Linebreak/>
<div class="comment-container">
    <div class="comment-author">
            <img class="profile-image" src="/images/icons/profile.png" alt="Profile icon"/>
            <p class="author">{"Annon"}</p>
            <p class="timestamp">{`.${"3"}d`}</p>
    </div>
    <div class="comment-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    <div class="icons-container">
        <button><img src ="/images/icons/like.svg" alt="Like Icon"></button>
        <button on:click={()=>{activeComment = !activeComment}}><img src ="/images/icons/reply.svg" alt="Reply Icon"></button>
        <button><img src ="/images/icons/dm.svg" alt="Direct Message Icon"></button>
    </div>
    {#if activeComment}
        <CommentForm/>
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