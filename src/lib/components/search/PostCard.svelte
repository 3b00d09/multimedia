<script lang="ts">
  import type{PostWithProfile} from "$lib/types"

  export let post: PostWithProfile;
  import Post from "$lib/components/post/Post.svelte";
</script>

<div class="post">
  <Post {post} />
</div>

<style>
  .post {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    background-color: transparent;
    transition: transform 0.3s ease,
                box-shadow 0.3s ease;
  }

  .post:hover, .post:focus {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
</style>
