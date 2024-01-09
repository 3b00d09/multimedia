<script lang="ts">
  import Post from '$lib/components/Post.svelte';
  import Comment from '$lib/components/Comment.svelte';
  import CommentForm from '$lib/components/CommentForm.svelte';

export let data;

</script>

<div>
    {#if data}
      <Post post={data.post} />
    {/if}

    <CommentForm postId={data.post.id}/>

    {#each data.comments as comment}
      <Comment {comment} />
    {/each}
</div>

<style>
  div{
    display: grid;
    gap: 1rem;
  }
</style>