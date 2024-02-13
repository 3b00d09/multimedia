<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    export let visable:boolean = false;

    const dispatch = createEventDispatcher()

    let likes;

    const toggleOff = () =>{
        visable = !visable;
        dispatch("toggle")
    }

    onMount(async()=>{
        const data = await fetch("")
    })

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal" class:visable={visable} on:click={toggleOff}>
    <p>HELLO</p>
</div>


<style>
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(4px);
  }

    .visable{
        display: flex;
    }
</style>