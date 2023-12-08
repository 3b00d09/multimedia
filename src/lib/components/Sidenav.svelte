<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
    import "../../global.css"

    let iconsContainer:HTMLUListElement;

    const setActiveIcon = (e:MouseEvent & { currentTarget: HTMLButtonElement; }) =>{
        iconsContainer.querySelectorAll("li").forEach((btn)=>{
            btn.classList.remove("active");
            
        })
        e.currentTarget.parentElement?.classList.add("active");
        
    }
</script>

<ul bind:this={iconsContainer}>
    <li class="icon-container active"><button on:click={setActiveIcon}><img src="/images/icons/home.png" alt="Home Icon"/></button></li>
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/home.png" alt="Home Icon"/></button></li>
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/home.png" alt="Home Icon"/></button></li>
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/home.png" alt="Home Icon"/></button></li>
</ul>


<style>

    ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        text-align: center;
        background: transparent;
        border-radius: 8px;
        padding: 1rem 1.75rem;
        box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5), 2px 2px 6px 4px rgba(0, 0, 0, 0.5);
    }

    button{
        padding: .45rem;
        width: 3rem;
        height: 3rem;
    }

    li > button > img{
        width: 100%;
    }

    .icon-container{
        opacity: 0.3;
    }

    .active{
        opacity: 1;
        position: relative;
    }

    .active::before{
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom :0;
        background-color: var(--action);
        width: 3px;
    }

</style>