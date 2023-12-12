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
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/search.png" alt="Home Icon"/></button></li>
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/inbox.png" alt="Home Icon"/></button></li>
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/profile.png" alt="Home Icon"/></button></li>
    <li class="icon-container"><button on:click={setActiveIcon}><img src="/images/icons/settings.svg" alt="Settings Icon"/></button></li>
</ul>


<style>

    ul{
        list-style: none;
        display: grid;
        text-align: center;
        background: transparent;
        border-radius: 8px;
        padding: 1rem 1.75rem;
        box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5), 2px 2px 6px 4px rgba(0, 0, 0, 0.5);
        height: 70vh;
        grid-template-columns: repeat(1, 3rem);
        grid-template-rows: repeat(4, auto) 1fr;
        justify-items: center;

        grid-auto-rows: min-content;
        gap: 2rem;
        /** prevents the active::before from exploding*/
        align-items: baseline;
    }

    ul li:nth-child(5){
        align-self: end;
    }

    button{
        padding: .45rem;
        border: none;
    }

    button > img{
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
        filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
        width: 1px;
    }

</style>