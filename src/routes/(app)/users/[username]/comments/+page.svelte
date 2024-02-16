<script lang="ts">
    import Comment from "$lib/components/comment/Comment.svelte"
    import Post from "$lib/components/post/Post.svelte";
    import Linebreak from "$lib/components/Linebreak.svelte";
    export let data;
</script>

{#if data.userComments}
    <div class="comments-container">
        {#each data.userComments as comment}
            <div>
                {#if comment}
                    <Post post={comment.post}/>
                    <div style="margin-left: 2rem; margin-bottom: 1rem;">
                        <Comment postId={comment.post.post.id} comment={comment.comment}/>
                    </div>
                {/if}
            </div>   
        {/each}
    </div>
{/if}

<style>
    .comments-container{
        display: grid;
        gap: 2rem;
    }
</style>