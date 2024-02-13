<script lang="ts">
  import Post from "$lib/components/post/Post.svelte";
  import Comment from "$lib/components/comment/Comment.svelte";
  import CommentForm from "$lib/components/comment/CommentForm.svelte";

  export let data;
</script>

<div>
  {#if data}
    <Post post={data.post} />
  {/if}

  <CommentForm postId={data.post.post.id} />

  <div>
    {#each data.comments as comment}
      <Comment {comment} postId={data.post.post.id} />
    {/each}
  </div>
</div>

<style>
  div {
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }
</style>
