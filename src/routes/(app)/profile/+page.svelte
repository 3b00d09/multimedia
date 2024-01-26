<script lang="ts">
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
      <h2>{data.user.username}</h2>
      <p class="username">@{data.user.username}</p>
    </div>
    <div class="stats">
      <span class="post-counter">{data.postsCount} posts</span>
      <span class="follower-counter">23 followers</span>
      <span class="following-counter">32 following</span>
    </div>
    <p class="description">agas adaw daw daf</p>
  </div>

  <div class="content-container">
    <button>Posts</button>
    <button>Comments</button>
    <button>Media</button>
    <button>Likes</button>
  </div>
{/if}
<style>

 .profile-container {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: auto 1fr;
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

  .user-info .username {
    color: white;
    margin: 0;
  }

  .stats {
  grid-area: stats;
  display: flex;
  justify-content: center; /* Center stats container */
  gap: 2rem; /* Space between stat items */
}

  .stats > span {
    color: white;
  }

  .description {
    grid-area: description;
    color: #c3c0c0;
  }


  .content-container{
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;
    margin-top: 1rem;
  }

  .content-container > button{
    all:unset;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.75rem 1.15rem;
    border-radius: 10px;
    background: #131313;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.50), -3px -3px 10px 0px rgba(255, 255, 255, 0.03);
    min-width: fit-content;
  }

  /* .posts{
    display: grid;
    grid-template-columns: repeat(auto-fill, 90px);
    gap: 1rem;
    width: 50%;
  } */
  </style>