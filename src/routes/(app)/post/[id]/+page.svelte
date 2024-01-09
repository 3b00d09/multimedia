<script lang="ts">
  import Post from '$lib/components/Post.svelte';
  import Comment from '$lib/components/Comment.svelte';
  import CommentForm from '$lib/components/CommentForm.svelte';

  const minimizeComments = (e:CustomEvent<{details:{id:string}}>) =>{
    console.log(e.detail.details.id)
  }

export let data;

</script>

<div>
    {#if data}
      <Post post={data.post} />
    {/if}

    <CommentForm postId={data.post.id}/>

    {#each data.comments as comment}
      <Comment {comment} on:message={minimizeComments} />
    {/each}
</div>

<style>
  div{
    display: grid;
    gap: 1rem;
  }
</style>