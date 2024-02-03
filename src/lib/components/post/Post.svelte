<script lang="ts">
  import type { PostWithProfileImage } from "$lib/types";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
    import PostLike from "./postLike.svelte";

     let commentCount =0;
    let likecount = 0;
    export let post: PostWithProfileImage;

    let days:number;
   
    const fetchLikeCount = async () => {
        const response = await fetch(`/api/counter?src=post&id=${post.id}`);
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                likecount = data.likesCount;
                commentCount = data.commentCount;
            }
        }
    };

    onMount(()=>{
        const originalTime = post.timestamp!.getTime();
        const currTime = new Date().getTime()
        const diffHours = (currTime - originalTime) / 3600000
        
        days = Math.floor(diffHours / 24)
        
        fetchLikeCount()
    })
 
    const navigateToPost = () => goto(`/post/${post.id}`)
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|self={navigateToPost} class="post-container">
    <div on:click|self={navigateToPost} class="post-header">
        <div class="post-author">
            <a href={`/users/${post.author}`}>
            <img class="profile-image" src={post.imageUrl} alt="Profile icon"/>
            <p class="author">{post.author}</p>
            </a>
            <p class="timestamp">{`.${days}d`}</p>
        </div>

        <p>...</p>
    </div>
    <div  class="post-content"><p>{post.content}</p></div>
    <div  class="icons-container">
       <button>
        <PostLike {post}/>
        <p>{likecount}</p>
       </button>


        
        <button>
            <img src ="/images/icons/comment.png" alt="Reply Icon">
          <p>{commentCount}</p>
        </button>
        <button><img src ="/images/icons/forward.png" alt="Direct Message Icon"></button>
    </div>
    

    
</div>

<style>

    .post-container{
        display: grid;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 16px;
    }

    .post-container:hover{
        background-color: rgba(226, 224, 224, 0.075);
        transition: 300ms ease;
    }
    .post-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .post-author, .post-author > a{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    a{
        text-decoration: none;
        color: inherit;
    }
    
    .author{
        font-size: 1.2rem;
    }

    .timestamp{
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    .post-content{
        color: var(--text-secondary);
        line-height: 22px;
        width: fit-content;
    }

    .icons-container{
        display: flex;
        align-items: center;
        gap: 1rem;
        width: fit-content;
    }

    .icons-container > button {
        display: flex;
        align-items: center;
        color: inherit;
        gap: 0.5rem;
        min-width: fit-content;
    }

    button {
        padding: .45rem;
        width: 2.5rem;
        height: 2.5rem;
        border: none;
    }

    .icons-container > button > img{
        width: 100%;
    }

    .profile-image{
        border-radius: 50%;
        object-fit: cover;
        width: 3rem;
        height: 3rem;
    }
</style>