<script lang="ts">
  import type { PostWithProfile } from "$lib/helpers/types";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import PostLikeBtn from "./postLikeBtn.svelte";
  import PostSettings from "./PostSettings.svelte";
  import type { groupsTable } from "$lib/server/schema";

  export let post: PostWithProfile;
  let groups: typeof groupsTable.$inferSelect[]

  let days: number;

  onMount(async() => {

    const req = await fetch("/api/groups")
    const res = await req.json()
    groups = res
    
    const originalTime = post.post.timestamp!.getTime();
    const currTime = new Date().getTime();
    const diffHours = (currTime - originalTime) / 3600000;

    days = Math.floor(diffHours / 24);
  });

  const navigateToPost = () => goto(`/post/${post.post.id}`);
</script>



<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|self={navigateToPost} class="post-container">
  <div on:click|self={navigateToPost} class="post-header">
    <div class="post-author">
      <a href={`/users/${post.author.username}`}>
        <img
          class="profile-image"
          src={post.author.profilePictureUrl}
          alt="Profile icon"
        />
        {#if post.author.firstName || post.author.lastName}
          <div>
            <p class="author-name">
              {`${
                post.author.firstName
                  ? post.author.firstName.concat(
                      " ",
                      post.author.lastName || ""
                    )
                  : "" + post.author.lastName
                    ? post.author.lastName
                    : ""
              }`}
            </p>
            <p class="author-secondary">{"@" + post.author.username}</p>
          </div>
        {:else}
          <p class="author">{post.author.username}</p>
        {/if}
      </a>
      <p class="timestamp">{`.${days}d`}</p>
    </div>

    <PostSettings postId={post.post.id} {groups}/>
  </div>
  <div class="post-content">
    {#if post.post.pictureUrl}
      <div class="image-container">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src={post.post.pictureUrl}
          alt="Description of image"
          class="profile-pic"
        />
      </div>
    {/if}

    {#if post.post.videoUrl}
      <video src={post.post.videoUrl} controls width="300px" height="auto"
        ><track kind="captions" />
      </video>
    {/if}
  </div>
  
  <div class="p">
    <p>{post.post.content}</p>
  </div>

  <div class="icons-container">
    <button>
      <PostLikeBtn postId={post.post.id} likecount={post.post.likeCount} />
    </button>

    <button>
      <img src="/images/icons/comment.png" alt="Reply Icon" />
      <p>{post.post.commentCount}</p>
    </button>
  </div>

  
</div>

<style>
  .post-container {
    display: grid;
    gap: 0.75rem;
    cursor: pointer;
    margin: auto;
    padding: 0.35rem;
    border-radius: 16px;
    min-width: 100%;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .post-container:hover {
    transform: translateY(-5px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-author,
  .post-author > a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .author {
    font-size: 1.2rem;
  }

  .author-name {
    font-size: 1.2rem;
  }

  .author-secondary {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .timestamp {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .post-content {
    color: var(--text-primary);
    line-height: 22px;
  }

  .icons-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    padding: 0.45rem;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
  }

  .icons-container > button > img {
    width: 100%;
  }

  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    width: 3rem;
    height: 3rem;
  }

  .profile-pic {
    width: 90%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 1rem;
  }

  .image-container {
    display: flex;
    justify-content: center;
    justify-items: center;
    width: 100%;
    margin-top: 1rem;
  }

  video {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
