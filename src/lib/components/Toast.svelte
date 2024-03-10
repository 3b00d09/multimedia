<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { quartInOut, quartOut } from "svelte/easing";
  import {toastStore} from "../helpers/stores"  

  toastStore.subscribe((value)=>{
    if(value.active){
        setTimeout(() => {
            toastStore.set({
                active: false,
                status: "info",
                message: ""
            })
        }, 1000);
    }
  })
</script>

{#if $toastStore.active}
    <div in:slide={{duration: 500, axis: "x", easing:quartOut}} out:fade={{duration: 1000, easing:quartInOut}} class="toast-container"
     class:success={$toastStore.status==="success"} 
     class:error={$toastStore.status==="error"}
     class:info={$toastStore.status==="info"}>
        {$toastStore.message}
    </div>
{/if}


<style>
        
    .toast-container{
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: max-content;
        min-width: 350px;
        color: #fff;
        border-radius: 16px;
        padding: 1rem;
        z-index: 999999999;
        background-color: #215938;
    }

    .success{
        background-color: #215938;
    }

    .error{
        background-color: #7f242c;
    }

    .info{
        background-color: #906b29;
    }
</style>