<script lang="ts">
  import { enhance } from "$app/forms";
  import ProfileSections from "$lib/components/profile/ProfileSections.svelte";
  import Linebreak from "$lib/components/Linebreak.svelte";


  export let data;

  let showProfileOptions = false;

  function toggleProfileOptions() {
    showProfileOptions = !showProfileOptions;
  }
</script>

{#if data.user}
  <div class="profile-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="pfp-container"
      on:click={toggleProfileOptions}
      tabindex="0"
      role="button"
      aria-label="Toggle profile options"
    >
      <img
        src={data.user.profilePictureUrl}
        alt="{data.user.username}'s profile"
        class="profile-pic"
      />
    </div>

    {#if showProfileOptions}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="profile-options-modal" on:click={toggleProfileOptions}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="modal-content" on:click|stopPropagation>
         
          <form
            method="POST"
            action="?/updateProfileImage"
            enctype="multipart/form-data"
          >
            <input
              id="file"
              class="file-input"
              name="image"
              type="file"
              accept="image/png,image/jpeg"
            />
            <label for="file" class="file-label">Upload</label>

            <Linebreak />
            <button type="submit" class="submit-button">Submit</button>
          </form>
          <Linebreak />
          <form
            method="POST"
            action="?/deleteProfileImage"
            enctype="multipart/form-data"
          >
            <button type="submit" class="submit-button1"
              >Delete Profile Image</button
            >
          </form>
        </div>
      </div>
    {/if}

    <div class="user-info">
      {#if data.user.firstName || data.user.lastName}
        <div>
          <h2>
            {`${
              data.user.firstName
                ? data.user.firstName.concat(" ", data.user.lastName || "")
                : ""
            }${data.user.lastName ? data.user.lastName : ""}`}
          </h2>
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

  <ProfileSections username={data.user.username} />

  <slot />
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
  .profile-options-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    z-index: 10;
  }

  .modal-content {
    background: #131313;
    padding: 20px;
    border-radius: 0.6em;
    width: 20%;
    box-sizing: border-box;
    margin: auto;
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

  .last-name {
    color: var(--text-secondary);
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

  .followBtn {
    all: unset;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5),
      2px 2px 6px 4px rgba(0, 0, 0, 0.5);

    padding: 0.5rem;
    border-radius: 25%;
  }
  .submit-button1 {
    color: red;
  }
  .submit-button {
    color: white;
  }

  .submit-button1,
  .submit-button {
    padding: 0.2rem 0.1rem;
    border-radius: 5px;
    cursor: pointer;
    justify-content: center;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
  }
  /* .posts{
    display: grid;
    grid-template-columns: repeat(auto-fill, 90px);
    gap: 1rem;
    width: 50%;
  } */

  .file-input {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }

  .file-label {
    display: flex;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    justify-content: center;
    border: none;
    font-size: 1rem;
  }
</style>
