<script lang="ts">
    import Post from '$lib/components/post/Post.svelte';
    import Comment from '$lib/components/comment/Comment.svelte';
    import CommentFrom from "$lib/components/comment/CommentForm.svelte"
  import Linebreak from '$lib/components/Linebreak.svelte';

    export let data;

</script>


<div>
    {#if data}
    
      <Post post={data.post} />

      <CommentFrom postId={data.post.post.id}/>

      {#if data.topLevelComment}
        <Comment postId = {data.post.post.id} comment={data.topLevelComment}/>
        <Linebreak/>
      {/if}

      <Comment postId={data.post.post.id} comment={data.parentComment} />

    <div class="replies">
        {#each data.childComments as reply}
            <Comment postId={data.post.post.id} comment={reply}/>
        {/each}
    </div>
    {/if}

    
</div>

<style>
  div{
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }

  /* .replies{
    margin-left: 1.75rem;
  } */
</style>