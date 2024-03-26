<script lang="ts">
  import Categories from "$lib/components/Categories.svelte";
  export let data;
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/post/Post.svelte";
 
</script>
   {#if data.groups}
        <Categories groups={data.groups}/>
    {/if}   

{#if data.categoriesPost}
<div class="posts-container">
    {#each data.categoriesPost as row}
        <Post post={row}/>
        <Linebreak/> 
    {/each}
</div>
{/if}
