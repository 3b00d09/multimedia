<script lang="ts">
  import { enhance } from "$app/forms";
    import ProfileSections from "$lib/components/profile/ProfileSections.svelte"


  export let data;

</script>

{#if data.user}
  <div class="profile-container">
    <div class="pfp-container">
      <img
        src={data.user.profilePictureUrl}
        alt="{data.user.username}'s profile"
      />
    </div>
    <div class="user-info">
      {#if data.user.firstName || data.user.lastName}
        <div>
            <h2>{`${data.user.firstName ? data.user.firstName.concat(" ",data.user.lastName || "")  : "" + data.user.lastName ? data.user.lastName : ""}`}</h2>
            <p class="last-name">{"@" + data.user.username}</p>
        </div>
      {:else}
          <h2>{data.user.username}</h2>
      {/if}
    </div>
    <div class="stats">
      <span class="post-counter">{data.postsCount} posts</span>
      <span class="follower-counter">{data.followerCount} followers</span>
      <span class="following-counter">{data.followingCount} following</span>
      {#if !data.personalProfile}
        {#if data.following}
          <form use:enhance method="post" action="?/unfollow">
            <button type="submit" class="followBtn">Unfollow</button>
          </form>
        {:else}
        <form use:enhance method="post" action="?/follow">
          <button class="followBtn">Follow</button>
        </form>
        {/if}
      {/if}
    </div>
      {#if data.user.bio}
    <p class="description">{data.user.bio}</p>
    {/if}
  </div>

  <ProfileSections username={data.user.username}/>

  <slot/>
{/if}
<style>

 .profile-container {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 2fr auto 2fr auto;
    align-items: center;
    grid-template-areas:
      "picture"
      "info"
      "stats"
      "description";
    gap: 1rem;
    width: 100%;
    text-align: center;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5),
      2px 2px 6px 4px rgba(0, 0, 0, 0.5);
    padding: 5rem 5rem 5rem 5rem;
  }
  
  .pfp-container {
    grid-area: picture;
    place-content: center;
    margin: auto; 
  }
  
  .pfp-container > img {
    width: 10rem; 
    height: 10rem; 
    object-fit: cover;
    border-radius: 50%;
  }

  .user-info {
    grid-area: info;
    text-align: center; 
  }

  .user-info h2 {
    color: white;
    font-size: 2rem;
    margin: 0;
  }

  .last-name{
    color:var(--text-secondary)
  }

  .stats {
  grid-area: stats;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem; 
}

  .stats > span {
    color: white;
  }

  .description {
    grid-area: description;
    color: #c3c0c0;
  }

  .followBtn{
    all: unset;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5),
      2px 2px 6px 4px rgba(0, 0, 0, 0.5);
  
    padding: 0.5rem;
    border-radius: 25%;

  }

  /* .posts{
    display: grid;
    grid-template-columns: repeat(auto-fill, 90px);
    gap: 1rem;
    width: 50%;
  } */
  </style>