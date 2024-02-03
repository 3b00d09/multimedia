<script lang="ts">

    import Comment from "$lib/components/comment/Comment.svelte"
    import Post from "$lib/components/post/Post.svelte";
    export let data;
</script>


<div>
    {#if data.userComments}

        {#each data.userComments as comment}
            <Post post={comment.posts}/>
            <div>{comment.comments.comment}</div>
        {/each}

    {/if}
</div>