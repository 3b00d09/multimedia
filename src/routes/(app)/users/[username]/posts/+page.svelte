<script lang="ts">
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/post/Post.svelte";

  export let data;

</script>

{#if data.user}

  <div>
    {#each data.userPosts as post}

    <Post post={post}/>
    <Linebreak/>
    {/each}
  </div>
{/if}
<style>

  </style>