<script lang="ts">
  import type { User } from '$lib/helpers/types'; 
  import Linebreak from '../Linebreak.svelte';
  export let user: User;
</script>

<div class="user" style="background-image: url({user.imageUrl});">
  <div class="info">
    <img src={user.imageUrl} alt="{user.username}'s profile picture" />
    <p>{user.username}</p>
  </div>
  <Linebreak />
</div>

<style>
  .user:hover, .user:focus {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  .user {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    border-radius: 1rem;
    background-size: cover;
    background-position: center;
    height: 200px;
    position: relative;
    overflow: hidden;
    width:100%;
  }

  .info {
    background: rgba(5, 5, 5, 0.8);
    border-radius: 1rem;
    text-align: center;
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    padding: 0.1rem;
    object-fit: cover;
  }

  p {
    color: white;
  }
</style>