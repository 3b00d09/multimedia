<script lang="ts">
  import Post from '$lib/components/post/Post.svelte';
  import Comment from '$lib/components/comment/Comment.svelte';
  import CommentForm from '$lib/components/comment/CommentForm.svelte';
  import { onMount } from 'svelte';

  let trigger:boolean = false;
  let replies;

  const minimizeComments = async(e:CustomEvent<{id:string}>) =>{
    const data = await fetch(`/api/fetchReplies/?id=${e.detail.id}`)
    const res = await data.json()
    console.log(res)
    replies =
    trigger = !trigger
  }

export let data;
</script>

<div>
    {#if data}
      <Post post={data.post} />
    {/if}

    <CommentForm postId={data.post.id}/>

    <div>
      {#each data.comments as comment}
          <Comment {comment} postId={data.post.id} />
      {/each}
  </div>
    
</div>

<style>
  div{
    display: grid;
    gap: 1rem;
  }
</style>