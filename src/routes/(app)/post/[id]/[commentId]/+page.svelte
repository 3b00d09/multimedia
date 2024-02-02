<script lang="ts">
    import Post from '$lib/components/post/Post.svelte';
    import Comment from '$lib/components/comment/Comment.svelte';
    import CommentFrom from "$lib/components/comment/CommentForm.svelte"

    export let data;
</script>


<div>
    {#if data}
      <Post post={data.post} />

      <CommentFrom postId={data.post.id}/>

      <Comment postId={data.post.id} comment={data.parentComment[0]} />

    <div class="replies">
        {#each data.childComments as reply}
            <Comment postId={data.post.id} comment={reply}/>
        {/each}
    </div>
    {/if}
    
</div>

<style>
  div{
    display: grid;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
  }

  .replies{
    margin-left: 1.75rem;
  }
</style>