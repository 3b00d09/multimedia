<script lang="ts">

    import Comment from "$lib/components/comment/Comment.svelte"
    export let data;
</script>


<div>
    {#if data.userComments}

        {#each data.userComments as comment}
            <div>{comment.posts?.content}</div>
            <div>{comment.comments.comment}</div>
        {/each}

    {/if}
</div>