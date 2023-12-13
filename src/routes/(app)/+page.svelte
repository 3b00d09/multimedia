<script lang="ts">
    export let data;
    import Linebreak from "$lib/components/Linebreak.svelte";
    import Post from "$lib/components/Post.svelte";
    import PostForm from "$lib/components/PostForm.svelte";
    import type { postsTable } from "$lib/server/schema.js";
    import { onMount } from "svelte";

    let posts:typeof postsTable.$inferInsert[] = [];

    onMount(()=>{
        data.posts.map((post)=>{
            posts.push(post.posts)
            posts = posts;
        })
    })
</script>
<div>
    <PostForm />
    {#if data}
        <div class="posts-container">
            {#each posts as post}
                <Post post={post}/>
                <Linebreak/>
            {/each}
        </div>
    {/if}

</div>

<style>

    div{
        justify-self: center;
    }

    .posts-container{
        display: grid;
        gap: 1rem;
    }
</style>