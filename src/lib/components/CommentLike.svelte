<script lang="ts">
  import type { CommentType } from "$lib/types";
  import { onMount } from "svelte";



  export let comment: CommentType;

  let liked = false;
  
  async function toggleLike() {
    
    const response = await fetch(`/api/likes/CommentLikes`, {
      method: liked ? "DELETE": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: comment.id }),
    });

    const data = await response.json();
    if (data.success) {
      liked = !liked;
    } else {
      console.error("Failed to toggle like:", data.message);
    }
  }

  onMount(async()=>{
    const data = await fetch(`/api/likes/CommentLikes?id=${comment.id}`)
    const res = await data.json()
    liked = res.liked;
    console.log(res.liked)
    })
</script>
<button on:click={toggleLike} class:liked={liked}>
  <button
    ><img
      class:like={liked}
      src={!liked ? "/images/icons/like.png" : "/images/icons/likeFilled.png"}
      alt="Like Icon"
    /></button
  >
 
</button>

<style>
  button {
    all: unset;
  }
  img.like {
    width: 1.3rem; 
    height: auto; 
  }
  img:not(.like) {
    width: 1.3rem; 
    height: auto; 
  }
</style>
