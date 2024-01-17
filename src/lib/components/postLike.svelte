<script lang="ts">
  import type { PostType } from "$lib/types";
  import { onMount } from "svelte";



  export let post: PostType;

  let liked = false;
  let like = false;

  async function toggleLike() {
    const response = await fetch(`/api/likes/PostLikes`, {
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
    const data = await fetch(`/api/likes/PostLikes?id=${post.id}`)
    const res = await data.json()
    liked = res.liked;
    console.log(res.liked)
    
 
    })
</script>

<button on:click={toggleLike} class:liked={liked}>
  <button
    ><img
     class:like ={liked}
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
    width: 1.6rem; 
    height: auto; 
  }
  img:not(.like) {
    width: 1.6rem; 
    height: auto; 
  }
</style>
