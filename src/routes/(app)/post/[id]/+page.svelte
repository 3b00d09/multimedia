<script lang="ts">
  import { onMount } from 'svelte';


export let data;


onMount(()=>{
    console.log(data.comments)
})

</script>

<div>
    <p>{data.post.author}</p>
    <p></p>
    <p>{data.post.content}</p>

    {#each data.comments as comment}

    <p>{comment.author}</p>
    <p>{comment.content}</p>

    {/each}
</div>