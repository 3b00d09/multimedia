<script lang="ts">
  import type { PostType } from "$lib/types";
  import { onMount } from "svelte";


  export let post: PostType;

  let liked = false;

  async function toggleLike() {
    
    const response = await fetch(`/api/like`, {
      method: liked ? "DELETE": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: post.id }),
    });

    const data = await response.json();
    if (data.success) {
      liked = !liked;
    } else {
      console.error("Failed to toggle like:", data.message);
    }
  }

  onMount(async()=>{
    const data = await fetch(`/api/like/?id=${post.id}`)
    const res = await data.json()
    liked = res.liked;
    console.log(res.liked)
    
 
    })
</script>

<button on:click={toggleLike} class:liked={liked}>
  <button
    ><img
      src={!liked ? "/images/icons/like.png" : "/images/icons/likeFilled.png"}
      alt="Like Icon"
    /></button
  >
</button>

<style>
  button {
    all: unset;
  }
</style>
