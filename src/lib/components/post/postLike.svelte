<script lang="ts">
  import type { PostType } from "$lib/types";
  import { onMount } from "svelte";
  import LikesModal from "../LikesModal.svelte";

  export let postId: string;

  let liked = false;
  let showModal: boolean = false;
  export let likecount: Number;

  async function toggleLike() {
    const response = await fetch(`/api/likes/PostLikes`, {
      method: liked ? "DELETE": "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId }),
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
        const response = await fetch(`/api/counter?src=post&id=${postId}`);
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                likecount = data.likesCount;
            }
        }
    };

  onMount(async()=>{
    const data = await fetch(`/api/likes/PostLikes?id=${postId}`)
    const res = await data.json()
    liked = res.liked;
 
    })
</script>
<LikesModal
  visable={showModal}
  {postId}
  on:toggle={() => (showModal = false)}
/>


<button class:liked={liked} class="main-btn">

  <button on:click={toggleLike}
    ><img
     class:like ={liked}
      src={!liked ? "/images/icons/like.png" : "/images/icons/likeFilled.png"}
      alt="Like Icon"
    /></button
  >    
     <button on:click|self={()=>showModal = true}>
        {likecount}
    </button>

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

  .main-btn{
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
