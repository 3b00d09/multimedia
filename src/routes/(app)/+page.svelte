<script lang="ts">
  import Categories from "$lib/components/Categories.svelte";
    export let data;
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/post/Post.svelte";
    import PostForm from "$lib/components/post/PostForm.svelte";

</script>
<div>
    <Categories groups={data.groups} />
    <PostForm />
    {#if data}
        <div class="posts-container">
            {#each data.rows as row}
                <Post post={row} groups={data.groups}/>
                <Linebreak/> 
            {/each}
        </div>
    {/if}

</div>

<style>

    div{
        justify-self: center;
        display: grid;
        gap: 1.25rem;
        width: 100%;
    }

    .posts-container{
        display: grid;
        gap: 1rem;
    }
</style>