<script lang="ts">
  import Categories from "$lib/components/Categories.svelte";

    export let data;
</script>

<div>
    {#if data.groups}
        <Categories groups={data.groups}/>
    {/if}   
     
    {#if data.posts}


        {#each data.posts as post}

            <p>{post.posts?.content}</p>

        {/each}

    {/if}
</div>