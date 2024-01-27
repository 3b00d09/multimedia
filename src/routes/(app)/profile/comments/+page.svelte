<script lang="ts">
    //absolute mess of a file 
    //@ts-nocheck
    import Post from "$lib/components/post/Post.svelte";

    export let data;
</script>

<div>
    {#if data.userComments}

        {#each data.userComments as comment}
            <Post post={
                {
                    id:comment.id, 
                    content:comment.content,
                    author:comment.author, 
                    timestamp: comment.timestamp, 
                    imageUrl:comment.imageUrl
                }
            }/>

            <div>{comment.comment}</div>
            
        {/each}

    {/if}
</div>