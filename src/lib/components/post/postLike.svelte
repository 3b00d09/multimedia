<script lang="ts">
  import type { PostType } from "$lib/types";
  import { onMount } from "svelte";

  export let post: PostType;

  let liked = false;
 export let likecount: Number;

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
    fetchLikeCount();
  }

  const fetchLikeCount = async () => {
        const response = await fetch(`/api/counter?src=post&id=${post.id}`);
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                likecount = data.likesCount;
            }
        }
    };

  onMount(async()=>{
    const data = await fetch(`/api/likes/PostLikes?id=${post.id}`)
    const res = await data.json()
    liked = res.liked;
 
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
     <p>
      {likecount}
  </p>

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
