<script lang="ts">
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/post/Post.svelte";
    import { onMount } from "svelte";

  export let data;

</script>

{#if data.user}

  <div>
    {#each data.userLikes as post}

    <Post post={post}/>
    <Linebreak/>
    {/each}
  </div>
{/if}
